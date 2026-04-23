import React from 'react'
import { fireEvent, render, screen } from '@toptal/picasso/test-utils'
import { TestWrapper } from '@staff-portal/test-utils'

import CertificationList, { CertificationListProps } from './CertificationList'
import getProfileCertificationMock from '../../mocks/get-profile-certification-mock/get-profile-certification-mock'

const renderComponent = (
  props: Pick<CertificationListProps, 'data' | 'toggleItem'>
) =>
  render(
    <TestWrapper>
      <CertificationList value={[]} {...props} />
    </TestWrapper>
  )

describe('CertificationList', () => {
  it('renders certification data', () => {
    const certification1 = getProfileCertificationMock({
      certificate: 'Master of the universe',
      institution: 'Post office'
    })

    const certification2 = getProfileCertificationMock({
      certificate: 'Advanced Power Point user',
      institution: 'MS'
    })

    renderComponent({
      data: [certification1, certification2],
      toggleItem: jest.fn()
    })

    expect(screen.getByText('Master of the universe')).toBeInTheDocument()
    expect(screen.getByText('Advanced Power Point user')).toBeInTheDocument()
  })

  it('toggles the item on click', () => {
    const certification = getProfileCertificationMock({
      id: 'certification-1',
      certificate: 'Master of the universe',
      institution: 'Post office'
    })

    const toggleItem = jest.fn()

    renderComponent({ data: [certification], toggleItem })

    fireEvent.click(screen.getByText('Master of the universe'))

    expect(toggleItem).toHaveBeenCalledWith('certification-1')
  })
})
