import React, { ComponentProps } from 'react'
import { render } from '@testing-library/react'
import { OperationCallableTypes } from '@staff-portal/graphql/staff'
import { useEditableFieldChangeHandler } from '@staff-portal/mutation-result-handlers'

import { useGetCompanySecondaryRegion } from '../../../../data/get-company-secondary-region.staff.gql'
import SecondaryRegion from './SecondaryRegion'
import { adjustSecondaryRegionId } from '../../utils/adjust-values'
import { CompanyRegion } from '../CompanyRegion'

jest.mock('@staff-portal/mutation-result-handlers/src/hooks')
jest.mock('../../../../data/get-company-secondary-region.staff.gql', () => ({
  useGetCompanySecondaryRegion: jest.fn()
}))
jest.mock('../CompanyRegion', () => ({
  CompanyRegion: jest.fn()
}))

const companyRegionMock = CompanyRegion as jest.Mock
const useEditableFieldChangeHandlerMock =
  useEditableFieldChangeHandler as jest.Mock
const useGetCompanySecondaryRegionMock =
  useGetCompanySecondaryRegion as jest.Mock

const arrangeTest = (props: ComponentProps<typeof SecondaryRegion>) =>
  render(<SecondaryRegion {...props} />)

describe('SecondaryRegion', () => {
  it('renders component', () => {
    const getValue = jest.fn()
    const onChange = jest.fn()
    const companyRegionMocked = jest.fn(() => null)

    useGetCompanySecondaryRegionMock.mockReturnValue(getValue)
    useEditableFieldChangeHandlerMock.mockReturnValue(onChange)
    companyRegionMock.mockImplementation(companyRegionMocked)
    const updateClientSecondaryRegion = {
      callable: OperationCallableTypes.ENABLED,
      messages: []
    }
    const secondaryRegion = {
      id: 'test',
      name: 'test'
    }

    arrangeTest({
      updateClientSecondaryRegion,
      secondaryRegion,
      clientId: '123'
    })

    expect(companyRegionMocked).toHaveBeenCalledTimes(1)
    expect(companyRegionMocked).toHaveBeenCalledWith(
      {
        adjustValues: adjustSecondaryRegionId,
        handleChange: onChange,
        name: 'secondaryRegionId',
        operation: updateClientSecondaryRegion,
        queryValue: getValue,
        value: secondaryRegion
      },
      {}
    )
  })
})
