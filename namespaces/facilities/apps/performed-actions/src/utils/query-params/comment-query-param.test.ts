import { CommentQueryParam } from './comment-query-param'

describe('CommentQueryParam', () => {
  describe('Decode', () => {
    it.each([
      { value: 'true', expectedValue: true },
      { value: 'false', expectedValue: false },
      { value: undefined, expectedValue: false }
    ])('correctly decodes the value', ({ value, expectedValue }) => {
      expect(CommentQueryParam.decode(value)).toBe(expectedValue)
    })
  })

  describe('Encode', () => {
    it.each([
      { value: true, expectedValue: 'true' },
      { value: false, expectedValue: undefined }
    ])('correctly encodes the value', ({ value, expectedValue }) => {
      expect(CommentQueryParam.encode(value)).toBe(expectedValue)
    })
  })
})
