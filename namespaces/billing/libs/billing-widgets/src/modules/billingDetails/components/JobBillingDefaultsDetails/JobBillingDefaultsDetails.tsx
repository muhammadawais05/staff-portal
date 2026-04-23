import React from 'react'
import { useTranslation } from 'react-i18next'
import { DetailedList } from '@staff-portal/ui'
import { capitalize } from 'lodash-es'
import {
  BillCycle,
  WeekDay,
  JobCommitment,
  Maybe
} from '@staff-portal/graphql/staff'
import { EMPTY_DATA } from '@staff-portal/billing/src/_lib/helpers'
import { getBillCycleOptions } from '@staff-portal/billing/src/utils/getBillCycleOptions'

type JobTemplate = {
  billCycle?: Maybe<BillCycle>
  billDay?: Maybe<WeekDay>
  commitment?: Maybe<JobCommitment>
}

const JobBillingDefaultsItems = ({
  jobTemplate
}: {
  jobTemplate?: JobTemplate | null
}) => {
  const { t: translate } = useTranslation([
    'billingDetails',
    'billingCycleTable'
  ])

  if (!jobTemplate) {
    return null
  }

  const { billCycle, billDay, commitment } = jobTemplate

  return (
    <DetailedList labelColumnWidth={12}>
      <DetailedList.Row>
        <DetailedList.Item
          label={translate(
            'billingDetails:modals.jobTemplate.fields.commitment.label'
          )}
        >
          {commitment
            ? translate(
                `billingCycleTable:CommitmentAvailability.${commitment.toLowerCase()}`
              )
            : EMPTY_DATA}
        </DetailedList.Item>
      </DetailedList.Row>
      <DetailedList.Row>
        <DetailedList.Item
          label={translate(
            'billingDetails:modals.jobTemplate.fields.billCycle.label'
          )}
        >
          {billCycle
            ? capitalize(getBillCycleOptions([billCycle])[0].text)
            : EMPTY_DATA}
        </DetailedList.Item>
      </DetailedList.Row>
      <DetailedList.Row>
        <DetailedList.Item
          label={translate(
            'billingDetails:modals.jobTemplate.fields.billDay.label'
          )}
        >
          {billDay ? capitalize(billDay.toLowerCase()) : EMPTY_DATA}
        </DetailedList.Item>
      </DetailedList.Row>
    </DetailedList>
  )
}

export default JobBillingDefaultsItems
