import MockDate from 'mockdate'

import isFutureZonedTime from './is-future-zoned-time'

describe('isFutureZonedTime', () => {
  describe('when timezone is America/New_York (UTC-04:00) and', () => {
    describe('when current date is 5 minutes before `date`', () => {
      it('return true', () => {
        MockDate.set('2021-06-22T03:55:00')

        expect(
          isFutureZonedTime({
            date: '2021-06-22',
            timeZone: 'America/New_York'
          })
        ).toBe(true)
      })
    })

    describe('when current date is 10 minutes after `date`', () => {
      it('return false', () => {
        MockDate.set('2021-06-22T04:10:00')

        expect(
          isFutureZonedTime({
            date: '2021-06-22',
            timeZone: 'America/New_York'
          })
        ).toBe(false)
      })
    })

    describe('when current date is equal `date`', () => {
      it('return false', () => {
        MockDate.set('2021-06-22T04:00:00')

        expect(
          isFutureZonedTime({
            date: '2021-06-22',
            timeZone: 'America/New_York'
          })
        ).toBe(false)
      })
    })
  })

  describe('when timezone is Europe/Lisbon (UTC+01:00) and', () => {
    describe('when current date is 5 minutes before `date`', () => {
      it('return true', () => {
        MockDate.set('2021-06-21T22:55:00')

        expect(
          isFutureZonedTime({
            date: '2021-06-22',
            timeZone: 'Europe/Lisbon'
          })
        ).toBe(true)
      })
    })

    describe('when current date is 10 minutes after `date`', () => {
      it('return false', () => {
        MockDate.set('2021-06-21T23:10:00')

        expect(
          isFutureZonedTime({
            date: '2021-06-22',
            timeZone: 'Europe/Lisbon'
          })
        ).toBe(false)
      })
    })
  })
})
