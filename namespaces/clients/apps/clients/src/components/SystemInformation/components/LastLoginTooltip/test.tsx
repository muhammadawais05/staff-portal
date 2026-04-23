import React, { ComponentProps } from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import { NO_VALUE } from '@staff-portal/config'

import LastLoginTooltip from '.'
import { systemInformationDataMock } from '../../data/system-information-fragment.mock'

const arrangeTest = (props: ComponentProps<typeof LastLoginTooltip>) =>
  render(
    <TestWrapper>
      <LastLoginTooltip {...props} />
    </TestWrapper>
  )

const lastLoginDetails = systemInformationDataMock.representatives.nodes[0]

describe('LastLoginTooltip', () => {
  it('default render', () => {
    arrangeTest({ lastLoginDetails })

    expect(screen.getByText(/IP:/)).toBeInTheDocument()
    expect(screen.getByText(/170.150.12.2/)).toBeInTheDocument()
    expect(screen.getByText(/Location:/)).toBeInTheDocument()
    expect(screen.getByText(/Mexico City, Mexico/)).toBeInTheDocument()
  })

  describe('when location is missing', () => {
    it('displays an empty value', () => {
      arrangeTest({
        lastLoginDetails: {
          ...lastLoginDetails,
          ipLocationV2: null
        }
      })

      expect(screen.getByTestId('LastLoginTooltip-location')).toHaveTextContent(
        NO_VALUE
      )
    })
  })
})
