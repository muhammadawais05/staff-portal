import React, { ComponentProps } from 'react'
import { act, render, screen, fireEvent } from '@testing-library/react'
import {
  ChangeTalentInfractionInput,
  TalentInfractionReasonValue,
  TalentInfractionStatusValue
} from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'

import TalentInfractionEditModal from './TalentInfractionEditModal'
import { createTalentInfractionFragmentMock } from '../../data/talent-infraction-fragment/mocks'
import {
  createChangeTalentInfractionFailedMock,
  createChangeTalentInfractionMock
} from '../../data/change-talent-infraction/mocks'
import {
  useChangeTalentInfraction,
  useGetTalentInfractionAssignees,
  useGetTalentEngagements
} from '../../data'

jest.mock('../../data/change-talent-infraction', () => ({
  __esModule: true,
  useChangeTalentInfraction: jest.fn()
}))

jest.mock('../../data/get-talent-infraction-assignees', () => ({
  __esModule: true,
  useGetTalentInfractionAssignees: jest.fn()
}))

jest.mock('../../data/get-talent-engagements', () => ({
  __esModule: true,
  useGetTalentEngagements: jest.fn()
}))

// TODO avoid using real DatePicker in tests https://toptal-core.atlassian.net/browse/SPB-2311
jest.mock('@toptal/picasso/DatePicker', () =>
  jest.requireActual('@toptal/picasso/DatePicker')
)

const ASSIGNEES = [
  {
    id: 'assignee-id-1',
    fullName: 'Assignee #1'
  },
  {
    id: 'assignee-id-2',
    fullName: 'Assignee #2'
  }
]
const ENGAGEMENTS = [
  {
    id: 'VjEtRmxhZy0z',
    title: 'Client -> Senior Developer'
  },
  {
    id: 'VjEtU3RhZmYt',
    title: 'Client -> Junior Developer'
  }
]
const SELECTED_REASON = {
  slug: TalentInfractionReasonValue.LEGAL_PROBLEMS_BACKGROUND,
  title: 'Problems with background check'
}
const EDITED_DATA: Pick<
  ChangeTalentInfractionInput,
  | 'engagementId'
  | 'description'
  | 'occurredAt'
  | 'reasonSlug'
  | 'review'
  | 'summary'
  | 'addAttachments'
> = {
  engagementId: ENGAGEMENTS[1].id,
  description: 'Test description - edited',
  occurredAt: '2021-03-15' as const,
  reasonSlug: SELECTED_REASON.slug,
  review: 'Test review - edited',
  summary: 'Test summary - edited',
  addAttachments: undefined
}

const submitForm = async () => {
  fireEvent.click(screen.getByLabelText(/Status/))
  fireEvent.click(await screen.findByText('Remediated'))

  fireEvent.click(screen.getByLabelText(/Assignee/))
  fireEvent.click(await screen.findByText(ASSIGNEES[0].fullName))

  fireEvent.change(screen.getByLabelText(/Summary/), {
    target: { value: EDITED_DATA.summary }
  })

  fireEvent.click(screen.getByLabelText(/Reason/))
  fireEvent.click(await screen.findByText(SELECTED_REASON.title))

  fireEvent.change(screen.getByLabelText(/When Occurred/), {
    target: { value: EDITED_DATA.occurredAt }
  })

  fireEvent.click(screen.getByLabelText(/Link Infraction With an Engagement/))
  fireEvent.click(await screen.findByText(ENGAGEMENTS[1].title))

  fireEvent.change(screen.getByLabelText(/Details/), {
    target: { value: EDITED_DATA.description }
  })
  fireEvent.change(screen.getByLabelText(/Review/), {
    target: { value: EDITED_DATA.review }
  })
  fireEvent.click(screen.getByText(/Update/))
}

const arrangeTest = (props: ComponentProps<typeof TalentInfractionEditModal>) =>
  render(
    <TestWrapper>
      <TalentInfractionEditModal {...props} />
    </TestWrapper>
  )

describe('TalentInfractionEditModal', () => {
  const mockedUseChangeTalentInfraction = useChangeTalentInfraction as jest.Mock
  const mockedUseGetTalentInfractionAssignees =
    useGetTalentInfractionAssignees as jest.Mock
  const mockedUseGetTalentEngagements = useGetTalentEngagements as jest.Mock

  const infraction = createTalentInfractionFragmentMock()
  const variables = {
    talentInfractionId: infraction.id,
    taskAssigneeId: ASSIGNEES[0].id,
    status: TalentInfractionStatusValue.REMEDIATED,
    ...EDITED_DATA
  }

  beforeEach(() => {
    mockedUseGetTalentEngagements.mockReturnValue({
      data: ENGAGEMENTS.map(({ id, title }) => ({
        id,
        webResource: { text: title }
      })),
      loading: false
    })
    mockedUseGetTalentInfractionAssignees.mockReturnValue({
      data: ASSIGNEES,
      loading: false
    })
  })

  it('shows a success message when the infraction is edited', async () => {
    const hideModal = jest.fn()

    mockedUseChangeTalentInfraction.mockReturnValue([
      jest.fn(() => createChangeTalentInfractionMock(variables).result),
      {
        loading: false
      }
    ])

    arrangeTest({
      infraction,
      hideModal
    })

    await act(() => submitForm())

    expect(
      await screen.queryByText('The Infraction was successfully updated.')
    ).toBeInTheDocument()
    expect(hideModal).toHaveBeenCalled()
  })

  it('shows an error message when unable to edit the infraction', async () => {
    const ERROR_MESSAGE = 'Some error message'
    const hideModal = jest.fn()

    mockedUseChangeTalentInfraction.mockReturnValue([
      jest.fn(
        () =>
          createChangeTalentInfractionFailedMock(variables, ERROR_MESSAGE)
            .result
      ),
      {
        loading: false
      }
    ])

    arrangeTest({
      infraction,
      hideModal
    })

    await act(() => submitForm())

    expect(await screen.queryByText(ERROR_MESSAGE)).toBeInTheDocument()
    expect(hideModal).not.toHaveBeenCalled()
  })
})
