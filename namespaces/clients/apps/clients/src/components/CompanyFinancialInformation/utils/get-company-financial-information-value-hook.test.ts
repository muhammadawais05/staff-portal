import { renderHook } from '@testing-library/react-hooks'
import { when } from 'jest-when'
import { useLazyQuery } from '@staff-portal/data-layer-service'

import { getCompanyFinancialInformationValueHook } from './get-company-financial-information-value-hook'
import { GetCompanyFinancialInformationDocument } from '../data'

jest.mock('@staff-portal/data-layer-service')

const mockUseLazyQuery = useLazyQuery as jest.Mock

describe('#getCompanyFinancialInformationValueHook', () => {
  beforeEach(() => {
    when(mockUseLazyQuery)
      .calledWith(GetCompanyFinancialInformationDocument, expect.anything())
      .mockImplementation(() => [
        () => ({}),
        {
          data: {
            node: {
              stage: '123',
              totalFunding: '4566',
              acquiredBy: '789',
              acquiredCompanies: 'foo'
            }
          },
          loading: false
        }
      ])
  })

  it.each([
    ['stage', '123'],
    ['totalFunding', '4566'],
    ['acquiredBy', '789'],
    ['acquiredCompanies', 'foo']
  ])('returns %s for %s', (key, value) => {
    const {
      result: {
        current: { data }
      }
    } = renderHook(() =>
      getCompanyFinancialInformationValueHook(
        'test',
        key as 'stage' | 'totalFunding' | 'acquiredBy' | 'acquiredCompanies'
      )()
    )

    expect(data).toStrictEqual(value)
  })
})
