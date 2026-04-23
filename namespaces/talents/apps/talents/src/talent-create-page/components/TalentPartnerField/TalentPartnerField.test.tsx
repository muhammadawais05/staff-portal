import React from 'react'
import { screen, render } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import { useQuery } from '@staff-portal/data-layer-service'
import { Form } from '@toptal/picasso-forms'

import TalentPartnerField from './TalentPartnerField'

jest.mock('@staff-portal/data-layer-service')

const useQueryMock = useQuery as jest.Mock

const arrangeTest = (permit = true) => {
  return render(
    <TestWrapper>
      <Form onSubmit={() => {}}>
        <TalentPartnerField assignTalentPartnerPermit={permit} />
      </Form>
    </TestWrapper>
  )
}

const arrangeResponse = () => {
  useQueryMock.mockReturnValue({
    data: {
      talentPartners: {
        nodes: [
          {
            id: 'talentPartnerId',
            fullName: 'John Doe'
          }
        ]
      }
    }
  })
}

describe('TalentPartnersField', () => {
  it('renders the field', async () => {
    arrangeResponse()
    arrangeTest()

    expect(
      screen.getByTestId('talent-partners-field-partner-select')
    ).toBeInTheDocument()
  })

  it('hides unauthorized field', async () => {
    arrangeResponse()
    arrangeTest(false)

    expect(
      screen.queryByTestId('talent-partners-field-partner-select')
    ).not.toBeInTheDocument()
  })
})
