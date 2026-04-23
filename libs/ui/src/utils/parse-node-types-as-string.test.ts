import { parseNodeTypesAsString } from '.'

describe('parseNodeTypesAsString', () => {
  it.each([
    {
      nodeTypes: ['hello', 'world'],
      expectedString: 'Hello, World'
    },
    {
      nodeTypes: ['skill_name'],
      expectedString: 'Skill'
    },
    {
      nodeTypes: ['staff/team'],
      expectedString: 'Staff Team'
    }
  ])(
    'returns titleized values splitted by comma',
    ({ nodeTypes, expectedString }) => {
      expect(parseNodeTypesAsString(nodeTypes)).toEqual(expectedString)
    }
  )
})
