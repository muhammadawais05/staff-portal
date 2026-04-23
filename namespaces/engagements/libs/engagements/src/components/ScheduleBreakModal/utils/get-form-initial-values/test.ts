import { getFormInitialValues } from './get-form-initial-values'

describe('#getFormInitialValues', () => {
  it('returns undefined if values are empty', () => {
    expect(getFormInitialValues(undefined)).toBeUndefined()
  })

  it('returns all not empty form values', () => {
    expect(
      getFormInitialValues({
        startDate: '2021-11-05T00:00:00+00:00',
        endDate: '2021-11-05T00:00:00+00:00',
        messageToClient: 'Hello dear client'
      })
    ).toStrictEqual({
      startDate: '2021-11-05T00:00:00+00:00',
      endDate: '2021-11-05T00:00:00+00:00',
      messageToClient: 'Hello dear client'
    })
  })
})
