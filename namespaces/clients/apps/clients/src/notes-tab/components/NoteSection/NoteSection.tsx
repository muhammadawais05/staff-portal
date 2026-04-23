import React, { useRef, useState } from 'react'
import { Section, Container } from '@toptal/picasso'
import {
  ActivityType,
  ClientActivitiesAndNotesScope
} from '@staff-portal/graphql/staff'
import { ContainerLoader, NoteCardSkeletonLoader } from '@staff-portal/ui'
import { ACTIVITY_UPDATED, AddActivityButton } from '@staff-portal/activities'
import { Notes } from '@staff-portal/notes'
import { useMessageListener } from '@toptal/staff-portal-message-bus'
import { Operation } from '@staff-portal/operations'
import { CheckComplianceButton } from '@staff-portal/clients'

import AddNoteButton from '../AddNoteButton'
import LogSalesCallButton from '../LogSalesCallButton'
import NoteSectionAdditionalActions from '../NoteSectionAdditionalActions'
import { useGetCompanyNotes } from './data'
import { NO_NOTES } from '../../config'

export interface Props {
  companyId: string
  companyName: string
}

const NoteSection = ({ companyId, companyName }: Props) => {
  const [clientActivitiesAndNotesScope, setClientActivitiesAndNotesScope] =
    useState(ClientActivitiesAndNotesScope.ONLY_NOTES)
  const [isSubsidiaryNotesSelected, setIsSubsidiaryNotesSelected] =
    useState(false)
  const formContainerRef = useRef<HTMLDivElement>(null)

  const {
    initialLoading,
    loading,
    notes,
    operations,
    logSalesCallWillChangeClaimer,
    isApplied,
    refetch: refetchNotes
  } = useGetCompanyNotes({
    companyId,
    withDescendants: isSubsidiaryNotesSelected,
    scope: clientActivitiesAndNotesScope
  })

  useMessageListener(ACTIVITY_UPDATED, refetchNotes)

  const checkComplianceSuccess = () => {
    refetchNotes()
  }

  return (
    <Container top='medium'>
      <Section
        title='Notes'
        variant='withHeaderBar'
        actions={
          <>
            <CheckComplianceButton
              clientName={companyName}
              clientId={companyId}
              operation={operations?.checkClientCompliance}
              onComplete={checkComplianceSuccess}
            />

            <LogSalesCallButton
              clientId={companyId}
              clientName={companyName}
              isApplied={isApplied}
              logSalesCallWillChangeClaimer={logSalesCallWillChangeClaimer}
              operation={operations?.logClientSalesCall}
              formContainer={formContainerRef}
              onComplete={refetchNotes}
              onCheckCompliance={checkComplianceSuccess}
            />

            <AddNoteButton
              clientId={companyId}
              clientName={companyName}
              operation={operations?.createGeneralInformationClientNote}
              formContainer={formContainerRef}
              onComplete={refetchNotes}
            />

            <Container left='small'>
              <Operation
                operation={operations?.createActivity}
                render={disabled => (
                  <AddActivityButton
                    subjectId={companyId}
                    type={ActivityType.CLIENT_RELATED}
                    disabled={disabled}
                  />
                )}
              />
            </Container>
          </>
        }
      >
        <NoteSectionAdditionalActions
          clientActivitiesAndNotesScope={clientActivitiesAndNotesScope}
          isSubsidiaryNotesSelected={isSubsidiaryNotesSelected}
          setClientActivitiesAndNotesScope={setClientActivitiesAndNotesScope}
          setIsSubsidiaryNotesSelected={setIsSubsidiaryNotesSelected}
        />
        <div ref={formContainerRef} />

        <ContainerLoader
          loading={loading}
          showSkeleton={initialLoading}
          skeletonComponent={<NoteCardSkeletonLoader />}
        >
          {notes && (
            <Notes
              notes={notes}
              refetchNotes={refetchNotes}
              notFoundMessage={NO_NOTES}
            />
          )}
        </ContainerLoader>
      </Section>
    </Container>
  )
}

export default NoteSection
