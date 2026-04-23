import { QueryParamsOptions } from '@staff-portal/query-params-state'

import { CommentQueryParam } from './utils/query-params'

export const PERFORMED_ACTIONS_BASE_TITLE = 'Full History'

export const PERFORMED_ACTIONS_ITEMS_LIMIT = 20

export const PERFORMED_ACTIONS_POLL_INTERVAL = 20000

export const PERFORMED_ACTIONS_QUERY_PARAMS_CONFIG: QueryParamsOptions = {
  comments: CommentQueryParam
}
