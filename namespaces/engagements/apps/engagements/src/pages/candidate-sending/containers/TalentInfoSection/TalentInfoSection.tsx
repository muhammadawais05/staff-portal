import React from 'react'
import { Container } from '@toptal/picasso'
import { TalentAvatar, EngagementsRatesField } from '@staff-portal/talents'
import { DetailedList as DL } from '@staff-portal/ui'
import { NO_VALUE } from '@staff-portal/config'
import { HourlyRateField } from '@staff-portal/facilities'

import { LABEL_COLUMN_EXPANDED_SECTION_WIDTH } from '../../constants'
import TalentInfoSectionActions from '../TalentInfoSectionActions/TalentInfoSectionActions'
import { useGetTalentInfoData } from '../../hooks/use-get-talent-info-data/use-get-talent-info-data'
import { TalentInfoSkeletonLoader } from '../../components/TalentInfoSkeletonLoader/TalentInfoSkeletonLoader'

interface Props {
  talentId: string
}

const TalentInfoSection = ({ talentId }: Props) => {
  const { talent, loading } = useGetTalentInfoData(talentId)

  if (loading) {
    return <TalentInfoSkeletonLoader />
  }

  if (!talent) {
    return null
  }

  return (
    <Container top='small' bottom='small'>
      <Container flex justifyContent='space-between' bottom='small'>
        <TalentAvatar
          avatarSize='small'
          badgeSize='large'
          right='small'
          fullName={talent.fullName}
          photo={talent.photo?.small}
          talentPartnerName={talent.talentPartner?.webResource?.text}
          talentPartnerUrl={talent.talentPartner?.webResource?.url}
        />

        <TalentInfoSectionActions talent={talent} />
      </Container>

      <DL
        defaultValue={NO_VALUE}
        labelColumnWidth={LABEL_COLUMN_EXPANDED_SECTION_WIDTH}
      >
        <DL.Row>
          <DL.Item
            label='Current country'
            value={talent.location?.country?.name}
          />
        </DL.Row>
        <DL.Row>
          <DL.Item label='Time Zone' value={talent.timeZone?.name} />
        </DL.Row>
        <DL.Row>
          <DL.Item label='Hourly rate'>
            <HourlyRateField hourlyRate={talent.hourlyRate} shortSuffix />
          </DL.Item>
        </DL.Row>
        <DL.Row>
          <DL.Item label='Engagements rates'>
            <EngagementsRatesField engagementRates={talent} />
          </DL.Item>
        </DL.Row>
      </DL>
    </Container>
  )
}

export default TalentInfoSection
