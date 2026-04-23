import React from 'react'
import { screen, render } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import { useGetNode } from '@staff-portal/data-layer-service'

import SourcingRequestAdditionalNotes from './SourcingRequestAdditionalNotes'

jest.mock('@staff-portal/data-layer-service')
jest.mock('@staff-portal/engagements')

jest.mock('@staff-portal/ui', () => ({
  ...jest.requireActual('@staff-portal/ui'),
  DescriptionFormatter: (props: any) => {
    return <div>{props.text}</div>
  }
}))

const useGetNodeMock = useGetNode as jest.Mock

const jobMock = {
  id: 'job-id'
}

const arrangeTest = (props: {}) => {
  useGetNodeMock.mockReturnValue(() => ({
    data: {
      ...jobMock,
      ...props
    }
  }))

  return render(
    <TestWrapper>
      <SourcingRequestAdditionalNotes jobId={jobMock.id} />
    </TestWrapper>
  )
}

describe('SourcingRequestAdditionalNotes', () => {
  it('renders additional notes', () => {
    arrangeTest({
      sourcingRequest: {
        additionalNotes: 'addition notes'
      }
    })

    expect(
      screen.getByTestId('sourcing-request-additional-notes')
    ).toHaveTextContent('addition notes')
  })
})
