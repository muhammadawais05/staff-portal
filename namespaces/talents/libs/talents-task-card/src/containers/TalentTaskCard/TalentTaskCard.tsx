import React from 'react'
import { Link } from '@staff-portal/navigation'
import { useGetCurrentUser } from '@staff-portal/current-user'
import { TaskCardLayout } from '@staff-portal/tasks'
import { TalentAvatar } from '@staff-portal/talents'
import { TaskCardProps } from '@staff-portal/tasks-cards'

import { getTalentContentItems } from './services'
import { useGetTalent } from './data'
import TalentTaskCardSummary from './components/TalentTaskCardSummary'
import TalentTaskCardActions from './components/TalentTaskCardActions'

const TalentTaskCard = ({
  taskCardConfig: { title: taskCardTitle, entityId: talentId }
}: TaskCardProps) => {
  const { data: talent, loading } = useGetTalent(talentId)
  const user = useGetCurrentUser()

  const talentPartnerName = talent?.talentPartner?.webResource?.text
  const talentPartnerUrl = talent?.talentPartner?.webResource?.url

  return (
    <TaskCardLayout loading={!talent && loading}>
      {talent && (
        <>
          <TaskCardLayout.Header>
            <TaskCardLayout.Title
              title={taskCardTitle}
              icon={
                <TalentAvatar
                  fullName={taskCardTitle}
                  photo={talent.photo?.thumb as string}
                  talentPartnerName={talentPartnerName}
                  talentPartnerUrl={talentPartnerUrl}
                  badgeSize='small'
                />
              }
              link={talent.webResource.url}
            >
              <Link href={talent.resumeUrl} target='_blank'>
                {(talent?.talentType ?? '').split(/(?=[A-Z])/).join(' ')}
              </Link>
            </TaskCardLayout.Title>
            <TalentTaskCardActions talentId={talent.id} />
          </TaskCardLayout.Header>

          <TalentTaskCardSummary talent={talent} />

          <TaskCardLayout.Content
            items={getTalentContentItems(talent, user?.timeZone?.value)}
            labelColumnWidth={7}
          />
        </>
      )}
    </TaskCardLayout>
  )
}

export default TalentTaskCard
