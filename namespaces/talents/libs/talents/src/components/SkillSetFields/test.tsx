import React from 'react'
import { render, screen, waitFor, within } from '@testing-library/react'
import { useNotifications } from '@toptal/picasso/utils'
import { SkillRating } from '@staff-portal/graphql/staff'
import { MockedResponse } from '@staff-portal/data-layer-service'
import { TestWrapperWithMocks, assertOnTooltip } from '@staff-portal/test-utils'

import { useGetTalentSkillSets } from './data/get-talent-skill-sets.staff.gql'
import {
  createGetTalentSkillSetsFailedMock,
  createGetTalentSkillSetsMock,
  createTalentSkillSetMock,
  createTalentProfileSkillMock,
  createTalentCertificationSkillMock,
  createTalentEducationSkillMock
} from './data/mocks'
import { createGetTalentSkillTooltipContentMock } from './data/get-talent-skill-tooltip-content/mocks'
import { SkillSetField } from './components'
import { TRANSLATIONS } from './components/SkillTagTooltip/utils/generate-section-name'
import { TalentSkillTypename } from './components/SkillTagTooltip/config'

const mockShowDevError = jest.fn()

jest.mock('@staff-portal/error-handling', () => ({
  useNotifications: () => ({
    showDevError: mockShowDevError
  })
}))

jest.mock('./components/SkillTagWithAsyncTooltip', () => ({
  __esModule: true,
  default: ({
    name,
    rating,
    onMouseEnter
  }: {
    name: string
    rating: string
    onMouseEnter: () => void
  }) => {
    return (
      <a
        href={`${rating}/${name}`}
        role='tooltip'
        onMouseEnter={onMouseEnter}
        data-testid='skill-tag-link'
      >
        {name}
      </a>
    )
  }
}))

const TALENT_ID = '123'
const TALENT_TYPE = 'Developer'
const ERROR_MESSAGE = 'Failed fetching.'

const TestComponent = () => {
  const { showError } = useNotifications()
  const { skillSets } = useGetTalentSkillSets({
    talentId: TALENT_ID,
    onError: () => showError(ERROR_MESSAGE)
  })

  return <SkillSetField talentType={TALENT_TYPE} skills={skillSets} />
}

const arrangeTest = (mocks: MockedResponse[] = []) =>
  render(
    <TestWrapperWithMocks mocks={mocks}>
      <TestComponent />
    </TestWrapperWithMocks>
  )

describe('SkillSetField', () => {
  describe('when the query fails while fetching skill sets', () => {
    it('shows an error', async () => {
      arrangeTest([createGetTalentSkillSetsFailedMock({ talentId: TALENT_ID })])

      await expect(() =>
        waitFor(() => {
          expect(mockShowDevError).toHaveBeenCalledWith(ERROR_MESSAGE)
        })
      ).rejects.toThrow()
    })
  })

  describe('when clicking on a skill', () => {
    it('redirects to the talent list page filtered by the selected skill', async () => {
      const SKILL_SET = {
        id: '123',
        skillName: 'MacOs',
        rating: SkillRating.EXPERT
      }

      const LINK_PATH = `${SKILL_SET.rating}/${SKILL_SET.skillName}`

      const mock = createGetTalentSkillSetsMock({
        talentId: TALENT_ID,
        skillSets: [createTalentSkillSetMock({ ...SKILL_SET })]
      })

      arrangeTest([mock])

      const skillTag = await screen.findByTestId('skill-tag-link')

      expect(skillTag).toHaveAttribute('href', LINK_PATH)
    })
  })

  describe('when hovering a skill', () => {
    it('loads tooltip content showing talent experiences separated by sections, sorted alphabetically, with correct experiences amount', async () => {
      const SKILL_SET_ID = '123'

      const SKILL_SET = {
        id: SKILL_SET_ID,
        skillName: 'MacOs',
        rating: SkillRating.EXPERT
      }

      const FIRST_SECTION = {
        name: TRANSLATIONS[TalentSkillTypename.TALENT_CERTIFICATION](
          TALENT_TYPE
        ),
        amount: '1'
      }
      const SECOND_SECTION = {
        name: TRANSLATIONS[TalentSkillTypename.TALENT_EDUCATION](TALENT_TYPE),
        amount: '1'
      }
      const THIRD_SECTION = {
        name: TRANSLATIONS[TalentSkillTypename.TALENT_PROFILE](TALENT_TYPE),
        amount: '3'
      }

      const skillSetMock = createGetTalentSkillSetsMock({
        talentId: TALENT_ID,
        skillSets: [
          createTalentSkillSetMock({
            ...SKILL_SET
          })
        ]
      })

      const tooltipContentMock = createGetTalentSkillTooltipContentMock({
        skillSetId: SKILL_SET_ID,
        skillSetConnections: {
          nodes: [
            createTalentProfileSkillMock(),
            createTalentProfileSkillMock(),
            createTalentProfileSkillMock(),
            createTalentCertificationSkillMock(),
            createTalentEducationSkillMock()
          ]
        }
      })

      arrangeTest([skillSetMock, tooltipContentMock])

      const skillInnerTag = await screen.findByTestId('skill-tag-link')

      assertOnTooltip(skillInnerTag, async tooltip => {
        const sectionNames = await within(tooltip).findAllByTestId(
          'skill-tag-tooltip-section-name'
        )
        const sectionAmounts = await within(tooltip).findAllByTestId(
          'skill-tag-tooltip-section-amount'
        )

        expect(sectionNames).toHaveLength(3)
        expect(sectionAmounts).toHaveLength(3)
        expect(sectionNames[0]).toHaveTextContent(FIRST_SECTION.name)
        expect(sectionAmounts[0]).toHaveTextContent(FIRST_SECTION.amount)
        expect(sectionNames[1]).toHaveTextContent(SECOND_SECTION.name)
        expect(sectionAmounts[1]).toHaveTextContent(SECOND_SECTION.amount)
        expect(sectionNames[2]).toHaveTextContent(THIRD_SECTION.name)
        expect(sectionAmounts[2]).toHaveTextContent(THIRD_SECTION.amount)
      })
    })
  })
})
