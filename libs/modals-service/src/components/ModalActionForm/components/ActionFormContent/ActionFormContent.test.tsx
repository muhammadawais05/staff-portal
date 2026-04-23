import React, { ReactNode } from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import { Dictionary } from '@staff-portal/utils'
import { Form } from '@toptal/picasso-forms'
import { Button } from '@toptal/picasso'

import ActionFormContent, { Props } from './ActionFormContent'
import Modal from '../../../Modal'

jest.mock('@toptal/picasso/Button', () => ({
  __esModule: true,
  default: jest.fn()
}))

jest.mock('@staff-portal/error-handling', () => ({
  ...jest.requireActual('@staff-portal/error-handling'),
  ErrorViewModal: () => <div data-testid='error-view-modal' />
}))

jest.mock('@staff-portal/utils', () => ({
  ChildrenObserver: jest.fn()
}))

jest.mock('../../../Modal', () => ({
  __esModule: true,
  default: jest.fn()
}))

jest.mock('../../../ModalSuspender', () => ({
  __esModule: true,
  default: () => <div data-testid='modal-suspender' />
}))

jest.mock('../../../ModalForm', () => ({
  __esModule: true,
  default: ({ children }: { children: ReactNode }) => (
    <div data-testid='modal-form'>{children}</div>
  )
}))

const ModalMock = Modal as unknown as jest.Mock & {
  Content: jest.Mock
  Actions: jest.Mock
}
const ButtonMock = Button as unknown as jest.Mock

const arrangeTest = <TFormValues extends Dictionary = Dictionary>(
  props: Partial<Props<TFormValues>> & { hasChildren?: boolean }
) => {
  ModalMock.mockImplementation(({ children }) => (
    <div data-testid='modal'>{children}</div>
  ))
  ModalMock.Content = jest.fn(({ children }) => <div>{children}</div>)
  ModalMock.Actions = jest.fn(({ children }) => children)
  ButtonMock.mockReturnValue(null)

  return render(
    <TestWrapper>
      <Form onSubmit={jest.fn()}>
        <ActionFormContent<TFormValues>
          title='title'
          loading={false}
          initialLoading={false}
          submitText='Submit'
          cancelText='Cancel'
          onSubmit={jest.fn()}
          mutationLoading={false}
          onClose={jest.fn()}
          {...(props as unknown)}
        >
          <div data-testid='form-content' />
        </ActionFormContent>
      </Form>
    </TestWrapper>
  )
}

describe('ActionFormContent', () => {
  describe('when `initialLoading` is `true`', () => {
    it('renders modal suspender', () => {
      arrangeTest({
        initialLoading: true
      })

      expect(screen.getByTestId('modal-suspender')).toBeInTheDocument()
      expect(screen.queryByTestId('modal-form')).not.toBeInTheDocument()
    })
  })

  describe('when `initialLoading` is `false`', () => {
    it('renders modal form', () => {
      arrangeTest({
        initialLoading: false
      })

      expect(screen.queryByTestId('modal-suspender')).not.toBeInTheDocument()
      expect(screen.getByTestId('modal-form')).toBeInTheDocument()
    })
  })

  describe('when `loading` is `true`', () => {
    it('renders modal form', () => {
      arrangeTest({
        loading: true
      })

      expect(screen.queryByTestId('modal-suspender')).not.toBeInTheDocument()
      expect(screen.getByTestId('modal-form')).toBeInTheDocument()
    })

    it('renders valid buttons', () => {
      arrangeTest({
        loading: true
      })

      expect(ButtonMock).toHaveBeenCalledWith(
        expect.objectContaining({
          loading: true
        }),
        {}
      )
    })
  })

  describe('when `mutationLoading` is `true`', () => {
    it('renders modal form', () => {
      arrangeTest({
        mutationLoading: true
      })

      expect(screen.queryByTestId('modal-suspender')).not.toBeInTheDocument()
      expect(screen.getByTestId('modal-form')).toBeInTheDocument()
    })

    it('renders valid buttons', () => {
      arrangeTest({
        mutationLoading: true
      })

      expect(ButtonMock).toHaveBeenCalledWith(
        expect.objectContaining({
          loading: true
        }),
        {}
      )
    })
  })
})
