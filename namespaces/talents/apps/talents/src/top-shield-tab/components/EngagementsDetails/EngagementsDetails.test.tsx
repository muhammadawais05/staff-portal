import React, { ComponentProps } from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import {
  createActiveEngagementMock,
  createTopShieldApplicationMock
} from '@staff-portal/talents-top-shield/src/mocks'

import EngagementsDetails from '.'

const arrangeTest = (props: ComponentProps<typeof EngagementsDetails>) => {
  return render(
    <TestWrapper>
      <EngagementsDetails
        talentTopShield={props.talentTopShield}
        loading={props.loading}
      />
    </TestWrapper>
  )
}

describe('EngagementsDetails', () => {
  it("renders details of talent's engagements", () => {
    const talentTopShield = createTopShieldApplicationMock({
      engagements: {
        nodes: [createActiveEngagementMock()]
      }
    })

    arrangeTest({ talentTopShield, loading: false })

    expect(screen.getByText('Junior Web Dev')).toBeInTheDocument()
    expect(screen.getByText('Jan 1, 2021')).toBeInTheDocument()
    expect(screen.getByText('Jan 1, 2020')).toBeInTheDocument()
    expect(screen.getByText('18')).toBeInTheDocument()
    expect(screen.getByText('0')).toBeInTheDocument()
  })

  describe('when talent does not have engagements', () => {
    it('does not render engagements details', () => {
      const talentTopShield = createTopShieldApplicationMock()

      arrangeTest({ talentTopShield, loading: false })

      expect(screen.queryByText('Junior Web Dev')).not.toBeInTheDocument()
    })
  })
})
