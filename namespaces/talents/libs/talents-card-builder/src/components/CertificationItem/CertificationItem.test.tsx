import React from 'react'
import { render, screen } from '@toptal/picasso/test-utils'
import { TestWrapper } from '@staff-portal/test-utils'

import CertificationItem, { CertificationItemProps } from './CertificationItem'
import getProfileCertificationMock from '../../mocks/get-profile-certification-mock/get-profile-certification-mock'

const renderComponent = (
  props: Pick<CertificationItemProps, 'certification'>
) =>
  render(
    <TestWrapper>
      <CertificationItem selected={false} onClick={jest.fn()} {...props} />
    </TestWrapper>
  )

describe('CertificationItem', () => {
  it('renders certification data', () => {
    const certification = getProfileCertificationMock({
      certificate: 'Master of the universe',
      institution: 'Post office'
    })

    renderComponent({ certification })

    expect(screen.getByText('Master of the universe')).toBeInTheDocument()
    expect(screen.getByText('Post office')).toBeInTheDocument()
  })

  it('renders the valid from month', () => {
    const certification = getProfileCertificationMock({
      validFromYear: 2020,
      validFromMonth: 10
    })

    const { container } = renderComponent({ certification })

    expect(container.textContent).toContain('November 2020')
  })

  it('renders the valid from and to months', () => {
    const certification = getProfileCertificationMock({
      validFromYear: 2019,
      validFromMonth: 10,
      validToYear: 2020,
      validToMonth: 0
    })

    const { container } = renderComponent({ certification })

    expect(container.textContent).toContain('November 2019 – January 2020')
  })
})
