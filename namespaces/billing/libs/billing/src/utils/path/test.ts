import {
  getPaymentsPath,
  getMyPaymentsPath,
  getMemorandumsWithEngagement
} from '.'

describe('Core Path helpers', () => {
  describe('#getPaymentsPath', () => {
    it('returns payments path', () => {
      expect(getPaymentsPath()).toBe('/payments')
    })
  })

  describe('#getMyPaymentsPath', () => {
    it('returns my payments path', () => {
      expect(getMyPaymentsPath()).toBe('/my_payments')
    })
  })

  describe('#getMemorandumsWithEngagement', () => {
    it('returns payments path', () => {
      expect(getMemorandumsWithEngagement(171608)).toBe(
        '/platform/staff/memos?engagement_id=171608'
      )
    })
  })
})
