import { checkAttachmentFile } from './check-attachment-file'

describe('checkAttachmentFile', () => {
  describe('when attachment or file is missing', () => {
    it('returns false', () => {
      expect(checkAttachmentFile()).toBeFalsy()
      expect(checkAttachmentFile([])).toBeFalsy()
      expect(checkAttachmentFile([{ file: {} as File }])).toBeFalsy()
    })
  })

  describe('when passing a valid file', () => {
    it('returns true', () => {
      const file = new File([], 'file.txt')

      expect(checkAttachmentFile([{ file }])).toBeTruthy()
    })
  })
})
