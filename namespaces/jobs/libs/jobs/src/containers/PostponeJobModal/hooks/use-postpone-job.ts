import { useMessageEmitter } from '@toptal/staff-portal-message-bus'
import { useCallback } from 'react'
import { JobStatus } from '@staff-portal/graphql/staff'
import { useMutation } from '@staff-portal/data-layer-service'
import { Maybe } from '@toptal/picasso/utils'
import { useNotifications } from '@staff-portal/error-handling'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'

import { JOB_UPDATED } from '../../../messages'
import {
  PostponeJobDocument,
  PostponeJobMutationVariables
} from '../data/postpone-job/postpone-job.staff.gql.types'
import {
  RepostponeJobDocument,
  RepostponeJobMutationVariables
} from '../data/repostpone/repostpone-job.staff.gql.types'

interface UsePostponeJobParams {
  hideModal: () => void
  jobId: string
  jobStatus: Maybe<JobStatus>
}

const usePostponeMutation = ({ hideModal, jobId }: UsePostponeJobParams) => {
  const { handleMutationResult } = useHandleMutationResult()
  const { showError } = useNotifications()
  const emitMessage = useMessageEmitter()

  const [postponeJob, { loading }] = useMutation(PostponeJobDocument, {
    onError: () => showError('Error postponing job.')
  })

  const submitPostpone = useCallback(
    async (input: PostponeJobMutationVariables['input']) => {
      const result = await postponeJob({ variables: { input } })

      return handleMutationResult({
        mutationResult: result.data?.postponeJob,
        successNotificationMessage: 'Job was successfully postponed.',
        onSuccessAction: () => {
          hideModal()
          emitMessage(JOB_UPDATED, { jobId })
        }
      })
    },
    [hideModal, emitMessage, handleMutationResult, postponeJob, jobId]
  )

  return {
    submitPostpone,
    loading
  }
}

const useRepostponeMutation = ({ hideModal, jobId }: UsePostponeJobParams) => {
  const { handleMutationResult } = useHandleMutationResult()
  const { showError } = useNotifications()
  const emitMessage = useMessageEmitter()

  const [repostponeJob, { loading }] = useMutation(RepostponeJobDocument, {
    onError: () => showError('Error repostponing job.')
  })

  const submitRepostpone = useCallback(
    async (input: RepostponeJobMutationVariables['input']) => {
      const result = await repostponeJob({ variables: { input } })

      return handleMutationResult({
        mutationResult: result.data?.repostponeJob,
        successNotificationMessage: 'Job was successfully repostponed.',
        onSuccessAction: () => {
          hideModal()
          emitMessage(JOB_UPDATED, { jobId })
        }
      })
    },
    [hideModal, emitMessage, handleMutationResult, repostponeJob, jobId]
  )

  return {
    submitRepostpone,
    loading
  }
}

export const usePostponeJob = (params: UsePostponeJobParams) => {
  const { submitPostpone, loading: loadingPostpone } =
    usePostponeMutation(params)
  const { submitRepostpone, loading: loadingRepostpone } =
    useRepostponeMutation(params)

  return {
    submitPostponeJob: ({
      jobId,
      comment,
      dueDate,
      meetingId,
      reasonId
    }: PostponeJobMutationVariables['input']) =>
      params.jobStatus === JobStatus.POSTPONED
        ? submitRepostpone({ jobId, comment, dueDate })
        : submitPostpone({ jobId, comment, dueDate, meetingId, reasonId }),
    loading: loadingPostpone || loadingRepostpone
  }
}
