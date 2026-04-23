import {
  GetInvestigationsQuery,
  InvestigationNodeFragment
} from './data/get-investigations.staff.gql.types'

type GetInvestigation = Exclude<
  GetInvestigationsQuery['node'],
  undefined | null
>

export type Investigation = InvestigationNodeFragment

export type Operations = GetInvestigation['operations']

export type Job = Investigation['jobs']['nodes'][0]
