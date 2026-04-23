import React, { ComponentProps } from 'react'
import { render } from '@testing-library/react'
import { OperationCallableTypes } from '@staff-portal/graphql/staff'
import { useEditableFieldChangeHandler } from '@staff-portal/mutation-result-handlers'

import { useGetCompanyPrimaryRegion } from '../../../../data/get-company-primary-region.staff.gql'
import PrimaryRegion from './PrimaryRegion'
import { adjustPrimaryRegionId } from '../../utils/adjust-values/adjust-primary-region'
import { CompanyRegion } from '../CompanyRegion'

jest.mock('@staff-portal/mutation-result-handlers/src/hooks')
jest.mock('../../../../data/get-company-primary-region.staff.gql', () => ({
  useGetCompanyPrimaryRegion: jest.fn()
}))
jest.mock('../CompanyRegion', () => ({
  CompanyRegion: jest.fn()
}))

const companyRegionMock = CompanyRegion as jest.Mock
const useEditableFieldChangeHandlerMock =
  useEditableFieldChangeHandler as jest.Mock
const useGetCompanyPrimaryRegionMock = useGetCompanyPrimaryRegion as jest.Mock

const arrangeTest = (props: ComponentProps<typeof PrimaryRegion>) =>
  render(<PrimaryRegion {...props} />)

describe('PrimaryRegion', () => {
  it('renders component', () => {
    const getValue = jest.fn()
    const onChange = jest.fn()
    const companyRegionMocked = jest.fn(() => null)

    useGetCompanyPrimaryRegionMock.mockReturnValue(getValue)
    useEditableFieldChangeHandlerMock.mockReturnValue(onChange)
    companyRegionMock.mockImplementation(companyRegionMocked)
    const updateClientPrimaryRegion = {
      callable: OperationCallableTypes.ENABLED,
      messages: []
    }
    const primaryRegion = {
      id: 'test',
      name: 'test'
    }

    arrangeTest({
      updateClientPrimaryRegion,
      primaryRegion,
      clientId: '123'
    })

    expect(companyRegionMocked).toHaveBeenCalledTimes(1)
    expect(companyRegionMocked).toHaveBeenCalledWith(
      {
        adjustValues: adjustPrimaryRegionId,
        handleChange: onChange,
        name: 'primaryRegionId',
        operation: updateClientPrimaryRegion,
        queryValue: getValue,
        value: primaryRegion
      },
      {}
    )
  })
})
