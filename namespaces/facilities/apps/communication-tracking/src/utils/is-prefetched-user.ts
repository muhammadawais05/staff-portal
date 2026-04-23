import { FiltersUser, PrefetchedUser } from '../types'

const isPrefetchedUser = (user: FiltersUser): user is PrefetchedUser =>
  'userLegacyId' in user

export default isPrefetchedUser
