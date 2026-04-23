import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { MockedResponse } from '@staff-portal/data-layer-service'
import { TestWrapperWithMocks } from '@staff-portal/test-utils'
import {
  createGetTalentSkillSetsFailedMock,
  createGetTalentSkillSetsMock,
  createTalentSkillSetMock
} from '@staff-portal/talents/src/mocks'

import TalentSkillsSection from '../TalentSkillsSection'

const mockShowDevError = jest.fn()

jest.mock('@staff-portal/error-handling', () => ({
  useNotifications: () => ({
    showDevError: mockShowDevError
  })
}))

jest.mock('@staff-portal/talents/src/components/SkillTag/SkillTag.tsx', () => ({
  __esModule: true,
  default: ({ name }: { name: string }) => <>{name}</>
}))

const TALENT_ID = '123'

const arrangeTest = ({
  talentId,
  mocks = []
}: {
  talentId: string
  mocks?: MockedResponse[]
  errorBoundaryMessage?: string
}) =>
  render(
    <TestWrapperWithMocks mocks={mocks}>
      <TalentSkillsSection talentId={talentId} />
    </TestWrapperWithMocks>
  )

describe('TalentSkillsSection', () => {
  it('shows vetted skills fields', async () => {
    const getSkillSetsMock = createGetTalentSkillSetsMock({
      talentId: TALENT_ID,
      skillSets: [createTalentSkillSetMock()]
    })

    arrangeTest({
      talentId: TALENT_ID,
      mocks: [getSkillSetsMock]
    })

    const vettedSkillsFields = await screen.findByTestId(
      /vetted-skills-fields/i
    )

    expect(vettedSkillsFields).toBeInTheDocument()
  })

  it('shows dev notification error when the query fails', async () => {
    const talentId = TALENT_ID

    const getTalentFailedMock = createGetTalentSkillSetsFailedMock({
      talentId
    })

    arrangeTest({
      talentId,
      mocks: [getTalentFailedMock]
    })

    await waitFor(() =>
      expect(mockShowDevError).toHaveBeenCalledWith(
        'Failed fetching skill set fields.'
      )
    )
  })
})
