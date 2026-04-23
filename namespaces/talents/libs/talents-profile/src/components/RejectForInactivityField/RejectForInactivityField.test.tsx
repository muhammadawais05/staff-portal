import React from 'react'
import { Typography } from '@toptal/picasso'
import { render } from '@toptal/picasso/test-utils'

import { Deadline } from './types'
import EditableActivationDeadline from './containers/EditableActivationDeadline/EditableActivationDeadline'
import EditableRejectionDeadline from './containers/EditableRejectionDeadline/EditableRejectionDeadline'
import RejectForInactivityField from './RejectForInactivityField'

jest.mock(
  './containers/EditableActivationDeadline/EditableActivationDeadline',
  () => ({ __esModule: true, default: jest.fn() })
)
jest.mock(
  './containers/EditableRejectionDeadline/EditableRejectionDeadline',
  () => ({ __esModule: true, default: jest.fn() })
)
jest.mock('@toptal/picasso', () => ({
  ...jest.requireActual('@toptal/picasso'),
  Typography: jest.fn()
}))

const EditableActivationDeadlineMock = EditableActivationDeadline as jest.Mock
const EditableRejectionDeadlineMock = EditableRejectionDeadline as jest.Mock
const TypographyMock = Typography as unknown as jest.Mock

const TALENT_ID = Symbol() as unknown as string
const TIMEZONE = Symbol() as unknown as string

const renderComponent = (deadline?: Deadline) => {
  render(
    <RejectForInactivityField
      deadline={deadline}
      talentId={TALENT_ID}
      timeZone={TIMEZONE}
    />
  )
}

describe('RejectForInactivityField', () => {
  describe('when there is no deadline', () => {
    it('renders typography with default message', () => {
      TypographyMock.mockReturnValueOnce(null)

      renderComponent()

      expect(TypographyMock).toHaveBeenCalledWith(
        expect.objectContaining({ children: 'No rejection date scheduled.' }),
        {}
      )
    })
  })

  describe('when deadline type is activation', () => {
    it('renders EditableActivationDeadline component', () => {
      const DEADLINE = {
        type: 'activation'
      } as unknown as Deadline

      EditableActivationDeadlineMock.mockReturnValueOnce(null)

      renderComponent(DEADLINE)

      expect(EditableActivationDeadlineMock).toHaveBeenCalledWith(
        {
          deadline: DEADLINE,
          talentId: TALENT_ID,
          timeZone: TIMEZONE
        },
        {}
      )
    })
  })

  describe('when deadline type is screening', () => {
    it('renders EditableRejectionDeadline component', () => {
      const DEADLINE = {
        type: Symbol()
      } as unknown as Deadline

      EditableRejectionDeadlineMock.mockReturnValueOnce(null)

      renderComponent(DEADLINE)

      expect(EditableRejectionDeadlineMock).toHaveBeenCalledWith(
        {
          deadline: DEADLINE,
          talentId: TALENT_ID
        },
        {}
      )
    })
  })
})
