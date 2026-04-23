import React from 'react'
import { ItemsList } from '@staff-portal/ui'

import TalentApplicantItemSkeletonLoader from '../TalentApplicantItemSkeletonLoader'

const getItemKey = (item: number) => item.toString()
const renderItem = () => <TalentApplicantItemSkeletonLoader />

const TalentApplicantListSkeletonLoader = () => (
  <ItemsList<number>
    data={Array.from(Array(10).keys())}
    itemWithoutSection
    renderItem={renderItem}
    getItemKey={getItemKey}
  />
)

export default TalentApplicantListSkeletonLoader
