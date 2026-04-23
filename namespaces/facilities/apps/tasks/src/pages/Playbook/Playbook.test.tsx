import React from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import {
  PlaybookTemplateDateRuleUnit,
  PlaybookTemplatePriority,
  OperationCallableTypes
} from '@staff-portal/graphql/staff'
import { useGetData } from '@staff-portal/data-layer-service'
import { useLocation } from '@staff-portal/navigation'

import Playbook from './Playbook'

jest.mock('@staff-portal/navigation', () => ({
  ...jest.requireActual('@staff-portal/navigation'),
  useParams: () => ({ identifier: PLAYBOOK_IDENTIFIER }),
  useLocation: jest.fn()
}))

jest.mock('@staff-portal/data-layer-service', () => ({
  ...jest.requireActual('@staff-portal/data-layer-service'),
  useGetData: jest.fn()
}))
const useLocationMock = useLocation as jest.Mock
const useGetDataMock = useGetData as jest.Mock

const PLAYBOOK_IDENTIFIER = 'playbook_identifier'

const PLAYBOOK_LABEL = 'Playbook label'

const PLAYBOOK_TEMPLATE = {
  id: '123',
  identifier: 'playbook_template',
  description: 'description',
  details: 'details',
  dueDateRuleUnit: PlaybookTemplateDateRuleUnit.DAYS,
  dueDateRuleAmount: 1,
  priority: PlaybookTemplatePriority.HIGH,
  recurring: 1,
  flowLink: {
    text: 'BPM Link',
    url: 'url.to'
  },
  webResource: {
    url: 'playbook#playbook_template'
  },
  operations: {
    updatePlaybookTemplate: {
      callable: OperationCallableTypes.ENABLED,
      messages: []
    }
  }
}

const arrangeTest = () =>
  render(
    <TestWrapper>
      <Playbook />
    </TestWrapper>
  )

describe('Playbook', () => {
  beforeEach(() => {
    useLocationMock.mockReturnValue({})
  })

  describe('when data', () => {
    it('renders the component', () => {
      useGetDataMock.mockReturnValue(() => ({
        data: {
          label: PLAYBOOK_LABEL,
          identifier: PLAYBOOK_IDENTIFIER,
          templates: {
            nodes: [PLAYBOOK_TEMPLATE],
            totalCount: 1
          }
        },
        loading: false
      }))
      arrangeTest()

      expect(
        screen.getByTestId('playbook-content-wrapper-page')
      ).toBeInTheDocument()

      expect(screen.getByTestId('playbook-template-card')).toBeInTheDocument()
    })
  })

  describe('when loading', () => {
    it('renders the skeleton loader', () => {
      useGetDataMock.mockReturnValue(() => ({
        loading: true
      }))
      arrangeTest()

      expect(
        screen.getByTestId('playbook-content-skeleton-loader')
      ).toBeInTheDocument()
    })
  })
})
