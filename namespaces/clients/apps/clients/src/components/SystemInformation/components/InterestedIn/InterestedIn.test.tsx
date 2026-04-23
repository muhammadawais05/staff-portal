import React, { ComponentProps } from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import { useGetUserVerticals } from '@staff-portal/verticals'
import { NO_VALUE } from '@staff-portal/config'

import InterestedIn from './InterestedIn'
import { systemInformationDataMock } from '../../data/system-information-fragment.mock'

jest.mock('@staff-portal/verticals', () => ({
  ...jest.requireActual('@staff-portal/verticals'),
  useGetUserVerticals: jest.fn()
}))

const mockedUseGetUserVerticals = useGetUserVerticals as jest.Mock

const renderComponent = (props: ComponentProps<typeof InterestedIn>) =>
  render(
    <TestWrapper>
      <InterestedIn {...props} />
    </TestWrapper>
  )

describe('InterestedIn', () => {
  beforeEach(() => {
    mockedUseGetUserVerticals.mockReturnValue({})
  })

  it('default render', () => {
    renderComponent({
      interestedIn: systemInformationDataMock.interestedIn,
      handleChange: jest.fn(),
      operationDisabled: false,
      useClientInterestedIn: jest.fn()
    })

    expect(
      screen.getByTestId('EditableField-interestedInId-viewer')
    ).toHaveTextContent(systemInformationDataMock.interestedIn)
  })

  it('displays placeholder', () => {
    renderComponent({
      interestedIn: undefined,
      handleChange: jest.fn(),
      operationDisabled: false,
      useClientInterestedIn: jest.fn()
    })

    expect(
      screen.getByTestId('EditableField-interestedInId-viewer')
    ).toHaveTextContent(NO_VALUE)
  })
})
