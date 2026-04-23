import { enumToHumanOptions } from './enum-to-human-options'

enum TestEnum {
  AB = 'AB',
  BA = 'BA',
  CA = 'CA'
}

describe('enumToHumanOptions', () => {
  it('returns proper values', () => {
    const options = enumToHumanOptions(TestEnum)

    expect(options).toMatchObject([
      { value: 'AB', text: 'Ab' },
      { value: 'BA', text: 'Ba' },
      { value: 'CA', text: 'Ca' }
    ])
  })
})
