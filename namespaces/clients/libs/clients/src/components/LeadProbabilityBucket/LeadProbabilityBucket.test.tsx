import React, { ComponentProps } from 'react'
import { render, screen } from '@testing-library/react'
import type {
  ContainerProps,
  TooltipProps,
  TypographyProps
} from '@toptal/picasso'
import { LeadProbabilityBucket as BucketType } from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'

import { featureName, featureValue, formatSeconds, humanize } from './utils'
import LeadProbabilityBucket from './LeadProbabilityBucket'

jest.mock('@toptal/picasso', () => ({
  Info16: () => <div data-testid='info-mark' />,
  Typography: ({ children, color }: TypographyProps) => (
    <div data-color={color}>{children}</div>
  ),
  Container: ({ children }: ContainerProps) => <>{children}</>,
  Tooltip: ({ children, content }: TooltipProps) => (
    <>
      <div data-testid='tooltip'>{children}</div>
      <div data-testid='tooltip-content'>{content}</div>
    </>
  )
}))

const SCORE_EXPLANATION = {
  negativeFeatures: [
    { name: 'tt_finish', value: '51.251000000000005', position: 1 },
    { name: 'project_length', value: 'less_than_1_week', position: 2 },
    { name: 'skills_count', value: '2', position: 4 },
    { name: 'ai_continent_code', value: 'EU', position: 5 },
    { name: 'interested_in', value: 'designers', position: 7 }
  ],
  positiveFeatures: [
    { name: 'email_type', value: 'corporate', position: 3 },
    { name: 'open_for_remote', value: 'yes', position: 6 }
  ]
}

type Props = ComponentProps<typeof LeadProbabilityBucket>

const arrangeTest = (props: Partial<Props> = {}) => {
  const { bucket, scoreExplanation } = props

  return render(
    <TestWrapper>
      <LeadProbabilityBucket
        bucket={bucket}
        scoreExplanation={{
          positiveFeatures: [],
          negativeFeatures: [],
          ...scoreExplanation
        }}
      />
    </TestWrapper>
  )
}

describe('CompanyLeadScoreExplanation', () => {
  describe('when there is no bucket', () => {
    it('renders NO_VALUE', () => {
      arrangeTest()

      expect(screen.getByText('—')).toBeInTheDocument()
    })
  })

  describe('no explanation', () => {
    it('does not render the icon', () => {
      arrangeTest({ bucket: BucketType.MEDIUM })

      expect(screen.queryByTestId('info-mark')).not.toBeInTheDocument()
    })
  })

  describe('when either of explanations are passed', () => {
    describe('when negativeFeatures are passed only', () => {
      it('renders the icon', () => {
        arrangeTest({
          bucket: BucketType.MEDIUM,
          scoreExplanation: {
            negativeFeatures: [
              {
                name: 'name',
                position: 0,
                value: 'value'
              }
            ]
          }
        })

        expect(screen.queryByTestId('info-mark')).toBeInTheDocument()
      })
    })

    describe('when positiveFeatures are passed', () => {
      it('renders the icon', () => {
        arrangeTest({
          bucket: BucketType.MEDIUM,
          scoreExplanation: {
            positiveFeatures: [
              {
                name: 'name',
                position: 0,
                value: 'value'
              }
            ]
          }
        })

        expect(screen.queryByTestId('info-mark')).toBeInTheDocument()
      })
    })

    describe('when both features are passed', () => {
      it('renders the icon', () => {
        arrangeTest({
          bucket: BucketType.MEDIUM,
          scoreExplanation: {
            positiveFeatures: [
              {
                name: 'positiveFeatures',
                position: 0,
                value: 'value'
              }
            ],
            negativeFeatures: [
              {
                name: 'negativeFeatures',
                position: 0,
                value: 'value'
              }
            ]
          }
        })

        expect(screen.queryByTestId('info-mark')).toBeInTheDocument()
      })
    })
  })

  it('renders low without color', () => {
    arrangeTest({ bucket: BucketType.LOW })

    expect(screen.getByText('Low')).not.toHaveAttribute('data-color')
  })

  it('renders medium as yellow', () => {
    arrangeTest({ bucket: BucketType.MEDIUM })

    expect(screen.getByText('Medium')).toHaveAttribute('data-color', 'yellow')
  })

  it('renders high as red', () => {
    arrangeTest({ bucket: BucketType.HIGH })

    expect(screen.getByText('High')).toHaveAttribute('data-color', 'red')
  })

  it('renders positive and negative explanations with green and red colors', () => {
    arrangeTest({
      bucket: BucketType.MEDIUM,
      scoreExplanation: SCORE_EXPLANATION
    })

    const content = screen
      .getByTestId('tooltip-content')
      // for the sake of readable assertion below
      .innerHTML.replace(/<\/div>/g, '</div>\n')

    expect(content).toBe(`<div>Factors:</div>
1. Time to Complete Quiz<div data-color="red">00:51</div>
2. Project Length<div data-color="red">Less Than 1 Week</div>
3. Email Type<div data-color="green">Corporate</div>
4. Requested Skills Count<div data-color="red">2</div>
5. Continent Code<div data-color="red">EU</div>
6. Open For Remote<div data-color="green">Yes</div>
7. Interested In<div data-color="red">Designers</div>
`)
  })

  describe('helpers/formatters', () => {
    describe('formatSeconds', () => {
      it('returns string when more than a day passed', () => {
        // 25 hours passed
        expect(formatSeconds(60 * 60 * 25)).toBe('> 24 hours')
      })

      it('returns hours, minutes and seconds when more than an hour passed', () => {
        // 61 minutes passed
        expect(formatSeconds(60 * 61)).toBe('01:01:00')
      })

      it('returns minutes and seconds when less than an hour passed', () => {
        // 59 minutes passed
        expect(formatSeconds(60 * 59)).toBe('59:00')
      })
    })

    describe('humanize', () => {
      it('s/_/ /', () => {
        expect(humanize('machine_is_speaking')).toBe('machine is speaking')
      })
    })

    describe('featureName', () => {
      it('picks feature name from the record if present', () => {
        expect(featureName('tt_finish')).toBe('Time to Complete Quiz')
        expect(featureName('skill_asp_net_web_api')).toBe(
          'Has Skill "ASP.NET Web API"'
        )
      })

      it('return feature name as is if not present in the record', () => {
        expect(featureName('non_existent_one')).toBe('non_existent_one')
      })
    })

    describe('featureValue', () => {
      it('formats features starting with "skill_" as boolean', () => {
        expect(featureValue('skill_whatever', '0')).toBe('No')
        expect(featureValue('skill_shmotever', '1')).toBe('Yes')
      })

      it('formats "application day of week" feature', () => {
        expect(featureValue('roles_cr_dow', '0')).toBe('Mon')
        expect(featureValue('roles_cr_dow', '2')).toBe('Wed') // my dude
        expect(featureValue('roles_cr_dow', '6')).toBe('Sun')
      })

      it('formats "applied after" and "time to complete" features', () => {
        // an hour and one minute passed
        expect(featureValue('tt_finish', String(60 * 61))).toBe('01:01:00')
        // a minute and one second
        expect(featureValue('ai_applied_after_s', '61')).toBe('01:01')
      })

      it('returns continent code as is', () => {
        expect(featureValue('ai_continent_code', 'NARNIA')).toBe('NARNIA')
      })

      it('titelizes and humanizes everything else', () => {
        expect(
          featureValue(
            'something_that_didnt_match_checks_above',
            'is_really_the_main_code_path'
          )
        ).toBe('Is Really the Main Code Path')
      })
    })
  })
})
