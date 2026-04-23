import { matcherTeamName } from '.'

describe('matcherTeamName', () => {
  it('returns null', () => {
    expect(matcherTeamName([])).toBe('')
  })

  it("returns first team's name", () => {
    expect(
      matcherTeamName([
        { id: 'id1', name: 'first team name' },
        { id: 'id2', name: 'second team name' }
      ])
    ).toBe(' (first team name)')
  })
})
