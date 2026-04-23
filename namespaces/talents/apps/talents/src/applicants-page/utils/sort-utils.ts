import { QueryParams } from '@staff-portal/query-params-state'

export const matchRelevanceQueryConditions = (values: QueryParams) =>
  !!values.job_id
