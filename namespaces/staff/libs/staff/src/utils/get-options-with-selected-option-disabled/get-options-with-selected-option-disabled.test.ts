import { getOptionsWithSelectedOptionDisabled } from './get-options-with-selected-option-disabled'

describe('getOptionsWithSelectedOptionDisabled', () => {
  describe('when selected value is passed', () => {
    it('returns options with disabled option', () => {
      const selectedValue = '2'
      const options = [
        {
          text: '1',
          value: '1'
        },
        {
          text: '2',
          value: '2'
        },
        {
          text: '3',
          value: '3'
        }
      ]

      expect(
        getOptionsWithSelectedOptionDisabled({
          options,
          selectedValue
        })
      ).toEqual([
        {
          text: '1',
          value: '1'
        },
        {
          text: '2',
          value: '2',
          disabled: true
        },
        {
          text: '3',
          value: '3'
        }
      ])
    })
  })

  describe('when selected value is not passed', () => {
    it('returns the same options that passed', () => {
      const options = [
        {
          text: '1',
          value: '1'
        },
        {
          text: '2',
          value: '2'
        },
        {
          text: '3',
          value: '3'
        }
      ]

      expect(getOptionsWithSelectedOptionDisabled({ options })).toEqual(options)
    })
  })
})
