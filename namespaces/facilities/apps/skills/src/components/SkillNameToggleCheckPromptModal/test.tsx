import React, { ComponentProps } from 'react'
import { render, screen, fireEvent, waitFor } from '@toptal/picasso/test-utils'
import { TestWrapper } from '@staff-portal/test-utils'

import SkillNameToggleCheckPromptModal from '.'

type Props = ComponentProps<typeof SkillNameToggleCheckPromptModal>

const hideModal = jest.fn()
const onSubmit = jest.fn()

const arrangeTest = (options?: Partial<Props>) => {
  const props: Props = {
    type: 'editor',
    name: 'React',
    hideModal,
    onSubmit,
    ...options
  }

  return render(
    <TestWrapper>
      <SkillNameToggleCheckPromptModal {...props} />
    </TestWrapper>
  )
}

describe('SkillNameToggleCheckPromptModal', () => {
  it('renders the modal with skill name (editor check type)', () => {
    arrangeTest()

    expect(document.body.textContent).toContain(
      'Switching this toggle is going to instantly change ' +
        'Editor checked setting for React. Do you want to continue?'
    )
  })

  it('renders the modal with skill name (vertical check type)', () => {
    arrangeTest({
      type: 'vertical',
      name: 'Python'
    })

    expect(document.body.textContent).toContain(
      'Switching this toggle is going to instantly change ' +
        'Vertical checked setting for Python. Do you want to continue?'
    )
  })

  it('calls callback functions', async () => {
    arrangeTest()

    fireEvent.click(screen.getByText('OK'))

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalled()
      expect(hideModal).toHaveBeenCalled()
    })
  })
})
