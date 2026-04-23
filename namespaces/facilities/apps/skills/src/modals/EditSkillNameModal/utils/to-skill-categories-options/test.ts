import { createVerticalWithSkillCategoriesMock } from '../../../../data/get-verticals-with-categories/mocks'
import { toSkillCategoriesOptions } from './to-skill-categories-options'

describe('toSkillCategoriesOptions', () => {
  it('generates skill categories options from VerticalWithSkillCategoriesFragment', () => {
    const options = toSkillCategoriesOptions([
      createVerticalWithSkillCategoriesMock()
    ])

    expect(options).toEqual({
      VjEtVmVydGljYWwtMTAxMA: [
        { text: 'Other', value: 'VjEtU2tpbGxDYXRlZ29yeS02MA' }
      ]
    })
  })

  it('generates empty object from empty fragment data', () => {
    const options = toSkillCategoriesOptions([])

    expect(options).toEqual({})
  })
})
