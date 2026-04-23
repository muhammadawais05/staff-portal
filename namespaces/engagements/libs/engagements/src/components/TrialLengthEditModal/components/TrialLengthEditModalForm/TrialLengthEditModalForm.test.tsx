import { fireEvent, render, screen } from '@toptal/picasso/test-utils'
import React, { ComponentProps } from 'react'
import { TestWrapperWithMocks } from '@staff-portal/test-utils'
import { Scalars } from '@staff-portal/graphql/staff'
import { Form } from '@toptal/picasso-forms'

import TrialLengthEditModalForm from './TrialLengthEditModalForm'
import { useGetEngagementTrialLength } from '../../data'

jest.mock('../../data', () => ({
  useGetEngagementTrialLength: jest.fn()
}))

const useGetEngagementTrialLengthMock = useGetEngagementTrialLength as jest.Mock

const arrangeTest = (props: Partial<{ startDate: Scalars['Date'] }> = {}) => {
  const defaultProps: ComponentProps<typeof TrialLengthEditModalForm> = {
    engagementId: '123',
    hideModal: jest.fn()
  }

  useGetEngagementTrialLengthMock.mockReturnValue({
    maxEngagementTrialLength: 3,
    startDate: props.startDate,
    trialLength: 5,
    loading: false
  })

  return render(
    <TestWrapperWithMocks>
      <Form onSubmit={jest.fn()}>
        <TrialLengthEditModalForm {...defaultProps} {...props} />

        <button role='button' type='submit'>
          Change Trial Length
        </button>
      </Form>
    </TestWrapperWithMocks>
  )
}

describe('TrialLengthEditModalForm', () => {
  describe('shows valid form content', () => {
    it('without startDate', async () => {
      arrangeTest()

      expect(screen.queryByText('Not set')).toBeInTheDocument()

      fireEvent.click(
        screen.getByRole('button', { name: 'Change Trial Length' })
      )

      expect(
        await screen.getAllByText('Please complete this field.')[0]
      ).toBeInTheDocument()

      fireEvent.change(screen.getByLabelText(/Reason/), {
        target: { value: 'some reason' }
      })

      fireEvent.click(screen.getByLabelText(/Trial length/i))
      fireEvent.click(screen.getByText('3 business days'))
    })

    it('with startDate', async () => {
      arrangeTest({
        startDate: '2021-06-22'
      })

      expect(screen.queryByText('Jun 22, 2021')).toBeInTheDocument()

      fireEvent.change(screen.getByLabelText(/Reason/), {
        target: { value: 'some reason' }
      })

      fireEvent.click(screen.getByLabelText(/Trial length/i))

      expect(screen.queryByText('1 business day')).toBeInTheDocument()
      expect(screen.queryByText('4 business days')).not.toBeInTheDocument()
    })
  })
})
