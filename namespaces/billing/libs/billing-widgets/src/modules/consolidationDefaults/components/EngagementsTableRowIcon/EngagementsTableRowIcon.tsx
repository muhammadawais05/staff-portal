import { Tooltip, Container, Info16 } from '@toptal/picasso'
import React, { FC, memo } from 'react'
import { useTranslation } from 'react-i18next'
import WebResourceLinkWrapper from '@staff-portal/billing/src/components/WebResourceLinkWrapper'
import { WebResourceFragment } from '@staff-portal/billing/src/__fragments__/webResourceFragment.graphql.types'
import { useExternalIntegratorContext } from '@staff-portal/billing/src/_lib/context/externalIntegratorContext'

const displayName = 'EngagementsTableRowIcon'

interface Props {
  webResource: WebResourceFragment
  isWorking?: boolean
}

const EngagementsTableRowIcon: FC<Props> = memo<Props>(
  ({ webResource, isWorking }) => {
    const { t: translate } = useTranslation('billingDetails')
    const { modalContainer } = useExternalIntegratorContext()

    const [pre, post] = translate(
      'consolidationDefaults.list.notSelectable'
    ).split('{0}')
    const tooltip = isWorking ? (
      <>
        {pre}
        <WebResourceLinkWrapper
          webResource={webResource}
          inline
          data-testid={`${displayName}-link`}
        />
        {post}
      </>
    ) : (
      <>{translate('consolidationDefaults.list.notWorking')}</>
    )

    return (
      <Tooltip
        content={tooltip}
        interactive={isWorking}
        container={modalContainer}
      >
        <Container as='span' left='xsmall'>
          <Info16 color='black' data-testid={`${displayName}-icon`} />
        </Container>
      </Tooltip>
    )
  }
)

EngagementsTableRowIcon.displayName = displayName

export default EngagementsTableRowIcon
