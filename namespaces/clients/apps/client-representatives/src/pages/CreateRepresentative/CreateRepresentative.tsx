import React, { useCallback } from 'react'
import {
  Link,
  useNavigate,
  useParams,
  useQueryParams
} from '@staff-portal/navigation'
import {
  CompanyTabUrlHash,
  getClientProfilePath,
  getJobPath,
  JobTabUrlHash
} from '@staff-portal/routes'
import { encodeEntityId } from '@staff-portal/data-layer-service'
import { ContentWrapper } from '@staff-portal/page-wrapper'
import { RepresentativeForm } from '@staff-portal/client-representatives'
import { Section } from '@toptal/picasso'

import { useGetClientForCreateRepresentative } from './data/get-client-for-create-representative'

const CreateCompanyRepresentative = () => {
  const { clientId } = useParams<{ clientId: string }>()
  const [{ job_id: jobId }] = useQueryParams({
    job_id: 'string'
  })

  const encodedClientId = encodeEntityId(clientId, 'Client')

  const companyLink = getClientProfilePath(clientId)

  const { client, error } = useGetClientForCreateRepresentative(encodedClientId)

  const navigate = useNavigate()

  const handleClose = useCallback(() => {
    if (jobId) {
      const jobLink = getJobPath(jobId)

      navigate(`${jobLink}#${JobTabUrlHash.JOB_DETAILS}`)
    } else {
      navigate(`${companyLink}#${CompanyTabUrlHash.CONTACTS}`)
    }
  }, [jobId, navigate, companyLink])

  if (error) {
    return null
  }

  const title = client ? (
    <>
      Add Contact for <Link href={companyLink}>{client.fullName}</Link>
    </>
  ) : undefined

  const browserTitle = client?.fullName
    ? `Add Contact for ${client.fullName}`
    : 'Add Contact'

  return (
    <ContentWrapper
      titleLoading={!title}
      title={title}
      browserTitle={browserTitle}
    >
      <Section title='Contact Details' variant='withHeaderBar'>
        <RepresentativeForm
          onClose={handleClose}
          client={client}
          clientIdOrRepresentative={encodedClientId}
          jobId={jobId}
        />
      </Section>
    </ContentWrapper>
  )
}

export default CreateCompanyRepresentative
