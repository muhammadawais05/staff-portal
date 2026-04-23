import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { MockedResponse } from '@staff-portal/data-layer-service'
import {
  TestErrorBoundary,
  TestWrapperWithMocks
} from '@staff-portal/test-utils'

import TalentTrackOnlineTestAttemptForm, {
  FormProps
} from '../TalentTrackOnlineTestAttemptForm'
import { createGetTrackOnlineTestAttemptMock } from '../../TalentTrackOnlineTestAttemptModal/data/get-track-online-test-attempt/mocks'
import {
  createTrackOnlineTestAttempMock,
  createTrackOnlineTestAttemptFailedMock
} from '../data/track-online-test-attempt/mocks'
import { createGetTalentOnlineTestsMock } from '../../../data/get-talent-online-results/mocks'

const arrangeTest = ({
  mocks = [],
  errorBoundaryMessage = '',
  formProps
}: {
  mocks?: MockedResponse[]
  formProps: FormProps
  errorBoundaryMessage?: string
}) => {
  render(
    <TestErrorBoundary errorMessage={errorBoundaryMessage}>
      <TestWrapperWithMocks mocks={mocks}>
        <TalentTrackOnlineTestAttemptForm {...formProps} />
      </TestWrapperWithMocks>
    </TestErrorBoundary>
  )
}

const generateFormData = ({
  onClose = jest.fn(),
  stepName,
  testName,
  currentTestName,
  onlineTestAttemptId = '123',
  talentId = '456',
  roleSteps
}: {
  onClose?: () => void
  stepName?: string
  testName?: string
  currentTestName?: string
  onlineTestAttemptId?: string
  talentId?: string
  roleSteps?: []
}): FormProps => {
  const queryMock = createGetTrackOnlineTestAttemptMock({
    onlineTestAttemptId,
    talentId,
    stepName,
    testName,
    currentTestName,
    roleSteps
  })

  return {
    data: queryMock.result.data,
    onlineTestAttemptId,
    onClose,
    talentId
  }
}

describe('TalentTrackOnlineTestAttemptForm', () => {
  describe('role steps', () => {
    it('when no role steps exists triggers an error', () => {
      const formData = generateFormData({
        roleSteps: []
      })

      expect(
        arrangeTest.bind({
          formProps: formData
        })
      ).toThrow()
    })

    it('when role steps exists displays the correct form text', () => {
      const STEP_NAME = 'Super Step Test'
      const TEST_NAME = 'Super Online Test'
      const CURRENT_TEST_NAME = 'Current Online Test'
      const formData = generateFormData({
        stepName: STEP_NAME,
        testName: TEST_NAME,
        currentTestName: CURRENT_TEST_NAME
      })

      arrangeTest({
        formProps: formData
      })

      expect(screen.getByText(STEP_NAME)).toBeInTheDocument()
      expect(screen.getByText(TEST_NAME)).toBeInTheDocument()
      expect(screen.getByText(CURRENT_TEST_NAME)).toBeInTheDocument()
    })
  })

  describe('when submitting the form', () => {
    it('successfully tracks a test attempt and displays a notification', async () => {
      const COMMENT_VALUE = 'Some comment'
      const ONLINE_TEST_ATTEMPT_ID = '123'
      const TALENT_ID = '456'

      const formData = generateFormData({
        onlineTestAttemptId: ONLINE_TEST_ATTEMPT_ID
      })

      arrangeTest({
        formProps: formData,
        mocks: [
          createTrackOnlineTestAttempMock({
            comment: COMMENT_VALUE,
            onlineTestAttemptId: ONLINE_TEST_ATTEMPT_ID
          }),
          createGetTalentOnlineTestsMock({
            talentId: TALENT_ID,
            onlineTests: []
          })
        ]
      })

      const comment = screen
        .getByTestId('form-comment')
        .getElementsByTagName('TEXTAREA')[0]

      fireEvent.change(comment, { target: { value: COMMENT_VALUE } })

      const form = screen.getByTestId('track-online-test-attempt-form')
        .parentNode as HTMLFormElement

      form.submit()

      expect(
        await screen.findByText('Online test is tracked now.')
      ).toBeInTheDocument()
    })

    it('shows a notification error when test is already being tracked', async () => {
      const COMMENT_VALUE = 'some comment'
      const TALENT_ID = '456'
      const ONLINE_TEST_ATTEMPT_ID = '123'
      const ERROR_MESSAGE = 'The test is already being tracked.'

      const formData = generateFormData({
        onlineTestAttemptId: ONLINE_TEST_ATTEMPT_ID
      })

      arrangeTest({
        formProps: formData,
        mocks: [
          createTrackOnlineTestAttemptFailedMock(
            {
              comment: COMMENT_VALUE,
              onlineTestAttemptId: ONLINE_TEST_ATTEMPT_ID
            },
            ERROR_MESSAGE
          ),
          createGetTalentOnlineTestsMock({
            talentId: TALENT_ID,
            onlineTests: []
          })
        ]
      })

      const comment = screen
        .getByTestId('form-comment')
        .getElementsByTagName('TEXTAREA')[0]

      fireEvent.change(comment, { target: { value: COMMENT_VALUE } })

      const form = screen.getByTestId('track-online-test-attempt-form')
        .parentNode as HTMLFormElement

      form.submit()

      expect(await screen.findByText(ERROR_MESSAGE)).toBeInTheDocument()
    })
  })
})
