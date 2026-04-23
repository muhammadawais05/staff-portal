import React, { memo } from 'react'
import { SkillRating } from '@staff-portal/graphql/staff'
import { useQuery } from '@staff-portal/data-layer-service'
import {
  AsyncTooltipWrapper,
  AsyncTooltipWrapperDataHookOptions
} from '@staff-portal/ui'

import SkillTag from '../../../SkillTag'
import { GetTalentSkillTooltipContentDocument } from '../../data'
import SkillTagTooltip from '../SkillTagTooltip'

type Props = {
  name: string
  rating?: SkillRating
  connectionsCount?: number
  skillSetId: string
  highlighted?: boolean
  hideVettingInformation?: boolean
  talentType: string
}

const SkillTagWithAsyncTooltip = ({
  name,
  rating,
  connectionsCount = 0,
  skillSetId,
  highlighted,
  hideVettingInformation,
  talentType
}: Props) => {
  const enableTooltip =
    connectionsCount > 0 ||
    (!hideVettingInformation && rating === SkillRating.EXPERT)

  const useGetTooltipContentDataHook = (
    options: AsyncTooltipWrapperDataHookOptions
  ) =>
    useQuery(GetTalentSkillTooltipContentDocument, {
      variables: {
        skillSetId
      },
      ...options
    })

  return (
    <AsyncTooltipWrapper
      useFetchData={useGetTooltipContentDataHook}
      enableTooltip={enableTooltip}
      placement='bottom'
      tooltipContent={data =>
        data?.node && (
          <SkillTagTooltip
            talentType={talentType}
            skillSet={data.node}
            hideVettingInformation={hideVettingInformation}
          />
        )
      }
    >
      <SkillTag
        name={name}
        rating={rating}
        connectionsCount={connectionsCount}
        highlighted={highlighted}
      />
    </AsyncTooltipWrapper>
  )
}

export default memo(SkillTagWithAsyncTooltip)
