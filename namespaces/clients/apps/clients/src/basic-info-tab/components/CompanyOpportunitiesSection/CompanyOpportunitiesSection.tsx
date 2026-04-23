import React, { useState } from 'react'
import {
  Section,
  Checkbox,
  Container,
  Button,
  SkeletonLoader
} from '@toptal/picasso'
import { Link } from '@staff-portal/navigation'
import { checkIfFieldIsForbidden } from '@staff-portal/data-layer-service'
import { isEnterpriseBusiness } from '@staff-portal/clients'
import { LazyLinkWrapper } from '@staff-portal/facilities'

import { useGetCompanyOpportunities } from './data'
import CompanyOpportunitiesTable from '../CompanyOpportunitiesTable'

export interface Props {
  companyId: string
}

const CompanyOpportunitiesSection = ({ companyId }: Props) => {
  const [isSubsidiarySelected, setIsSubsidiarySelected] = useState(true)

  const { client, opportunities, loading, error } = useGetCompanyOpportunities(
    companyId,
    isSubsidiarySelected
  )

  const {
    children,
    businessType,
    createOpportunityUrl: createOpportunity
  } = client || {}

  if (checkIfFieldIsForbidden('opportunities', error)) {
    return null
  }

  return (
    <Container top='medium'>
      <Section
        title='Opportunities'
        data-testid='company-opportunities-section'
        variant='withHeaderBar'
        actions={
          loading ? (
            <SkeletonLoader.Button size='small' />
          ) : (
            <>
              {Boolean(children?.totalCount) && (
                <Container right='small'>
                  <Checkbox
                    label='Show Subsidiary Companies'
                    checked={isSubsidiarySelected}
                    data-testid='company-opportunities-show-subsidiary-companies'
                    onChange={(_, checked) => setIsSubsidiarySelected(checked)}
                  />
                </Container>
              )}
              {!!createOpportunity && (
                <LazyLinkWrapper link={createOpportunity}>
                  <Button
                    disabled={!createOpportunity.enabled}
                    data-testid='CompanyOpportunitiesSection-addOpportunity'
                    as={Link}
                    size='small'
                    href={createOpportunity.url ?? undefined}
                    target='_blank'
                    noUnderline
                  >
                    Add New Opportunity
                  </Button>
                </LazyLinkWrapper>
              )}
            </>
          )
        }
      >
        <CompanyOpportunitiesTable
          data={opportunities}
          enterprise={isEnterpriseBusiness(businessType)}
          loading={loading}
        />
      </Section>
    </Container>
  )
}

export default CompanyOpportunitiesSection
