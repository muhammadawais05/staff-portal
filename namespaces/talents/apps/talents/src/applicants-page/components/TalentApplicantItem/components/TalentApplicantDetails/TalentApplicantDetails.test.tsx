import React, { ReactNode } from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import { OperationCallableTypes } from '@staff-portal/graphql/staff'

import { TalentApplicantListItemType } from '../../../../types/talent-applicant-list-item'
import TalentApplicantDetails from './TalentApplicantDetails'
import TalentScreeningSteps from '../../../TalentScreeningSteps'
import TalentActivationSteps from '../../../TalentActivationSteps'

jest.mock('@staff-portal/talents', () => ({
  StatusField: () => <div />,
  SpecializationsField: () => <div />
}))

jest.mock('@staff-portal/role-profile', () => ({
  LastLoginField: () => <div />
}))

jest.mock('@staff-portal/talents-profile', () => ({
  ApplicantSkillsField: () => <div />
}))

jest.mock('@staff-portal/current-user', () => ({
  useUserDateFormatter: () => jest.fn(),
  useUserDateTimeFormatter: () => jest.fn()
}))

jest.mock('@staff-portal/date-time-utils', () => ({
  getTimeZoneFullText: jest.fn()
}))

jest.mock('@staff-portal/navigation', () => ({
  ...jest.requireActual('@staff-portal/navigation'),
  Link: ({ children }: { children: ReactNode }) => <>{children}</>
}))

jest.mock('../TalentApplicantHistoryEntryField', () => ({
  __esModule: true,
  default: () => 'History entry'
}))

jest.mock('../../../TalentScreeningSteps', () => ({
  __esModule: true,
  default: jest.fn()
}))
jest.mock('../../../TalentActivationSteps', () => ({
  __esModule: true,
  default: jest.fn()
}))

const TalentScreeningStepsMock = TalentScreeningSteps as jest.Mock
const TalentActivationStepsMock = TalentActivationSteps as jest.Mock

const arrangeTest = (props: Partial<TalentApplicantListItemType> = {}) => {
  render(
    <TestWrapper>
      <TalentApplicantDetails
        talent={{ ...props } as TalentApplicantListItemType}
      />
    </TestWrapper>
  )
}

describe('Talent Applicant Item Details', () => {
  beforeEach(() => {
    TalentScreeningStepsMock.mockImplementation(() => (
      <div data-testid='screening-steps' />
    ))
    TalentActivationStepsMock.mockImplementation(() => (
      <div data-testid='activation-steps'/>
    ))
  })

  it('shows certain fields', async () => {
    arrangeTest({
      operations: {
        updateTalentApplicantSkills: {
          callable: OperationCallableTypes.ENABLED,
          messages: []
        }
      }
    } as unknown as TalentApplicantListItemType)

    expect(screen.getByTestId(/item-field: Email/i)).toBeInTheDocument()
    expect(screen.getByTestId(/item-field: Status/i)).toBeInTheDocument()
    expect(screen.getByTestId(/item-field: Role/i)).toBeInTheDocument()
    expect(screen.getByTestId(/item-field: Applied/i)).toBeInTheDocument()
    expect(screen.getByTestId(/item-field: Last Edited/i)).toBeInTheDocument()
    expect(screen.getByTestId(/item-field: Last Login/i)).toBeInTheDocument()
    expect(
      screen.getByTestId(/item-field: Current Country/i)
    ).toBeInTheDocument()
    expect(
      screen.getByTestId(/item-field: Specializations/i)
    ).toBeInTheDocument()
    expect(
      screen.getByTestId(/item-field: Applicant Skills/i)
    ).toBeInTheDocument()
    expect(screen.getByText('History entry')).toBeInTheDocument()
  })

  it('hides Applicant skills field when the user is not allowed', () => {
    arrangeTest({
      operations: {
        updateTalentApplicantSkills: {
          callable: OperationCallableTypes.HIDDEN,
          messages: []
        }
      }
    } as unknown as TalentApplicantListItemType)

    expect(
      screen.queryByTestId(/item-field: Applicant Skills/i)
    ).not.toBeInTheDocument()
  })

  it('passed talentId to screeining and activation sections', () => {
    const TEST_ID = 'test-talent-id'

    arrangeTest({
      id: TEST_ID,
      operations: {
        updateTalentApplicantSkills: {
          callable: OperationCallableTypes.HIDDEN,
          messages: []
        }
      }
    } as unknown as TalentApplicantListItemType)

    expect(TalentActivationStepsMock).toHaveBeenCalledWith(
      expect.objectContaining({
        talentId: TEST_ID
      }),
      expect.anything()
    )
    expect(TalentScreeningStepsMock).toHaveBeenCalledWith(
      expect.objectContaining({
        talentId: TEST_ID
      }),
      expect.anything()
    )
  })
})
