import React, { ComponentProps } from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { useModal } from '@staff-portal/modals-service'
import { TestWrapper } from '@staff-portal/test-utils'
import { Info16 } from '@toptal/picasso/Icon'

import ApplicationInfoField from './ApplicationInfoField'

jest.mock('@staff-portal/modals-service', () => ({
  ...jest.requireActual('@staff-portal/modals-service'),
  useModal: jest.fn()
}))

const arrangeTest = ({
  entityId,
  tooltipContent,
  icon
}: ComponentProps<typeof ApplicationInfoField>) =>
  render(
    <TestWrapper>
      <ApplicationInfoField
        entityId={entityId}
        tooltipContent={tooltipContent}
        icon={icon}
      />
    </TestWrapper>
  )

describe('ApplicationInfoField', () => {
  it('renders with default tooltip message and default icon', () => {
    const showModal = jest.fn()
    const useModalMock = useModal as jest.Mock

    useModalMock.mockReturnValue({ showModal })

    arrangeTest({ entityId: '123343' })

    expect(
      screen.getByTestId('application-info-field-link')
    ).toBeInTheDocument()
    expect(
      screen.getByTestId('application-info-field-question-mark-icon')
    ).toBeInTheDocument()

    expect(showModal).not.toHaveBeenCalled()

    fireEvent.click(screen.getByTestId('application-info-field-text'))

    expect(showModal).toHaveBeenCalled()

    fireEvent.mouseOver(screen.getByTestId('application-info-field-link'))
    const tooltip = screen.getByRole('tooltip')

    expect(tooltip).toHaveTextContent('Click for user application details')
  })

  it('renders with custom tooltip message and icon', () => {
    const showModal = jest.fn()
    const useModalMock = useModal as jest.Mock

    useModalMock.mockReturnValue({ showModal })

    const customTooltipContent = 'Custom tooltip content'

    arrangeTest({
      entityId: '123343',
      tooltipContent: customTooltipContent,
      icon: <Info16 data-testid='application-info-field-info-icon' />
    })

    expect(
      screen.getByTestId('application-info-field-info-icon')
    ).toBeInTheDocument()

    fireEvent.mouseOver(screen.getByTestId('application-info-field-link'))
    const tooltip = screen.getByRole('tooltip')

    expect(tooltip).toHaveTextContent(customTooltipContent)
  })
})
