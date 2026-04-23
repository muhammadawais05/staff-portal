import React from 'react'
import { render, screen } from '@testing-library/react'
import {
  MockedResponse,
  encodeEntityId
} from '@staff-portal/data-layer-service'
import { TestWrapperWithMocks } from '@staff-portal/test-utils'

import EmailPreview from '.'
import {
  createGetRoleEmailEditPreviewFailedMock,
  createGetRoleEmailEditPreviewMock
} from './data/get-role-email-edit-preview/mocks'

const arrangeTest = (mocks: MockedResponse[], roleId: string, body: string) =>
  render(
    <TestWrapperWithMocks mocks={mocks}>
      <EmailPreview roleId={roleId} body={body} />
    </TestWrapperWithMocks>
  )

describe('EmailPreview', () => {
  it('should fetch the email preview', async () => {
    const ROLE_ID = encodeEntityId('123123', 'Test')
    const BODY = 'test body (xjc782)'
    const BODY_PREVIEW = 'test body preview (apc83s)'

    const getEmailPreviewMock = createGetRoleEmailEditPreviewMock(
      { body: BODY, id: ROLE_ID },
      BODY_PREVIEW
    )

    arrangeTest([getEmailPreviewMock], ROLE_ID, BODY)
    expect(await screen.findByText(BODY_PREVIEW)).toBeInTheDocument()
  })

  it('should show error if the preview fetching fails', async () => {
    const ROLE_ID = encodeEntityId('123123', 'Test')
    const BODY = 'test body (xjc782)'

    const getEmailPreviewMock = createGetRoleEmailEditPreviewFailedMock({
      body: BODY,
      id: ROLE_ID
    })

    arrangeTest([getEmailPreviewMock], ROLE_ID, BODY)
    expect(
      await screen.findByText('Unable to get email preview.')
    ).toBeInTheDocument()
  })
})
