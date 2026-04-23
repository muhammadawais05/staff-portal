import {
  getPortfolioItemGroup,
  PortfolioItemGroup
} from './getPortfolioItemGroup'

describe('getPortfolioItemGroup', () => {
  it('recognizes experience group', () => {
    expect(getPortfolioItemGroup({ kind: 'basic' })).toEqual(
      PortfolioItemGroup.EXPERIENCE
    )
    expect(getPortfolioItemGroup({ kind: 'accomplishment' })).toEqual(
      PortfolioItemGroup.EXPERIENCE
    )
    expect(getPortfolioItemGroup({ kind: 'code_base' })).toEqual(
      PortfolioItemGroup.EXPERIENCE
    )
    expect(getPortfolioItemGroup({ kind: 'other_amazing_things' })).toEqual(
      PortfolioItemGroup.EXPERIENCE
    )
  })

  it('recognizes design group', () => {
    expect(getPortfolioItemGroup({ kind: 'classic' })).toEqual(
      PortfolioItemGroup.DESIGN
    )
  })

  it('falls back to unknown group', () => {
    expect(getPortfolioItemGroup({ kind: 'something-unknown-yet' })).toEqual(
      PortfolioItemGroup.UNKNOWN
    )
  })
})
