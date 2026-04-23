import rewritePath from './index'

const rule1 = jest.fn()
const rule2 = jest.fn()
const TEST_OPTIONS = { pathname: 'TEST_PATH', search: 'TEST_SEARCH', hash: '' }

describe('rewritePath', () => {
  it('should call all the rules with provided options', () => {
    rewritePath([rule1, rule2], TEST_OPTIONS)

    expect(rule1).toHaveBeenLastCalledWith(TEST_OPTIONS)
    expect(rule2).toHaveBeenLastCalledWith(TEST_OPTIONS)
  })

  it('should stop executing rules if one returned a string', () => {
    rule1.mockReturnValue('A_STRING')

    rewritePath([rule1, rule2], TEST_OPTIONS)

    expect(rule1).toHaveBeenCalled()
    expect(rule2).not.toHaveBeenCalled()
  })

  it('should return what the first rule returned', () => {
    const RULE_RESULT = 'A_STRING'

    rule2.mockReturnValue(RULE_RESULT)

    expect(rewritePath([rule1, rule2], TEST_OPTIONS)).toBe(RULE_RESULT)
  })
})
