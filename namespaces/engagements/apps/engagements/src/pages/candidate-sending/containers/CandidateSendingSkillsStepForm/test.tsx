import React, { ComponentProps } from 'react'
import { TestWrapper } from '@staff-portal/test-utils'
import { render, screen } from '@testing-library/react'
import {
  NewEngagementWizardStep,
  SkillVettingResult
} from '@staff-portal/graphql/staff'
import { useFormState, Form } from '@toptal/picasso-forms'

import { CandidateSendingStepAttributes } from '../../types'
import CandidateSendingSkillsStepForm from './CandidateSendingSkillsStepForm'

jest.mock('@toptal/picasso-forms', () => ({
  ...jest.requireActual('@toptal/picasso-forms'),
  useFormState: jest.fn()
}))

const useFormStateMock = useFormState as jest.Mock

const arrangeTest = (
  props?: Partial<ComponentProps<typeof CandidateSendingSkillsStepForm>>,
  stateValues: CandidateSendingStepAttributes<NewEngagementWizardStep.SKILLS> = {}
) => {
  useFormStateMock.mockReturnValue({ values: stateValues })

  return render(
    <TestWrapper>
      <Form onSubmit={() => {}}>
        <CandidateSendingSkillsStepForm {...props} />
      </Form>
    </TestWrapper>
  )
}

describe('CandidateSendingSkillsStepForm', () => {
  describe('when there is `webResource` & `skillName`', () => {
    it('renders header section', () => {
      arrangeTest({
        webResource: {
          url: 'https://some-url',
          text: 'Tom Jones'
        },
        skillName: 'Javascript'
      })

      expect(
        screen.getByTestId('candidate-sending-skills-step-form-header')
          .textContent
      ).toContain('This client requires an expert in Javascript')
      expect(
        screen.getByTestId('candidate-sending-skills-step-form-header')
          .textContent
      ).toContain("Please verify Tom Jones's expertise in Javascript")
    })
  })
  describe('when there is no `webResource` or `skillName', () => {
    it('does not render header section', () => {
      arrangeTest()

      expect(
        screen.queryByTestId('candidate-sending-skills-step-form-header')
      ).not.toBeInTheDocument()
    })
  })

  describe('when `skillVettingResult` equals `NO`', () => {
    it('renders comment section', () => {
      arrangeTest(undefined, { skillVettingResult: SkillVettingResult.NO })

      expect(
        screen.getByTestId('candidate-sending-skills-step-form-comment')
      ).toBeInTheDocument()
    })
  })

  describe('when `skillVettingResult` does not equal `NO`', () => {
    it('does not render comment section', () => {
      arrangeTest(undefined, { skillVettingResult: SkillVettingResult.EXPERT })

      expect(
        screen.queryByTestId('candidate-sending-skills-step-form-comment')
      ).not.toBeInTheDocument()
    })
  })
})
