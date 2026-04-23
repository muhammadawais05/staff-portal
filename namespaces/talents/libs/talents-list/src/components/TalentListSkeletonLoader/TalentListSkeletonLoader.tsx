import React from 'react'
import { ItemsList } from '@staff-portal/ui'

import TalentListItemSkeletonLoader from '../TalentListItemSkeletonLoader/TalentListItemSkeletonLoader'

const getItemKey = (item: number) => item.toString()
const renderItem = () => <TalentListItemSkeletonLoader />

const TalentListSkeletonLoader = () => (
  <ItemsList<number>
    data={Array.from(Array(10).keys())}
    itemWithoutSection
    renderItem={renderItem}
    getItemKey={getItemKey}
  />
)

export default TalentListSkeletonLoader
