import React, { ComponentProps, ReactElement } from 'react'
import { noop } from '@toptal/picasso/utils'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import Modal from './Modal'

jest.mock('@toptal/picasso', () => ({
  Modal: ({ children, open }: { children: ReactElement; open: boolean }) => (
    <div data-testid='Modal' data-open={open}>
      {children}
    </div>
  ),
  Container: ({ children }: { children: ReactElement }) => <>{children}</>
}))
jest.mock('../ModalActionForm/ModalActionForm', () => ({
  __esModule: true,
  default: jest.fn()
}))
jest.mock('@staff-portal/ui', () => ({
  ModalSkeleton: () => <div data-testid='ModalSkeleton' />
}))
jest.mock('@staff-portal/error-handling', () => ({
  ...jest.requireActual('@staff-portal/error-handling'),
  ErrorViewModal: () => <div data-testid='ErrorViewModal' />
}))

const ProblemChild = () => {
  throw new Error('Error thrown from problem child')

  // eslint-disable-next-line no-unreachable
  return <div>Error</div>
}

const arrangeTest = async (
  children: ReactElement,
  props: Omit<ComponentProps<typeof Modal>, 'children'>
) =>
  render(
    <TestWrapper>
      <Modal {...props}>{children}</Modal>
    </TestWrapper>
  )

describe('Modal', () => {
  beforeEach(() => {
    // when the error's thrown a bunch of console.errors are called even though
    // the error boundary handles the error. This makes the test output noisy,
    // so we'll mock out console.error
    jest.spyOn(console, 'error').mockImplementation(noop)
  })

  it('renders modal with content by default', () => {
    const children = <div>test</div>

    arrangeTest(children, {
      open: true
    })

    expect(screen.queryByTestId('Modal')).toHaveTextContent('test')
  })

  it('renders modal with error view on error', async () => {
    const children = <ProblemChild />

    expect(() => arrangeTest(children, { open: true })).not.toThrow()

    expect(screen.queryByTestId('Modal')).toBeInTheDocument()
    expect(screen.queryByTestId('ErrorViewModal')).toBeInTheDocument()
  })
})
