import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import {
  CreateTalentSoftSkillRatingInput,
  SoftSkillRatingValue
} from '@staff-portal/graphql/staff'
import { MockedResponse } from '@staff-portal/data-layer-service'
import { TestWrapperWithMocks, assertOnTooltip } from '@staff-portal/test-utils'

import CreateTalentSoftSkillRatingModal, {
  Props
} from './CreateTalentSoftSkillRatingModal'
import {
  createCreateTalentSoftSkillRatingFailedMock,
  createCreateTalentSoftSkillRatingMock
} from './data/create-talent-soft-skill-rating/mocks'
import { createGetTalentSoftSkillsMock } from '../../../../data/get-talent-soft-skills/mocks'

const defaultProps: Props = {
  hideModal: jest.fn(),
  talentId: 'talent-id',
  talentName: 'talent name',
  softSkill: {
    id: 'soft-skill-id',
    name: 'soft skill name',
    cumulativeRating: 3,
    ratings: [],
    ratingHints: [
      {
        description: 'Description 1',
        title: 'Title 1',
        value: SoftSkillRatingValue.RATING_1
      },
      {
        description: 'Description 2',
        title: 'Title 2',
        value: SoftSkillRatingValue.RATING_2
      },
      {
        description: 'Description 3',
        title: 'Title 3',
        value: SoftSkillRatingValue.RATING_3
      },
      {
        description: 'Description 4',
        title: 'Title 4',
        value: SoftSkillRatingValue.RATING_4
      },
      {
        description: 'Description 5',
        title: 'Title 5',
        value: SoftSkillRatingValue.RATING_5
      }
    ]
  }
}

const arrangeTest = (mocks: MockedResponse[], props = defaultProps) =>
  render(
    <TestWrapperWithMocks mocks={mocks}>
      <CreateTalentSoftSkillRatingModal {...props} />
    </TestWrapperWithMocks>
  )

// TODO: https://toptal-core.atlassian.net/browse/SP-1448
// eslint-disable-next-line jest/no-disabled-tests
describe.skip('CreateTalentSoftSkillRatingModal', () => {
  it('creates a soft skill rating', async () => {
    const input: CreateTalentSoftSkillRatingInput = {
      talentId: defaultProps.talentId,
      softSkillId: defaultProps.softSkill.id,
      rating: 4,
      comment: 'The comment'
    }

    arrangeTest([
      createGetTalentSoftSkillsMock(undefined, undefined, input.talentId),
      createCreateTalentSoftSkillRatingMock({
        input,
        success: true
      })
    ])

    expect(
      screen.getByText(
        `Rate ${defaultProps.talentName} on ${defaultProps.softSkill.name}`
      )
    ).toBeInTheDocument()

    fireEvent.click(screen.getByTestId(`rating-${input.rating}`))

    fireEvent.change(screen.getByLabelText(/Comment/), {
      target: { value: input.comment }
    })

    fireEvent.click(screen.getByText('Rate'))

    expect(
      await screen.findByText('Talent has been rated.')
    ).toBeInTheDocument()
  })

  it('shows a tooltip to each soft skill rating star', async () => {
    const {
      softSkill: { ratingHints }
    } = defaultProps
    const input: CreateTalentSoftSkillRatingInput = {
      talentId: defaultProps.talentId,
      softSkillId: defaultProps.softSkill.id,
      rating: 4,
      comment: 'The comment'
    }

    arrangeTest([
      createGetTalentSoftSkillsMock(undefined, undefined, input.talentId),
      createCreateTalentSoftSkillRatingMock({
        input,
        success: true
      })
    ])

    ratingHints.forEach(ratingHint => {
      assertOnTooltip(
        screen.getByTestId(`rating-icon: ${ratingHint.value}`),
        tooltip => {
          expect(tooltip).toHaveTextContent(ratingHint.title)
          expect(tooltip).toHaveTextContent(ratingHint.description)
        }
      )
    })
  })

  it('shows an error message', async () => {
    const input: CreateTalentSoftSkillRatingInput = {
      talentId: defaultProps.talentId,
      softSkillId: defaultProps.softSkill.id,
      rating: 4,
      comment: 'The comment'
    }

    arrangeTest([createCreateTalentSoftSkillRatingFailedMock(input)])

    expect(
      screen.getByText(
        `Rate ${defaultProps.talentName} on ${defaultProps.softSkill.name}`
      )
    ).toBeInTheDocument()

    fireEvent.click(screen.getByTestId(`rating-${input.rating}`))

    fireEvent.change(screen.getByLabelText(/Comment/), {
      target: { value: input.comment }
    })

    fireEvent.click(screen.getByText('Rate'))

    expect(
      await screen.findByText('Unable to rate soft skill.')
    ).toBeInTheDocument()
  })
})
