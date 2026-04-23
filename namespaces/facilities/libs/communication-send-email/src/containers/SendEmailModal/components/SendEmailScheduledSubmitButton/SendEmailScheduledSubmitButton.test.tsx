import React from 'react'
import * as PicassoForms from '@toptal/picasso-forms'
import { render, screen, fireEvent } from '@toptal/picasso/test-utils'
import { TestWrapper } from '@staff-portal/test-utils'
import { parseAndFormatDate } from '@staff-portal/date-time-utils'

import SendEmailScheduledSubmitButton from './SendEmailScheduledSubmitButton'

jest.mock('@staff-portal/ui', () => ({
  __esModule: true,
  ...jest.requireActual('@staff-portal/ui'),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  DatePickerWrapper: ({ testIds, onChange }: any) => (
    <input
      data-testid={testIds?.calendar}
      onChange={event => onChange(event.target.value)}
    />
  )
}))

const arrangeTest = () =>
  render(
    <TestWrapper>
      <PicassoForms.Form
        onSubmit={() =>
          new Promise(resolve => {
            setTimeout(resolve)
          })
        }
      >
        <SendEmailScheduledSubmitButton />
      </PicassoForms.Form>
    </TestWrapper>
  )

const getByTestId = (id: string) =>
  screen.getByTestId(`send-email-scheduled-submit-button-${id}`)

const queryByTestId = (id: string) =>
  screen.queryByTestId(`send-email-scheduled-submit-button-${id}`)

describe('SendEmailScheduledSubmitButton', () => {
  it('renders initial state', () => {
    arrangeTest()

    expect(screen.getByText('Send Email')).toBeInTheDocument()
  })

  describe('when scheduled send date is picked', () => {
    const mockDate = '2022-03-02'

    beforeEach(() => {
      arrangeTest()

      fireEvent.click(getByTestId('menu-button'))

      fireEvent.click(getByTestId('menu-item-schedule'))

      fireEvent.change(getByTestId('date-picker'), {
        target: { value: mockDate }
      })
    })

    it('applies the picked date to the form', () => {
      expect(queryByTestId('date-picker')).not.toBeInTheDocument()
      expect(
        screen.getByText(`Send Email on ${parseAndFormatDate(mockDate)}`)
      ).toBeInTheDocument()
    })

    describe('when clear schedule is clicked', () => {
      it('resets the scheduled send', () => {
        fireEvent.click(getByTestId('menu-button'))
        fireEvent.click(getByTestId('menu-item-clear'))

        expect(screen.getByText('Send Email')).toBeInTheDocument()
      })
    })
  })

  describe('when form is submitting', () => {
    it('disables submit button', () => {
      arrangeTest()

      fireEvent.click(getByTestId('submit-button'))

      expect(getByTestId('submit-button')).toHaveAttribute('disabled')
    })
  })
})
