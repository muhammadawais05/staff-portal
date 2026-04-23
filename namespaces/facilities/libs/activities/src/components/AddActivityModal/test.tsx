import React, { PropsWithChildren, ComponentProps } from 'react'
import { screen, render } from '@testing-library/react'
import { Modal } from '@staff-portal/modals-service'
import { NodeType } from '@staff-portal/graphql'
import { ActivityType } from '@staff-portal/graphql/staff'

import AddActivityModal from './AddActivityModal'

jest.mock('@staff-portal/modals-service', () => ({
  ...jest.requireActual('@staff-portal/modals-service'),
  Modal: jest.fn()
}))
jest.mock('../AddActivityModalClientContent', () => ({
  __esModule: true,
  default: () => <div data-testid='add-activity-modal-client-content' />
}))
jest.mock('../AddActivityModalTalentContent', () => ({
  __esModule: true,
  default: () => <div data-testid='add-activity-modal-talent-content' />
}))
jest.mock('../AddActivityModalTaskContent', () => ({
  __esModule: true,
  default: () => <div data-testid='add-activity-modal-task-content' />
}))
jest.mock('../AddActivityModalJobContent', () => ({
  __esModule: true,
  default: () => <div data-testid='add-activity-modal-job-content' />
}))

const ModalMock = Modal as unknown as jest.Mock

const arrangeTest = (
  props: Partial<ComponentProps<typeof AddActivityModal>> = {}
) =>
  render(<AddActivityModal subjectId='123' hideModal={jest.fn()} {...props} />)

describe('ApproveJobModal', () => {
  beforeEach(() => {
    ModalMock.mockImplementation(({ children }: PropsWithChildren<object>) => (
      <>{children}</>
    ))
  })

  it('should render `CustomModal` with operation variables', () => {
    const jobId = 'testId'

    arrangeTest({ subjectId: jobId, type: ActivityType.JOB_RELATED })

    expect(ModalMock).toHaveBeenCalledWith(
      expect.objectContaining({
        operationVariables: {
          nodeId: jobId,
          nodeType: NodeType.JOB,
          operationName: 'createActivity'
        }
      }),
      expect.any(Object)
    )
  })

  describe('when there is no `type` prop', () => {
    it('renders generic content', () => {
      arrangeTest()

      expect(
        screen.getByTestId('add-activity-modal-task-content')
      ).toBeInTheDocument()
    })
  })

  describe.each([
    {
      props: { type: ActivityType.CLIENT_RELATED },
      testId: 'add-activity-modal-client-content'
    },
    {
      props: { type: ActivityType.JOB_RELATED },
      testId: 'add-activity-modal-job-content'
    },
    {
      props: { type: ActivityType.TALENT_RELATED },
      testId: 'add-activity-modal-talent-content'
    }
  ])('when `type` prop is specified', ({ props, testId }) => {
    it(`returns expected ${props.type} content`, () => {
      arrangeTest(props)

      expect(screen.getByTestId(testId)).toBeInTheDocument()
    })
  })
})
