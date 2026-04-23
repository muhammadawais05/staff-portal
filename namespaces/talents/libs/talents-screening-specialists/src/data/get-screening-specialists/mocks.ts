import { encodeEntityId } from '@staff-portal/data-layer-service'

import { ScreeningSpecialistFragment } from '../screening-specialist-fragment.staff.gql.types'

export const createScreeningSpecialistsMock = (names: string[]) =>
  names.map(
    (name, index) =>
      ({
        id: encodeEntityId(index.toString(), 'Staff'),
        fullName: name,
        webResource: {
          url: 'some-url',
          __typename: 'WebResource'
        }
      } as ScreeningSpecialistFragment)
  )
