import {
  JobCreationOrigin,
  BillCycle,
  JobWorkType
} from '@staff-portal/graphql/staff'

import { JobCreateFormValues } from '../../../types'
import {
  JobCreateClientFragment,
  JobCreateOpportunityFragment
} from '../../JobCreatePageContent/data/get-job-create-data'

interface Props {
  client: JobCreateClientFragment
  opportunity?: JobCreateOpportunityFragment | null
}

export const getInitialValues = ({
  client,
  opportunity
}: Props): Partial<JobCreateFormValues> => ({
  clientId: client.id,
  opportunityId: opportunity?.id,
  workType: opportunity?.jobType || JobWorkType.REMOTE,
  jobOrigin: JobCreationOrigin.PLATFORM,
  startDate: opportunity?.estimatedStartWorkDate ?? undefined,
  estimatedEndDate: opportunity?.estimatedEndWorkDate ?? undefined,
  companyRepresentativeIds: client.jobContactsEnabled
    ? opportunity?.buyer
      ? [{ value: opportunity.buyer.id, text: opportunity.buyer.fullName }]
      : []
    : undefined,
  skillSets: [],
  talentCount: '1',
  semiMonthlyBilling: [BillCycle.MONTHLY, BillCycle.SEMI_MONTHLY].includes(
    client.billingDefaults?.billCycle as BillCycle
  )
    ? 'YES'
    : 'NO',
  hasPreferredHours: 'NO',
  languageIds: [{ value: 'VjEtTGFuZ3VhZ2UtMQ', text: 'English' }],
  timeZoneName: client.timeZone?.value
})
