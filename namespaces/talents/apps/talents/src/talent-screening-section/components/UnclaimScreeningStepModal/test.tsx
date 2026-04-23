import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { TestWrapper } from '@staff-portal/test-utils'

import UnclaimScreeningStepModal from './UnclaimScreeningStepModal'

jest.mock('./data', () => ({
  __esModule: true,
  useUnclaimScreeningStep: () => [
    () => ({
      data: {
        unclaimRoleStep: {
          success: true,
          errors: []
        }
      }
    }),
    { loading: false }
  ]
}))

const STEP_NAME = 'Type 1'

const arrangeTest = ({
  stepInvolvesMeeting,
  status
}: {
  stepInvolvesMeeting?: boolean
  status: string
}) => {
  return render(
    <TestWrapper>
      <UnclaimScreeningStepModal
        roleStep={{
          id: '1',
          step: {
            id: 'stepId1',
            title: STEP_NAME,
            short: STEP_NAME
          },
          stepInvolvesMeeting,
          status
        }}
        hideModal={jest.fn()}
      />
    </TestWrapper>
  )
}

describe('UnclaimScreeningStepModal', () => {
  it('renders modal with interview warning', () => {
    arrangeTest({ stepInvolvesMeeting: true, status: 'claimed' })

    expect(
      screen.getByText(
        'The step unclaiming will cancel the existing interview invitation and the new one has to be sent again when the step is claimed. Please use step reassign if you want to keep the current invitation.'
      )
    ).toBeInTheDocument()
  })

  it('renders unclaim modal', async () => {
    arrangeTest({ stepInvolvesMeeting: false, status: 'claimed' })

    expect(screen.getByText(`Unclaim ${STEP_NAME}`)).toBeInTheDocument()
    expect(
      screen.getByText(`Do you really want to unclaim the ${STEP_NAME} step?`)
    ).toBeInTheDocument()

    fireEvent.change(screen.getByLabelText(/Comment/), {
      target: { value: 'a' }
    })
    fireEvent.click(screen.getByText(`Unclaim ${STEP_NAME} Step`))

    expect(
      await screen.findByText(
        `The ${STEP_NAME} Step was successfully unclaimed.`
      )
    ).toBeInTheDocument()
  })

  it('renders reset modal', async () => {
    arrangeTest({ stepInvolvesMeeting: false, status: 'approved' })

    expect(screen.getByText(`Reset ${STEP_NAME}`)).toBeInTheDocument()
    expect(
      screen.getByText(`Do you really want to reset the ${STEP_NAME} step?`)
    ).toBeInTheDocument()
    expect(screen.getByText(`Reset ${STEP_NAME} Step`)).toBeInTheDocument()

    fireEvent.change(screen.getByLabelText(/Comment/), {
      target: { value: 'a' }
    })
    fireEvent.click(screen.getByText(`Reset ${STEP_NAME} Step`))

    expect(
      await screen.findByText(`The ${STEP_NAME} Step was successfully reset.`)
    ).toBeInTheDocument()
  })
})
