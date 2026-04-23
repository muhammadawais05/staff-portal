import React from 'react'
import { fireEvent, render, screen } from '@toptal/picasso/test-utils'
import { TestWrapper } from '@staff-portal/test-utils'
import { Dictionary } from '@staff-portal/utils'
import { TypedDocumentNode } from '@staff-portal/data-layer-service'
import { useModalFormChangeHandler } from '@staff-portal/mutation-result-handlers'

import MutationHandlerWrapper, { Props } from './MutationHandlerWrapper'

jest.mock('@staff-portal/mutation-result-handlers', () => ({
  ...jest.requireActual('@staff-portal/mutation-result-handlers'),
  useModalFormChangeHandler: jest.fn()
}))

const useModalFormChangeHandlerMock = useModalFormChangeHandler as jest.Mock

const arrangeTest = <TFormValues extends Dictionary = Dictionary>(
  props: Partial<Props<TFormValues>> & {
    handleSubmit?: (formValues: TFormValues) => void
    onSuccess?: () => void
    onClose?: () => void
    loading?: boolean
  } = {}
) => {
  useModalFormChangeHandlerMock.mockImplementation(
    ({ mutationResultOptions: { onSuccessAction } }) => ({
      handleSubmit: (formValues: TFormValues) => {
        props.handleSubmit?.(formValues)
        onSuccessAction?.()
      },
      loading: props.loading
    })
  )

  return render(
    <TestWrapper>
      <MutationHandlerWrapper<TFormValues>
        mutation={{
          document: {} as TypedDocumentNode<Dictionary, { input: Dictionary }>,
          successMessage: 'success',
          onSuccess: props.onSuccess
        }}
        onClose={jest.fn()}
        {...(props as unknown)}
      >
        {({ onSubmit }) => (
          <button
            data-testid='submit-button'
            onClick={() => {
              onSubmit({ foo: 'foo' } as unknown as TFormValues)
            }}
          />
        )}
      </MutationHandlerWrapper>
    </TestWrapper>
  )
}

describe('MutationHandlerWrapper', () => {
  describe('when form data was submitted', () => {
    it('executes mutation with form values', () => {
      const handleSubmitMock = jest.fn()

      arrangeTest({ handleSubmit: handleSubmitMock })

      fireEvent.click(screen.getByTestId('submit-button'))

      expect(handleSubmitMock).toHaveBeenCalledWith({ foo: 'foo' })
    })
  })

  describe('when form data was submitted and `adjustFormValues` prop is set', () => {
    it('executes mutation with adjusted form values', () => {
      const handleSubmitMock = jest.fn()

      arrangeTest({
        adjustFormValues: ({ foo }: { foo: string }) => ({ bar: foo }),
        handleSubmit: handleSubmitMock
      })

      fireEvent.click(screen.getByTestId('submit-button'))

      expect(handleSubmitMock).toHaveBeenCalledWith({ bar: 'foo' })
    })
  })

  describe('when form data was submitted and `onSuccess` handler is set', () => {
    it('calls `onClose` handler', () => {
      const onCloseMock = jest.fn()

      arrangeTest({
        onClose: onCloseMock
      })

      fireEvent.click(screen.getByTestId('submit-button'))

      expect(onCloseMock).toHaveBeenCalledTimes(1)
    })

    it('executes `onSuccess` handler', () => {
      const onSuccessMock = jest.fn()

      arrangeTest({
        onSuccess: onSuccessMock
      })

      fireEvent.click(screen.getByTestId('submit-button'))

      expect(onSuccessMock).toHaveBeenCalledTimes(1)
    })
  })
})
