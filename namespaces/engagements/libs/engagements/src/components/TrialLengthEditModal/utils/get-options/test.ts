import { isFutureZonedTime } from '@staff-portal/date-time-utils'

import { getOptions, Props as GetOptionsProps } from '.'

jest.mock('@staff-portal/date-time-utils')

const isFutureZonedTimeMock = isFutureZonedTime as jest.Mock

describe('getOptions', () => {
  describe('when isFutureZonedTimeMock is `true` and', () => {
    it('return with `No trial` option', () => {
      isFutureZonedTimeMock.mockReturnValue(true)

      expect(getOptions({ maxEngagementTrialLength: 3 })).toStrictEqual([
        { text: '3 business days', value: 3 },
        { text: '2 business days', value: 2 },
        { text: '1 business day', value: 1 },
        { text: 'No trial', value: 0 }
      ])
    })
  })

  describe('when isFutureZonedTimeMock is `false` and', () => {
    describe('when `startDate` or `timeZone` is `undefined`', () => {
      it('return with `No trial` option', () => {
        isFutureZonedTimeMock.mockReturnValue(false)
        const optionsArray: GetOptionsProps[] = [
          { maxEngagementTrialLength: 3 },
          { maxEngagementTrialLength: 3, startDate: '2020-06-06' },
          { maxEngagementTrialLength: 3, timeZone: 'America/New_York' }
        ]

        optionsArray.forEach(options => {
          expect(getOptions(options)).toStrictEqual([
            { text: '3 business days', value: 3 },
            { text: '2 business days', value: 2 },
            { text: '1 business day', value: 1 },
            { text: 'No trial', value: 0 }
          ])
        })
      })
    })

    describe('when `startDate` and `timeZone` is defined', () => {
      it('return without `No trial` option', () => {
        isFutureZonedTimeMock.mockReturnValue(false)

        expect(
          getOptions({
            maxEngagementTrialLength: 3,
            startDate: '2020-06-06',
            timeZone: 'America/New_York'
          })
        ).toStrictEqual([
          { text: '3 business days', value: 3 },
          { text: '2 business days', value: 2 },
          { text: '1 business day', value: 1 }
        ])
      })
    })
  })
})
