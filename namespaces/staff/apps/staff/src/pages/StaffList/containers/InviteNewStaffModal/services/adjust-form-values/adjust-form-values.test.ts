import { TeamAutocompleteEdgeFragment } from '@staff-portal/staff'

import adjustFormValues from './adjust-form-values'

describe('adjustFormValues', () => {
  it.each([
    {
      formValues: {
        email: 'some@email.com',
        fullName: 'Tom Jones',
        teamIds: [
          { node: { id: 'id-1' } },
          { node: { id: 'id-2' } },
          { node: undefined }
        ] as TeamAutocompleteEdgeFragment[]
      },
      adjustedFormValues: {
        email: 'some@email.com',
        fullName: 'Tom Jones',
        teamIds: ['id-1', 'id-2']
      }
    }
  ])('returns adjusted form values', ({ formValues, adjustedFormValues }) => {
    expect(adjustFormValues(formValues)).toEqual(adjustedFormValues)
  })
})
