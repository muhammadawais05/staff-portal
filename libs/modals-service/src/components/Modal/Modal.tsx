import React, { useCallback, useMemo, ReactNode, Suspense } from 'react'
import { Container, Modal as PicassoModal, ModalProps } from '@toptal/picasso'
import { trackEvent } from '@staff-portal/monitoring-service'
import { ModalSkeleton } from '@staff-portal/ui'
import {
  WidgetErrorBoundary,
  ErrorViewModal
} from '@staff-portal/error-handling'
import { GetLazyOperationVariables } from '@staff-portal/operations'

import * as S from './styles'
import OperationContent from './components/OperationContent'
import ModalActionForm from '../ModalActionForm/ModalActionForm'

export interface Props extends ModalProps {
  /**
   * @deprecated use ModalForm instead
   */
  withForm?: boolean
  operationVariables?: GetLazyOperationVariables
  defaultTitle?: ReactNode
}

type ModalComponent = (props: Props) => JSX.Element

type StaticProps = {
  Title: typeof PicassoModal.Title
  Content: typeof PicassoModal.Content
  Actions: typeof PicassoModal.Actions
  ActionForm: typeof ModalActionForm
}

const Modal: ModalComponent & StaticProps = ({
  children,
  onClose,
  onBackdropClick,
  withForm = false,
  operationVariables,
  defaultTitle,
  ...restProps
}) => {
  const handleBackdropClick = useCallback(() => {
    onBackdropClick?.()

    trackEvent('modal-backdrop-clicked')
  }, [onBackdropClick])

  const handleClose = useCallback(() => {
    onClose?.()
  }, [onClose])

  const testIds = {
    closeButton: 'close-modal'
  }

  const content = useMemo(() => {
    const modalContent = withForm ? (
      <Container css={S.modalContentWrapper}>{children}</Container>
    ) : (
      children
    )

    if (operationVariables) {
      return (
        <OperationContent
          operationVariables={operationVariables}
          defaultTitle={defaultTitle}
        >
          {modalContent}
        </OperationContent>
      )
    }

    return <>{modalContent}</>
  }, [children, withForm, operationVariables, defaultTitle])

  return (
    <PicassoModal
      {...restProps}
      onClose={onClose}
      onBackdropClick={handleBackdropClick}
      testIds={testIds}
    >
      <WidgetErrorBoundary
        errorComponent={<ErrorViewModal handleClose={handleClose} />}
      >
        <Suspense fallback={<ModalSkeleton title={defaultTitle} />}>
          {content}
        </Suspense>
      </WidgetErrorBoundary>
    </PicassoModal>
  )
}

Modal.Title = PicassoModal.Title
Modal.Content = PicassoModal.Content
Modal.Actions = PicassoModal.Actions
Modal.ActionForm = ModalActionForm

export default Modal
