import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { OperationCallableTypes } from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'
import { useGetLazyOperation } from '@staff-portal/operations'
import { TalentFragment } from '@staff-portal/talents'

import ResumeTalentButton from './ResumeTalentButton'

jest.mock(
  '@staff-portal/operations/src/components/LazyOperation/data/get-lazy-operation',
  () => ({
    __esModule: true,
    useGetLazyOperation: jest.fn()
  })
)

const mockReturnValues = (callable: OperationCallableTypes) => {
  const mockUseGetLazyOperation = useGetLazyOperation as jest.Mock

  mockUseGetLazyOperation.mockReturnValue([
    () => jest.fn(),
    {
      data: {
        node: {
          operations: {
            resumeTalentApplication: {
              callable,
              messages: []
            }
          }
        }
      },
      loading: false
    }
  ])
}

const arrangeTest = ({
  resumeTalent = OperationCallableTypes.ENABLED,
  messages = []
}: {
  resumeTalent?: OperationCallableTypes
  messages?: string[]
} = {}) => {
  mockReturnValues(resumeTalent)

  const talent = {
    operations: {
      resumeTalent: {
        callable: resumeTalent,
        messages
      }
    }
  }

  return render(
    <TestWrapper>
      <ResumeTalentButton talent={talent as unknown as TalentFragment} />
    </TestWrapper>
  )
}

describe('ResumeTalentButton', () => {
  it('shows the resume talent button', () => {
    arrangeTest()

    expect(screen.getByText('Resume Application')).toBeInTheDocument()
  })

  it('hides the resume talent button', () => {
    arrangeTest({ resumeTalent: OperationCallableTypes.HIDDEN })

    expect(screen.queryByText('Resume Application')).not.toBeInTheDocument()
  })

  it('disables the resume talent button', async () => {
    arrangeTest({
      resumeTalent: OperationCallableTypes.DISABLED,
      messages: ['Test tooltip']
    })

    fireEvent.focus(await screen.findByText('Resume Application'))

    expect(screen.getByText('Test tooltip')).toBeInTheDocument()
  })
})
