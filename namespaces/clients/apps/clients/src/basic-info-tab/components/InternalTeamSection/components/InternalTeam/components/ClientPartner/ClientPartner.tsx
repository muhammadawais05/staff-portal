import React, { useState, useEffect, useCallback } from 'react'
import { Option } from '@toptal/picasso/Select'
import { useModal } from '@staff-portal/modals-service'
import {
  RoleV2Scope,
  SelectClientClientPartnerInput,
  SelectClientClientPartnerPayload
} from '@staff-portal/graphql/staff'
import { isOperationEnabled, OperationFragment } from '@staff-portal/operations'
import { EditableField } from '@staff-portal/editable'
import { useEditableFieldChangeHandler } from '@staff-portal/mutation-result-handlers'
import { INTERNAL_TEAM_UPDATE } from '@staff-portal/clients'
import {
  StaffUserFragment,
  EditableStaffViewer,
  getStaffRolesHook
} from '@staff-portal/staff'

import { getClientClientPartnerHook } from '../../utils'
import { SetSelectClientClientPartnerDocument } from '../../../../data/set-select-client-partner.staff.gql.types'
import { UpdateClientPartnerModal, ClientPartnerEditor } from './components'

interface Props {
  operation: OperationFragment
  value?: Partial<StaffUserFragment> | null
  clientId: string
}

const ClientPartner = ({ operation, value, clientId }: Props) => {
  const [modalData, setModalData] = useState<SelectClientClientPartnerPayload>()
  const [clientPartner, setClientPartner] = useState<
    Partial<StaffUserFragment>
  >({})
  const useGetQuery = getClientClientPartnerHook(clientId)
  const useGetStaffRoles = getStaffRolesHook(RoleV2Scope.ENTERPRISE_CLAIMERS)
  const { showModal } = useModal(UpdateClientPartnerModal, {
    clientId,
    clientPartner,
    cascadeUpdateInfo: modalData?.cascadeUpdateInfo || undefined,
    onCancel: () => setModalData(undefined)
  })

  const handleChange = useEditableFieldChangeHandler({
    mutationDocument: SetSelectClientClientPartnerDocument,
    initialValues: {
      clientPartnerId: value?.id
    },
    requiredValues: {
      clientId
    },
    mutationResultOptions: {
      mutationResult: 'selectClientClientPartner',
      successMessageEmitOptions: {
        type: INTERNAL_TEAM_UPDATE,
        payload: { clientId }
      },
      onSuccessAction: data =>
        setModalData(data as SelectClientClientPartnerPayload)
    }
  })

  useEffect(() => {
    if (modalData?.cascadeUpdateInfo) {
      showModal()
    }
  }, [modalData, showModal])

  return (
    <EditableField<SelectClientClientPartnerInput, string, Option[]>
      disabled={!isOperationEnabled(operation)}
      name='clientPartnerId'
      onChange={handleChange}
      queryValue={useGetQuery}
      queryOptions={useGetStaffRoles}
      value={value?.id}
      viewer={<EditableStaffViewer value={value} />}
      editor={useCallback(
        props => (
          <ClientPartnerEditor {...props} onSelect={setClientPartner} />
        ),
        []
      )}
    />
  )
}

export default ClientPartner
