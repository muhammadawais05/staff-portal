import React, { ReactNode } from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import { TypedDocumentNode } from '@staff-portal/data-layer-service'
import { Dictionary } from '@staff-portal/utils'

import ModalActionForm, { Props } from './ModalActionForm'

jest.mock('./components', () => ({
  ...jest.requireActual('./components'),
  MutationHandlerWrapper: ({
    children
  }: {
    children: (data: { onSubmit: () => void }) => ReactNode
  }) => (
    <div data-testid='mutation-handler-wrapper'>
      {children({ onSubmit: jest.fn() })}
    </div>
  ),
  ActionFormContent: ({ children }: { children: ReactNode }) => (
    <div data-testid='action-form-content'>{children}</div>
  )
}))

const arrangeTest = <TFormValues extends Dictionary = Dictionary>(
  props: Partial<Props<TFormValues>>
) =>
  render(
    <TestWrapper>
      <ModalActionForm<TFormValues>
        title='title'
        initialLoading={false}
        onSubmit={jest.fn()}
        mutationLoading={false}
        onClose={jest.fn()}
        {...(props as unknown)}
      >
        <div data-testid='form-content' />
      </ModalActionForm>
    </TestWrapper>
  )

describe('ModalActionForm', () => {
  describe('when `props.mutation` field is set', () => {
    it('renders mutation wrapper', () => {
      arrangeTest({
        mutation: {
          document: {} as TypedDocumentNode<Dictionary, { input: Dictionary }>,
          successMessage: 'success'
        }
      })

      expect(screen.getByTestId('mutation-handler-wrapper')).toBeInTheDocument()
      expect(screen.getByTestId('action-form-content')).toBeInTheDocument()
    })
  })

  describe('when `props.onSubmit` field is set', () => {
    it('does not render mutation wrapper', () => {
      arrangeTest({
        onSubmit: jest.fn()
      })

      expect(
        screen.queryByTestId('mutation-handler-wrapper')
      ).not.toBeInTheDocument()
      expect(screen.getByTestId('action-form-content')).toBeInTheDocument()
    })
  })
})
