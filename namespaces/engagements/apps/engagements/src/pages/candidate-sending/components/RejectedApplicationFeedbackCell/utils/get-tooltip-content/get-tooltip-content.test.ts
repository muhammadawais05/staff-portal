import getTooltipContent from './get-tooltip-content'

describe('getTooltipContent', () => {
  it.each([
    {
      props: {
        key: 'id',
        tooltips: [{ key: 'id', value: 'some content' }]
      },
      value: 'some content'
    },
    {
      props: {
        key: 'other-id',
        tooltips: [{ key: 'id', value: 'some content' }]
      },
      value: undefined
    },
    {
      props: {
        key: 'id',
        tooltips: [
          { key: 'id', value: 'some content' },
          { key: 'otherid', value: 'other content' }
        ]
      },
      value: 'some content'
    }
  ])('returns tooltip content', ({ props, value }) => {
    expect(getTooltipContent(props)).toBe(value)
  })
})
