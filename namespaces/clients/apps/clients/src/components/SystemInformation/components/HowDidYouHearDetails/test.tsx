import React, { ComponentProps } from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import { NO_VALUE } from '@staff-portal/config'

import HowDidYouHearDetails from '.'
import { systemInformationDataMock } from '../../data/system-information-fragment.mock'

const arrangeTest = (props: ComponentProps<typeof HowDidYouHearDetails>) =>
  render(
    <TestWrapper>
      <HowDidYouHearDetails {...props} />
    </TestWrapper>
  )

describe('HowDidYouHearDetails', () => {
  it('default render', () => {
    arrangeTest({
      howDidYouHearDetails: systemInformationDataMock.howDidYouHearDetails,
      handleChange: jest.fn(),
      operationDisabled: false,
      useClientHowDidYouHearDetails: jest.fn()
    })

    expect(
      screen.getByTestId('EditableField-howDidYouHearDetails-viewer')
    ).toHaveTextContent(systemInformationDataMock.howDidYouHearDetails)
  })

  it('displays placeholder', () => {
    arrangeTest({
      howDidYouHearDetails: undefined,
      handleChange: jest.fn(),
      operationDisabled: false,
      useClientHowDidYouHearDetails: jest.fn()
    })

    expect(
      screen.getByTestId('EditableField-howDidYouHearDetails-viewer')
    ).toHaveTextContent(NO_VALUE)
  })
})
