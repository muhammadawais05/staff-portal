import React from 'react'
import { Section } from '@toptal/picasso'

import { CompanyFinancialInformationFragment } from '../../data'
import CompanyFinancialInformationDetailItems from '../CompanyFinancialInformationDetailItems'

interface Props {
  companyDetails: CompanyFinancialInformationFragment
}

const CompanyFinancialInformationContent = ({ companyDetails }: Props) => (
  <Section title='Financial Information' variant='withHeaderBar'>
    <CompanyFinancialInformationDetailItems companyDetails={companyDetails} />
  </Section>
)

export default CompanyFinancialInformationContent
