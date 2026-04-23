import { renderHook } from '@testing-library/react-hooks'

import { useOpportunityTimelineItems } from './use-opportunity-timeline-items'
import { OpportunityTimelineFragment } from '../data'
import { opportunityTimelineFragmentMock } from '../data/opportunity-timeline-fragment.mock'

const arrangeTest = (params: Partial<OpportunityTimelineFragment> = {}) => {
  const { result } = renderHook(() =>
    useOpportunityTimelineItems({
      opportunityTimeline: {
        ...opportunityTimelineFragmentMock,
        ...params
      }
    })
  )

  return result.current
}

describe('useOpportunityTimelineItems', () => {
  describe('when data is available', () => {
    let labels: string[]

    describe('Non enterprise opportunity', () => {
      beforeAll(() => {
        const result = arrangeTest()

        labels = result.map(el => el.label?.toString() || '')
      })

      it('renders non enterprise items', () => {
        expect(labels).toEqual([
          'Est. Work Start Date',
          'Est. Work End Date',
          'Actual Work Start Date',
          'Actual Work End Date'
        ])
      })
    })

    describe('Enterprise opportunity', () => {
      beforeAll(() => {
        const result = arrangeTest({ enterprise: true })

        labels = result.map(el => el.label?.toString() || '')
      })

      it('renders all items', () => {
        expect(labels).toEqual([
          'Est. Work Start Date',
          'Est. Work End Date',
          'Est. Close Date',
          'Actual Work Start Date',
          'Actual Work End Date',
          'Actual Close Date'
        ])
      })
    })
  })
})
