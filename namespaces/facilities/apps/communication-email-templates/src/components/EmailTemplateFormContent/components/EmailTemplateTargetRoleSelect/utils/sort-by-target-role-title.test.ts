import { sortByTargetRoleTitle } from './sort-by-target-role-title'

describe('sortByTargetRoleTitle', () => {
  it.each([
    {
      initial: [
        { title: 'Top Screen', value: '1' },
        { title: 'Marketing Expert', value: '2' },
        { title: 'Product Manager', value: '3' },
        { title: 'Staff', value: '4' },
        { title: 'Developer', value: '5' }
      ],
      expected: [
        { title: 'Developer', value: '5' },
        { title: 'Marketing Expert', value: '2' },
        { title: 'Product Manager', value: '3' },
        { title: 'Staff', value: '4' },
        { title: 'Top Screen', value: '1' }
      ]
    }
  ])('returns properly sorted array', ({ initial, expected }) => {
    expect(initial.sort(sortByTargetRoleTitle)).toEqual(expected)
  })
})
