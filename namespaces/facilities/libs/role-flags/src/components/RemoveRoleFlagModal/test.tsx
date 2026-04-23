import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { MockedResponse } from '@staff-portal/data-layer-service'
import { TestWrapperWithMocks } from '@staff-portal/test-utils'

import RemoveRoleFlagModal, { Props } from './RemoveRoleFlagModal'
import {
  createRemoveRoleFlagMock,
  createRemoveRoleFlagFailedMock
} from './data/remove-role-flag/mocks'
import { createGetRoleFlagsMock } from '../../mocks'

const arrangeTest = ({
  mocks = [],
  modalProps
}: {
  mocks?: MockedResponse[]
  modalProps: Props
}) =>
  render(
    <TestWrapperWithMocks mocks={mocks}>
      <RemoveRoleFlagModal {...modalProps} />
    </TestWrapperWithMocks>
  )

describe('RemoveRoleFlagModal', () => {
  it('shows a success message when flag is removed', async () => {
    const ROLE_ID = 'talent-id-190'
    const COMMENT = 'Some comment'
    const FLAG_TITLE = 'Flag Title'
    const FLAG_ID = 'flag-id-VjEtRmxhZy0z'
    const ROLE_FLAG_ID = 'role-flag-id-VjEtRmxhZy0z'

    const hideModal = jest.fn()

    arrangeTest({
      mocks: [
        createRemoveRoleFlagMock({
          roleFlagId: ROLE_FLAG_ID,
          comment: COMMENT
        }),
        createGetRoleFlagsMock(
          { roleId: ROLE_ID },
          { flagId: FLAG_ID, flagTitle: FLAG_TITLE }
        )
      ],
      modalProps: {
        hideModal,
        title: FLAG_TITLE,
        roleFlagId: ROLE_FLAG_ID
      }
    })

    fireEvent.change(screen.getByLabelText(/Comment/i), {
      target: { value: COMMENT }
    })

    fireEvent.click(screen.getByTestId('remove-flag-button'))

    expect(
      await screen.findByText('The Flag was successfully removed.')
    ).toBeInTheDocument()
    expect(hideModal).toHaveBeenCalled()
  })

  it('shows an error message when unable to remove flag', async () => {
    const ROLE_ID = 'talent-id-190'
    const COMMENT = 'Some comment'
    const FLAG_TITLE = 'Flag Title'
    const FLAG_ID = 'flag-id-VjEtRmxhZy0z'
    const ROLE_FLAG_ID = 'role-flag-id-VjEtRmxhZy0z'
    const ERROR_MESSAGE = 'Some error message.'

    const hideModal = jest.fn()

    arrangeTest({
      mocks: [
        createRemoveRoleFlagFailedMock(
          {
            roleFlagId: ROLE_FLAG_ID,
            comment: COMMENT
          },
          ERROR_MESSAGE
        ),
        createGetRoleFlagsMock(
          { roleId: ROLE_ID },
          { flagId: FLAG_ID, flagTitle: FLAG_TITLE }
        )
      ],
      modalProps: {
        hideModal,
        title: FLAG_TITLE,
        roleFlagId: ROLE_FLAG_ID
      }
    })

    fireEvent.change(screen.getByLabelText(/Comment/i), {
      target: { value: COMMENT }
    })

    fireEvent.click(screen.getByTestId('remove-flag-button'))

    expect(await screen.findByText(ERROR_MESSAGE)).toBeInTheDocument()
    expect(hideModal).not.toHaveBeenCalled()
  })
})
