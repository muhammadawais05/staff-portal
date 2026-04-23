import React, { useState } from 'react'
import { EmptyState, Section } from '@toptal/picasso'
import { OperationCallableTypes } from '@staff-portal/graphql/staff'
import { SectionWithDetailedListSkeleton } from '@staff-portal/ui'

import { DraftJobFragment } from './data/draft-job-fragment'
import { useGetDraftJob } from './data/get-draft-job'
import DraftJobContent from '../DraftJobContent'
import DraftJobCreateButton from '../DraftJobCreateButton'
import DraftJobForm from '../DraftJobForm'
import { useClientApproveModal } from '../ClientApproveModal'
import { NO_DRAFT_JOB } from '../../config'

export interface Props {
  companyId: string
}

const DraftJobSection = ({ companyId }: Props) => {
  const { loading, company, error } = useGetDraftJob(companyId)
  const { showModal: showClientApproveModal } = useClientApproveModal({
    clientId: companyId
  })
  const [draftJobsInEdit, setDraftJobsInEdit] = useState<
    Record<string, DraftJobFragment>
  >({})
  const [isDefaultDraftJobInEdit, setIsDefaultDraftJobInEdit] = useState(false)

  const setEditDraftJobById = (id: string, draftJob: DraftJobFragment) => {
    setDraftJobsInEdit(prevState => ({
      ...prevState,
      [id]: draftJob
    }))
  }

  const removeEditDraftJobById = (id: string) => {
    setDraftJobsInEdit(prevState => {
      delete prevState[id]

      return { ...prevState }
    })
  }

  if (loading && !company) {
    return (
      <SectionWithDetailedListSkeleton
        title='Draft Job'
        columns={1}
        items={5}
        labelColumnWidth={12}
      />
    )
  }

  if (!company || error) {
    return null
  }

  const {
    draftJobs,
    operations: { createSalesDraftJob, logClientSalesCall, approveClient }
  } = company

  // if logClientSalesCall is hidden, the whole DraftJobSection should be hidden, too
  if (logClientSalesCall.callable === OperationCallableTypes.HIDDEN) {
    return null
  }

  const showMessage = !isDefaultDraftJobInEdit && !draftJobs?.nodes.length

  return (
    <>
      <Section
        title='Draft Job'
        variant='withHeaderBar'
        actions={
          <DraftJobCreateButton
            companyId={companyId}
            disabled={isDefaultDraftJobInEdit || !!draftJobs?.nodes.length}
            onClick={() => setIsDefaultDraftJobInEdit(true)}
            operation={createSalesDraftJob}
          />
        }
      >
        {showMessage && (
          <EmptyState.Collection data-testid='draft-job-section-no-data'>
            {NO_DRAFT_JOB}
          </EmptyState.Collection>
        )}
        {isDefaultDraftJobInEdit && company?.defaultDraftJob && (
          <DraftJobForm
            clientId={company.id}
            onRequestClose={(shouldShowClientApproveModal = false) => {
              if (shouldShowClientApproveModal) {
                showClientApproveModal()
              }

              setIsDefaultDraftJobInEdit(false)
            }}
            draftJob={company.defaultDraftJob}
            approveClientOperation={approveClient}
          />
        )}

        {draftJobs?.nodes.map(job => {
          if (draftJobsInEdit[job.id]) {
            return (
              <DraftJobForm
                key={job.id}
                clientId={company.id}
                onRequestClose={(shouldShowClientApproveModal = false) => {
                  if (shouldShowClientApproveModal) {
                    showClientApproveModal()
                  }

                  removeEditDraftJobById(job.id)
                }}
                draftJob={job}
                approveClientOperation={approveClient}
              />
            )
          }

          return (
            <DraftJobContent
              key={job.id}
              draftJob={job}
              onEditClick={() => setEditDraftJobById(job.id, job)}
            />
          )
        })}
      </Section>
    </>
  )
}

export default DraftJobSection
