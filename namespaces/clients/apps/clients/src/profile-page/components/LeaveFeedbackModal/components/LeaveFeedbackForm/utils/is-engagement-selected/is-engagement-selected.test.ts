import { ClientSurveyAnswerInput } from '@staff-portal/graphql/staff'

import { isEngagementSelected } from './is-engagement-selected'

const scoreValue = 0

describe('#isEngagementSelected', () => {
  it('returns an error if no engagement is selected', () => {
    const answers = {
      scores: [scoreValue],
      negative: []
    }

    expect(isEngagementSelected(answers)).toEqual([
      'Please select an engagement.'
    ])
  })

  it('returns undefined if engagement is selected', () => {
    const answers = {
      scores: [scoreValue],
      negative: [
        {
          index: scoreValue,
          comment: '',
          engagement: {
            id: '123',
            name: 'Test engagement'
          }
        }
      ]
    } as unknown as ClientSurveyAnswerInput

    expect(isEngagementSelected(answers)).toEqual([undefined])
  })
})
