import {
  FilterConfig,
  FiltersConfig,
  FiltersKeyMapConfig
} from './filters-types'
import {
  buildAmountFilter,
  buildCheckboxFilter,
  buildDateRangeFilter,
  buildDropdownFilter,
  buildHiddenFilter,
  getAutocompleteNodeFor
} from './filters-builders'
import { fullFillConfig } from './filters-config'

describe('configuration of filters', () => {
  it('#fullFillConfig', () => {
    const accountManager = buildDropdownFilter(
      'company_account_manager_id',
      'Account Manager',
      () => ({
        loading: false,
        options: []
      })
    )

    const amount = buildAmountFilter('amount')

    const businessTypes = {
      label: 'Business type',
      name: 'business_types',
      options: [],
      // @ts-expect-error ENUM FilterConfigType expected, value used instead
      type: 'CHECKBOX'
    } as FilterConfig

    const filtersConfig: FiltersKeyMapConfig = [
      [buildDateRangeFilter('issued_on')],
      [businessTypes, amount],
      accountManager
    ]

    const { config: actual } = fullFillConfig(filtersConfig)

    const expected: FiltersConfig = [
      [
        {
          label: 'Issued on',
          name: 'issued_on',
          // @ts-expect-error ENUM FilterConfigType expected, value used instead
          type: 'DATE_RANGE'
        }
      ],
      [
        {
          label: 'Business type',
          name: 'business_types',
          options: [],
          // @ts-expect-error ENUM FilterConfigType expected, value used instead
          type: 'CHECKBOX'
        },
        {
          label: 'Amount',
          name: 'amount',
          options: {
            min: '0'
          },
          // @ts-expect-error ENUM FilterConfigType expected, value used instead
          type: 'AMOUNT_RANGE'
        }
      ],
      {
        label: 'Account Manager',
        loading: false,
        name: 'company_account_manager_id',
        options: [{ label: 'Not Selected', value: null }],
        // @ts-expect-error ENUM FilterConfigType expected, value used instead
        type: 'SELECT'
      }
    ]

    expect(actual).toEqual(expected)
  })

  it('#buildDropdownFilter', () => {
    const name = 'company_account_manager_id'
    const label = 'Account Manager'
    const actual = buildDropdownFilter(name, label, () => ({
      loading: false,
      options: []
    }))()

    const expected = {
      label: 'Account Manager', // should be taken from i18n file by `name`
      loading: false,
      name: name,
      options: [{ label: 'Not Selected', value: null }],
      type: 'SELECT'
    }

    expect(actual).toEqual(expected)
  })

  it('#buildAmountFilter', () => {
    const name = 'amount'
    const actual = buildAmountFilter(name)

    const expected = {
      label: 'Amount',
      name,
      options: {
        min: '0'
      },
      type: 'AMOUNT_RANGE'
    }

    expect(actual).toEqual(expected)
  })

  describe('#buildHiddenFilter', () => {
    it('creates a hidden filter config object', () => {
      const name = 'engagement_id'
      const actual = buildHiddenFilter(name)
      const expected = {
        label: 'Engagement',
        name,
        // @ts-expect-error ENUM FilterConfigType expected, value used instead
        type: 'HIDDEN'
      }

      expect(actual).toEqual(expected)
    })
  })

  it('#buildDateRangeFilter', () => {
    const name = 'issued_on'
    const actual = buildDateRangeFilter(name)

    const expected = {
      label: 'Issued on',
      name,
      // @ts-expect-error ENUM FilterConfigType expected, value used instead
      type: 'DATE_RANGE'
    }

    expect(actual).toEqual(expected)
  })

  it('#buildDateRangeFilter i18n', () => {
    const name = 'created_on'
    const i18Key = 'issuedOn'
    const actual = buildDateRangeFilter(name, i18Key)

    const expected = {
      label: 'Issued on',
      name,
      // @ts-expect-error ENUM FilterConfigType expected, value used instead
      type: 'DATE_RANGE'
    }

    expect(actual).toEqual(expected)
  })

  it('#buildCheckboxFilter', () => {
    const name = 'test'
    const label = 'test_label'
    const options = [{ label: 'foo', value: 'bar' }]
    const useSource = jest.fn().mockReturnValue({
      options,
      loading: false
    })

    expect(buildCheckboxFilter(name, label, useSource)()).toEqual({
      name,
      loading: false,
      label,
      options,
      // @ts-expect-error ENUM FilterConfigType expected, value used instead
      type: 'CHECKBOX'
    })
  })

  it('#getAutocompleteNodeFor', () => {
    expect(getAutocompleteNodeFor('label')({ label: 'Some text' })).toBe(
      'Some text'
    )
    expect(getAutocompleteNodeFor('id')({ id: '123' })).toBe('123')
    expect(getAutocompleteNodeFor('id')(undefined)).toBe('')
  })
})
