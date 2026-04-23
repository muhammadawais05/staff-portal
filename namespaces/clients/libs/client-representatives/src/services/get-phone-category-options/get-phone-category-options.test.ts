import { PhoneCategory } from '@staff-portal/graphql/staff'

import { getPhoneCategoryOptions } from './get-phone-category-options'

describe('getPhoneCategoryOptions', () => {
  it.each([
    {
      items: [{ phoneCategory: PhoneCategory.OTHER }],
      itemIndex: 0
    },
    {
      items: [
        { phoneCategory: PhoneCategory.OTHER },
        { phoneCategory: PhoneCategory.MOBILE }
      ],
      itemIndex: 0
    },
    {
      items: [
        { phoneCategory: PhoneCategory.OTHER },
        { phoneCategory: PhoneCategory.MOBILE },
        { phoneCategory: PhoneCategory.HOME }
      ],
      itemIndex: 1
    },
    {
      items: [
        { phoneCategory: PhoneCategory.OTHER },
        { phoneCategory: PhoneCategory.MOBILE },
        { phoneCategory: PhoneCategory.HOME },
        { phoneCategory: PhoneCategory.OFFICE }
      ],
      itemIndex: 3
    },
    {
      items: [
        { phoneCategory: PhoneCategory.OTHER, destroy: true },
        { phoneCategory: PhoneCategory.MOBILE, destroy: true },
        { phoneCategory: PhoneCategory.HOME },
        { phoneCategory: PhoneCategory.OFFICE }
      ],
      itemIndex: 3
    }
  ])('returns enabled option for currentIndex', ({ items, itemIndex }) => {
    const options = getPhoneCategoryOptions({ items, itemIndex })

    const enabledOption = options.find(
      option => option.value === items[itemIndex].phoneCategory
    )

    expect(options).toHaveLength(4)
    expect(enabledOption).toBeDefined()
    expect(enabledOption?.disabled).toBeFalsy()
  })

  it.each([
    {
      items: [{ phoneCategory: PhoneCategory.OTHER }],
      itemIndex: 0,
      disabledOptions: []
    },
    {
      items: [
        { phoneCategory: PhoneCategory.OTHER },
        { phoneCategory: PhoneCategory.MOBILE }
      ],
      itemIndex: 0,
      disabledOptions: [PhoneCategory.MOBILE]
    },
    {
      items: [
        { phoneCategory: PhoneCategory.OTHER },
        { phoneCategory: PhoneCategory.MOBILE },
        { phoneCategory: PhoneCategory.HOME }
      ],
      itemIndex: 1,
      disabledOptions: [PhoneCategory.OTHER, PhoneCategory.HOME]
    },
    {
      items: [
        { phoneCategory: PhoneCategory.OTHER },
        { phoneCategory: PhoneCategory.MOBILE },
        { phoneCategory: PhoneCategory.HOME },
        { phoneCategory: PhoneCategory.OFFICE }
      ],
      itemIndex: 3,
      disabledOptions: [
        PhoneCategory.OTHER,
        PhoneCategory.MOBILE,
        PhoneCategory.HOME
      ]
    },
    {
      items: [
        { phoneCategory: PhoneCategory.OTHER, destroy: true },
        { phoneCategory: PhoneCategory.MOBILE, destroy: true },
        { phoneCategory: PhoneCategory.HOME },
        { phoneCategory: PhoneCategory.OFFICE }
      ],
      itemIndex: 3,
      disabledOptions: [PhoneCategory.HOME]
    }
  ])(
    'returns disabled options for already used categories',
    ({ items, itemIndex, disabledOptions }) => {
      const options = getPhoneCategoryOptions({ items, itemIndex })

      const expectedDisabledOptions = disabledOptions.map(option =>
        expect.objectContaining({
          value: option,
          disabled: true
        })
      )

      expect(options).toHaveLength(4)
      expect(options).toEqual(expect.arrayContaining(expectedDisabledOptions))
    }
  )
})
