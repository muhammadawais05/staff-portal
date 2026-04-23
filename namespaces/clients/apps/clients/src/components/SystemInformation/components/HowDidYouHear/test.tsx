import React, { ComponentProps } from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import { NO_VALUE } from '@staff-portal/config'

import HowDidYouHear from '.'
import { systemInformationDataMock } from '../../data/system-information-fragment.mock'

const arrangeTest = (props: ComponentProps<typeof HowDidYouHear>) =>
  render(
    <TestWrapper>
      <HowDidYouHear {...props} />
    </TestWrapper>
  )

describe('HowDidYouHear', () => {
  it('default render', () => {
    arrangeTest({
      howDidYouHear: systemInformationDataMock.howDidYouHear,
      handleChange: jest.fn(),
      operationDisabled: false,
      useClientHowDidYouHear: jest.fn()
    })

    expect(
      screen.getByTestId('EditableField-howDidYouHear-viewer')
    ).toHaveTextContent('Search Engine Result')
  })

  it('displays placeholder', () => {
    arrangeTest({
      howDidYouHear: undefined,
      handleChange: jest.fn(),
      operationDisabled: false,
      useClientHowDidYouHear: jest.fn()
    })

    expect(
      screen.getByTestId('EditableField-howDidYouHear-viewer')
    ).toHaveTextContent(NO_VALUE)
  })
})
