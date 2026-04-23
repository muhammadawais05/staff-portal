import React, { PropsWithChildren } from 'react'
import { render, screen } from '@testing-library/react'
import { Form } from '@toptal/picasso-forms'
import { TestWrapper } from '@staff-portal/test-utils'

import PitchTextField, { Props } from './PitchTextField'

jest.mock('@toptal/picasso-forms', () => ({
  ...jest.requireActual('@toptal/picasso-forms'),
  Form: {
    Input: jest.fn(),
    ConfigProvider: jest.fn()
  }
}))

const FormMock = Form as unknown as jest.Mock & {
  Input: jest.Mock
  ConfigProvider: jest.Mock
}

const componentImplementation = ({ children }: PropsWithChildren<unknown>) => (
  <>{children}</>
)

const renderComponent = ({ isPitchTextEnabled = true }: Props) =>
  render(
    <TestWrapper>
      <PitchTextField isPitchTextEnabled={isPitchTextEnabled} />
    </TestWrapper>
  )

describe('PitchTextField', () => {
  beforeEach(() => {
    FormMock.Input = jest.fn(componentImplementation)
    FormMock.ConfigProvider = jest.fn(componentImplementation)
  })

  describe('when `isPitchTextEnabled` prop equals `true`', () => {
    it('renders PitchTextField with label', () => {
      renderComponent({ isPitchTextEnabled: true })

      expect(screen.getByText('Pitch Text')).toBeInTheDocument()
      expect(FormMock.Input).toHaveBeenCalledTimes(1)
    })
  })

  describe('when `isPitchTextEnabled` prop equals `false`', () => {
    it('disables PitchTextField', () => {
      renderComponent({ isPitchTextEnabled: false })

      expect(
        screen.getByText(
          /Disabled as part of an experiment to see the effect of pitch text to conversion/
        )
      ).toBeInTheDocument()

      expect(FormMock.Input).toHaveBeenCalledWith(
        expect.objectContaining({
          disabled: true
        }),
        {}
      )
    })
  })
})
