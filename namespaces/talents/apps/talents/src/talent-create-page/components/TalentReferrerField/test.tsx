import React from 'react'
import { screen, render } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import { Form } from '@toptal/picasso-forms'
import { useQueryParams } from '@staff-portal/navigation'

import { useGetReferrer } from './data'
import TalentReferrerField from './TalentReferrerField'

jest.mock('@staff-portal/navigation', () => ({
  ...jest.requireActual('@staff-portal/navigation'),
  useQueryParams: jest.fn()
}))

// () => [{ referrer_id: '624578' }]

jest.mock('./data')

const mockUseQueryParams = useQueryParams as jest.Mock

const mockGetReferrer = useGetReferrer as jest.Mock

const arrangeTest = () => {
  return render(
    <TestWrapper>
      <Form onSubmit={() => {}}>
        <TalentReferrerField />
      </Form>
    </TestWrapper>
  )
}

describe('TalentReferrerField', () => {
  it('renders the field', () => {
    mockUseQueryParams.mockReturnValue([{ referrer_id: '624578' }])

    mockGetReferrer.mockReturnValue({
      data: {
        staffNode: {
          id: 'referrerId',
          fullName: 'John Doe'
        }
      }
    })

    arrangeTest()

    expect(
      screen.getByTestId('talent-create-page-referrer-link')
    ).toBeInTheDocument()
    expect(
      screen.getByTestId('talent-create-page-referrer-field')
    ).toBeInTheDocument()
  })

  it('hides unauthorized field', () => {
    mockUseQueryParams.mockReturnValue([{ referrer_id: undefined }])
    mockGetReferrer.mockReturnValue({
      data: {
        staffNode: null
      }
    })

    arrangeTest()

    expect(
      screen.queryByTestId('talent-create-page-referrer-link')
    ).not.toBeInTheDocument()
    expect(
      screen.queryByTestId('talent-create-page-referrer-field')
    ).not.toBeInTheDocument()
  })
})
