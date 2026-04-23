import {
  EngagementRateMethodEnum,
  NewEngagementWizardAttributes,
  WeekDay
} from '@staff-portal/graphql/staff'
import { stripDecimalsIfInteger } from '@staff-portal/string'
import { getSortedBillCycles } from '@staff-portal/billing'

import { GetDetailsStepDataQuery } from '../../../../data/get-details-step-data'
import { getSortedBillDays } from '../../../../utils/get-bill-day-options'

const formatInitialValue = (value?: string | null) =>
  Number(value ?? 0).toFixed(2)

type Props = {
  data: GetDetailsStepDataQuery
  stepsAttributes: NewEngagementWizardAttributes
}

// eslint-disable-next-line complexity
const getInitialValues = ({
  data: { minimumCommitmentEnabled, newEngagementWizard },
  stepsAttributes
}: Props) => {
  const { job, newEngagement } = newEngagementWizard || {}
  const {
    defaultMarkup,
    partTimeDiscount,
    fullTimeDiscount,
    talentHourlyRate,
    companyHourlyRate,
    talentPartTimeRate,
    companyPartTimeRate,
    talentFullTimeRate,
    companyFullTimeRate,
    rateMethod,
    rateOverrideReason
  } = newEngagement || {}
  const billingDefaults = job?.client?.billingDefaults
  const commitmentCreateHoursExists =
    minimumCommitmentEnabled && job?.commitmentSettings

  return {
    companyNetTerms: job?.client?.netTerms,
    billCycle: billingDefaults?.billCycle ?? getSortedBillCycles()[0],
    billDay: billingDefaults?.billDay ?? (getSortedBillDays()[0] as WeekDay),
    commitmentCreateHours: commitmentCreateHoursExists
      ? job.commitmentSettings?.minimumHours
      : undefined,
    timeZoneName: stepsAttributes.hasPendingAssignment
      ? job?.timeZonePreference?.value
      : undefined,
    rateMethod: rateMethod ?? EngagementRateMethodEnum.DEFAULT,
    rateOverrideReason,
    markup: stripDecimalsIfInteger(defaultMarkup ?? 0),
    talentHourlyRate: formatInitialValue(talentHourlyRate),
    companyHourlyRate: formatInitialValue(companyHourlyRate),
    talentPartTimeRate: formatInitialValue(talentPartTimeRate),
    companyPartTimeRate: formatInitialValue(companyPartTimeRate),
    talentFullTimeRate: formatInitialValue(talentFullTimeRate),
    companyFullTimeRate: formatInitialValue(companyFullTimeRate),
    partTimeDiscount: stripDecimalsIfInteger(partTimeDiscount ?? 0),
    fullTimeDiscount: stripDecimalsIfInteger(fullTimeDiscount ?? 0)
  }
}

export default getInitialValues
