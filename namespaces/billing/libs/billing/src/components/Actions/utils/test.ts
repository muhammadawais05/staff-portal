import { getHref, GetHref } from '.'

describe.each([
  [
    {
      option: 'recordBadDebt',
      downloadHtmlUrl: 'example.com/downloadHtmlUrl',
      downloadPdfUrl: 'example.com/downloadPdfUrl',
      webResource: { url: 'example.com/webResource' }
    },
    undefined
  ],
  [
    {
      option: 'downloadHtmlUrl',
      downloadHtmlUrl: 'example.com/downloadHtmlUrl',
      downloadPdfUrl: 'example.com/downloadPdfUrl',
      webResource: { url: 'example.com/webResource' }
    },
    'example.com/downloadHtmlUrl'
  ],
  [
    {
      option: 'downloadPdfUrl',
      downloadHtmlUrl: 'example.com/downloadHtmlUrl',
      downloadPdfUrl: 'example.com/downloadPdfUrl',
      webResource: { url: 'example.com/webResource' }
    },
    'example.com/downloadPdfUrl'
  ],
  [
    {
      option: 'details',
      downloadHtmlUrl: 'example.com/downloadHtmlUrl',
      downloadPdfUrl: 'example.com/downloadPdfUrl',
      webResource: { url: 'example.com/webResource' }
    },
    'example.com/webResource'
  ]
])('#getHref', (args: GetHref, match: string | undefined) => {
  describe(`when '${JSON.stringify(args)}'`, () => {
    it(`returns ${JSON.stringify(match)}`, () => {
      expect(getHref(args)).toBe(match)
    })
  })
})
