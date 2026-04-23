import getIsFormDirty, { Props } from './get-is-form-dirty'

describe('getIsFormDirty', () => {
  it.each([
    {
      values: {
        rejectedApplications: ['firstId', 'secondId'],
        firstId: {
          feedback: 'some comment'
        },
        secondId: {
          internalFeedback: { rate: true }
        }
      },
      isDirty: true
    },
    {
      values: {
        rejectedApplications: ['firstId'],
        firstId: { feedback: 'a' }
      },
      isDirty: true
    },
    {
      values: {
        rejectedApplications: ['firstId'],
        firstId: { internalFeedback: { rate: true } }
      },
      isDirty: true
    },
    {
      values: {
        rejectedApplications: ['firstId'],
        firstId: { internalFeedback: { rate: false } }
      },
      isDirty: false
    },
    {
      values: {
        rejectedApplications: ['firstId'],
        firstId: { feedback: '  ' }
      },
      isDirty: false
    }
  ])('correctly checks if form is dirty', ({ values, isDirty }) => {
    expect(getIsFormDirty(values as Props)).toBe(isDirty)
  })
})
