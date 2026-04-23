import React from 'react'
import { ItemsList, SubSection } from '@staff-portal/ui'
import { SectionProps } from '@toptal/picasso'

import JobListItemSkeletonLoader from '../JobListItemSkeletonLoader'

interface Props {
  withSubSection?: boolean
  sectionVariant?: SectionProps['variant']
}

const getItemKey = (item: number) => item.toString()

const JobListSkeletonLoader = ({ withSubSection, sectionVariant }: Props) => {
  const itemList = Array.from(Array(10).keys())

  return (
    <ItemsList<number>
      data={itemList}
      itemWithoutSection
      renderItem={(_, index) =>
        withSubSection ? (
          <SubSection last={index === itemList.length - 1}>
            <JobListItemSkeletonLoader
              // Default Section variant adds a `padding-top: 2rem` which is not needed
              // eslint-disable-next-line no-inline-styles/no-inline-styles
              style={{ paddingTop: 0 }}
            />
          </SubSection>
        ) : (
          <JobListItemSkeletonLoader variant={sectionVariant} />
        )
      }
      getItemKey={getItemKey}
    />
  )
}

export default JobListSkeletonLoader
