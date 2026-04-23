import getMonthRange from './get-month-range'

describe('#getMonthRange', () => {
  beforeEach(() => {
    jest.useFakeTimers('modern')
    jest.setSystemTime(new Date('2022-02-02T00:00:00.000Z'))
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('has exact start and end dates of the month', () => {
    const currentDate = new Date()
    const {
      from,
      till
    } = getMonthRange(currentDate)

    expect(from).toBe('2022-02-01')
    expect(till).toBe('2022-02-28')
  })
})
