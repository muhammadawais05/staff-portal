import React from 'react'

const MockComponent = jest
  .fn()
  .mockImplementation(({ title, initialValues }) => (
    <div data-testid='MinimumCommitmentModalForm'>
      <div data-testid='MinimumCommitmentModalForm-title'>{title}</div>
      <div data-testid='MinimumCommitmentModalForm-initial-values-minimum-hours'>
        {initialValues.minimumHours}
      </div>
      <div data-testid='MinimumCommitmentModalForm-initial-values-comment'>
        {initialValues.comment}
      </div>
    </div>
  ))

export default MockComponent
