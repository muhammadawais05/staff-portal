import { renderHook } from '@testing-library/react-hooks'

import { useFeedbackReasonsOptions } from './use-feedback-reasons-options'

const FEEDBACK_REASONS = [
  {
    id: 'VjEtRmVlZGJhY2tSZWFzb24tMTMzMQ',
    identifier: 'talent_was_hired_away_internally',
    name: 'Talent was hired away internally',
    group: {
      id: 'VjEtRmVlZGJhY2tSZWFzb24tMTMxNQ',
      name: 'Talent'
    }
  },
  {
    id: 'VjEtRmVlZGJhY2tSZWFzb24tMTMxOQ',
    identifier: 'talent_s_seniority_was_a_problem',
    name: "Talent's seniority was a problem",
    group: {
      id: 'VjEtRmVlZGJhY2tSZWFzb24tMTMxNQ',
      name: 'Talent'
    }
  },
  {
    id: 'VjEtRmVlZGJhY2tSZWFzb24tMTMyOQ',
    identifier: 'unknown_ghosted',
    name: 'Unknown/ghosted',
    group: {
      id: 'VjEtRmVlZGJhY2tSZWFzb24tMTMyNw',
      name: 'Other'
    }
  },
  {
    id: 'VjEtRmVlZGJhY2tSZWFzb24tMTMzMA',
    identifier: 'other',
    name: 'Other',
    group: {
      id: 'VjEtRmVlZGJhY2tSZWFzb24tMTMyNw',
      name: 'Other'
    }
  }
]

describe('useFeedbackReasonsOptions', () => {
  it('returns grouped options', () => {
    const { result } = renderHook(() =>
      useFeedbackReasonsOptions(FEEDBACK_REASONS, true)
    )

    expect(result.current).toEqual({
      Other: [
        { text: 'Unknown/ghosted', value: 'VjEtRmVlZGJhY2tSZWFzb24tMTMyOQ' },
        { text: 'Other', value: 'VjEtRmVlZGJhY2tSZWFzb24tMTMzMA' }
      ],
      Talent: [
        {
          text: 'Talent was hired away internally',
          value: 'VjEtRmVlZGJhY2tSZWFzb24tMTMzMQ'
        },
        {
          text: "Talent's seniority was a problem",
          value: 'VjEtRmVlZGJhY2tSZWFzb24tMTMxOQ'
        }
      ]
    })
  })

  it('returns not grouped options', () => {
    const { result } = renderHook(() =>
      useFeedbackReasonsOptions(FEEDBACK_REASONS)
    )

    expect(result.current).toEqual([
      {
        identifier: 'talent_was_hired_away_internally',
        text: 'Talent was hired away internally',
        value: 'VjEtRmVlZGJhY2tSZWFzb24tMTMzMQ'
      },
      {
        identifier: 'talent_s_seniority_was_a_problem',
        text: "Talent's seniority was a problem",
        value: 'VjEtRmVlZGJhY2tSZWFzb24tMTMxOQ'
      },
      {
        identifier: 'unknown_ghosted',
        text: 'Unknown/ghosted',
        value: 'VjEtRmVlZGJhY2tSZWFzb24tMTMyOQ'
      },
      {
        identifier: 'other',
        text: 'Other',
        value: 'VjEtRmVlZGJhY2tSZWFzb24tMTMzMA'
      }
    ])
  })
})
