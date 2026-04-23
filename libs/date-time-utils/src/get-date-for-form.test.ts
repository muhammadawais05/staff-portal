import { getDateForForm } from './get-date-for-form'

describe('#getFormInitialValues', () => {
  it('returns undefined if values are empty', () => {
    expect(getDateForForm(undefined)).toBeUndefined()
    expect(getDateForForm(null)).toBeUndefined()
  })

  it('returns date object', () => {
    expect(getDateForForm('2021-11-11')).toEqual(new Date('2021-11-11'))
  })
})
