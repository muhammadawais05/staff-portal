import React from 'react'

const MockComponent = ({
  valueKey,
  value,
  webResource,
  disabled
}: {
  valueKey: string
  value: string
  webResource: object
  disabled: boolean
}) => (
  <div data-testid='SocialMediaItem'>
    <span data-testid='SocialMediaItem-valueKey'>{valueKey}</span>
    <span data-testid='SocialMediaItem-webResource'>
      {JSON.stringify(webResource)}
    </span>
    <span data-testid='SocialMediaItem-value'>{value}</span>
    <span data-testid='DetailedListItemEditor-disabled'>
      {JSON.stringify(disabled)}
    </span>
  </div>
)

export default MockComponent
