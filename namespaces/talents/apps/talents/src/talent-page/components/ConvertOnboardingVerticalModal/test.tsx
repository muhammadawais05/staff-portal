import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import {
  MockedResponse,
  encodeEntityId
} from '@staff-portal/data-layer-service'
import { TestWrapperWithMocks } from '@staff-portal/test-utils'
import { TalentVerticalFragment } from '@staff-portal/talents'

import ConvertOnboardingVerticalModal, {
  Props
} from './ConvertOnboardingVerticalModal'
import {
  createConvertOnboardingTalentInvalidMock,
  createConvertOnboardingTalentFailedMock,
  createConvertOnboardingTalentMock
} from './data/convert-onboarding-talent/mocks'

const arrangeTest = (
  {
    talentId = encodeEntityId('123', 'Test'),
    fullName = 'TEST_NAME',
    type = 'TEST_TYPE',
    verticals = [],
    hideModal = () => {}
  }: Partial<Props>,
  mocks: MockedResponse[] = []
) =>
  render(
    <TestWrapperWithMocks mocks={mocks}>
      <ConvertOnboardingVerticalModal
        talentId={talentId}
        fullName={fullName}
        type={type}
        verticals={verticals}
        hideModal={hideModal}
      />
    </TestWrapperWithMocks>
  )

describe('ConvertOnboardingVerticalModal', () => {
  it('displays Talent name and current type in the title', () => {
    const fullName = 'TEST_NAME'
    const type = 'developer'

    arrangeTest({ fullName, type })

    expect(
      screen.getByText(new RegExp(`Convert ${type} ${fullName}`, 'i'))
    ).toBeInTheDocument()
  })

  it('changes Talent vertical', async () => {
    const talentId = encodeEntityId('123', 'Test')
    const INITIAL_TALENT_TYPE = {
      VALUE: 'ProductManager',
      USER_FORMAT: 'Product Manager'
    }
    const vertical: TalentVerticalFragment = {
      id: encodeEntityId('123', 'Test'),
      talentType: 'Developer',
      specializations: { nodes: [] }
    }
    const hideModal = jest.fn()

    arrangeTest(
      {
        talentId,
        type: INITIAL_TALENT_TYPE.VALUE,
        verticals: [vertical],
        hideModal
      },
      [
        createConvertOnboardingTalentMock({
          talentId,
          toVerticalId: vertical.id
        })
      ]
    )

    fireEvent.click(screen.getByLabelText(/To/))
    fireEvent.click(screen.getByText(vertical.talentType))
    fireEvent.click(screen.getByRole('button', { name: 'Convert' }))

    expect(
      await screen.findByText(
        `The ${INITIAL_TALENT_TYPE.USER_FORMAT} was successfully converted to a ${vertical.talentType}.`
      )
    ).toBeInTheDocument()
    expect(hideModal).toHaveBeenCalled()
  })

  it('shows error if Talent conversion fails', async () => {
    const talentId = encodeEntityId('123', 'Test')
    const vertical: TalentVerticalFragment = {
      id: encodeEntityId('123', 'Test'),
      talentType: 'Developer',
      specializations: { nodes: [] }
    }
    const hideModal = jest.fn()

    arrangeTest({ talentId, verticals: [vertical], hideModal }, [
      createConvertOnboardingTalentFailedMock({
        talentId,
        toVerticalId: vertical.id
      })
    ])

    fireEvent.click(screen.getByLabelText(/To/))
    fireEvent.click(screen.getByText(vertical.talentType))
    fireEvent.click(screen.getByRole('button', { name: 'Convert' }))

    expect(
      await screen.findByText(
        'An error occurred, the vertical was not changed.'
      )
    ).toBeInTheDocument()
    expect(hideModal).not.toHaveBeenCalled()
  })

  it('shows error if Talent conversion request is invalid', async () => {
    const talentId = encodeEntityId('123', 'Test')
    const vertical: TalentVerticalFragment = {
      id: encodeEntityId('123', 'Test'),
      talentType: 'Developer',
      specializations: { nodes: [] }
    }
    const hideModal = jest.fn()
    const errorMessage = 'TEST_ERROR'

    arrangeTest({ talentId, verticals: [vertical], hideModal }, [
      createConvertOnboardingTalentInvalidMock(
        { talentId, toVerticalId: vertical.id },
        [{ key: 'base', message: errorMessage }]
      )
    ])

    fireEvent.click(screen.getByLabelText(/To/))
    fireEvent.click(screen.getByText(vertical.talentType))
    fireEvent.click(screen.getByRole('button', { name: 'Convert' }))

    expect(await screen.findByText(errorMessage)).toBeInTheDocument()
    expect(hideModal).not.toHaveBeenCalled()
  })
})
