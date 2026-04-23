import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { encodeEntityId } from '@staff-portal/data-layer-service'
import { TestWrapper } from '@staff-portal/test-utils'

import ConvertSpecializationApplicationModal, {
  Props
} from './ConvertSpecializationApplicationModal'
import {
  useConvertSpecializationApplication,
  useGetAvailableTalentSpecializations
} from '../../data'

jest.mock('../../data', () => ({
  useConvertSpecializationApplication: jest.fn(),
  useGetAvailableTalentSpecializations: jest.fn()
}))

const mockUseConvertSpecializationApplication =
  useConvertSpecializationApplication as jest.Mock

const mockUseGetAvailableTalentSpecializations =
  useGetAvailableTalentSpecializations as jest.Mock

const ACTION_LABEL = 'Convert Specialization'

const defaultProps: Props = {
  talentId: encodeEntityId('123', 'Test'),
  specializationTitle: 'TEST_TITLE',
  specializationApplicationId: encodeEntityId('123', 'Test'),
  specializationId: encodeEntityId('123', 'Test'),
  hideModal: () => {}
}

const arrangeTest = (props = defaultProps) =>
  render(
    <TestWrapper>
      <ConvertSpecializationApplicationModal {...props} />
    </TestWrapper>
  )

describe('ConvertSpecializationApplicationModal', () => {
  it('converts a talent specialization application', async () => {
    const availableSpecialization = {
      id: 'VjEtU3BlY2lhbGl6YXRpb24tMzAwMDc',
      title: 'Artificial Intelligence'
    }
    const input = {
      comment: 'This is the comment',
      specializationId: availableSpecialization.id,
      specializationApplicationId: defaultProps.specializationApplicationId
    }

    mockUseConvertSpecializationApplication.mockReturnValue([
      jest.fn(() =>
        Promise.resolve({
          data: {
            convertSpecializationApplication: {
              success: true,
              errors: []
            }
          }
        })
      ),
      { loading: false }
    ])

    mockUseGetAvailableTalentSpecializations.mockReturnValue({
      availableSpecializations: [availableSpecialization],
      loading: false
    })

    arrangeTest()

    fireEvent.click(screen.getByLabelText(/To/i))
    fireEvent.click(screen.getByText(availableSpecialization.title))

    fireEvent.change(screen.getByLabelText(/Comment/i), {
      target: { value: input.comment }
    })

    fireEvent.click(
      screen.getByRole('button', {
        name: ACTION_LABEL
      })
    )

    expect(
      await screen.findByText(
        `The ${defaultProps.specializationTitle} specialization was successfully converted to ${availableSpecialization.title}.`
      )
    ).toBeInTheDocument()
  })

  describe('when unable to convert a talent specialization application', () => {
    it('shows a graphql error message', async () => {
      const availableSpecialization = {
        id: 'VjEtU3BlY2lhbGl6YXRpb24tMzAwMDc',
        title: 'Artificial Intelligence'
      }
      const input = {
        comment: 'This is the comment',
        specializationId: availableSpecialization.id,
        specializationApplicationId: defaultProps.specializationApplicationId
      }
      const errorMessage = 'This is the error message.'

      mockUseConvertSpecializationApplication.mockReturnValue([
        jest.fn(() =>
          Promise.resolve({
            data: {
              convertSpecializationApplication: {
                success: false,
                errors: [
                  {
                    key: 'base',
                    code: 'screeningNotPossible',
                    message: errorMessage
                  }
                ]
              }
            }
          })
        ),
        { loading: false }
      ])

      mockUseGetAvailableTalentSpecializations.mockReturnValue({
        availableSpecializations: [availableSpecialization],
        loading: false
      })

      arrangeTest()

      fireEvent.click(screen.getByLabelText(/To/i))
      fireEvent.click(screen.getByText(availableSpecialization.title))

      fireEvent.change(screen.getByLabelText(/Comment/i), {
        target: { value: input.comment }
      })

      fireEvent.click(
        screen.getByRole('button', {
          name: ACTION_LABEL
        })
      )

      expect(await screen.findByText(errorMessage)).toBeInTheDocument()
    })
  })
})
