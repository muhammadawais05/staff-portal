import React from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { MockedResponse } from '@staff-portal/data-layer-service'
import { TestWrapperWithMocks } from '@staff-portal/test-utils'

import DiscardRecordingModal, { Props } from './DiscardRecordingModal'
import {
  createDiscardTalentPrescreeningVideoMock,
  createDiscardTalentPrescreeningVideoFailedMock,
  createDiscardTalentPrescreeningVideoInvalidMock
} from '../../data/discard-talent-prescreening-video/mocks'
import { createGetTalentProfileGeneralDataMock } from '../../../TalentGeneralSection/data/get-talent-profile-general-data/mocks'

const defaultProps: Props = {
  talentId: '123',
  hideModal: () => {},
  isTopModal: true
}

const arrangeTest = (props = defaultProps, mocks?: MockedResponse[]) =>
  render(
    <TestWrapperWithMocks mocks={mocks}>
      <DiscardRecordingModal {...props} />
    </TestWrapperWithMocks>
  )

describe('DiscardRecordingModal', () => {
  it('discards the submitted recording', async () => {
    const hideModal = jest.fn()

    arrangeTest({ ...defaultProps, hideModal }, [
      createDiscardTalentPrescreeningVideoMock({
        talentId: defaultProps.talentId
      }),
      createGetTalentProfileGeneralDataMock({
        id: defaultProps.talentId
      })
    ])

    fireEvent.click(screen.getByRole('button', { name: 'Discard' }))

    expect(
      await screen.findByText('Talent submitted recording discarded.')
    ).toBeInTheDocument()
    expect(hideModal).toHaveBeenCalled()
  })

  it('shows an error if discarding submitted recording fails', async () => {
    const ERROR_MESSAGE = 'Some Error Message.'
    const hideModal = jest.fn()

    arrangeTest({ ...defaultProps, hideModal }, [
      createDiscardTalentPrescreeningVideoInvalidMock({
        input: { talentId: defaultProps.talentId },
        errors: [{ code: '', key: '', message: ERROR_MESSAGE }]
      }),
      createGetTalentProfileGeneralDataMock({
        id: defaultProps.talentId
      })
    ])

    await waitFor(() => {
      fireEvent.click(screen.getByRole('button', { name: 'Discard' }))
    })

    expect(
      await screen.findByText(ERROR_MESSAGE, { exact: false })
    ).toBeInTheDocument()
    expect(hideModal).toHaveBeenCalled()
  })

  it('shows an error if discarding submitted recording request fails', async () => {
    const hideModal = jest.fn()

    arrangeTest({ ...defaultProps, hideModal }, [
      createDiscardTalentPrescreeningVideoFailedMock({
        talentId: defaultProps.talentId
      })
    ])

    fireEvent.click(screen.getByRole('button', { name: 'Discard' }))

    expect(
      await screen.findByText('Unable to discard submitted recording.')
    ).toBeInTheDocument()
    expect(hideModal).not.toHaveBeenCalled()
  })
})
