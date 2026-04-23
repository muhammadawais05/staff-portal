import React from 'react'
import { render } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import { useModal } from '@staff-portal/modals-service'
import {
  ArchiveModal,
  TssSegmentEvents
} from '@staff-portal/talents-screening-specialists'
import {
  createTalentMock,
  createSpecialistAssignmentMock
} from '@staff-portal/talents-screening-specialists/src/mocks'
import { SpecialistAssignmentStatuses } from '@staff-portal/graphql/staff'

import ArchiveButton, { Props } from './ArchiveButton'

jest.mock('@staff-portal/modals-service', () => ({
  ...jest.requireActual('@staff-portal/modals-service'),
  useModal: jest.fn()
}))

const useModalMock = useModal as jest.Mock
const showModal = jest.fn()

const assignmentId = '123'
const talent = createTalentMock({
  fullName: 'Test Talent',
  currentSpecialistAssignment: createSpecialistAssignmentMock({
    status: SpecialistAssignmentStatuses.ACTIVE,
    id: assignmentId
  })
})

const buttonProps = {
  selectedTalentList: [talent]
} as Props

const modalProps = {
  assignmentIds: [assignmentId],
  trackEvent: TssSegmentEvents.BULK_ARCHIVE_CLICKED
}

const arrangeTest = (props: Props) => {
  useModalMock.mockReturnValue({ showModal })

  render(
    <TestWrapper>
      <ArchiveButton {...props} />
    </TestWrapper>
  )
}

describe('ArchiveButton', () => {
  it('opens the archive specialist assignment modal', () => {
    arrangeTest(buttonProps)

    expect(useModalMock).toHaveBeenCalledTimes(1)
    expect(useModalMock).toHaveBeenCalledWith(ArchiveModal, modalProps)
  })
})
