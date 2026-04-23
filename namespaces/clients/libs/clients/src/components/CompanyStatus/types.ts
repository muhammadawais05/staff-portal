import {
  ClientCumulativeStatus,
  Maybe,
  Investigation
} from '@staff-portal/graphql/staff'

export type CompanyStatusInput = {
  cumulativeStatus?: Maybe<ClientCumulativeStatus>
  investigations?: Maybe<{
    nodes: Pick<Investigation, 'startedAt'>[]
  }>
}
