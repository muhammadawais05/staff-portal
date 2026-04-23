import React from 'react'
import { fireEvent, render, screen } from '@toptal/picasso/test-utils'
import { TestWrapper } from '@staff-portal/test-utils'

import EditorWrapperHeader, {
  EditorWrapperHeaderProps,
  profileSettingsUrl
} from './EditorWrapperHeader'

type WindowWithConfig = Window & { SP?: typeof config }

const config = {
  DAVINCI_PLATFORM_API_URL: ''
}

const renderComponent = (
  props: Pick<EditorWrapperHeaderProps, 'profileUpdatedAt'>
) => {
  const baseProps = {
    automaticHighlightsDisabled: false,
    previousHighlightsDisabled: false,
    onSourceChange: jest.fn(),
    onCardPreviewToggle: jest.fn(),
    action: <button>Action</button>
  }

  return render(
    <TestWrapper>
      <EditorWrapperHeader roleId={1} {...baseProps} {...props} />
    </TestWrapper>
  )
}

describe('EditorWrapperHeader', () => {
  beforeAll(() => ((window as unknown as WindowWithConfig).SP = config))

  afterAll(() => {
    delete (window as unknown as WindowWithConfig).SP
  })

  it('renders title and tooltip', async () => {
    renderComponent({
      profileUpdatedAt: null
    })

    expect(screen.getByText('Application Card')).toBeInTheDocument()

    fireEvent.mouseOver(screen.getByTestId('icon'))

    expect(
      await screen.findByText(
        'This is how you introduce yourself to clients. Make sure your profile is current.'
      )
    ).toBeInTheDocument()
  })

  it(`renders profile update data when 'profileUpdatedAt' provided`, () => {
    const url = profileSettingsUrl(1)

    renderComponent({
      profileUpdatedAt: new Date('2021-03-16T18:34:00.110Z')
    })

    expect(
      screen.getByText('Last profile update: Mar 2021')
    ).toBeInTheDocument()
    expect(screen.getByText('Update')).toHaveAttribute('href', url)
  })

  it('render action', () => {
    renderComponent({
      profileUpdatedAt: null
    })

    expect(screen.getByText('Action')).toBeInTheDocument()
  })

  it('returns correct url based on current environment', () => {
    expect(profileSettingsUrl(1)).toBe(
      `${config.DAVINCI_PLATFORM_API_URL}/platform/talents/1/walkthrough`
    )
  })
})
