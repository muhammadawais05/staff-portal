import { SelectFilterOptionGqlParam } from './select-filter-option-gql-param'

const label = 'Option label'
const value = 'SELECT_OPTION'

describe('SelectFilterOptionGqlParam', () => {
  it.each([
    [{ label, options: [{ label, value }] }, value],
    [
      { label: label.toLocaleLowerCase(), options: [{ label, value }] },
      undefined
    ],
    [{ label: undefined, options: [{ label, value }] }, undefined],
    [{ label: '', options: [{ label, value }] }, undefined],
    [{ label: 'wrong label', options: [{ label, value }] }, undefined]
  ])('returns expected value for %s', (values, expected) => {
    const result = SelectFilterOptionGqlParam(values.options)(values.label)

    expect(result).toBe(expected)
  })
})
