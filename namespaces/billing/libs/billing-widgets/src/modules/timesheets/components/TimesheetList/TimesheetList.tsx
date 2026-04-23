import React, {
  FC,
  SyntheticEvent,
  memo,
  useCallback,
  useEffect,
  useState
} from 'react'
import {
  Section,
  SectionProps,
  Button,
  Container,
  Table
} from '@toptal/picasso'
import { useTranslation } from 'react-i18next'
import { ChevronMinor16 } from '@toptal/picasso/Icon'
import {
  NumberParam,
  useQueryParams
} from '@staff-portal/billing/src/_lib/customHooks/useQueryParams'
import {
  ApolloContextEvents,
  HandleInboundEvent,
  HandleInboundEventUnsubscribe,
  Refetch
} from '@staff-portal/billing/src/@types/types'
import { useExternalIntegratorContext } from '@staff-portal/billing/src/_lib/context/externalIntegratorContext'
import { useTimesheetModals } from '@staff-portal/billing/src/_lib/customHooks/useModalsTimesheet'
import { useRefetch } from '@staff-portal/billing/src/_lib/helpers/apollo/useRefetch'

import { BillingCycleItemFragment } from '../../../__fragments__/billingCycleItemFragment.graphql.types'
import TimesheetListItem from '../TimesheetListItem'
import * as S from './styles'
import { useButtonNavigation } from './useButtonNavigation'

interface Props {
  limitElements?: number
  refetch: Refetch
  timesheets: BillingCycleItemFragment[]
  variant?: 'normal' | 'extraHours'
  sectionVariant?: SectionProps['variant']
}

const displayName = 'TimesheetList'

interface HandleUseEffectFn {
  handleInboundEvent: HandleInboundEvent
  handleInboundEventUnsubscribe: HandleInboundEventUnsubscribe
  refetch: Refetch
  isTimesheetExtendedStoredUrl: boolean
  setExpandedState: (state: boolean) => void
}

const handleUseEffectFn =
  ({
    handleInboundEvent,
    handleInboundEventUnsubscribe,
    refetch,
    isTimesheetExtendedStoredUrl,
    setExpandedState
  }: HandleUseEffectFn) =>
  () => {
    handleInboundEvent('refetch_query:billingCyclesWithTimesheets', {
      refetchQuery: refetch
    })

    if (isTimesheetExtendedStoredUrl) {
      setExpandedState(true)
    }

    return () =>
      handleInboundEventUnsubscribe('refetch_query:billingCyclesWithTimesheets')
  }

interface HandleUseEffectRestoreExpandedState {
  expanded: boolean
  setExpandedState: (value: boolean) => void
}

const handleUseEffectRestoreExpandedState =
  ({ expanded, setExpandedState }: HandleUseEffectRestoreExpandedState) =>
  () => {
    if (expanded) {
      setExpandedState(true)
    }
  }

export const TimesheetList: FC<Props> = memo(
  ({
    timesheets,
    variant: propVariant = 'normal',
    limitElements,
    refetch,
    sectionVariant = 'default'
  }) => {
    const [expanded, setExpandedState] = useState(false)
    const { t: translate } = useTranslation('timesheet')
    const [query, setQuery] = useQueryParams({
      timesheetListExpanded: NumberParam
    })

    const { handleOnShowEdit, handleOnShowView, handleOnUnsubmit } =
      useTimesheetModals()

    const isShowMoreVisible =
      !!limitElements && limitElements < timesheets.length && !expanded
    const { handleInboundEvent, handleInboundEventUnsubscribe } =
      useExternalIntegratorContext()

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(
      handleUseEffectFn({
        handleInboundEvent,
        handleInboundEventUnsubscribe,
        isTimesheetExtendedStoredUrl: !!query.timesheetListExpanded,
        refetch,
        setExpandedState
      }),
      []
    )

    const handleOnUnSubmit = useCallback(
      ({ currentTarget }: SyntheticEvent<HTMLButtonElement>) =>
        handleOnUnsubmit(currentTarget.value),
      [handleOnUnsubmit]
    )
    const handleOnView = useCallback(
      ({ target }: SyntheticEvent<HTMLAnchorElement>) =>
        handleOnShowView((target as any).dataset.id, propVariant),
      [handleOnShowView, propVariant]
    )
    const handleOnEdit = useCallback(
      ({ currentTarget }: SyntheticEvent<HTMLButtonElement>) =>
        handleOnShowEdit(currentTarget.value, propVariant),
      [handleOnShowEdit, propVariant]
    )

    useRefetch(
      [
        ApolloContextEvents.timesheetUpdate,
        ApolloContextEvents.timesheetSubmit,
        ApolloContextEvents.timesheetUnsubmit
      ],
      refetch
    )

    useButtonNavigation({ timesheets, propVariant })

    if (!timesheets.length) {
      return null
    }

    return (
      <Section
        title={translate(`TimesheetList.title.${propVariant}` as const)}
        variant={sectionVariant}
      >
        <div data-testid={displayName}>
          <Table>
            <Table.Body>
              {timesheets.map((timesheet, index: number) => {
                if (!!limitElements && index >= limitElements && !expanded) {
                  return null
                }

                return (
                  <TimesheetListItem
                    data-testid='list-item'
                    handleOnEdit={handleOnEdit}
                    handleOnUnSubmit={handleOnUnSubmit}
                    handleOnView={handleOnView}
                    key={timesheet.id}
                    timesheet={timesheet}
                  />
                )
              })}
            </Table.Body>
          </Table>

          {isShowMoreVisible && (
            <Container css={S.footer}>
              <Button
                data-testid='button-showmore'
                icon={<ChevronMinor16 css={S.icon} />}
                iconPosition='right'
                onClick={() => {
                  setQuery({ timesheetListExpanded: !expanded ? 1 : 0 })
                  setExpandedState(!expanded)
                }}
                size='small'
                variant='secondary'
              >
                {translate('TimesheetList.showMore')}
              </Button>
            </Container>
          )}
        </div>
      </Section>
    )
  }
)

TimesheetList.displayName = displayName

// eslint-disable-next-line
// @ts-ignore
TimesheetList.effectFn = handleUseEffectFn

// eslint-disable-next-line
// @ts-ignore
TimesheetList.effectFnRestoreExpanded = handleUseEffectRestoreExpandedState

export default TimesheetList
