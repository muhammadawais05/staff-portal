import React from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import {
  PlaybookTemplateDateRuleUnit,
  PlaybookTemplatePriority,
  OperationCallableTypes
} from '@staff-portal/graphql/staff'
import { titleize } from '@staff-portal/string'

import {
  dueDateFormat,
  PlaybookTemplateCard,
  recurringFormat
} from '../../components'
import { humanize } from './utils'

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

const arrangeTest = (playbookTemplate = {}) => {
  render(
    <TestWrapper>
      <PlaybookTemplateCard
        playbookTemplate={{ ...PLAYBOOK_TEMPLATE, ...playbookTemplate }}
      />
    </TestWrapper>
  )
}

describe('PlaybookTemplateCard', () => {
  it('renders the component', () => {
    arrangeTest()

    expect(screen.queryByTestId('playbook-template-card')).toBeInTheDocument()

    expect(screen.getByText(PLAYBOOK_TEMPLATE.description)).toBeInTheDocument()
    expect(
      screen.getByText(PLAYBOOK_TEMPLATE.description).closest('a')
    ).toHaveAttribute('href', PLAYBOOK_TEMPLATE.webResource.url)

    expect(screen.getByText(PLAYBOOK_TEMPLATE.details)).toBeInTheDocument()
    expect(
      screen.getByText(humanize(PLAYBOOK_TEMPLATE.flowLink.text))
    ).toBeInTheDocument()
    expect(
      screen.getByText(humanize(PLAYBOOK_TEMPLATE.flowLink.text)).closest('a')
    ).toHaveAttribute('href', PLAYBOOK_TEMPLATE.flowLink.url)

    expect(
      screen.getByText(
        recurringFormat({ recurring: PLAYBOOK_TEMPLATE.recurring })
      )
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        dueDateFormat({
          dueDateRuleUnit: PLAYBOOK_TEMPLATE.dueDateRuleUnit,
          dueDateRuleAmount: PLAYBOOK_TEMPLATE.dueDateRuleAmount
        })
      )
    ).toBeInTheDocument()
    expect(
      screen.getByText(titleize(PLAYBOOK_TEMPLATE.priority))
    ).toBeInTheDocument()
  })

  it('format conveniently the due date format for WORKDAY_AFTER_DAYS', () => {
    arrangeTest({
      dueDateRuleUnit: PlaybookTemplateDateRuleUnit.WORKDAY_AFTER_DAYS,
      dueDateRuleAmount: 2
    })

    expect(
      screen.getByText(
        dueDateFormat({
          dueDateRuleUnit: PlaybookTemplateDateRuleUnit.WORKDAY_AFTER_DAYS,
          dueDateRuleAmount: 2
        })
      )
    ).toBeInTheDocument()
  })

  it('format conveniently the due date format for BUSINESS_DAYS', () => {
    arrangeTest({
      dueDateRuleUnit: PlaybookTemplateDateRuleUnit.BUSINESS_DAYS,
      dueDateRuleAmount: 2
    })

    expect(
      screen.getByText(
        dueDateFormat({
          dueDateRuleUnit: PlaybookTemplateDateRuleUnit.BUSINESS_DAYS,
          dueDateRuleAmount: 2
        })
      )
    ).toBeInTheDocument()
  })

  it('format conveniently the due date format for WORKDAYS', () => {
    arrangeTest({
      dueDateRuleUnit: PlaybookTemplateDateRuleUnit.WORKDAYS,
      dueDateRuleAmount: 2
    })

    expect(
      screen.getByText(
        dueDateFormat({
          dueDateRuleUnit: PlaybookTemplateDateRuleUnit.WORKDAYS,
          dueDateRuleAmount: 2
        })
      )
    ).toBeInTheDocument()
  })
})
