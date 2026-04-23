import React from 'react'
import { QueryAutocompleteEdgeFragment } from '@staff-portal/billing/src/data'

export const renderOption = jest
  .fn()
  .mockImplementation((item: QueryAutocompleteEdgeFragment) => (
    <div
      id='FormInputAutocompleteRoleOption'
      data-testid='FormInputAutocompleteRoleOption'
    >
      {JSON.stringify(item)}
    </div>
  ))
