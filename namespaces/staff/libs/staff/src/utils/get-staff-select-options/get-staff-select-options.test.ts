import { getStaffSelectOptions } from '../index'

jest.mock('@toptal/picasso-forms', () => ({
  Form: {
    Select: jest.fn()
  }
}))

const defaultOptions = [
  { text: '1', value: '1' },
  { text: '2', value: '2' }
]

describe('when assigned user is still eligible', () => {
  it('renders Select with that option enabled', () => {
    const result = getStaffSelectOptions({
      isSelectedOptionDisabled: false,
      staffOptions: defaultOptions,
      currentValue: {
        id: '2',
        fullName: '2'
      }
    })

    expect(result).toStrictEqual(defaultOptions)
  })
})

describe('when assigned user is no longer eligible', () => {
  it('renders Select with that option disabled', () => {
    const result = getStaffSelectOptions({
      isSelectedOptionDisabled: false,
      staffOptions: defaultOptions,
      currentValue: {
        id: '3',
        fullName: 'missing staff member'
      }
    })

    expect(result).toStrictEqual([
      {
        disabled: true,
        text: 'missing staff member',
        value: '3'
      },
      ...defaultOptions
    ])
  })
})

describe('when isSelectedOptionDisabled', () => {
  it('renders Select with selected option disabled', () => {
    const result = getStaffSelectOptions({
      isSelectedOptionDisabled: true,
      staffOptions: defaultOptions,
      currentValue: {
        id: '2',
        fullName: '2'
      }
    })

    expect(result).toStrictEqual([
      { text: '1', value: '1' },
      { disabled: true, text: '2', value: '2' }
    ])
  })
})
