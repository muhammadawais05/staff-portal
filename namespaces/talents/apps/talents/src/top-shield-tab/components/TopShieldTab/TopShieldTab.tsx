import React, { memo } from 'react'
import { WidgetErrorBoundary } from '@staff-portal/error-handling'
import { useGetTalentTopShield } from '@staff-portal/talents-top-shield'

import TopShieldDetails from '../TopShieldDetails'
import GeneralInfo from '../GeneralInfo'
import EngagementsDetails from '../EngagementsDetails'
import TasksList from '../TasksList'
import NotesList from '../NotesList'
import QuartersDetails from '../QuartersDetails'

export interface Props {
  talentId: string
}

const TopShieldTab = ({ talentId }: Props) => {
  const {
    data: talentTopShield,
    error,
    loading,
    refetch
  } = useGetTalentTopShield(talentId, true)

  if (error) {
    throw error
  }

  return (
    <WidgetErrorBoundary emptyOnError>
      <GeneralInfo talentTopShield={talentTopShield} loading={loading} />
      <TopShieldDetails
        talentId={talentId}
        topShieldApplication={talentTopShield?.topShieldApplication}
        loading={loading}
      />
      <QuartersDetails
        topShieldApplication={talentTopShield?.topShieldApplication}
        loading={loading}
      />
      <EngagementsDetails talentTopShield={talentTopShield} loading={loading} />
      <NotesList talentTopShield={talentTopShield} refetch={refetch} />
      <TasksList talentTopShield={talentTopShield} refetch={refetch} />
    </WidgetErrorBoundary>
  )
}

export default memo(TopShieldTab)
