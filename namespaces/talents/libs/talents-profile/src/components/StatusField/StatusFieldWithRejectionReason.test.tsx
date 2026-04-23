import React from 'react'
import { render } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import { DetailedListValueViewOptions } from '@staff-portal/ui'
import { StatusField, TalentInvestigation } from '@staff-portal/talents'

import { getSpecializationApplication } from './utils/get-specialization-application'
import { TalentStatusFragment } from './data/get-talent-status/get-talent-status.staff.gql.types'
import EditableRejectionReason from './components/EditableRejectionReason/EditableRejectionReason'
import StatusFieldWithRejectionReason from './StatusFieldWithRejectionReason'

jest.mock('@staff-portal/talents', () => ({
  ...jest.requireActual('@staff-portal/talents'),
  StatusField: jest.fn()
}))
jest.mock('./utils/get-specialization-application', () => ({
  getSpecializationApplication: jest.fn()
}))
jest.mock(
  './components/EditableRejectionReason/EditableRejectionReason',
  () => ({ __esModule: true, default: jest.fn() })
)

const StatusFieldMock = StatusField as jest.Mock
const getSpecializationApplicationMock =
  getSpecializationApplication as jest.Mock
const EditableRejectionReasonMock = EditableRejectionReason as jest.Mock

const TALENT_ID = Symbol() as unknown as string
const INVESTIGATIONS = { nodes: Symbol() as unknown as TalentInvestigation[] }
const TALENT_STATUS = {
  cumulativeStatus: Symbol(),
  specializationApplications: { nodes: Symbol() },
  newcomer: Symbol(),
  topShield: Symbol()
} as unknown as TalentStatusFragment
const OPTIONS = Symbol() as unknown as DetailedListValueViewOptions
const SPECIALIZATION = Symbol()

const renderComponent = () =>
  render(
    <TestWrapper>
      <StatusFieldWithRejectionReason
        talentId={TALENT_ID}
        investigations={INVESTIGATIONS}
        options={OPTIONS}
        talentStatus={TALENT_STATUS}
      />
    </TestWrapper>
  )

describe('StatusFieldWithRejectionReason', () => {
  describe('when there is talent status', () => {
    it('passes expected props to StatusField', () => {
      StatusFieldMock.mockReturnValue(null)
      getSpecializationApplicationMock.mockReturnValue(null)

      renderComponent()

      expect(StatusFieldMock).toHaveBeenCalledWith(
        {
          cumulativeStatus: TALENT_STATUS.cumulativeStatus,
          investigations: INVESTIGATIONS,
          newcomer: !!TALENT_STATUS.newcomer,
          topShield: TALENT_STATUS.topShield,
          options: OPTIONS
        },
        {}
      )
    })

    it('calls getSpecialization', () => {
      StatusFieldMock.mockReturnValue(null)
      getSpecializationApplicationMock.mockReturnValue(null)

      renderComponent()

      expect(getSpecializationApplicationMock).toHaveBeenCalledWith(
        TALENT_STATUS.specializationApplications?.nodes
      )
    })

    describe('when there is a specialization', () => {
      it('calls and passes expected props to EditableRejectionReason', () => {
        StatusFieldMock.mockReturnValue(null)
        getSpecializationApplicationMock.mockReturnValue(SPECIALIZATION)
        EditableRejectionReasonMock.mockReturnValue(null)

        renderComponent()

        expect(EditableRejectionReasonMock).toHaveBeenCalledWith(
          { talentId: TALENT_ID, specializationApplication: SPECIALIZATION },
          {}
        )
      })
    })

    describe('when there is no specialization', () => {
      it('does not call EditableRejectionReason', () => {
        StatusFieldMock.mockReturnValue(null)
        getSpecializationApplicationMock.mockReturnValue(null)

        renderComponent()

        expect(EditableRejectionReasonMock).not.toHaveBeenCalled()
      })
    })
  })

  describe('when there is no talent status', () => {
    it('returns null and does not call inner utils', () => {
      render(
        <TestWrapper>
          <StatusFieldWithRejectionReason
            talentId={TALENT_ID}
            investigations={INVESTIGATIONS}
            options={OPTIONS}
            talentStatus={undefined}
          />
        </TestWrapper>
      )

      expect(StatusFieldMock).not.toHaveBeenCalled()
      expect(getSpecializationApplicationMock).not.toHaveBeenCalled()
      expect(EditableRejectionReasonMock).not.toHaveBeenCalled()
    })
  })
})
