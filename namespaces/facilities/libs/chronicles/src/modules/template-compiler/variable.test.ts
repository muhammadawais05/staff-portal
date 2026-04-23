import { extractVariableWithModifier } from './variable'

describe('extractVariableWithModifier', () => {
  it('should parse simple variable match into the variable entity', () => {
    const match = 'variable.name'
    const result = extractVariableWithModifier(match)

    expect(result.path).toBe('variable.name')
    expect(result.modifier).toBeUndefined()
  })

  /*
   * NOTE: There are no cases where we have multiple modifiers applied.
   * Only single modifier is possible.
   */
  it('should parse variable match with modifier', () => {
    const match = 'variable.nested.name|nolabel'
    const result = extractVariableWithModifier(match)

    expect(result.path).toBe('variable.nested.name')
    expect(result.modifier).toBe('nolabel')
  })
})
