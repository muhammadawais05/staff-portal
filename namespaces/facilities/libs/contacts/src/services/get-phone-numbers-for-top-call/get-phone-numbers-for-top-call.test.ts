import { ContactType } from '@staff-portal/graphql/staff'

import { createContactForTopCallFragmentMock } from '../../data/contact-for-top-call-fragment/mocks'
import { getPhoneNumbersForTopCall } from './get-phone-numbers-for-top-call'

describe('getPhoneNumbersForTopCall', () => {
  it('returns empty array in case of empty data', () => {
    expect(getPhoneNumbersForTopCall()).toEqual([])
  })

  it('returns an array of unique phone numbers', () => {
    const arr = [
      createContactForTopCallFragmentMock({
        type: ContactType.PHONE,
        value: '1'
      }),
      createContactForTopCallFragmentMock({
        type: ContactType.PHONE,
        value: '2'
      }),
      createContactForTopCallFragmentMock({
        type: ContactType.PHONE,
        value: '2'
      }),
      createContactForTopCallFragmentMock({
        type: ContactType.EMAIL,
        value: '4'
      })
    ]

    expect(getPhoneNumbersForTopCall(arr)).toEqual(['1', '2'])
  })
})
