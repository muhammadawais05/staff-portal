import { createContext, useContext } from 'react'

import { FeatureFlag } from '../../../@types/types'

type featureFlagContextProps = Partial<FeatureFlag>

const initialData = {}

export const FeatureFlagContext =
  createContext<featureFlagContextProps>(initialData)

export const useFeatureFlagContext = (): featureFlagContextProps =>
  useContext(FeatureFlagContext)
