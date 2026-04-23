import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { OperationCallableTypes } from '@staff-portal/graphql/staff'
import { MockedResponse } from '@staff-portal/data-layer-service'
import { TestWrapperWithMocks } from '@staff-portal/test-utils'

import ApproveIdVerificationModal from './ApproveIdVerificationModal'
import {
  createApproveTalentIdVerificationMock,
  createApproveTalentIdVerificationFailedMock,
  createApproveTalentIdVerificationInvalidMock,
  getOperationMock
} from '../../mocks'

jest.unmock('@staff-portal/modals-service')

const TALENT_ID = '123'

const arrangeTest = (mocks?: MockedResponse[]) => {
  render(
    <TestWrapperWithMocks mocks={mocks}>
      <ApproveIdVerificationModal
        talentId={TALENT_ID}
        hideModal={() => {}}
        isTopModal={true}
      />
    </TestWrapperWithMocks>
  )
}

describe('IdVerificationField', () => {
  describe('ApproveIdVerificationModal', () => {
    it('Approves the verification on submit', async () => {
      const mutationMock = createApproveTalentIdVerificationMock({
        talentId: TALENT_ID
      })
      const operationMock = getOperationMock(
        TALENT_ID,
        OperationCallableTypes.ENABLED
      )

      arrangeTest([operationMock, mutationMock])

      fireEvent.click(
        await screen.findByTestId('confirm-id-verification-approval')
      )

      expect(
        await screen.findByText('Talent ID verification approved.')
      ).toBeInTheDocument()
    })

    it('Shows an error if approval invalid', async () => {
      const ERROR_MESSAGE = 'Some Error Message.'

      const mutationMock = createApproveTalentIdVerificationInvalidMock({
        input: { talentId: TALENT_ID },
        errors: [{ code: '', key: '', message: ERROR_MESSAGE }]
      })
      const operationMock = getOperationMock(
        TALENT_ID,
        OperationCallableTypes.ENABLED
      )

      arrangeTest([operationMock, mutationMock])

      fireEvent.click(
        await screen.findByTestId('confirm-id-verification-approval')
      )

      expect(
        await screen.findByText(ERROR_MESSAGE, { exact: false })
      ).toBeInTheDocument()
    })

    it('Shows an error if approval fails', async () => {
      const mutationMock = createApproveTalentIdVerificationFailedMock({
        talentId: TALENT_ID
      })
      const operationMock = getOperationMock(
        TALENT_ID,
        OperationCallableTypes.ENABLED
      )

      arrangeTest([operationMock, mutationMock])

      fireEvent.click(
        await screen.findByTestId('confirm-id-verification-approval')
      )

      expect(
        await screen.findByText('Unable to approve talent ID verification.')
      ).toBeInTheDocument()
    })
  })
})
