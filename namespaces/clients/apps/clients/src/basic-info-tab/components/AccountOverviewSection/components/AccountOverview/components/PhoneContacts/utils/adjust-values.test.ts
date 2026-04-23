import {
  CompanyRepresentativePhoneInput,
  PhoneCategory,
  UpdateCompanyRepresentativePhoneNumbersInput
} from '@staff-portal/graphql/staff'
import { ValuesToAdjust } from '@staff-portal/editable'

import { adjustValues } from './adjust-values'

describe('adjustValues', () => {
  it('returns a function', () => {
    const adjustFunction = adjustValues('test')

    expect(adjustFunction).toEqual(expect.any(Function))
  })

  it('returned function adjusts undefined value to an empty array', () => {
    const adjustFunction = adjustValues('test-id')

    const adjusted = adjustFunction({ phones: undefined })

    const expectedValue: Omit<
      UpdateCompanyRepresentativePhoneNumbersInput,
      'clientMutationId'
    > = {
      companyRepresentativeId: 'test-id',
      phones: []
    }

    expect(adjusted).toEqual(expectedValue)
  })

  it('returned function adjusts array of objects correctly', () => {
    const companyRepresentativeId = 'companyRepresentativeId'
    const values: ValuesToAdjust<
      UpdateCompanyRepresentativePhoneNumbersInput,
      'phones',
      CompanyRepresentativePhoneInput[]
    > = {
      phones: [
        {
          id: null,
          phoneCategory: null,
          destroy: null,
          primary: null,
          value: null
        },
        {},
        {
          id: 'id',
          phoneCategory: PhoneCategory.HOME,
          destroy: true,
          primary: true,
          value: 'value'
        }
      ]
    }

    const expectedValue: Omit<
      UpdateCompanyRepresentativePhoneNumbersInput,
      'clientMutationId'
    > = {
      phones: [
        {
          id: undefined,
          phoneCategory: null,
          destroy: null,
          primary: null,
          value: null
        },
        {
          id: undefined,
          phoneCategory: undefined,
          destroy: undefined,
          primary: undefined,
          value: undefined
        },
        {
          id: 'id',
          phoneCategory: PhoneCategory.HOME,
          destroy: true,
          primary: true,
          value: 'value'
        }
      ],
      companyRepresentativeId
    }

    // Act
    const adjustFunction = adjustValues(companyRepresentativeId)
    const adjustedValues = adjustFunction(values)

    // Assert
    expect(adjustedValues).toEqual(expectedValue)
  })
})
