import React from 'react'
import { Section, Container } from '@toptal/picasso'
import {
  ContainerLoader,
  DetailedList,
  SectionWithDetailedListSkeleton
} from '@staff-portal/ui'

import { StaffProfileFragment } from '../../data/get-staff-profile.staff.gql.types'
import { BookingPageRow } from './components'

type Props = {
  meetingSchedulers?: StaffProfileFragment['meetingSchedulers']
  loading: boolean
  initialLoading: boolean
}

const TITLE = 'Booking Pages'

const BookingPagesSection = ({
  meetingSchedulers,
  loading,
  initialLoading
}: Props) => (
  <ContainerLoader
    loading={loading}
    showSkeleton={initialLoading}
    skeletonComponent={
      <SectionWithDetailedListSkeleton title={TITLE} columns={1} items={1} />
    }
  >
    {!!meetingSchedulers?.totalCount && (
      <Container top='medium'>
        <Section title={TITLE} variant='withHeaderBar'>
          <DetailedList striped>
            {meetingSchedulers.nodes.map(item => (
              <BookingPageRow {...item} key={item.code} />
            ))}
          </DetailedList>
        </Section>
      </Container>
    )}
  </ContainerLoader>
)

export default BookingPagesSection
