import React, { memo } from 'react'
import { Container, Section } from '@toptal/picasso'
import {
  DetailedList as DL,
  SectionWithDetailedListSkeleton
} from '@staff-portal/ui'
import { TalentTopShieldFragment } from '@staff-portal/talents-top-shield'
import { AvailabilityStatus } from '@staff-portal/talents'

export interface Props {
  talentTopShield: TalentTopShieldFragment | null
  loading: boolean
}

const GeneralInfo = ({ talentTopShield, loading }: Props) => {
  if (loading) {
    return (
      <SectionWithDetailedListSkeleton
        title='General Information'
        columns={2}
        items={4}
      />
    )
  }

  if (!talentTopShield) {
    return null
  }

  const hiredHours =
    Number(talentTopShield.allocatedHours) -
    Number(talentTopShield.availableHours)

  return (
    <Container bottom='medium'>
      <Section
        variant='withHeaderBar'
        title='General Information'
        data-testid='general-info-section'
      >
        <DL labelColumnWidth={9}>
          <DL.Row>
            <DL.Item label='Work Status'>
              <AvailabilityStatus
                talentAvailability={talentTopShield}
                hideRoleName
              />
            </DL.Item>
            <DL.Item label='Hired Hours' value={`${hiredHours} hrs/wk`} />
          </DL.Row>
          <DL.Row>
            <DL.Item
              label='Allocated Hours'
              value={`${talentTopShield?.allocatedHours} hrs/wk`}
            />
          </DL.Row>
        </DL>
      </Section>
    </Container>
  )
}

export default memo(GeneralInfo)
