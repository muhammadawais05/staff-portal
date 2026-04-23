import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { MockedResponse } from '@staff-portal/data-layer-service'
import {
  TestErrorBoundary,
  TestWrapperWithMocks
} from '@staff-portal/test-utils'

import TalentSendNewOnlineTestAttemptForm, {
  FormProps
} from '../TalentSendNewOnlineTestAttemptForm'
import { createGetTalentNewOnlineTestAttemptMock } from '../../TalentSendNewOnlineTestAttemptModal/data/get-talent-new-online-test-attempt/mocks'
import {
  createSendNewOnlineTestAttemptMock,
  createSendNewOnlineTestAttemptFailedMock
} from '../../TalentSendNewOnlineTestAttemptForm/data/send-new-online-test-attempt/mocks'
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
  return render(
    <TestErrorBoundary errorMessage={errorBoundaryMessage}>
      <TestWrapperWithMocks mocks={mocks}>
        <TalentSendNewOnlineTestAttemptForm {...formProps} />
      </TestWrapperWithMocks>
    </TestErrorBoundary>
  )
}

const generateFormData = ({
  onClose = jest.fn(),
  stepName,
  testName,
  onlineTestAttemptId = '123',
  talentId = '456'
}: {
  onClose?: () => void
  stepName?: string
  testName?: string
  onlineTestAttemptId?: string
  talentId?: string
}): FormProps => {
  const queryMock = createGetTalentNewOnlineTestAttemptMock({
    onlineTestAttemptId,
    stepName,
    testName
  })

  return {
    data: queryMock.result.data,
    onlineTestAttemptId,
    onClose,
    talentId
  }
}

describe('TalentSendNewOnlineTestAttemptForm', () => {
  describe('when no online tests exists', () => {
    it('triggers an error', () => {
      const formData = generateFormData({})

      formData.data.onlineTests.nodes = []

      expect(
        arrangeTest.bind({
          formProps: formData
        })
      ).toThrow()
    })
  })

  describe('when there are online tests', () => {
    it('displays the correct form header text', () => {
      const STEP_NAME = 'Super Step Test'
      const TEST_NAME = 'Super Online Test'
      const formData = generateFormData({
        stepName: STEP_NAME,
        testName: TEST_NAME
      })

      arrangeTest({
        formProps: formData
      })

      expect(screen.getByText(STEP_NAME)).toBeInTheDocument()
      expect(screen.getByText(TEST_NAME)).toBeInTheDocument()
    })

    it('hides a test service option if one of them is not present', () => {
      const onlineTests = {
        nodes: [
          {
            id: 'VjEtQ29kaWxpdHlUZXN0LTI',
            name: 'For integration testing purposes',
            service: 'Codility',
            __typename: 'CodilityTest'
          }
        ],
        __typename: 'OnlineTestConnection'
      }
      const formData = generateFormData({})

      formData.data.onlineTests = onlineTests

      arrangeTest({
        formProps: formData
      })

      expect(
        screen.queryByText('Invite to Codility test', { exact: false })
      ).toBeInTheDocument()
      expect(
        screen.queryByText('Invite to HackerRank test')
      ).not.toBeInTheDocument()
    })

    it('display the test options only when the service is selected', () => {
      arrangeTest({
        formProps: generateFormData({})
      })

      expect(
        screen.queryByPlaceholderText('Please select a test')
      ).not.toBeInTheDocument()

      fireEvent.click(
        screen.getByText('Invite to Codility test', { exact: false })
      )

      expect(
        screen.queryByPlaceholderText('Please select a test')
      ).toBeInTheDocument()
    })
  })

  describe('when submitting the form', () => {
    it('succesfuly creates a new test attempt and display a notification', async () => {
      const CODILITY_TEST_NAME = 'Super algorithm'
      const COMMENT_VALUE = 'some comment'
      const ONLINE_TEST_ATTEMPT_ID = 'XYZ'
      const ONLINE_TEST_ID = 'VjEtQ29kaWxpdHlUZXN0LTI'
      const TALENT_ID = '456'

      const onlineTests = {
        nodes: [
          {
            id: 'VjEtQ29kaWxpdHlUZXN0LTI',
            name: CODILITY_TEST_NAME,
            service: 'Codility',
            __typename: 'CodilityTest'
          }
        ],
        __typename: 'OnlineTestConnection'
      }

      const formData = generateFormData({
        onlineTestAttemptId: ONLINE_TEST_ATTEMPT_ID
      })

      formData.data.onlineTests = onlineTests

      arrangeTest({
        formProps: formData,
        mocks: [
          createSendNewOnlineTestAttemptMock({
            comment: COMMENT_VALUE,
            onlineTestAttemptId: ONLINE_TEST_ATTEMPT_ID,
            onlineTestId: ONLINE_TEST_ID
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

      fireEvent.click(
        screen.getByText('Invite to Codility test', { exact: false })
      )
      fireEvent.click(screen.getByPlaceholderText('Please select a test'))

      const selectTest = await screen.findByText(CODILITY_TEST_NAME)

      expect(selectTest).toBeInTheDocument()

      fireEvent.click(selectTest)

      fireEvent.change(comment, { target: { value: COMMENT_VALUE } })

      // form does not forward the prop data-testid
      const form = screen.getByTestId('send-online-test-attempt-form')
        .parentNode as HTMLFormElement

      form.submit()

      expect(
        await screen.findByText('Online test attempt has been created.')
      ).toBeInTheDocument()
    })

    it('shows an notification error when another test is pending', async () => {
      const CODILITY_TEST_NAME = 'Super algorithm'
      const COMMENT_VALUE = 'some comment'
      const TALENT_ID = '456'
      const ONLINE_TEST_ATTEMPT_ID = 'XYZ'
      const ONLINE_TEST_ID = 'VjEtQ29kaWxpdHlUZXN0LTI'
      const ERROR_MESSAGE = 'There is already a pending test.'

      const onlineTests = {
        nodes: [
          {
            id: 'VjEtQ29kaWxpdHlUZXN0LTI',
            name: CODILITY_TEST_NAME,
            service: 'Codility',
            __typename: 'CodilityTest'
          }
        ],
        __typename: 'OnlineTestConnection'
      }

      const formData = generateFormData({
        onlineTestAttemptId: ONLINE_TEST_ATTEMPT_ID
      })

      formData.data.onlineTests = onlineTests

      arrangeTest({
        formProps: formData,
        mocks: [
          createSendNewOnlineTestAttemptFailedMock(
            {
              comment: COMMENT_VALUE,
              onlineTestAttemptId: ONLINE_TEST_ATTEMPT_ID,
              onlineTestId: ONLINE_TEST_ID
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

      fireEvent.click(
        screen.getByText('Invite to Codility test', { exact: false })
      )
      fireEvent.click(screen.getByPlaceholderText('Please select a test'))

      const selectTest = await screen.findByText(CODILITY_TEST_NAME)

      expect(selectTest).toBeInTheDocument()

      fireEvent.click(selectTest)

      fireEvent.change(comment, { target: { value: COMMENT_VALUE } })

      // form does not forward the prop data-testid
      const form = screen.getByTestId('send-online-test-attempt-form')
        .parentNode as HTMLFormElement

      form.submit()

      expect(await screen.findByText(ERROR_MESSAGE)).toBeInTheDocument()
    })
  })
})
