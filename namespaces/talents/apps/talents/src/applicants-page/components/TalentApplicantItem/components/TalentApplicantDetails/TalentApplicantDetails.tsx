import { NO_VALUE } from '@staff-portal/config'
import { DetailedList as DL, TypographyOverflowLink } from '@staff-portal/ui'
import { Link } from '@staff-portal/navigation'
import React from 'react'
import {
  useUserDateFormatter,
  useUserDateTimeFormatter
} from '@staff-portal/current-user'
import { getTimeZoneFullText } from '@staff-portal/date-time-utils'
import { StatusField, SpecializationsField } from '@staff-portal/talents'
import { LastLoginField } from '@staff-portal/role-profile'
import { getRoleTypeText } from '@staff-portal/facilities'
import { isOperationHidden } from '@staff-portal/operations'
import { ApplicantSkillsField } from '@staff-portal/talents-profile'
import { Typography } from '@toptal/picasso'

import { TalentApplicantListItemType } from '../../../../types/talent-applicant-list-item'
import TalentApplicantHistoryEntryField from '../TalentApplicantHistoryEntryField'
import TalentScreeningSteps from '../../../TalentScreeningSteps'
import TalentActivationSteps from '../../../TalentActivationSteps'

interface Props {
  talent: TalentApplicantListItemType
}

const TalentApplicantDetails = ({ talent }: Props) => {
  const userDateFormatter = useUserDateFormatter()
  const userDateTimeFormatter = useUserDateTimeFormatter()

  const {
    id,
    email,
    locationV2,

    ipLocation,
    currentSignInAt,
    currentSignInIp,
    timeZone,
    applicantSkills,
    operations: {
      updateTalentApplicantSkills: updateTalentApplicantSkillsOperation
    },
    cumulativeStatus,
    investigations,
    newcomer,
    topShield,
    specializationApplications,
    vertical,
    joinedAt,
    updatedAt,
    type
  } = talent

  return (
    <DL defaultValue={NO_VALUE} labelColumnWidth={9}>
      <DL.Row>
        <DL.Item label='Email'>
          <TypographyOverflowLink>
            <Link href={`mailto:${email}`}>{email}</Link>
          </TypographyOverflowLink>
        </DL.Item>
        <DL.Item label='Status'>
          <StatusField
            cumulativeStatus={cumulativeStatus}
            investigations={investigations}
            newcomer={!!newcomer}
            topShield={topShield}
          />
        </DL.Item>
      </DL.Row>
      <DL.Row>
        <DL.Item label='Role' value={getRoleTypeText(type)} />
        <DL.Item label='Applied' value={userDateFormatter(joinedAt)} />
      </DL.Row>
      <DL.Row>
        <DL.Item label='Last Edited' value={userDateFormatter(updatedAt)} />
        <DL.Item
          label='Last login'
          value={
            ipLocation ? (
              <LastLoginField
                dateTime={userDateTimeFormatter(currentSignInAt)}
                ip={currentSignInIp}
                ipLocation={ipLocation}
              />
            ) : null
          }
        />
      </DL.Row>
      <DL.Row>
        <DL.Item label='Current country' value={locationV2?.countryName} />
        <DL.Item label='Time zone' value={getTimeZoneFullText(timeZone)} />
      </DL.Row>
      <DL.Row>
        <DL.Item label='Specializations'>
          {!!specializationApplications?.nodes.length &&
            vertical?.specializations.totalCount && (
              <SpecializationsField
                specializations={specializationApplications.nodes}
              />
            )}
        </DL.Item>
      </DL.Row>
      {!isOperationHidden(updateTalentApplicantSkillsOperation) && (
        <DL.Row>
          <DL.Item label='Applicant skills'>
            <ApplicantSkillsField
              talentId={id}
              applicantSkills={applicantSkills}
            />
          </DL.Item>
        </DL.Row>
      )}
      <DL.Row>
        <DL.Item
          label={<Typography weight='semibold'>Screening Step</Typography>}
        >
          <TalentScreeningSteps talentId={talent.id} />
        </DL.Item>
      </DL.Row>
      <DL.Row>
        <DL.Item
          label={<Typography weight='semibold'>Activation Step</Typography>}
        >
          <TalentActivationSteps talentId={talent.id} />
        </DL.Item>
      </DL.Row>
      <DL.Row>
        <DL.Item disableLabel>
          <TalentApplicantHistoryEntryField talentId={talent.id} />
        </DL.Item>
      </DL.Row>
    </DL>
  )
}

export default TalentApplicantDetails
