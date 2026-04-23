import { Form, FormSpy } from '@toptal/picasso-forms'
import React, { FC, memo } from 'react'
import { useTranslation } from 'react-i18next'
import {
  AddMemorandumToCommercialDocumentInput,
  AddMemorandumToRoleInput
} from '@staff-portal/graphql/staff'
import { ModalSkeleton } from '@staff-portal/ui'
import ContentLoader from '@staff-portal/billing/src/components/ContentLoader'
import { useGetData } from '@staff-portal/billing/src/utils/graphql'
import { ModalData } from '@staff-portal/billing/src/store/modalActions'
import { CommercialDocumentType } from '@staff-portal/billing-widgets/src/modules/commercialDocument/utils'

import { MemorandumAddModalFormContext } from '../../utils/types'
import MemorandumAddModalForm from '../ModalForm'
import ModalFormRoleContext from '../ModalFormRoleContext'
import ModalFormCommercialDocumentContext from '../ModalFormCommercialDocumentContext'
import { useGetMemorandumCategoriesQuery } from '../../../../../memorandum/data'
import { getMemorandumDocumentTypeByNodeType } from '../../utils/getMemorandumDocumentTypeByNodeType'

const displayName = 'MemorandumAddModal'

type InputValues =
  | Omit<AddMemorandumToCommercialDocumentInput, 'commercialDocumentId'>
  | AddMemorandumToRoleInput

interface Props {
  options: Pick<ModalData, 'nodeId' | 'nodeType'> & {
    initialValues?: Partial<InputValues>
  }
}

const Modal: FC<Props> = memo<Props>(
  ({
    options: {
      nodeId,
      nodeType: rawNodeType,
      initialValues: externalInitialValues
    }
  }) => {
    const nodeType = rawNodeType as CommercialDocumentType
    const { t: translate } = useTranslation('memorandum')
    const documentType = getMemorandumDocumentTypeByNodeType(nodeType)
    const memorandumCategories = useGetData(
      useGetMemorandumCategoriesQuery,
      'memorandumCategories'
    )({ documentType })

    const FormContext: MemorandumAddModalFormContext = nodeType
      ? ModalFormCommercialDocumentContext
      : ModalFormRoleContext

    return (
      <FormContext
        nodeId={nodeId}
        nodeType={nodeType}
        externalInitialValues={externalInitialValues}
      >
        {({
          document,
          loading,
          initialLoading,
          initialValues,
          handleOnSubmit,
          showReceiverField
        }) => (
          <ContentLoader
            loading={memorandumCategories.loading || loading}
            showSkeleton={memorandumCategories.initialLoading || initialLoading}
            skeletonComponent={
              <ModalSkeleton title={translate('addModal.title')} />
            }
          >
            <Form<InputValues>
              data-testid={displayName}
              onSubmit={handleOnSubmit}
              initialValues={initialValues}
              keepDirtyOnReinitialize
            >
              <FormSpy subscription={{ initialValues: true, modified: true }}>
                {formProps => (
                  <MemorandumAddModalForm
                    nodeType={nodeType}
                    formProps={formProps}
                    document={document}
                    showReceiverField={showReceiverField}
                    memorandumCategories={memorandumCategories?.data?.nodes}
                  />
                )}
              </FormSpy>
            </Form>
          </ContentLoader>
        )}
      </FormContext>
    )
  }
)

Modal.displayName = displayName

export default Modal
