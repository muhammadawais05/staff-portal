import { ContactType } from '@staff-portal/graphql/staff'

import { findContact } from './find-contact'

const EMAIL = 'test@toptal.com'
const PHONE = '123456'
const SECOND_PHONE = '654321'

type CompanyContactType = {
  id: string
  type: ContactType
  value: string
  primary: false
}

const getContacts = (contactTypes: CompanyContactType[]) => ({
  nodes: contactTypes
})

describe('findContact', () => {
  it('should handle empty list', () => {
    const result = findContact({ nodes: [] }, ContactType.PHONE)

    expect(result).toBeUndefined()
  })

  it('should handle missing item', () => {
    const contacts = getContacts([
      { id: '1', type: ContactType.EMAIL, value: EMAIL, primary: false }
    ])
    const result = findContact(contacts, ContactType.PHONE)

    expect(result).toBeUndefined()
  })

  it('should return phone', () => {
    const contacts = getContacts([
      { id: '1', type: ContactType.PHONE, value: PHONE, primary: false }
    ])
    const result = findContact(contacts, ContactType.PHONE)

    expect(result?.value).toBe(PHONE)
  })

  it('should return phone when the list contains multiple item types', () => {
    const contacts = getContacts([
      { id: '1', type: ContactType.PHONE, value: PHONE, primary: false },
      { id: '2', type: ContactType.EMAIL, value: EMAIL, primary: false }
    ])
    const result = findContact(contacts, ContactType.PHONE)

    expect(result?.value).toBe(PHONE)
  })

  it('should return first phone when the list contains duplicates', () => {
    const contacts = getContacts([
      { id: '1', type: ContactType.PHONE, value: PHONE, primary: false },
      { id: '2', type: ContactType.PHONE, value: SECOND_PHONE, primary: false }
    ])
    const result = findContact(contacts, ContactType.PHONE)

    expect(result?.value).toBe(PHONE)
  })
})
