import React, { PropsWithChildren } from 'react'
import { Button, Container, Star16 } from '@toptal/picasso'
import { useNotifications } from '@toptal/picasso/utils'
import { useMessageEmitter } from '@toptal/staff-portal-message-bus'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'
import { Operation as OperationGQL } from '@staff-portal/graphql/staff'
import { Operation } from '@staff-portal/operations'

import {
  REFRESH_COMMUNITY_LEADER_LIST,
  REFRESH_COMMUNITY_LEADER_PROFILE
} from '../../messages'
import { useFeatureCommunityLeader } from '../../data/feature-community-leader'

interface Props {
  id: string
  name: string
  operation: OperationGQL
}

const FeatureCommunityLeaderButton = ({
  id,
  name,
  operation,
  children
}: PropsWithChildren<Props>) => {
  const { showError } = useNotifications()
  const { handleMutationResult } = useHandleMutationResult()
  const emitMessage = useMessageEmitter()

  const [featureCommunityLeader, { loading }] = useFeatureCommunityLeader({
    onError() {
      showError(`Could not feature Community Leader ${name}`)
    }
  })

  const handleClick = async () => {
    if (loading) {
      return
    }

    const { data } = await featureCommunityLeader({
      variables: {
        input: {
          id
        }
      }
    })

    return handleMutationResult({
      mutationResult: data?.featureCommunityLeader,
      successNotificationMessage: `Community Leader ${name} is now featured`,
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
        disabled={loading}
      >
        {children ?? (
          <>
            <Container right='xsmall'>
              <span className='idle'>
                <Star16 />
              </span>
            </Container>
            <span>Mark As Featured</span>
          </>
        )}
      </Button>
    </Operation>
  )
}

export default FeatureCommunityLeaderButton
