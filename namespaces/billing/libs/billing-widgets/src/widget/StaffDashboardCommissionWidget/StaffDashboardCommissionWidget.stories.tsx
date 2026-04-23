import React from 'react'
// eslint-disable-next-line
import { GridSize } from '@material-ui/core/Grid'

import StoryShell from '../../story-shell'
import Component from './StaffDashboardCommissionWidget'

export default {
  title: 'Billing/Widgets/Staff Dashboard Commission Widget',
  component: Component,
  args: {
    gridSize: undefined
  },
  argTypes: {
    gridSize: {
      options: [
        'auto',
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        true,
        false,
        undefined
      ],
      control: { type: 'select' }
    }
  }
}

interface Props {
  gridSize?: boolean | GridSize
}

export const StaffDashboardCommissionWidget = ({ gridSize }: Props) => {
  return (
    <StoryShell
      render={appProps => (
        <Component baseAppProps={appProps} gridSize={gridSize} />
      )}
    />
  )
}
