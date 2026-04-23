import { parseLabelHighlightAsHtml } from './index'

describe('parseLabelHighlightAsHtml', () => {
  it('has to replace {{ and }} with < and >', async () => {
    expect(parseLabelHighlightAsHtml('{{strong}}Jo{{/strong}}nathan')).toBe(
      '<strong>Jo</strong>nathan'
    )
  })
})
