import { Settings } from 'luxon'
import MockDate from 'mockdate'

import { getCurrentDay, getMinimumDate, getMinimumInvoiceDateRange } from '.'

const buildDate = (date: string) =>
  new Date(
    Number(date.split('-')[0]),
    Number(date.split('-')[1]) - 1,
    Number(date.split('-')[2])
  )

describe('#getCurrentDay', () => {
  afterAll(MockDate.reset)

  it.each`
    setDate                             | expected                   | message
    ${() => MockDate.set('2021-01-01')} | ${buildDate('2021-01-01')} | ${'Returns 1st Jan when 1st Jan'}
    ${() => MockDate.set('2022-02-11')} | ${buildDate('2022-02-11')} | ${'Returns 11 Feb when 11 Feb'}
    ${() => MockDate.set('2020-07-31')} | ${buildDate('2020-07-31')} | ${'Returns 31 Jul when 31 Jul'}
    ${() => MockDate.set('2011-06-30')} | ${buildDate('2011-06-30')} | ${'Returns 30 Jun when 30 Jun'}
  `(`$message`, ({ expected, setDate }) => {
    setDate()

    expect(getCurrentDay()).toEqual(expected)
  })
})

describe('#getMinimumDate', () => {
  afterAll(MockDate.reset)

  it.each`
    setDate                             | expected                   | message
    ${() => MockDate.set('2021-01-01')} | ${buildDate('2020-12-01')} | ${'Returns Dec when Fri 1st Jan'}
    ${() => MockDate.set('2021-01-02')} | ${buildDate('2020-12-01')} | ${'Returns Dec when Sat 2nd Jan'}
    ${() => MockDate.set('2021-01-03')} | ${buildDate('2020-12-01')} | ${'Returns Dec when Sun 3rd Jan'}
    ${() => MockDate.set('2021-01-04')} | ${buildDate('2020-12-01')} | ${'Returns Dec when Mon 4th Jan'}
    ${() => MockDate.set('2021-01-05')} | ${buildDate('2021-01-01')} | ${'Returns Jan when Tue 5th Jan'}
    ${() => MockDate.set('2021-05-01')} | ${buildDate('2021-04-01')} | ${'Returns Apr when Sat 1st May'}
    ${() => MockDate.set('2021-05-02')} | ${buildDate('2021-04-01')} | ${'Returns Apr when Sun 2st May'}
    ${() => MockDate.set('2021-05-03')} | ${buildDate('2021-04-01')} | ${'Returns Apr when Mon 3st May'}
    ${() => MockDate.set('2021-05-04')} | ${buildDate('2021-04-01')} | ${'Returns Apr when Tue 4st May'}
    ${() => MockDate.set('2021-05-05')} | ${buildDate('2021-05-01')} | ${'Returns May when Wed 5st May'}
    ${() => MockDate.set('2021-08-01')} | ${buildDate('2021-07-01')} | ${'Returns Jul when Sun 1st Aug'}
    ${() => MockDate.set('2021-08-02')} | ${buildDate('2021-07-01')} | ${'Returns Jul when Mon 2nd Aug'}
    ${() => MockDate.set('2021-08-03')} | ${buildDate('2021-07-01')} | ${'Returns Jul when Tue 3rd Aug'}
    ${() => MockDate.set('2021-08-04')} | ${buildDate('2021-08-01')} | ${'Returns Aug when Wed 4rd Aug'}
    ${() => MockDate.set('2022-02-04')} | ${buildDate('2022-02-01')} | ${'Returns Feb when Fri 4th Feb'}
  `(`$message`, ({ expected, setDate }) => {
    setDate()

    expect(getMinimumDate()).toEqual(expected)
  })
})

describe.each([
  [
    'when issue date is later than minimum date',
    'Tue Feb 01 2022 21:00:00 GMT-0300 (Brasilia Standard Time)',
    'Europe/Berlin',
    '2022-02-02',
    buildDate('2022-02-02'),
    buildDate('2022-02-02')
  ],
  [
    'when issue date is yesterday and is within 2 business days',
    '2022-02-03',
    'Europe/Berlin',
    '2022-02-02',
    buildDate('2022-02-02'),
    buildDate('2022-02-03')
  ],
  [
    'when issue date is 2 days before and falls within first business days of the month',
    '2022-02-03',
    'Europe/Berlin',
    '2022-02-01',
    buildDate('2022-02-01'),
    buildDate('2022-02-03')
  ],
  [
    'when issue date is 2 days before and falls within first business days of the month',
    '2022-02-01',
    'Europe/Berlin',
    '2022-01-02',
    buildDate('2022-01-02'),
    buildDate('2022-02-01')
  ],
  [
    'when user date is yesterday from the issue date',
    'Date Mon Feb 07 2022 03:58:22 GMT-0500 (Eastern Standard Time)',
    'America/New_York',
    '2022-02-07',
    buildDate('2022-02-07'),
    buildDate('2022-02-07')
  ]
])(
  '#getMinimumInvoiceDateRange',
  (
    message,
    userDate,
    systemTimezone,
    invoiceIssueDate,
    expectedMinDate,
    expectedMaxDate
  ) => {
    it(`${message}`, () => {
      MockDate.set(userDate)
      Settings.defaultZoneName = systemTimezone

      const { maxDate, minDate } = getMinimumInvoiceDateRange(invoiceIssueDate)

      expect(minDate).toEqual(expectedMinDate)
      expect(maxDate).toEqual(expectedMaxDate)
    })
  }
)
