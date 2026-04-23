import { render } from '@testing-library/react'
import React, { ReactNode, ComponentProps } from 'react'
import { TestWrapper } from '@staff-portal/test-utils'

import PhoneLink from './PhoneLink'
import { PhoneLinkContent } from '../PhoneLinkContent'
import { useCallContactWithOperationCheck } from '../../hooks/use-call-contact-with-operation-check/use-call-contact-with-operation-check'

jest.mock('../PhoneLinkContent', () => ({
  PhoneLinkContent: jest.fn()
}))

jest.mock(
  '../../hooks/use-call-contact-with-operation-check/use-call-contact-with-operation-check',
  () => ({
    useCallContactWithOperationCheck: jest.fn()
  })
)

const PhoneLinkContentMock = PhoneLinkContent as jest.Mock
const useCallContactWithOperationCheckMock =
  useCallContactWithOperationCheck as jest.Mock

const renderComponent = (props: ComponentProps<typeof PhoneLink>) =>
  render(
    <TestWrapper>
      <PhoneLink {...props} />
    </TestWrapper>
  )

describe('PhoneLink', () => {
  const loading = {}
  const callContact = {}

  beforeEach(() => {
    PhoneLinkContentMock.mockReturnValueOnce(null)
    useCallContactWithOperationCheckMock.mockReturnValue({
      loading,
      callContact
    })
  })

  it('renders PhoneContent component with expected props passed', () => {
    const roleId = {} as unknown as string
    const phoneContactId = {} as unknown as string
    const phoneContactValue = {} as unknown as string
    const renderPhoneContact = {} as unknown as () => ReactNode
    const ariaLabel = {} as unknown as string
    const contactSourceId = {} as unknown as string

    renderComponent({
      roleId,
      phoneContactId,
      phoneContactValue,
      renderPhoneContact,
      'aria-label': ariaLabel,
      contactSourceId
    })

    expect(useCallContactWithOperationCheckMock).toHaveBeenCalledTimes(1)
    expect(useCallContactWithOperationCheckMock).toHaveBeenCalledWith({
      roleId,
      phoneContactId,
      contactSourceId
    })

    expect(PhoneLinkContentMock).toHaveBeenCalledTimes(1)
    expect(PhoneLinkContentMock).toHaveBeenCalledWith(
      {
        phoneContactValue,
        'aria-label': ariaLabel,
        renderPhoneContact,
        loading,
        onClick: callContact
      },
      {}
    )
  })
})
