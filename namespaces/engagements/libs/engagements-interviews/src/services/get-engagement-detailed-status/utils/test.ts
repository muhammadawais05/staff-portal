import { joinTimes } from '.'

describe('Engagement detailed status utils', () => {
  describe('joinTimes', () => {
    it('prepare, uniq and join times', () => {
      expect(
        joinTimes([
          '2021-10-18T09:00:00-04:00',
          '2021-10-18T09:00:00-05:00',
          '2021-10-19T09:00:00-01:00',
          '2021-10-20T09:00:00-20:00'
        ])
      ).toBe('Oct 18, 2021 and Oct 19, 2021 and Oct 20, 2021')
    })
  })
})
