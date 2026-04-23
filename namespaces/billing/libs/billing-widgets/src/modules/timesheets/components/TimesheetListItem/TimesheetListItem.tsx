import { Link } from '@topkit/react-router'
import { Button, Container, Table, Typography } from '@toptal/picasso'
import { startCase } from 'lodash-es'
import { useTranslation } from 'react-i18next'
import React, { FC, MouseEvent, memo } from 'react'
import { formatDateMed } from '@staff-portal/billing/src/_lib/dateTime'
import { isOperationEnabled } from '@staff-portal/billing/src/_lib/helpers/operations'

import { BillingCycleItemFragment } from '../../../__fragments__/billingCycleItemFragment.graphql.types'
import TimesheetStatus from '../TimesheetStatus'
import * as S from './styles'

interface Props {
  handleOnEdit: (event: MouseEvent<HTMLButtonElement>) => void
  handleOnView: (event: MouseEvent<HTMLAnchorElement>) => void
  handleOnUnSubmit: (event: MouseEvent<HTMLButtonElement>) => void
  timesheet: BillingCycleItemFragment
}

const displayName = 'TimesheetListItem'

const TimesheetListItem: FC<Props> = memo(
  ({ timesheet, handleOnView, handleOnEdit, handleOnUnSubmit }) => {
    const {
      endDate,
      id,
      startDate,
      timesheetRecords,
      timesheetSubmitted,
      operations
    } = timesheet
    const { t: translate } = useTranslation(['common', 'timesheet'])
    const canUnsubmit =
      timesheetSubmitted &&
      isOperationEnabled({ operations, key: 'timesheetUnsubmit' })
    const canEdit = isOperationEnabled({ operations, key: 'timesheetUpdate' })

    return (
      <Table.Row key={timesheet.id}>
        <Table.Cell>
          <Container css={S.div} data-testid={displayName}>
            <Container css={S.info}>
              <Link
                css={S.infoLink}
                data-id={id}
                data-testid='item-label'
                onClick={handleOnView}
                noUnderline
              >
                <>
                  {startCase(translate('common:unit.from'))}{' '}
                  <Typography
                    forwardedAs='strong'
                    css={S.strong}
                    data-testid='start-date'
                  >
                    {formatDateMed(startDate)}
                  </Typography>{' '}
                  {translate('common:unit.till')}{' '}
                  <Typography
                    forwardedAs='strong'
                    css={S.strong}
                    data-testid='end-date'
                  >
                    {formatDateMed(endDate)}
                  </Typography>
                </>
              </Link>
              <TimesheetStatus inline timesheet={timesheet} />
            </Container>
            <Container css={S.controls}>
              {canUnsubmit && (
                <Button
                  data-testid='unsubmit-button'
                  onClick={handleOnUnSubmit}
                  size='small'
                  value={id}
                  variant='secondary'
                >
                  {translate('timesheet:TimesheetListItem.actions.unsubmit')}
                </Button>
              )}
              {canEdit && (
                <Button
                  data-testid='edit-button'
                  onClick={handleOnEdit}
                  size='small'
                  value={id}
                  variant='secondary'
                >
                  {translate(
                    `common:actions.${
                      !timesheetRecords.length ? 'create' : 'edit'
                    }` as const
                  )}
                </Button>
              )}
            </Container>
          </Container>
        </Table.Cell>
      </Table.Row>
    )
  }
)

TimesheetListItem.displayName = displayName

export default TimesheetListItem
