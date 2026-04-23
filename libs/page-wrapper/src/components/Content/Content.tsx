import React, { ReactNode, ReactElement, useEffect } from 'react'
import {
  TypographyOverflow,
  Container,
  Typography,
  Loader,
  SkeletonLoader
} from '@toptal/picasso'
import {
  NUMBER_OF_ITEMS_DISPLAY_LIMIT,
  USER_TRACKING_IS_ENABLED
} from '@staff-portal/config'
import { trackPage } from '@staff-portal/monitoring-service'
import { PageTitle, WrapWithTooltip } from '@staff-portal/ui'
import { usePageTitle } from '@staff-portal/browser'
import { isNotNullish } from '@staff-portal/utils'

import * as S from './styles'

export interface Props {
  title?: string | ReactElement
  titleActions?: ReactNode
  titleTags?: ReactNode
  browserTitle?: string
  titleLoading?: boolean
  itemsCount?: number
  itemsCountLoading?: boolean
  itemsCountTooltip?: string
  maxItemsCount?: number
  actions?: ReactNode
  tabs?: ReactNode
  prependContent?: ReactNode
  children?: ReactNode
  tooltipDisabled?: boolean
}

const throwIfHasNoStringTitle = ({
  browserTitle,
  title
}: Pick<Props, 'browserTitle' | 'title'>) => {
  if (title && typeof title !== 'string' && !browserTitle) {
    throw new Error(
      'Content component title should be either type of string or browserTitle prop should be specified'
    )
  }
}

const Content = ({
  title,
  titleActions,
  titleTags,
  browserTitle,
  titleLoading = false,
  itemsCount,
  itemsCountLoading,
  itemsCountTooltip,
  maxItemsCount = NUMBER_OF_ITEMS_DISPLAY_LIMIT,
  children,
  actions,
  tabs,
  prependContent,
  tooltipDisabled = false
}: Props) => {
  throwIfHasNoStringTitle({ browserTitle, title })

  usePageTitle(browserTitle || (title as string))

  useEffect(() => {
    if (USER_TRACKING_IS_ENABLED) {
      trackPage()
    }
  }, [])

  return (
    <>
      <PageTitle
        actions={actions}
        tabs={tabs}
        prependContent={prependContent}
        titleTags={titleTags}
      >
        {titleLoading && <SkeletonLoader.Header />}

        {title && (
          <>
            <Container flex>
              <TypographyOverflow
                variant='heading'
                disableTooltip={tooltipDisabled}
                size='large'
                data-testid='content-title'
              >
                {title} {itemsCountLoading && <Loader size='small' inline />}
                {!itemsCountLoading && isNotNullish(itemsCount) && (
                  <WrapWithTooltip
                    enableTooltip={!!itemsCountTooltip}
                    content={itemsCountTooltip}
                  >
                    <Typography
                      forwardedAs='span'
                      css={[itemsCountTooltip && S.withDefaultCursor]}
                    >
                      {`(${
                        itemsCount >= maxItemsCount
                          ? `${maxItemsCount}+`
                          : itemsCount
                      })`}
                    </Typography>
                  </WrapWithTooltip>
                )}
              </TypographyOverflow>

              {titleActions}
            </Container>

            <Container css={S.titleTagsContainer}>{titleTags}</Container>
          </>
        )}
      </PageTitle>

      <Container top='medium' bottom='medium' data-testid='content-body'>
        {children}
      </Container>
    </>
  )
}

export default Content
