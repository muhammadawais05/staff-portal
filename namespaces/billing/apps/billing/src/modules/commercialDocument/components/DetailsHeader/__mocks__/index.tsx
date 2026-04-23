import React from 'react'

const MockComponent = jest
  .fn()
  .mockImplementation(
    ({
      gid,
      children,
      MoreActions,
      renderRecentActivityButton,
      isDisabled
    }) => (
      <div data-testid='DetailsHeader' data-gid={gid}>
        {renderRecentActivityButton && (
          <div data-testid='DetailsHeader-RecentActivityButton' />
        )}
        <div data-testid='DetailsHeader-MoreActions'>{MoreActions}</div>
        <div data-testid='DetailsHeader-isDisabled'>
          {JSON.stringify(isDisabled)}
        </div>
        <div data-testid='DetailsHeader-children'>{children}</div>
      </div>
    )
  )

export default MockComponent
