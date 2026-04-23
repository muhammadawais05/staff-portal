import { Client } from '@staff-portal/graphql/staff'

import { getCompanyApplicantMock } from '~integration/mocks/fragments'

export const getCompanyApplicantsListResponse = (client?: Partial<Client>) => ({
  data: {
    clientApplicants: {
      nodes: [getCompanyApplicantMock(client)],
      claimingDurationKpiChartDataUrl:
        'https://kipper-staging.toptal.net/api/v1/chart.json?kpi=company_claiming_duration&role_id=null&rule_id=&team_id=',
      totalCount: 1,
      __typename: 'ClientApplicantConnection'
    }
  }
})
