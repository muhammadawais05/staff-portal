import React from 'react'
import { render, screen } from '@toptal/picasso/test-utils'
import { TestWrapper } from '@staff-portal/test-utils'

import EmploymentDescription, {
  EmploymentDescriptionProps
} from './EmploymentDescription'
import getProfileEmploymentMock from '../../mocks/get-profile-employment-mock/get-profile-employment-mock'

const renderComponent = (
  props: Pick<EmploymentDescriptionProps, 'employment'>
) =>
  render(
    <TestWrapper>
      <EmploymentDescription {...props} />
    </TestWrapper>
  )

describe('EmploymentDescription', () => {
  it('renders employment data', () => {
    const employment = getProfileEmploymentMock({
      position: 'Lead developer',
      company: 'Tesco',
      startDate: 2010,
      endDate: 2020
    })

    renderComponent({ employment })

    expect(screen.getByText(/Tesco/)).toBeInTheDocument()
    expect(screen.getByText(/2010 – 2020/)).toBeInTheDocument()
    expect(screen.getByText(/years/)).toBeInTheDocument()
  })

  describe('when employment was too short', () => {
    it('skips duration', () => {
      const employment = getProfileEmploymentMock({
        position: 'Lead developer',
        company: 'Tesco',
        startDate: 2010,
        endDate: 2010
      })

      renderComponent({ employment })

      expect(screen.getByText(/Tesco/)).toBeInTheDocument()
      expect(screen.getByText(/2010/)).toBeInTheDocument()
      expect(screen.queryByText(/year/)).not.toBeInTheDocument()
    })
  })
})
