import React from 'react'
// import { BaseDecorator } from '@toptal/talent-portal-storybook'

import ActionIcon from './ActionIcon'

export default {
  title: 'Application card/ActionIcon'
  // decorators: [BaseDecorator]
}

export const Default = () => <ActionIcon state='default' />

export const DefaultHovered = () => <ActionIcon state='default-hovered' />

export const Highlighted = () => <ActionIcon state='highlighted' />

export const HighlightedHovered = () => (
  <ActionIcon state='highlighted-hovered' />
)
