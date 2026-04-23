import React from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper, assertOnTooltip } from '@staff-portal/test-utils'
import {
  JobCommitment,
  JobWorkType,
  TalentJobPreferencesComparisonStatus as PreferenceStatus
} from '@staff-portal/graphql/staff'

import TalentJobPreferences, { Props } from './TalentJobPreferences'

const arrangeTest = (preferences: Props['preferences']) =>
  render(
    <TestWrapper>
      <TalentJobPreferences preferences={preferences} />
    </TestWrapper>
  )

describe('TalentJobPreferences', () => {
  describe('when talent has no job preferences', () => {
    it('only renders "Disabled"', () => {
      const { container } = arrangeTest(null)

      expect(container.textContent).toBe('Disabled')
    })
  })

  describe('when talent has job preferences', () => {
    const basicPreferences: Props['preferences'] = {
      skillNames: [
        { skillName: 'JavaScript' },
        { skillName: 'Lambda Calculus' }
      ]
    }
    const fullPreferences: Props['preferences'] = {
      ...basicPreferences,
      excludeSkillNames: [{ skillName: 'Jira' }],
      workTypes: [
        { workType: JobWorkType.REMOTE },
        { workType: JobWorkType.MIXED }
      ],
      commitments: [{ commitment: JobCommitment.PART_TIME }],
      enterpriseProjects: { enterpriseProjects: true }
    }

    it('renders "Enabled" and a tooltip trigger icon', () => {
      arrangeTest(basicPreferences)

      expect(screen.getByText('Enabled')).toBeInTheDocument()
      expect(screen.getByTestId('tooltip-icon')).toBeInTheDocument()
    })

    it('renders a tooltip with job preferences details', () => {
      arrangeTest(fullPreferences)

      const tooltipAnchor = screen.getByTestId('tooltip-icon')

      assertOnTooltip(tooltipAnchor, tooltip => {
        expect(tooltip).toHaveTextContent('Preferred Skills:')
        expect(tooltip).toHaveTextContent('JavaScript')
        expect(tooltip).toHaveTextContent('Lambda Calculus')

        expect(tooltip).toHaveTextContent('Skills to Exclude:')
        expect(tooltip).toHaveTextContent('Jira')

        expect(tooltip).toHaveTextContent('Commitment:')
        expect(tooltip).toHaveTextContent('Part-time')

        expect(tooltip).toHaveTextContent('Job Type:')
        expect(tooltip).toHaveTextContent('Remote or Mixed (Remote+Onsite)')

        expect(tooltip).toHaveTextContent('Enterprise job')
      })
    })

    it('does not render labels for non-preferences', () => {
      arrangeTest(basicPreferences)

      const tooltipAnchor = screen.getByTestId('tooltip-icon')

      assertOnTooltip(tooltipAnchor, tooltip => {
        expect(tooltip).toHaveTextContent('Preferred Skills:')
        expect(tooltip).not.toHaveTextContent('Skills to Exclude:')
        expect(tooltip).not.toHaveTextContent('Commitment:')
        expect(tooltip).not.toHaveTextContent('Job Type:')
      })
    })
  })

  describe('when job preferences are being compared to a job', () => {
    const preferences: Props['preferences'] = {
      status: PreferenceStatus.PARTIAL,
      skillNames: [
        { skillName: 'JavaScript', status: PreferenceStatus.OK },
        { skillName: 'Lambda Calculus', status: PreferenceStatus.NONE }
      ],
      excludeSkillNames: [{ skillName: 'Jira', status: PreferenceStatus.NONE }],
      workTypes: [
        { workType: JobWorkType.REMOTE, status: PreferenceStatus.OK },
        { workType: JobWorkType.MIXED, status: PreferenceStatus.NONE }
      ],
      commitments: [
        { commitment: JobCommitment.PART_TIME, status: PreferenceStatus.BAD }
      ],
      enterpriseProjects: {
        enterpriseProjects: true,
        status: PreferenceStatus.OK
      }
    }

    it('renders "Enabled" and a label for the overall job preferences overlap', () => {
      arrangeTest(preferences)

      expect(screen.getByText('Enabled')).toBeInTheDocument()
      expect(screen.getByText('Partial Overlap')).toBeInTheDocument()
    })

    it('renders text indicating overall job preferences overlap on tooltip', () => {
      arrangeTest(preferences)

      const tooltipAnchor = screen.getByText('Partial Overlap')

      assertOnTooltip(tooltipAnchor, tooltip => {
        expect(tooltip).toHaveTextContent(
          'Talent job preferences partially match job requirements.'
        )
      })
    })

    it('renders a job preferences details with colors indicating the overlap', () => {
      arrangeTest(preferences)

      const tooltipAnchor = screen.getByText('Partial Overlap')

      assertOnTooltip(tooltipAnchor, tooltip => {
        expect(tooltip).toHaveTextContent('JavaScript')
        expect(tooltip).toHaveTextContent('Lambda Calculus')

        expect(tooltip).toHaveTextContent('Skills to Exclude:')
        expect(tooltip).toHaveTextContent('Jira')

        expect(screen.getByText('Part-time').outerHTML).toContain('red')

        expect(tooltip).toHaveTextContent('Remote or Mixed (Remote+Onsite)')
        expect(screen.getByText('Remote').outerHTML).toContain('green')
        expect(
          screen.getByText('Mixed (Remote+Onsite)').outerHTML
        ).not.toContain('green')

        expect(screen.getByText('Enterprise job').outerHTML).toContain('green')
      })
    })
  })
})
