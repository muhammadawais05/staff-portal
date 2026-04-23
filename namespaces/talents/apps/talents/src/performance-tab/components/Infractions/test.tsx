import React from 'react'
import { render, screen } from '@testing-library/react'
import {
  OperationCallableTypes,
  TalentInfractionReasonValue
} from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'
import { TalentInfractionFragment } from '@staff-portal/talents-infractions'

import Infractions from '../Infractions'
import { useGetTalentInfractions } from '../../data'

const noInfractionsCopy = 'No infractions were added yet.'

const mockUseGetTalentInfractions = useGetTalentInfractions as jest.Mock

jest.mock('@staff-portal/facilities/src/hooks/use-encoded-id')
jest.mock('../../data')

const mockInfraction = (
  data: Partial<TalentInfractionFragment> = {}
): Partial<TalentInfractionFragment> => ({
  id: 'test',
  summary: 'Infraction',
  attachments: {
    totalCount: 0,
    nodes: []
  },
  operations: {
    changeInfraction: {
      callable: OperationCallableTypes.ENABLED,
      messages: []
    },
    removeInfraction: {
      callable: OperationCallableTypes.ENABLED,
      messages: []
    }
  },
  talent: {
    id: 'talent-1',
    webResource: { text: 'Talent' }
  },
  ...data
})

const arrangeTest = () =>
  render(
    <TestWrapper>
      <Infractions talentId='test-talent' />
    </TestWrapper>
  )

describe('Infractions', () => {
  it('renders title and loader if data is loading', () => {
    mockUseGetTalentInfractions.mockReturnValue({ networkLoading: true })

    arrangeTest()
    expect(screen.queryByText('Infractions')).toBeInTheDocument()
    expect(screen.getByTestId('skeleton-loader')).toBeInTheDocument()
    expect(screen.queryByText(noInfractionsCopy)).not.toBeInTheDocument()
    expect(
      screen.queryByRole('button', { name: 'Add Infraction' })
    ).not.toBeInTheDocument()
  })

  it('renders a message if there are no infractions yet', () => {
    mockUseGetTalentInfractions.mockReturnValue({
      loading: false,
      data: {
        id: 'talent-id',
        operations: {
          createTalentInfraction: {
            callable: OperationCallableTypes.ENABLED,
            messages: []
          }
        },
        infractions: {
          nodes: []
        }
      }
    })

    arrangeTest()
    expect(screen.queryByTestId('skeleton-loader')).not.toBeInTheDocument()
    expect(screen.queryByText(noInfractionsCopy)).toBeInTheDocument()
    expect(
      screen.queryByRole('button', { name: 'Add Infraction' })
    ).toBeInTheDocument()
  })

  it('renders infractions if they are loaded', () => {
    mockUseGetTalentInfractions.mockReturnValue({
      loading: false,
      data: {
        id: 'talent-id',
        operations: {
          createTalentInfraction: {
            callable: OperationCallableTypes.HIDDEN,
            messages: []
          }
        },
        infractions: {
          nodes: [
            mockInfraction({
              id: 'infraction-1',
              summary: 'Infraction #1',
              reasonSlug: TalentInfractionReasonValue.COMMUNICATION_RUDE
            }),
            mockInfraction({
              id: 'infraction-2',
              summary: 'Infraction #2',
              reasonSlug: TalentInfractionReasonValue.RELIABILITY_LEAVES
            })
          ]
        }
      }
    })

    arrangeTest()
    expect(screen.queryByTestId('skeleton-loader')).not.toBeInTheDocument()
    expect(screen.queryByText(noInfractionsCopy)).not.toBeInTheDocument()
    expect(
      screen.queryByRole('button', { name: 'Add Infraction' })
    ).not.toBeInTheDocument()
    expect(screen.queryByText('Infraction #1')).toBeInTheDocument()
    expect(screen.queryByText('Infraction #2')).toBeInTheDocument()
  })
})
