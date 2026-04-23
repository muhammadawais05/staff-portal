import React from 'react'
import { Section, Container, Download16 } from '@toptal/picasso'
import { Link } from '@staff-portal/navigation'
import { DetailedList, SectionWithDetailedListSkeleton } from '@staff-portal/ui'

import { useGetAgreementAcceptances } from './data/get-acceptances'
import { SECTION_TITLE } from './utils/constants'

export type Props = {
  companyId: string
}

const PublicAgreementsSection = ({ companyId }: Props) => {
  const { loading, company } = useGetAgreementAcceptances(companyId)

  // render loader only when apollo cache is empty
  if (loading && !company) {
    return (
      <SectionWithDetailedListSkeleton
        title={SECTION_TITLE}
        labelColumnWidth={16}
        columns={1}
        items={1}
      />
    )
  }

  // in case of empty data render nothing
  if (!company || company.agreementAcceptancesLinks.length === 0) {
    return null
  }

  return (
    <Container top='medium'>
      <Section
        title={SECTION_TITLE}
        data-testid='public-agreements-section'
        variant='withHeaderBar'
      >
        <DetailedList labelColumnWidth={16}>
          {company.agreementAcceptancesLinks.map(({ text, url }) => (
            <DetailedList.Row key={text}>
              <DetailedList.Item label={text}>
                {url ? (
                  <Link href={url} target='_blank'>
                    Download PDF <Download16 />
                  </Link>
                ) : (
                  'No downloadable link'
                )}
              </DetailedList.Item>
            </DetailedList.Row>
          ))}
        </DetailedList>
      </Section>
    </Container>
  )
}

export default PublicAgreementsSection
