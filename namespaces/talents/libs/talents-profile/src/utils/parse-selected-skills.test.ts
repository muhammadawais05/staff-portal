import {
  parseApplicantSkills,
  parseNewApplicantSkillNames
} from './parse-selected-skills'

const existingSkills = [
  { text: 'React', value: 'VjEtU2tpbGwtNzkwNDU' },
  { text: 'AngularJS', value: 'VjEtU2tpbGwtMzY5MzI' }
]

describe('parseSelectedSkills util', () => {
  it('returns the ids for existing skills', () => {
    const result = parseApplicantSkills(existingSkills)
    const expectedResult = existingSkills.map(({ value }) => value)

    expect(result).toHaveLength(expectedResult.length)
    expect(result).toStrictEqual(expectedResult)
  })

  it('returns the skill names for skills created by the user', () => {
    const newSkill = { text: 'Xyz', value: 'Xyz' }
    const input = [...existingSkills, newSkill]

    const result = parseNewApplicantSkillNames(input)
    const expectedResult = [newSkill.value]

    expect(result).toHaveLength(expectedResult.length)
    expect(result).toStrictEqual(expectedResult)
  })
})
