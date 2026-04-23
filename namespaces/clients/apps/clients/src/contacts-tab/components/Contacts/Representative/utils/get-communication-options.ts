import { mapCommOptsToNames } from '@staff-portal/client-representatives'
import {
  CompanyRepresentativeCommunicationOption,
  Maybe
} from '@staff-portal/graphql/staff'

export const getCommunicationOptions = (
  communications: Maybe<CompanyRepresentativeCommunicationOption[]> | undefined
) =>
  communications?.length
    ? communications.map(mapCommOptsToNames).join(', ')
    : null
