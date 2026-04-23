import { toggle } from './toggle'

const toggleAll = <T>(state: T[], items: T[]) => {
  return items.reduce((currentState, item) => {
    return toggle(currentState.slice(), item)
  }, state)
}

describe('toggle', () => {
  it('allows to select item', () => {
    const result = toggleAll([], ['skill1', 'skill2'])

    expect(result).toEqual(['skill1', 'skill2'])
  })

  it('allows to deselect item', () => {
    const result = toggleAll([], ['skill1', 'skill2', 'skill1'])

    expect(result).toEqual(['skill2'])
  })
})
