import { utcToZonedTime } from '@staff-portal/date-time-utils'
import { Container, Typography } from '@toptal/picasso'
import React, { useMemo } from 'react'

import { TalentProfileFragment } from '../../data/talent-profile-fragment/talent-profile-fragment.staff.gql.types'
import { getTalentCardContent } from '../../utils/get-talent-card-content'
import { CardValidationContext } from '../../utils/validateCard'
import BasicInfo from '../BasicInfo'
import EditorWrapperHeader from '../EditorWrapperHeader'
import ManualHighlight from '../ManualHighlight'
import TalentCardBuilderAction from '../TalentCardBuilderAction'
import TalentCardBuilderWarnings from '../TalentCardBuilderWarnings'

interface TalentCardBuilderProps {
  roleId: number
  inEdit: boolean
  talentTimeZone?: string
  talentProfile: TalentProfileFragment
  cardValidationContext: CardValidationContext
  onCardPreviewToggle: (enabled: boolean) => void
}

const TalentCardBuilder = ({
  roleId,
  inEdit,
  talentTimeZone,
  talentProfile,
  cardValidationContext,
  onCardPreviewToggle
}: TalentCardBuilderProps) => {
  const {
    id: talentId,
    profileV2: profile,
    photo,
    fullName,
    type
  } = talentProfile

  const handleCardPreviewToggle = () => {
    onCardPreviewToggle(inEdit)
  }

  const content = useMemo(
    () => getTalentCardContent(talentProfile),
    [talentProfile]
  )

  const manualHighlightTabAction = (
    <TalentCardBuilderAction inEdit={inEdit} onEdit={handleCardPreviewToggle} />
  )

  const action = manualHighlightTabAction

  return (
    <Container>
      <Container top='xsmall' bottom='xsmall'>
        <Typography color='black' size='medium'>
          Highlight your most relevant skills, work experience, and projects to
          share in your personalized application. Make sure each highlighted
          item aligns with the job's description and required skills.
        </Typography>
      </Container>

      <Container
        flex
        direction='column'
        padded='medium'
        bordered
        rounded
        top='medium'
      >
        <EditorWrapperHeader
          roleId={roleId}
          action={action}
          profileUpdatedAt={
            profile.updatedByTalentAt
              ? utcToZonedTime(profile.updatedByTalentAt, talentTimeZone ?? '')
              : null
          }
        />

        <TalentCardBuilderWarnings
          isEditing={inEdit}
          validationContext={cardValidationContext}
        />

        <BasicInfo
          photo={photo?.default}
          fullName={fullName}
          location={profile.city}
        />

        <ManualHighlight
          talentId={talentId}
          fullName={fullName}
          roleType={type}
          inEdit={inEdit}
          content={content}
        />
      </Container>
    </Container>
  )
}

export default TalentCardBuilder
