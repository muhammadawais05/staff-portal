import { Container, Typography } from '@toptal/picasso'
import { useTranslation } from 'react-i18next'
import React, { FC, memo } from 'react'
import ModalSection from '@staff-portal/billing/src/components/ModalSection'
import MultilineComment from '@staff-portal/billing/src/components/MultilineComment'

import { BillingCycleItemFragment } from '../../../../../__fragments__/billingCycleItemFragment.graphql.types'

const displayName = 'TimesheetRejectionComment'

interface Props {
  timesheet: BillingCycleItemFragment
}

const TimesheetRejectionComment: FC<Props> = memo(
  ({ timesheet: { timesheetRejectionComment } }) => {
    const { t: translate } = useTranslation('timesheet')

    if (!timesheetRejectionComment) {
      return null
    }

    return (
      <Container bottom={2}>
        <ModalSection
          title={translate('TimesheetContent.timesheetRejectionComment.title')}
          titleColor='red'
        >
          <Typography data-testid='timesheetRejectionComment'>
            <MultilineComment>{timesheetRejectionComment}</MultilineComment>
          </Typography>
        </ModalSection>
      </Container>
    )
  }
)

TimesheetRejectionComment.defaultProps = {}

TimesheetRejectionComment.displayName = displayName

export default TimesheetRejectionComment
