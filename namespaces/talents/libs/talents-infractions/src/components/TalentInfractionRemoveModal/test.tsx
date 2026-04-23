import React from 'react'
import { act, render, screen, fireEvent } from '@testing-library/react'
import { MockedResponse } from '@staff-portal/data-layer-service'
import { TestWrapperWithMocks } from '@staff-portal/test-utils'

import TalentInfractionRemoveModal, {
  Props as TalentInfractionRemoveModalProps
} from './TalentInfractionRemoveModal'
import {
  createRemoveTalentInfractionFailedMock,
  createRemoveTalentInfractionMock
} from '../../data/remove-talent-infraction/mocks'

const INFRACTION_ID = 'infraction-id'
const hideModal = jest.fn()
const onRemove = jest.fn()

const arrangeTest = ({
  mocks = [],
  modalProps
}: {
  mocks?: MockedResponse[]
  modalProps: TalentInfractionRemoveModalProps
}) => {
  window.Element.prototype.scrollIntoView = jest.fn()
  render(
    <TestWrapperWithMocks mocks={mocks}>
      <TalentInfractionRemoveModal {...modalProps} />
    </TestWrapperWithMocks>
  )
}

describe('TalentInfractionRemoveModal', () => {
  it('shows a success message when the infraction is removed', async () => {
    arrangeTest({
      mocks: [
        createRemoveTalentInfractionMock({
          talentInfractionId: INFRACTION_ID,
          comment: 'Test comment'
        })
      ],
      modalProps: {
        infractionId: INFRACTION_ID,
        hideModal,
        onRemove
      }
    })
    act(() => {
      fireEvent.change(screen.getByLabelText(/Comment/), {
        target: { value: 'Test comment' }
      })
      fireEvent.click(screen.getByText('Remove'))
    })
    expect(
      await screen.findByText('The infraction was successfully deleted.')
    ).toBeInTheDocument()
    expect(hideModal).toHaveBeenCalled()
    expect(onRemove).toHaveBeenCalled()
  })

  it('shows an error message when unable to create the infraction', async () => {
    const errorMessage = 'Test error'

    arrangeTest({
      mocks: [
        createRemoveTalentInfractionFailedMock(
          {
            talentInfractionId: INFRACTION_ID,
            comment: 'Test comment'
          },
          errorMessage
        )
      ],
      modalProps: {
        infractionId: INFRACTION_ID,
        hideModal,
        onRemove
      }
    })
    act(() => {
      fireEvent.change(screen.getByLabelText(/Comment/), {
        target: { value: 'Test comment' }
      })
      fireEvent.click(screen.getByText('Remove'))
    })
    expect(await screen.findByText(errorMessage)).toBeInTheDocument()
    expect(hideModal).not.toHaveBeenCalled()
    expect(onRemove).not.toHaveBeenCalled()
  })
})
