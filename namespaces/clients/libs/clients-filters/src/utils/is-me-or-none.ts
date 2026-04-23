import { ME_NONE_SET } from '../config'

export const isMeOrNone = (id = '') => Object.keys(ME_NONE_SET).includes(id)
