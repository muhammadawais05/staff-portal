import { getSubReasonLabel } from './get-sub-reason-label'

describe('getSubReasonLabel', () => {
  it('returns empty string', () => {
    expect(getSubReasonLabel('test')).toBe('')
  })

  it('returns hiring replacement label', () => {
    expect(getSubReasonLabel('hiring_replacement')).toBe(
      'How did you find a replacement?'
    )
  })

  it('returns dissatisfied label', () => {
    expect(getSubReasonLabel('dissatisfied_with_my_talent')).toBe(
      'Why were you dissatisfied?'
    )
  })
})
