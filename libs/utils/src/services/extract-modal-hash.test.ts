import { extractModalHash } from './extract-modal-hash'

describe('extractModalHash', () => {
  it.each([null, ''])('return null for %p', hash => {
    expect(extractModalHash(hash)).toBeNull()
  })

  it('extracts modal hash correctly', () => {
    const cases = [
      {
        hash: '#modal=/platform/claim_enterprise',
        expected: '#modal=/platform/claim_enterprise'
      },
      {
        hash: '#modal=/platform/claim_enterprise?enableAllPaths',
        expected: '#modal=/platform/claim_enterprise?enableAllPaths'
      },
      {
        hash: '#profile#modal=/platform/claim_enterprise',
        expected: '#modal=/platform/claim_enterprise'
      },
      {
        hash: '#profile#modal=/platform/claim_enterprise?enableAllPaths',
        expected: '#modal=/platform/claim_enterprise?enableAllPaths'
      },
      {
        hash: '#profile#modal=/platform/claim_enterprise?nodeId=123',
        expected: '#modal=/platform/claim_enterprise?nodeId=123'
      }
    ]

    cases.forEach(({ hash, expected }) => {
      expect(extractModalHash(hash)).toBe(expected)
    })
  })
})
