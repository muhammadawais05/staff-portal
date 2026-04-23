import { merge } from 'lodash-es'
import React, { FC, memo } from 'react'

import {
  ArrayParam,
  useQueryParams
} from '../../_lib/customHooks/useQueryParams'
import { FeatureFlag } from '../../@types/types'
import { FeatureFlagContext } from '../../_lib/context/featureFlagContext'
import defaultFeatureFlags from '../../featureFlags'

const displayName = 'FeatureFlagsContainer'

interface Props {
  flags?: Partial<FeatureFlag>
}
export const FeatureFlagsContainer: FC<Props> = memo(props => {
  const flagsFromProps = props.flags
  const [query] = useQueryParams({ flag: ArrayParam })
  const { flag = [] } = query
  const transformedURLFlags = flag?.length
    ? flag.reduce(
        (enabledFlags: Partial<FeatureFlag>, currentFlag: string | null) => {
          if (currentFlag) {
            // eslint-disable-next-line
            enabledFlags[currentFlag as any] = true
          }

          return enabledFlags
        },
        {}
      )
    : {}
  const combinedFeatureFlags = merge(
    defaultFeatureFlags,
    flagsFromProps,
    transformedURLFlags
  )

  return (
    <FeatureFlagContext.Provider value={combinedFeatureFlags}>
      {props.children}
    </FeatureFlagContext.Provider>
  )
})

FeatureFlagsContainer.displayName = displayName

export default FeatureFlagsContainer
