import React, { memo } from 'react'
import { Container } from '@toptal/picasso'
import { WidgetErrorBoundary } from '@staff-portal/error-handling'
import {
  OFACComplianceSection,
  OFAC_UPDATED
} from '@staff-portal/ofac-compliance'
import { TalentScreeningSpecialistStatusSection } from '@staff-portal/talents-screening-specialists'
import { TalentSoftSkillsSection } from '@staff-portal/talents-soft-skills'
import { TalentGeneralSection } from '@staff-portal/talents-profile'
import { TALENT_UPDATED } from '@staff-portal/talents'

import { TalentScreeningSection } from '../../../talent-screening-section'
import TalentSkillsSection from '../TalentSkillsSection'
import TalentAboutSection from '../TalentAboutSection'
import TalentCommentsSection from '../TalentCommentsSection'
import TalentQASection from '../TalentQASection'
import TalentRelatedTasksSection from '../TalentRelatedTasksSection'
import TalentSpecializationApplicationsSection from '../TalentSpecializationApplicationsSection'
import TalentOnlineTestsSection from '../TalentOnlineTestsSection'
import TalentFeedbackStatsSection from '../TalentFeedbackStatsSection'
import TalentContractsAndAgreementsSection from '../TalentContractsAndAgreementsSection'
import { TalentActivationSection } from '../../../talent-activation-section'
import RoleScheduledMeetings from '../RoleScheduledMeetings'
import * as S from './styles'
import TalentCommissionsSection from '../TalentCommissionsSection'
import { useGetTalentProfileTabPermissions } from '../../services'

interface Props {
  talentId: string
}

const TalentProfileTab = ({ talentId }: Props) => {
  const { tabPermissions } = useGetTalentProfileTabPermissions(talentId)

  return (
    <Container css={S.container} data-testid='talent-profile-tab'>
      <WidgetErrorBoundary>
        <TalentGeneralSection talentId={talentId} />
      </WidgetErrorBoundary>
      <WidgetErrorBoundary emptyOnError>
        <TalentSkillsSection talentId={talentId} />
      </WidgetErrorBoundary>
      <WidgetErrorBoundary emptyOnError>
        <TalentAboutSection talentId={talentId} />
      </WidgetErrorBoundary>
      <WidgetErrorBoundary emptyOnError>
        <TalentSoftSkillsSection
          talentId={talentId}
          sectionVariant='withHeaderBar'
        />
      </WidgetErrorBoundary>
      <WidgetErrorBoundary emptyOnError>
        <OFACComplianceSection
          nodeId={talentId}
          sectionVariant='withHeaderBar'
          listenedMessages={[TALENT_UPDATED, OFAC_UPDATED]}
        />
      </WidgetErrorBoundary>
      <WidgetErrorBoundary emptyOnError>
        <TalentScreeningSection
          talentId={talentId}
          sectionVariant='withHeaderBar'
        />
      </WidgetErrorBoundary>
      <WidgetErrorBoundary emptyOnError>
        <TalentActivationSection
          talentId={talentId}
          sectionVariant='withHeaderBar'
        />
      </WidgetErrorBoundary>
      <WidgetErrorBoundary emptyOnError>
        <TalentSpecializationApplicationsSection
          talentId={talentId}
          sectionVariant='withHeaderBar'
        />
      </WidgetErrorBoundary>
      <WidgetErrorBoundary emptyOnError>
        <TalentOnlineTestsSection
          talentId={talentId}
          sectionVariant='withHeaderBar'
        />
      </WidgetErrorBoundary>
      <WidgetErrorBoundary emptyOnError>
        <TalentFeedbackStatsSection
          talentId={talentId}
          sectionVariant='withHeaderBar'
        />
      </WidgetErrorBoundary>
      <WidgetErrorBoundary emptyOnError>
        <TalentContractsAndAgreementsSection
          talentId={talentId}
          sectionVariant='withHeaderBar'
        />
      </WidgetErrorBoundary>
      <WidgetErrorBoundary emptyOnError>
        <TalentRelatedTasksSection
          talentId={talentId}
          sectionVariant='withHeaderBar'
        />
      </WidgetErrorBoundary>
      <WidgetErrorBoundary emptyOnError>
        <RoleScheduledMeetings
          roleId={talentId}
          sectionVariant='withHeaderBar'
        />
      </WidgetErrorBoundary>
      {tabPermissions?.commentsAccessible && (
        <WidgetErrorBoundary emptyOnError>
          <TalentCommentsSection
            talentId={talentId}
            sectionVariant='withHeaderBar'
          />
        </WidgetErrorBoundary>
      )}
      <WidgetErrorBoundary emptyOnError>
        <TalentQASection talentId={talentId} sectionVariant='withHeaderBar' />
      </WidgetErrorBoundary>
      <WidgetErrorBoundary emptyOnError>
        <TalentCommissionsSection
          talentId={talentId}
          sectionVariant='withHeaderBar'
        />
      </WidgetErrorBoundary>
      <WidgetErrorBoundary emptyOnError>
        <TalentScreeningSpecialistStatusSection
          talentId={talentId}
          sectionVariant='withHeaderBar'
        />
      </WidgetErrorBoundary>
    </Container>
  )
}

export default memo(TalentProfileTab)
