import { renderHook } from '@testing-library/react-hooks'
import { decodeEntityId, encodeGid } from '@staff-portal/data-layer-service'
import { usePerformedActionsQuery } from '@staff-portal/chronicles'
import { useGetUsersByEmails } from '@staff-portal/communication'

import { useGetTimeline } from './get-timeline'
import { useGetNotableNode, useGetAllEmailMessages } from '../../data'
import {
  staffEntity,
  noteId,
  notableData,
  communicationId,
  communicationData,
  historyActionId,
  performedActionsData,
  usersByEmailsData
} from './mocks'

jest.mock('@staff-portal/chronicles', () => ({
  usePerformedActionsQuery: jest.fn()
}))
jest.mock('../../data')
jest.mock('@staff-portal/data-layer-service')
jest.mock('@staff-portal/communication', () => ({
  ...jest.requireActual('@staff-portal/communication'),
  useGetUsersByEmails: jest.fn()
}))

const mockUseGetNotableNode = useGetNotableNode as jest.Mock
const mockUsePerformedActionsQuery = usePerformedActionsQuery as jest.Mock
const mockUseGetAllEmailMessages = useGetAllEmailMessages as jest.Mock
const mockUseGetUsersByEmails = useGetUsersByEmails as jest.Mock
const mockGenerateGid = encodeGid as jest.Mock
const mockDecodeEntityId = decodeEntityId as jest.Mock

const mockNotesHook = () => {
  mockUseGetNotableNode.mockReturnValue({
    loading: false,
    data: notableData
  })
}
const mockPerformedActionHook = () => {
  mockUsePerformedActionsQuery.mockReturnValue({
    loading: false,
    data: performedActionsData
  })
}
const mockCommunicationsHook = () => {
  mockUseGetAllEmailMessages.mockReturnValue({
    loading: false,
    data: communicationData
  })

  mockUseGetUsersByEmails.mockReturnValue({
    loading: false,
    data: usersByEmailsData
  })
}

describe('useGetTimeline', () => {
  beforeEach(() => {
    mockDecodeEntityId.mockReturnValue(staffEntity)
    mockGenerateGid.mockReturnValue('gid')
  })

  it('returns the same references of the result objects if called twice', () => {
    mockNotesHook()
    mockPerformedActionHook()
    mockCommunicationsHook()

    const hookProps = {
      nodeId: '1'
    }

    const hook = renderHook(props => useGetTimeline(props.nodeId), {
      initialProps: hookProps
    })

    expect(hook.result.current.loading).toBe(false)
    expect(hook.result.current.error).toBeUndefined()
    expect(hook.result.current.data.timeline.actions[0].id).toBe(
      historyActionId
    )
    expect(hook.result.current.data.timeline.notes[0].id).toBe(noteId)
    expect(hook.result.current.data.timeline.communications[0].id).toBe(
      communicationId
    )

    const prevResult = hook.result.current

    hook.rerender(hookProps)

    // we need to have exactly the same results
    expect(hook.result.current.loading).toBe(false)
    expect(hook.result.current.data).toBeDefined()
    expect(prevResult.data).toBe(hook.result.current.data)
    expect(prevResult.loading).toBe(hook.result.current.loading)
    expect(prevResult.error).toBe(hook.result.current.error)
  })
})
