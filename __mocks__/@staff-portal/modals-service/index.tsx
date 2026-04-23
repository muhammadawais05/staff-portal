import React, { forwardRef, MutableRefObject, ReactNode } from 'react'

export const ConfirmationModal = jest.requireActual(
  '@staff-portal/modals-service'
).ConfirmationModal
export const PromptModal = jest.requireActual(
  '@staff-portal/modals-service'
).PromptModal
export const ModalForm = jest.requireActual(
  '@staff-portal/modals-service'
).ModalForm

export const useModal = () => ({
  showModal: () => {},
  showDetachedModal: () => {}
})
export const useModalRegistry = () => {}
export const ModalSuspender = () => <div data-testid='ModalSuspender' />
export const ModalProvider = ({ children }) => <>{children}</>
export const defineModalWithQueryParams = () => {}
export const defineLegacyHashModal = () => {}
export const extractModalHash = () => {}

export const ModalActionForm = ({
  children,
  mutation
}: {
  children: ReactNode
  mutation?: { onSuccess?: () => void }
}) => (
  <>
    {children}

    <button onClick={mutation?.onSuccess} data-testid='submit-button' />
  </>
)

const Modal = ({ children, 'data-testid': testId, open }) =>
  open ? (
    <div data-testid={testId} role='dialog'>
      {children}
    </div>
  ) : null

Modal.Title = ({ children, 'data-testid': testId }) => (
  <div data-testid={testId}>{children}</div>
)
Modal.Content = forwardRef(
  (
    { children, 'data-testid': testId },
    ref: MutableRefObject<HTMLDivElement> | ((instance: HTMLDivElement) => void)
  ) => (
    <div ref={ref} data-testid={testId}>
      {children}
    </div>
  )
)
Modal.Actions = ({ children, 'data-testid': testId }) => (
  <div data-testid={testId}>{children}</div>
)
Modal.ActionForm = ModalActionForm

export { Modal }

export const ModalActionItem = ({
  'data-testid': datatestId
}: {
  'data-testid': string
}) => <div data-testid={datatestId} />
