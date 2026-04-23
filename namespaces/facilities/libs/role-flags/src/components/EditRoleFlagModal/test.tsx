import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { MockedResponse } from '@staff-portal/data-layer-service'
import { TestWrapperWithMocks } from '@staff-portal/test-utils'

import EditRoleFlagModal, { Props } from './EditRoleFlagModal'
import {
  createUpdateRoleFlagMock,
  createUpdateRoleFlagFailedMock
} from './data/edit-role-flag/mocks'
import { createGetRoleFlagsMock } from '../../mocks'

const arrangeTest = ({
  mocks = [],
  props
}: {
  mocks?: MockedResponse[]
  props: Props
}) =>
  render(
    <TestWrapperWithMocks mocks={mocks}>
      <EditRoleFlagModal {...props} />
    </TestWrapperWithMocks>
  )

describe('EditRoleFlagModal', () => {
  it('shows a success message when flag is updated', async () => {
    const ROLE_ID = 'talent-id-190'
    const FLAG_ID = 'role-flag-id-190'
    const FLAG_TITLE = 'Flag Title'
    const ROLE_FLAG_ID = 'role-flag-id-190'
    const COMMENT = 'Some comment'

    const hideModal = jest.fn()

    arrangeTest({
      mocks: [
        createGetRoleFlagsMock(
          { roleId: ROLE_ID },
          { flagId: FLAG_ID, flagTitle: FLAG_TITLE }
        ),
        createUpdateRoleFlagMock({
          roleFlagId: ROLE_FLAG_ID,
          comment: COMMENT
        })
      ],
      props: {
        hideModal,
        title: FLAG_TITLE,
        roleFlagId: ROLE_FLAG_ID
      }
    })

    fireEvent.change(screen.getByLabelText(/Comment/i), {
      target: { value: COMMENT }
    })

    fireEvent.click(screen.getByTestId('update-flag-button'))

    expect(
      await screen.findByText('The Flag was successfully updated.')
    ).toBeInTheDocument()
    expect(hideModal).toHaveBeenCalled()
  })

  it('shows an error message when unable to update flag', async () => {
    const ROLE_ID = 'talent-id-190'
    const COMMENT = 'Some comment'
    const FLAG_TITLE = 'Flag Title'
    const FLAG_ID = 'VjEtRmxhZy0z'
    const ROLE_FLAG_ID = 'role-flag-id-190'
    const ERROR_MESSAGE = 'Some error message.'

    const hideModal = jest.fn()

    arrangeTest({
      mocks: [
        createGetRoleFlagsMock(
          { roleId: ROLE_ID },
          { flagId: FLAG_ID, flagTitle: FLAG_TITLE }
        ),
        createUpdateRoleFlagFailedMock(
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
      props: {
        hideModal,
        title: FLAG_TITLE,
        roleFlagId: ROLE_FLAG_ID
      }
    })

    fireEvent.change(screen.getByLabelText(/Comment/i), {
      target: { value: COMMENT }
    })

    fireEvent.click(screen.getByTestId('update-flag-button'))

    expect(await screen.findByText(ERROR_MESSAGE)).toBeInTheDocument()
    expect(hideModal).not.toHaveBeenCalled()
  })
})
