import { TalentOrderField } from '@staff-portal/graphql/staff'

export const DEFAULT_HOURLY_RATE_MIN = 0
export const DEFAULT_HOURLY_RATE_MAX = 200
export const DEFAULT_DISTANCE = 100
export const DEFAULT_PAGE_SIZE = 20
export const PAGE_SIZES = [10, 15, 20, 25]
export const LOCAL_STORAGE_PAGE_SIZE_KEY = 'talent_list_page_limit'
export const DEFAULT_SORT = TalentOrderField.ACTIVATED_AT
export const TALENT_LIST_ITEMS_ABORT_KEY = 'TALENT_LIST_ITEMS_ABORT_KEY'
