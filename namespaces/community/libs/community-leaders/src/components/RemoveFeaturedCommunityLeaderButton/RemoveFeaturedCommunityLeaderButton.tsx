import React, { PropsWithChildren } from 'react'
import { Button, Container, StarSolid16, Unavailable16 } from '@toptal/picasso'
import { useNotifications } from '@toptal/picasso/utils'
import { useMessageEmitter } from '@toptal/staff-portal-message-bus'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'
import { Operation as OperationGQL } from '@staff-portal/graphql/staff'
import { Operation } from '@staff-portal/operations'

import {
  REFRESH_COMMUNITY_LEADER_LIST,
  REFRESH_COMMUNITY_LEADER_PROFILE
} from '../../messages'
import { useRemoveFeaturedCommunityLeader } from '../../data/remove-featured-community-leader/remove-featured-community-leader.staff.gql'
import * as S from './styles'

interface Props {
  id: string
  name: string
  operation: OperationGQL
}

const RemoveFeaturedCommunityLeaderButton = ({
  id,
  name,
  operation,
  children
}: PropsWithChildren<Props>) => {
  const { showError } = useNotifications()
  const { handleMutationResult } = useHandleMutationResult()
  const emitMessage = useMessageEmitter()

  const [unfeatureCommunityLeader, { loading }] =
    useRemoveFeaturedCommunityLeader({
      onError() {
        showError(`Could not remove featured Community Leader ${name}`)
      }
    })

  const handleClick = async () => {
    if (loading) {
      return
    }

    const { data } = await unfeatureCommunityLeader({
      variables: {
        input: {
          id
        }
      }
    })

    return handleMutationResult({
      mutationResult: data?.unfeatureCommunityLeader,
      successNotificationMessage: `Community Leader ${name} is no longer featured`,
      onSuccessAction: () => {
        emitMessage(REFRESH_COMMUNITY_LEADER_LIST)
        emitMessage(REFRESH_COMMUNITY_LEADER_PROFILE, { talentId: id })
      }
    })
  }

  return (
    <Operation operation={operation}>
      <Button
        size='small'
        variant='secondary'
        onClick={handleClick}
        loading={loading}
        css={S.feature}
        disabled={loading}
      >
        {children ?? (
          <>
            <Container right='xsmall'>
              <span className='hover'>
                <Unavailable16 />
              </span>
              <span className='idle'>
                <StarSolid16 />
              </span>
            </Container>
            <span>Remove From Featured</span>
          </>
        )}
      </Button>
    </Operation>
  )
}

export default RemoveFeaturedCommunityLeaderButton
