import { ReviewCallBookingObjectFragment } from '../../data/email-messaging-fragment/email-messaging-fragment.staff.gql.types'

export const getBookingObject = (
  defaultBookingObject?: ReviewCallBookingObjectFragment | null
) => {
  if (!defaultBookingObject) {
    return
  }

  if ('slug' in defaultBookingObject) {
    return {
      id: defaultBookingObject.id,
      name: defaultBookingObject.slug
    }
  }

  return defaultBookingObject
}
