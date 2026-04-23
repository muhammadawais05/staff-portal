import React from 'react'
// import { BaseDecorator } from '@toptal/talent-portal-storybook'

import ValidationMessage from '.'

export default {
  title: 'Application card/ValidationMessage'
  // decorators: [BaseDecorator]
}

export const Default = () => (
  <ValidationMessage
    message='This is a validation message.'
    hasErrors={false}
    requirementMeet={false}
  />
)

export const Fulfilled = () => (
  <ValidationMessage
    message='This is a validation message.'
    requirementMeet
    hasErrors={false}
  />
)

export const WithError = () => (
  <ValidationMessage
    message='This is a validation message.'
    requirementMeet={false}
    hasErrors
  />
)
