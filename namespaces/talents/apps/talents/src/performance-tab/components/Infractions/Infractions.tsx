import React, { memo, useCallback } from 'react'
import { Section, Button, Container } from '@toptal/picasso'
import { useMessageListener } from '@toptal/staff-portal-message-bus'
import { useModal } from '@staff-portal/modals-service'
import { OperationType, Operation } from '@staff-portal/operations'
import { useUpdateTalentTabsCounters } from '@staff-portal/talents'
import {
  TalentInfractionFragment,
  ADD_TALENT_INFRACTION_MODAL,
  TALENT_INFRACTION_CREATED
} from '@staff-portal/talents-infractions'

import { useGetTalentInfractions } from '../../data'
import InfractionItems from '../InfractionItems'
import InfractionsSkeleton from '../InfractionsSkeleton'

interface ContentProps {
  loading: boolean
  refetch: () => void
  infractions: TalentInfractionFragment[]
  createTalentInfractionOperation: OperationType | undefined
  talentId: string
}

const InfractionsContent = ({
  loading,
  refetch,
  infractions,
  createTalentInfractionOperation,
  talentId
}: ContentProps) => {
  const { showModalWithQueryParams: showCreateModal } = useModal(
    ADD_TALENT_INFRACTION_MODAL,
    {
      forTalentId: talentId
    }
  )

  useMessageListener(TALENT_INFRACTION_CREATED, ({ talentId: id }) => {
    if (id === talentId) {
      refetch()
    }
  })

  return (
    <Container bottom='medium'>
      <Section
        variant='withHeaderBar'
        title='Infractions'
        data-testid='infractions-section'
        actions={
          <Operation
            operation={createTalentInfractionOperation}
            render={disabled => (
              <Button
                disabled={disabled}
                size='small'
                variant='secondary'
                data-testid='talent-add-infraction-button'
                onClick={showCreateModal}
              >
                Add Infraction
              </Button>
            )}
          />
        }
      >
        <Container>
          {loading ? (
            <InfractionsSkeleton />
          ) : (
            <InfractionItems infractions={infractions} refetch={refetch} />
          )}
        </Container>
      </Section>
    </Container>
  )
}

export interface Props {
  talentId: string
}

const Infractions = ({ talentId }: Props) => {
  const { data, error, networkLoading, refetch } =
    useGetTalentInfractions(talentId)

  const createTalentInfractionOperation =
    data?.operations.createTalentInfraction
  const infractions = data?.infractions?.nodes ?? []

  const updateTabsCounters = useUpdateTalentTabsCounters()

  const handleRefetchInfractions = useCallback(() => {
    refetch()
    updateTabsCounters()
  }, [updateTabsCounters, refetch])

  if (error) {
    throw error
  }

  return (
    <InfractionsContent
      loading={networkLoading}
      refetch={handleRefetchInfractions}
      infractions={infractions}
      createTalentInfractionOperation={createTalentInfractionOperation}
      talentId={talentId}
    />
  )
}

export default memo(Infractions)
