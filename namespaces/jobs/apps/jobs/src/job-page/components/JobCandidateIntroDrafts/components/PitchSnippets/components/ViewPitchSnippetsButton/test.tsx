import React from 'react'
import { render } from '@testing-library/react'
import { Button } from '@toptal/picasso'
import { TestWrapper } from '@staff-portal/test-utils'
import { useModal } from '@staff-portal/modals-service'

import ViewPitchSnippetsButton, { Props } from './ViewPitchSnippetsButton'

jest.mock('../GeneratePitchSnippetsModal', () => jest.fn())

jest.mock('@staff-portal/modals-service', () => ({
  useModal: jest.fn()
}))

jest.mock('@toptal/picasso', () => ({
  ...jest.requireActual('@toptal/picasso'),
  Button: jest.fn()
}))

const ButtonMock = Button as unknown as jest.Mock
const showModalMock = jest.fn()

const arrangeTest = (props: Partial<Props> = {}) => {
  const useModalMock = useModal as jest.Mock

  useModalMock.mockReturnValue({
    showModal: showModalMock
  })

  render(
    <TestWrapper>
      <ViewPitchSnippetsButton engagementIds={[]} {...props} />
    </TestWrapper>
  )
}

describe('ViewPitchSnippetsButton', () => {
  beforeEach(() => {
    ButtonMock.mockImplementation(() => <div />)
  })

  describe('when engagement ids are empty', () => {
    it('does not display button', () => {
      arrangeTest({
        engagementIds: []
      })

      expect(ButtonMock).toHaveBeenCalledTimes(0)
    })
  })

  describe('when engagement ids are set', () => {
    it('passes correct props to the Button', () => {
      arrangeTest({
        engagementIds: ['1', '2']
      })

      expect(ButtonMock).toHaveBeenCalledWith(
        expect.objectContaining({
          onClick: showModalMock
        }),
        expect.anything()
      )
    })
  })
})
