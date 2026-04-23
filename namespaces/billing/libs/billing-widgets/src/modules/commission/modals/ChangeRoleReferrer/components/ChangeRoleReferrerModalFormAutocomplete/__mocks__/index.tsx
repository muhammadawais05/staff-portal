import React from 'react'

const MockComponent = jest
  .fn()
  .mockImplementation(({ autoFocus, required }) => (
    <div data-testid='ChangeRoleReferrerModalFormAutocomplete'>
      <span data-testid='ChangeRoleReferrerModalFormAutocomplete-autoFocus'>
        {autoFocus}
      </span>
      <span data-testid='ChangeRoleReferrerModalFormAutocomplete-required'>
        {JSON.stringify(required)}
      </span>
    </div>
  ))

export default MockComponent
