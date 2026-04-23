import {
  fireEvent,
  render,
  screen,
  within,
  waitFor
} from '@testing-library/react'
import React from 'react'
import {
  ProfileField,
  ProfileWizardStep,
  ScreeningStep
} from '@staff-portal/graphql/staff'
import { MockedResponse } from '@staff-portal/data-layer-service'
import { TestWrapperWithMocks } from '@staff-portal/test-utils'
import { createGetTalentApplicationsSkillsAutoCompleteMock } from '@staff-portal/talents/src/mocks'

import {
  ApplyToDifferentVerticalModal,
  Props
} from './components/ApplyToDifferentVerticalModal'
import {
  createApplyTalentToAnotherVerticalFailedMock,
  createApplyTalentToAnotherVerticalInvalidMock,
  createApplyTalentToAnotherVerticalMock
} from './data/apply-talent-to-another-vertical/mocks'
import { createGetApplyToDifferentVerticalStepsMock } from './data/get-apply-to-different-vertical-steps/mocks'

const TALENT_ID = 'abc123'

const defaultProps: Props = {
  talentId: TALENT_ID,
  fullName: 'Test Name',
  type: 'TestRoleType',
  verticals: [
    {
      id: 'test-vertical-123',
      talentType: 'ProjectManager',
      specializations: { nodes: [] }
    }
  ],
  hideModal: () => {}
}

const arrangeTest = ({
  props,
  mocks = []
}: {
  props?: Partial<Props>
  mocks: MockedResponse[]
}) => {
  const fullProps = {
    ...defaultProps,
    ...props
  } as Props

  render(
    <TestWrapperWithMocks mocks={mocks}>
      <ApplyToDifferentVerticalModal
        talentId={fullProps.talentId}
        fullName={fullProps.fullName}
        type={fullProps.type}
        verticals={fullProps.verticals}
        hideModal={fullProps.hideModal}
      />
    </TestWrapperWithMocks>
  )
}

const createGetSkillsMock = ({
  verticalId,
  skillId,
  skillName
}: {
  verticalId: string
  skillId: string
  skillName: string
}) =>
  createGetTalentApplicationsSkillsAutoCompleteMock(
    [
      {
        key: '1',
        labelHighlight: skillName,
        node: { id: skillId, name: skillName, __typename: 'Skill' }
      }
    ],
    {
      talentOrVerticalId: verticalId,
      limit: 6,
      offset: 0,
      term: skillName,
      excludedIds: []
    }
  )

const fillAndSubmitForm = async ({ skillName }: { skillName: string }) => {
  fireEvent.click(screen.getByLabelText(/New Vertical/))
  fireEvent.click(screen.getByText('Test Vertical Type'))
  fireEvent.click(screen.getByTestId('talent-applicant-skills-selector-input'))
  fireEvent.change(
    screen.getByTestId('talent-applicant-skills-selector-input'),
    {
      target: { value: skillName }
    }
  )

  await waitFor(async () => {
    fireEvent.click(
      within(await screen.findByTestId('go-to-user-label')).getByText(skillName)
    )
  })

  fireEvent.click(screen.getByTestId('apply-talent-button'))
}

describe('ApplyTalentToAnotherVerticalModal', () => {
  it('displays Talent name and original vertical', async () => {
    const TALENT_NAME = 'Test Name dcu82s'
    const ROLE_TYPE = 'ProjectManager'

    arrangeTest({
      props: { fullName: TALENT_NAME, type: ROLE_TYPE },
      mocks: [createGetApplyToDifferentVerticalStepsMock(TALENT_ID)]
    })

    await waitFor(() => {
      expect(screen.getByTestId('talent-name')).toHaveTextContent(
        `Name: ${TALENT_NAME}`
      )
      expect(screen.getByTestId('talent-original-vertical')).toHaveTextContent(
        `Original Vertical: Project Manager`
      )
    })
  })

  describe('when vertical is selected', () => {
    it('enables skills selection', async () => {
      arrangeTest({
        props: {
          verticals: [
            {
              id: 'test-vertical-123',
              talentType: 'test_vertical_type',
              specializations: { nodes: [] }
            }
          ]
        },
        mocks: [createGetApplyToDifferentVerticalStepsMock(TALENT_ID)]
      })

      await waitFor(() => {
        expect(
          screen.getByTestId('talent-applicant-skills-selector-input')
        ).toBeDisabled()

        fireEvent.click(screen.getByLabelText(/New Vertical/))
        fireEvent.click(screen.getByText('Test Vertical Type'))

        expect(
          screen.getByTestId('talent-applicant-skills-selector-input')
        ).toBeEnabled()
      })
    })
  })

  describe('when vertical is changed', () => {
    it('resets list of skills', async () => {
      const VERTICAL_ID_INITIAL = 'dkc72d'
      const VERTICAL_TYPE_INITIAL = 'test_vertical_type_initial'
      const VERTICAL_TYPE_CHANGED = 'test_vertical_type_changed'
      const SKILL_NAME = 'Skill100'

      arrangeTest({
        props: {
          verticals: [
            {
              id: VERTICAL_ID_INITIAL,
              talentType: VERTICAL_TYPE_INITIAL,
              specializations: { nodes: [] }
            },
            {
              id: 'test-vertical-1001',
              talentType: VERTICAL_TYPE_CHANGED,
              specializations: { nodes: [] }
            }
          ]
        },
        mocks: [
          createGetApplyToDifferentVerticalStepsMock(TALENT_ID),
          createGetSkillsMock({
            verticalId: VERTICAL_ID_INITIAL,
            skillName: SKILL_NAME,
            skillId: 'test-skill-100'
          })
        ]
      })

      await waitFor(async () => {
        fireEvent.click(screen.getByLabelText(/New Vertical/))
        fireEvent.click(screen.getByText('Test Vertical Type Initial'))
        fireEvent.click(
          screen.getByTestId('talent-applicant-skills-selector-input')
        )
        fireEvent.change(
          screen.getByTestId('talent-applicant-skills-selector-input'),
          {
            target: { value: SKILL_NAME }
          }
        )
        fireEvent.click(await screen.findByText(SKILL_NAME))
        expect(
          await screen.findByTestId(`selected-skill-${SKILL_NAME}`)
        ).toBeInTheDocument()
      })

      await waitFor(() => {
        fireEvent.click(screen.getByLabelText(/New Vertical/))
        fireEvent.click(screen.getByText('Test Vertical Type Changed'))
        expect(
          screen.queryByTestId(`selected-skill-${SKILL_NAME}`)
        ).not.toBeInTheDocument()
      })
    })
  })

  it('selects and disables steps depends on completed steps', async () => {
    const steps = {
      completedScreeningSteps: [ScreeningStep.ENGLISH],
      completedProfileWizardSteps: [ProfileWizardStep.CERTIFICATIONS],
      completedProfileFields: []
    }

    arrangeTest({
      mocks: [createGetApplyToDifferentVerticalStepsMock(TALENT_ID, steps)]
    })

    await waitFor(() => {
      const english = screen
        .getByTestId(ScreeningStep.ENGLISH)
        .querySelector('input')
      const onboardingQuestions = screen
        .getByTestId(ScreeningStep.ONBOARDING_QUESTIONS)
        .querySelector('input')
      const certifications = screen
        .getByTestId(ProfileWizardStep.CERTIFICATIONS)
        .querySelector('input')
      const resume = screen
        .getByTestId(ProfileField.RESUME)
        .querySelector('input')

      expect(english).toBeChecked()
      expect(english).not.toBeDisabled()
      expect(onboardingQuestions).not.toBeChecked()
      expect(onboardingQuestions).toBeDisabled()
      expect(certifications).toBeChecked()
      expect(certifications).not.toBeDisabled()
      expect(resume).not.toBeChecked()
      expect(resume).toBeDisabled()
    })
  })

  describe('when Talent update request succeeds', () => {
    it('shows successful notification', async () => {
      const TALENT_NAME = 'Test Talent Name dkd82s'
      const VERTICAL_ID = 'ao902k'
      const SKILL_ID = 'test-skill-200'
      const SKILL_NAME = 'Skill200'

      const hideModal = jest.fn()

      arrangeTest({
        props: {
          talentId: TALENT_ID,
          fullName: TALENT_NAME,
          hideModal,
          verticals: [
            {
              id: VERTICAL_ID,
              talentType: 'test_vertical_type',
              specializations: { nodes: [] }
            }
          ]
        },
        mocks: [
          createGetSkillsMock({
            verticalId: VERTICAL_ID,
            skillName: SKILL_NAME,
            skillId: SKILL_ID
          }),
          createApplyTalentToAnotherVerticalMock({
            talentId: TALENT_ID,
            newVerticalId: VERTICAL_ID,
            applicantSkillIds: [SKILL_ID],
            newApplicantSkillNames: [],
            screeningSteps: [],
            profileWizardSteps: [],
            profileFields: []
          }),
          createGetApplyToDifferentVerticalStepsMock(TALENT_ID)
        ]
      })

      await waitFor(async () => {
        await fillAndSubmitForm({ skillName: SKILL_NAME })

        expect(
          await screen.findByText(
            'A new Test Vertical Type role has been created for Test Talent Name dkd82s.'
          )
        ).toBeInTheDocument()
        expect(hideModal).toHaveBeenCalled()
      })
    })
  })

  describe('when Talent update request fails', () => {
    it('shows error notification', async () => {
      const TALENT_NAME = 'Test Talent Name ch62as'
      const VERTICAL_ID = 'bo8aas'
      const SKILL_ID = 'test-skill-300'
      const SKILL_NAME = 'Skill300'

      const hideModal = jest.fn()

      arrangeTest({
        props: {
          talentId: TALENT_ID,
          fullName: TALENT_NAME,
          hideModal,
          verticals: [
            {
              id: VERTICAL_ID,
              talentType: 'test_vertical_type',
              specializations: { nodes: [] }
            }
          ]
        },
        mocks: [
          createGetSkillsMock({
            verticalId: VERTICAL_ID,
            skillName: SKILL_NAME,
            skillId: SKILL_ID
          }),
          createApplyTalentToAnotherVerticalFailedMock({
            talentId: TALENT_ID,
            newVerticalId: VERTICAL_ID,
            applicantSkillIds: [SKILL_ID],
            newApplicantSkillNames: [],
            screeningSteps: [],
            profileWizardSteps: [],
            profileFields: []
          }),
          createGetApplyToDifferentVerticalStepsMock(TALENT_ID)
        ]
      })

      await waitFor(async () => {
        await fillAndSubmitForm({ skillName: SKILL_NAME })

        expect(
          await screen.findByText(
            'An error occurred, the talent was not applied to another vertical.'
          )
        ).toBeInTheDocument()
      })
    })
  })

  describe('when Talent update request is invalid', () => {
    it('shows error notification', async () => {
      const TALENT_NAME = 'Test Talent Name ao2mas'
      const VERTICAL_ID = 'o22mss'
      const SKILL_ID = 'test-skill-400'
      const SKILL_NAME = 'Skill400'
      const ERROR_MESSAGE = 'Test Error Message.'

      const hideModal = jest.fn()

      arrangeTest({
        props: {
          talentId: TALENT_ID,
          fullName: TALENT_NAME,
          hideModal,
          verticals: [
            {
              id: VERTICAL_ID,
              talentType: 'test_vertical_type',
              specializations: { nodes: [] }
            }
          ]
        },
        mocks: [
          createGetSkillsMock({
            verticalId: VERTICAL_ID,
            skillName: SKILL_NAME,
            skillId: SKILL_ID
          }),
          createApplyTalentToAnotherVerticalInvalidMock(
            {
              talentId: TALENT_ID,
              newVerticalId: VERTICAL_ID,
              applicantSkillIds: [SKILL_ID],
              newApplicantSkillNames: [],
              screeningSteps: [],
              profileWizardSteps: [],
              profileFields: []
            },
            [
              {
                message: ERROR_MESSAGE
              }
            ]
          ),
          createGetApplyToDifferentVerticalStepsMock(TALENT_ID)
        ]
      })

      await waitFor(async () => {
        await fillAndSubmitForm({ skillName: SKILL_NAME })

        expect(screen.getByText(ERROR_MESSAGE)).toBeInTheDocument()
      })
    })
  })
})
