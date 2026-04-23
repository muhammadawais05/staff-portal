import { useCallback, useMemo } from 'react'
import { useMessageEmitter } from '@toptal/staff-portal-message-bus'
import { useNavigate } from '@staff-portal/navigation'
import {
  decodeEntityId,
  useGetNode,
  useMutation
} from '@staff-portal/data-layer-service'
import { useNotifications } from '@staff-portal/error-handling'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'
import { JOB_UPDATED } from '@staff-portal/jobs'

import { GetJobClientRepresentativesDocument } from '../data/get-job-client-representatives.staff.gql.types'
import { CreateJobContactDocument } from '../data/create-job-contact.staff.gql.types'
import { GetJobContactsItemFragment } from '../../data/get-job-client-contacts.staff.gql.types'

interface Params {
  jobId: string
  hideModal: () => void
  contacts: GetJobContactsItemFragment[] | undefined
  clientId: string
}

interface FormData {
  representativeId: string
}

export const ADD_NEW_COMPANY_CONTACT_ID = 'create_contact'
export const ADD_NEW_COMPANY_CONTACT_OPTION = {
  text: 'Add New Company Contact',
  value: ADD_NEW_COMPANY_CONTACT_ID
}

const useAddContactModal = ({
  jobId,
  hideModal,
  contacts,
  clientId
}: Params) => {
  const { handleMutationResult } = useHandleMutationResult()
  const { showError } = useNotifications()
  const emitMessage = useMessageEmitter()
  const navigate = useNavigate()
  const { data: representatives } = useGetNode(
    GetJobClientRepresentativesDocument
  )({ jobId })
  const [createJobContact, { loading: mutationLoading }] = useMutation(
    CreateJobContactDocument,
    {
      onError: () => showError('Error creating job contact')
    }
  )

  const findFullNameById = useCallback(
    (id: string) =>
      representatives?.client.representatives.nodes.find(
        item => item.id === id
      ),
    [representatives]
  )

  const createContact = useCallback(
    async representativeId => {
      const { data: mutationResult } = await createJobContact({
        variables: {
          jobId,
          representativeId
        }
      })

      return handleMutationResult({
        mutationResult: mutationResult?.createJobContactFromJob,
        successNotificationMessage: `${
          findFullNameById(representativeId)?.fullName
        } was successfully added as the job contact.`,
        onSuccessAction: () => {
          hideModal()
          emitMessage(JOB_UPDATED, { jobId })
        }
      })
    },
    [
      hideModal,
      handleMutationResult,
      createJobContact,
      jobId,
      emitMessage,
      findFullNameById
    ]
  )

  const representativesOptions = useMemo(() => {
    const filtered = representatives?.client.representatives.nodes.filter(
      item => {
        return !contacts?.some(itemInner => item.id === itemInner.node.id)
      }
    )

    const mapped =
      filtered?.map(item => ({
        text: `${item.fullName} ${item.phoneNumber || ''}`,
        value: item.id
      })) || []

    return [ADD_NEW_COMPANY_CONTACT_OPTION, ...mapped]
  }, [representatives, contacts])

  const handleSubmit = useCallback(
    ({ representativeId }: FormData) => {
      if (representativeId === ADD_NEW_COMPANY_CONTACT_ID) {
        const clientIdNum = decodeEntityId(clientId).id
        const jobIdNum = decodeEntityId(jobId).id

        return navigate(
          `/clients/${clientIdNum}/company_representatives/create?job_id=${jobIdNum}`
        )
      }
      createContact(representativeId)
    },
    [createContact, navigate, clientId, jobId]
  )

  return {
    handleSubmit,
    representativesOptions,
    mutationLoading
  }
}

export default useAddContactModal
