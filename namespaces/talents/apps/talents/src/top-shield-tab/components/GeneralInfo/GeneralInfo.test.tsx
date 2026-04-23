import React, { ComponentProps } from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import {
  createActiveEngagementMock,
  createTopShieldApplicationMock
} from '@staff-portal/talents-top-shield/src/mocks'

import GeneralInfo from '.'

const arrangeTest = (props: ComponentProps<typeof GeneralInfo>) => {
  return render(
    <TestWrapper>
      <GeneralInfo
        talentTopShield={props.talentTopShield}
        loading={props.loading}
      />
    </TestWrapper>
  )
}

describe('GeneralInfo', () => {
  it('renders general info of talent', () => {
    const talentTopShield = createTopShieldApplicationMock({
      engagements: {
        nodes: [createActiveEngagementMock()]
      }
    })

    arrangeTest({ talentTopShield, loading: false })

    expect(screen.getByText('Full-time (20 / 40 hours)')).toBeInTheDocument()
    expect(screen.getByText('40 hrs/wk')).toBeInTheDocument()
    expect(screen.getByText('20 hrs/wk')).toBeInTheDocument()
  })
})
