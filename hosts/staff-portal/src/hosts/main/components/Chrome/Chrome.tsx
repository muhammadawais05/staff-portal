import { Container, Page } from '@toptal/picasso'
import React, { ReactNode, useMemo } from 'react'
import { Link } from '@staff-portal/navigation'
import {
  USER_TRACKING_IS_ENABLED,
  LOG_ROCKET_IS_ENABLED,
  DATA_DOG_IS_ENABLED
} from '@staff-portal/config'
import { useMonitoringService } from '@staff-portal/monitoring-service'
import { RoutePath } from '@staff-portal/routes'
import { decodeEntityId } from '@staff-portal/data-layer-service'
import { WidgetErrorBoundary } from '@staff-portal/error-handling'
import { useGetCurrentUser } from '@staff-portal/current-user'
import { useGetServerTimeZone } from '@staff-portal/date-time-utils'
import { OperationalIssuesButton } from '@staff-portal/operational-issues'

import SummarySidebar from '../../containers/SummarySidebar/SummarySidebar'
import SummarySidebarLoader from '../../containers/SummarySidebar/components/SummarySidebarLoader/SummarySidebarLoader'
import {
  HeaderMenu,
  SidebarMenu,
  UserSearch,
  BottomContent
} from '../../components'
import { useGetChromeData } from '../../data/get-chrome'
import * as S from './styles'

export interface Props {
  children: ReactNode
}

// eslint-disable-next-line complexity
const Chrome = ({ children }: Props) => {
  const { data, loading, error } = useGetChromeData()

  // Retrieve server timezone at the beginning to get it from cache later
  // to prevent selected date jumping in FormDatePickerWrapper
  useGetServerTimeZone()

  const currentUser = useGetCurrentUser()

  const userWithDecodedId = useMemo(
    () =>
      currentUser?.id
        ? {
            ...currentUser,
            decodedId: decodeEntityId(currentUser.id).id
          }
        : undefined,
    [currentUser]
  )

  useMonitoringService(userWithDecodedId, {
    chameleonParticipantUuid: data?.viewer.chameleonParticipantUuid,
    USER_TRACKING_IS_ENABLED,
    LOG_ROCKET_IS_ENABLED,
    DATA_DOG_IS_ENABLED
  })

  if (error) {
    throw error
  }

  const handleRoleMetrics = data?.viewer.permits.handleRoleMetrics

  const isThreeColumnsLayout = handleRoleMetrics !== false
  const pageWidth = loading || handleRoleMetrics ? 'wide' : undefined

  return (
    <>
      <Page width={pageWidth} css={S.page}>
        <Container css={S.topBarWrapper}>
          <Page.TopBar
            css={S.topBar({ isThreeColumnsLayout })}
            leftContent={
              data?.viewer.permits.useQuicksearch && (
                <WidgetErrorBoundary emptyOnError>
                  <Container css={S.quickSearchWrapper}>
                    <UserSearch />
                  </Container>
                </WidgetErrorBoundary>
              )
            }
            logoLink={<Link href={RoutePath.Dashboard} />}
            actionItems={
              data?.viewer.permits.viewMyOperationalIssues && (
                <WidgetErrorBoundary emptyOnError>
                  <Container right='small'>
                    <OperationalIssuesButton />
                  </Container>
                </WidgetErrorBoundary>
              )
            }
            rightContent={
              <WidgetErrorBoundary emptyOnError>
                <HeaderMenu />
              </WidgetErrorBoundary>
            }
          />
        </Container>
        <Page.Content
          css={[
            S.fixedPageContent({ isThreeColumnsLayout }),
            S.contentBackground
          ]}
        >
          <WidgetErrorBoundary emptyOnError>
            <SidebarMenu isThreeColumnsLayout={isThreeColumnsLayout} />
          </WidgetErrorBoundary>

          <Page.Article css={S.article}>{children}</Page.Article>

          {loading ? (
            <SummarySidebarLoader />
          ) : (
            handleRoleMetrics && (
              <WidgetErrorBoundary emptyOnError>
                <SummarySidebar availableTools={data?.viewer.availableTools} />
              </WidgetErrorBoundary>
            )
          )}
        </Page.Content>
      </Page>
      <BottomContent />
    </>
  )
}

export default Chrome
