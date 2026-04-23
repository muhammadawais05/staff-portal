import React from 'react'
import { Section, Container } from '@toptal/picasso'
import { TableSkeleton } from '@staff-portal/ui'

const CancelledJobApplicantsSectionLoader = ({ title }: { title: string }) => (
  <Container top='large'>
    <Section title={title} variant='withHeaderBar'>
      <TableSkeleton
        dataTestId='CancelledJobApplicantsSection-table-skeleton'
        rows={3}
        cols={1}
      />
    </Section>
  </Container>
)

export default CancelledJobApplicantsSectionLoader
