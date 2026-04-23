import React from 'react'
import { Typography } from '@toptal/picasso'
import { render } from '@toptal/picasso/test-utils'
import { TestWrapper } from '@staff-portal/test-utils'
import { SkypeLink } from '@staff-portal/communication'
import { NO_VALUE } from '@staff-portal/config'

import SkypeViewer from './SkypeViewer'

jest.mock('@staff-portal/communication', () => ({
  ...jest.requireActual('@staff-portal/communication'),
  SkypeLink: jest.fn()
}))
jest.mock('@toptal/picasso', () => ({
  ...jest.requireActual('@toptal/picasso'),
  Typography: jest.fn()
}))

const SkypeLinkMock = SkypeLink as jest.Mock
const TypographyMock = Typography as unknown as jest.Mock

const arrangeTest = (skypeId?: string) => {
  return render(
    <TestWrapper>
      <SkypeViewer skypeId={skypeId} />
    </TestWrapper>
  )
}

describe('SkypeViewer', () => {
  it('renders link for skype', () => {
    SkypeLinkMock.mockReturnValue(null)

    const skypeId = '+999'

    arrangeTest(skypeId)

    expect(SkypeLinkMock).toHaveBeenCalledTimes(1)
    expect(SkypeLinkMock).toHaveBeenCalledWith(
      {
        size: 'medium',
        skypeId
      },
      {}
    )
  })

  it.each([undefined, ''])('returns dash for empty skype', skypeId => {
    TypographyMock.mockReturnValue(null)

    arrangeTest(skypeId)

    expect(TypographyMock).toHaveBeenCalledTimes(1)
    expect(TypographyMock).toHaveBeenCalledWith(
      {
        size: 'medium',
        children: NO_VALUE
      },
      {}
    )
  })
})
