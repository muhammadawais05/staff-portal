import { getStatus } from '.'

describe('#getStatus', () => {
  describe('when a cd is deleted', () => {
    it('marks the status as `Deleted`', () => {
      const { status: actual } = getStatus({ deleted: true })
      const expected = 'Deleted'

      expect(actual).toEqual(expected)
    })
  })
  describe('when a cd has working engagements', () => {
    it('marks the status as `Active`', () => {
      const { status: actual } = getStatus({
        deleted: false,
        engagements: { nodes: [{ isWorking: true }] }
      })
      const expected = 'Active'

      expect(actual).toEqual(expected)
    })
  })

  describe('when a cd has no working engagements', () => {
    it('marks the status as `Expired`', () => {
      const { status: actual } = getStatus({
        deleted: false,
        engagements: { nodes: [{ isWorking: false }] }
      })
      const expected = 'Expired'

      expect(actual).toEqual(expected)
    })
  })
})
