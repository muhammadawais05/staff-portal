import { render, screen } from '@testing-library/react'
import React from 'react'
import { OperationCallableTypes } from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'
import { TalentFragment } from '@staff-portal/talents'

import { useResumeTalentApplicationModal } from '../ResumeTalentApplicationModal'
import { useRestoreTalentActivationModal } from '../RestoreTalentActivationModal'
import RestoreApplicationButton from './RestoreApplicationButton'

jest.mock('../ResumeTalentApplicationModal', () => ({
  __esModule: true,
  useResumeTalentApplicationModal: jest.fn()
}))

jest.mock('../RestoreTalentActivationModal', () => ({
  __esModule: true,
  useRestoreTalentActivationModal: jest.fn()
}))

const mockUseResumeTalentApplicationModal =
  useResumeTalentApplicationModal as jest.Mock

const mockUseRestoreTalentActivationModal =
  useRestoreTalentActivationModal as jest.Mock

const mockReturnValues = () => {
  const showResumeTalentApplicationModal = jest.fn()

  mockUseResumeTalentApplicationModal.mockReturnValue({
    showResumeTalentApplicationModal
  })

  mockUseRestoreTalentActivationModal.mockReturnValue({
    renderLazyOperation: jest.fn(),
    loading: false,
    renderModal: jest.fn()
  })
}

const arrangeTest = ({
  resumeTalentApplication = OperationCallableTypes.ENABLED
}: {
  resumeTalentApplication?: OperationCallableTypes
} = {}) => {
  mockReturnValues()

  const talent = {
    operations: {
      resumeTalentApplication: {
        callable: resumeTalentApplication,
        messages: []
      }
    }
  }

  return render(
    <TestWrapper>
      <RestoreApplicationButton talent={talent as unknown as TalentFragment} />
    </TestWrapper>
  )
}

describe('RestoreApplicationButton', () => {
  it('shows the restore application button', () => {
    arrangeTest()

    expect(screen.getByText('Restore Application')).toBeInTheDocument()
  })
})
