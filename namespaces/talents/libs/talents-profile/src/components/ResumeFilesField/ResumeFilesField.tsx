import React from 'react'
import { Container, Tooltip, Info16, SkeletonLoader } from '@toptal/picasso'
import { useNotifications } from '@toptal/picasso/utils'
import { Link } from '@staff-portal/navigation'
import { NO_VALUE } from '@staff-portal/config'
import { getDateDistanceFromNow } from '@staff-portal/date-time-utils'
import {
  useUserDateFormatter,
  useUserDateTimeFormatter
} from '@staff-portal/current-user'

import { useGetTalentResumeFiles } from './data/get-talent-resume-files'

interface Props {
  talentId: string
}

const ResumeFilesField = ({ talentId }: Props) => {
  const { showError } = useNotifications()

  const userDateFormatter = useUserDateFormatter()
  const userDateTimeFormatter = useUserDateTimeFormatter()

  const { data, loading } = useGetTalentResumeFiles({
    talentId,
    onError: () => {
      showError('Unable to get list of resume files.')
    }
  })

  if (!data) {
    return null
  }

  if (loading) {
    return <SkeletonLoader.Typography />
  }

  const resumeFiles = data.node?.profile?.resumeFiles.nodes

  if (!resumeFiles || resumeFiles.length === 0) {
    return <>{NO_VALUE}</>
  }

  return (
    <>
      {resumeFiles.map(({ identifier, uploadedAt, url }) => {
        const resumeFileLink = (
          <Link href={url} target='_blank'>
            {uploadedAt ? `${userDateFormatter(uploadedAt)} - ` : ''}
            {identifier}
          </Link>
        )

        return (
          <Container key={url}>
            {uploadedAt ? (
              <Container as='span'>
                {resumeFileLink}
                <Tooltip
                  content={`Added on ${userDateTimeFormatter(
                    uploadedAt
                  )} (${getDateDistanceFromNow(uploadedAt).toLowerCase()})`}
                >
                  <Container
                    as='span'
                    left='xsmall'
                    data-testid='resume-files-field-info-icon'
                  >
                    <Info16 />
                  </Container>
                </Tooltip>
              </Container>
            ) : (
              resumeFileLink
            )}
            <br />
          </Container>
        )
      })}
    </>
  )
}

export default ResumeFilesField
