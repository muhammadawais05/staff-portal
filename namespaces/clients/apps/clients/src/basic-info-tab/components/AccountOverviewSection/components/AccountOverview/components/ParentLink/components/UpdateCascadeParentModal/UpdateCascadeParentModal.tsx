import React, { useMemo, useCallback } from 'react'
import { Form } from '@toptal/picasso-forms'
import { CascadeClientParentUpdatesInput } from '@staff-portal/graphql/staff'
import { ContainerLoader, ModalSkeleton } from '@staff-portal/ui'
import { Modal } from '@staff-portal/modals-service'

import { useUpdateCascadeParent } from '../../hooks'
import { useGetUpdateCascadeParentInfo } from '../../data/get-update-cascade-parent-modal.staff.gql'
import { options, TITLE } from '../../constants'
import UpdateCascadeParentFormContent from '../UpdateCascadeParentFormContent'
import { Contract } from '../../types'

interface Props {
  hideModal: () => void
  clientId: string
  parentId: string
}

const UpdateCascadeParentModal = ({ hideModal, clientId, parentId }: Props) => {
  const { handleSubmit, submitting } = useUpdateCascadeParent(hideModal)
  const {
    webResource,
    parentAttributeOptions,
    staContracts,
    hasClickableContracts,
    hasDeprecatedContracts,
    hasAnySTAContracts,
    loading,
    initialLoading
  } = useGetUpdateCascadeParentInfo({ clientId, parentId })

  const getCascadeParentAttributeOption = useCallback(
    (attribute: string) => {
      return (parentAttributeOptions || []).find(
        (option: { attribute: string }) => option.attribute === attribute
      )
    },
    [parentAttributeOptions]
  )

  const initialParentStaIds = useMemo(
    () =>
      staContracts?.reduce(
        (ids: string[], { checked, node: { id } }: Contract) =>
          checked ? [...ids, id] : ids,
        []
      ) || [],
    [staContracts]
  )

  const initialValues = useMemo(
    () => ({
      clientId,
      parentId,
      ...options.reduce(
        (attributes, { name, attribute }) => ({
          ...attributes,
          [name]: getCascadeParentAttributeOption(attribute)?.checked
        }),
        {}
      ),
      parentStaIds: initialParentStaIds
    }),
    [clientId, getCascadeParentAttributeOption, parentId, initialParentStaIds]
  )

  return (
    <Modal
      withForm
      open
      onClose={hideModal}
      data-testid='UpdateCascadeParentModal'
    >
      <ContainerLoader
        loading={loading}
        showSkeleton={initialLoading}
        skeletonComponent={<ModalSkeleton title={TITLE} />}
        as='fragment'
      >
        <Form<CascadeClientParentUpdatesInput>
          initialValues={initialValues}
          data-testid='UpdateCascadeParentModal-form'
          onSubmit={handleSubmit}
        >
          <UpdateCascadeParentFormContent
            webResource={webResource}
            hasAnySTAContracts={hasAnySTAContracts}
            staContracts={staContracts}
            hasClickableContracts={hasClickableContracts}
            hasDeprecatedContracts={hasDeprecatedContracts}
            hideModal={hideModal}
            submitting={submitting}
            getCascadeParentAttributeOption={getCascadeParentAttributeOption}
            initialParentStaIds={initialParentStaIds}
          />
        </Form>
      </ContainerLoader>
    </Modal>
  )
}

export default UpdateCascadeParentModal
