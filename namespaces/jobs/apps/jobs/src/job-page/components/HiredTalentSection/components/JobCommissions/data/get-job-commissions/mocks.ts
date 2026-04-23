import {
  ClientCommissionFragment,
  TalentCommissionFragment,
  TalentPartnerCommissionFragment,
  EngagementCommissionFragment,
  JobCommissionsQuery
} from './get-job-commissions.staff.gql.types'

export const createEngagementCommissionFragment = ({
  engagementCommission
}: {
  engagementCommission?: Partial<EngagementCommissionFragment>
} = {}): EngagementCommissionFragment => ({
  name: 'some-name',
  value: 'some-value',
  subject: {
    id: 'some-id',
    webResource: { text: 'some text', url: 'https://some.url' }
  },
  ...engagementCommission
})

export const createTalentPartnerCommissionFragment = ({
  talentPartner
}: {
  talentPartner?: Partial<TalentPartnerCommissionFragment>
} = {}): TalentPartnerCommissionFragment => ({
  id: 'test-id',
  ...talentPartner
})

export const createTalentCommissionFragment = ({
  talent
}: {
  talent?: Partial<TalentCommissionFragment>
} = {}): TalentCommissionFragment => ({
  id: 'test-id',
  ...talent
})

export const createClientCommissionFragment = ({
  client
}: {
  client?: Partial<ClientCommissionFragment>
} = {}): ClientCommissionFragment => ({
  id: 'test-id',
  ...client
})

export const createJobCommissionsQueryMock = ({
  jobCommissions,
  clientCommissionFragment,
  canViewJobCommissions = true
}: {
  jobCommissions?: Partial<JobCommissionsQuery>
  clientCommissionFragment?: Partial<ClientCommissionFragment>
  canViewJobCommissions?: boolean
} = {}): JobCommissionsQuery => ({
  viewer: {
    permits: {
      canViewJobCommissions: canViewJobCommissions
    }
  },
  node: {
    id: 'test-id',
    client: {
      ...createClientCommissionFragment({ client: clientCommissionFragment })
    }
  },
  ...jobCommissions
})
