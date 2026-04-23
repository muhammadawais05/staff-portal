import { ContactType } from '@staff-portal/graphql/staff'

import getDefaultContact from './get-default-contact'

const defaultContact = {
  external: false,
  category: null,
  id: '100',
  note: null,
  primary: false,
  type: ContactType.PHONE,
  value: '+12345678901'
}

describe('getDefaultContact()', () => {
  it('should return primary phone number contact as the top priority', async () => {
    const PRIMARY_PHONE_NUMBER = '+12345678902'
    const CONTACTS = [
      {
        ...defaultContact,
        primary: true,
        value: PRIMARY_PHONE_NUMBER
      },
      {
        ...defaultContact,
        value: '+12345678903'
      },
      {
        ...defaultContact,
        value: 'test-skype',
        type: ContactType.SKYPE
      }
    ]

    expect(getDefaultContact(CONTACTS).value).toEqual(PRIMARY_PHONE_NUMBER)
  })

  it('should return phone number contact if there is no primary phone one', async () => {
    const NON_PRIMARY_PHONE_NUMBER = '+12345678903'
    const CONTACTS = [
      {
        ...defaultContact,
        value: NON_PRIMARY_PHONE_NUMBER
      },
      {
        ...defaultContact,
        value: '+12345678903'
      },
      {
        ...defaultContact,
        value: 'test-skype',
        type: ContactType.SKYPE
      }
    ]

    expect(getDefaultContact(CONTACTS).value).toEqual(NON_PRIMARY_PHONE_NUMBER)
  })

  it('should return skype contact if there are no phone ones', async () => {
    const SKYPE_NAME = 'test-skype-123'
    const CONTACTS = [
      {
        ...defaultContact,
        value: SKYPE_NAME,
        type: ContactType.SKYPE
      },
      {
        ...defaultContact,
        value: 'test-skype',
        type: ContactType.SKYPE
      }
    ]

    expect(getDefaultContact(CONTACTS).value).toEqual(SKYPE_NAME)
  })

  it('should throw an error if there are no phone or skype contacts', async () => {
    const CONTACTS = [
      {
        ...defaultContact,
        value: 'test@example.com',
        type: ContactType.EMAIL
      },
      {
        ...defaultContact,
        value: 'community-slack',
        type: ContactType.COMMUNITY_SLACK
      }
    ]

    expect(() => getDefaultContact(CONTACTS)).toThrow(
      `Unable to get client's phone number or Skype`
    )
  })
})
