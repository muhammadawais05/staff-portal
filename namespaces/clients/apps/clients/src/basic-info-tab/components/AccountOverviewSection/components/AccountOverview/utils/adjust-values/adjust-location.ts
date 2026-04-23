import {
  LocationInput,
  UpdateProfileClientInput
} from '@staff-portal/graphql/staff'
import { ValuesToAdjust } from '@staff-portal/editable'

type Key = keyof Pick<UpdateProfileClientInput, 'location'>

export const adjustLocation = ({
  location
}: ValuesToAdjust<UpdateProfileClientInput, 'location', LocationInput>): {
  [key in Key]: UpdateProfileClientInput['location']
} => {
  const { city, countryId } = location || {}

  return {
    location: {
      city: city ?? '',
      countryId
    }
  }
}
