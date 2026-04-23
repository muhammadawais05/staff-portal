import React, { useState } from 'react'
import { Section, Checkbox, Container } from '@toptal/picasso'

import { useGetCompanyLinkedCompanies } from './data'
import LinkedCompaniesTable from '../LinkedCompaniesTable'

export interface Props {
  companyId: string
}

const LinkedCompaniesSection = ({ companyId }: Props) => {
  const [showBadLeads, setShowBadLeads] = useState(false)
  const { companies, loading } = useGetCompanyLinkedCompanies(companyId)

  return (
    <Container top='medium'>
      <Section
        data-testid='LinkedCompaniesSection'
        title='Companies'
        variant='withHeaderBar'
        actions={
          <Container>
            <Checkbox
              label='Show bad leads'
              data-testid='LinkedCompaniesSection-showBadLeads'
              onChange={({ target }) => setShowBadLeads(target.checked)}
            />
          </Container>
        }
      >
        <LinkedCompaniesTable
          showBadLeads={showBadLeads}
          data={companies}
          loading={loading}
        />
      </Section>
    </Container>
  )
}

export default LinkedCompaniesSection
