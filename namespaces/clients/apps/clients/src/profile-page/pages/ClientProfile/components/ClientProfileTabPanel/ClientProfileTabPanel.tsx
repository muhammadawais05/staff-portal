import React from 'react'
import { Container } from '@toptal/picasso'
import { NavigationTabPanel } from '@staff-portal/ui'
import { ClientTabValue } from '@staff-portal/clients'

import { BasicInfoTab } from '../../../../../basic-info-tab'
import { InternalDataTab } from '../../../../../internal-data-tab'
import { NotesTab } from '../../../../../notes-tab'
import { JobsTab } from '../../../../../jobs-tab'
import { ContactsTab } from '../../../../../contacts-tab'
import { WebAndSocialTab } from '../../../../../web-and-social-tab'
import { LegalTab } from '../../../../../legal-tab'
import { BillingTab } from '../../../../../billing-tab'
import { TopscreenTab } from '../../../../../topscreen-tab'

type Props = {
  clientId?: string
  clientName?: string
  topScreenClientId?: string
  tabValues: typeof ClientTabValue
}

const ClientProfileTabPanel = ({
  clientId,
  clientName,
  topScreenClientId,
  tabValues
}: Props) => {
  if (!clientId || !clientName) {
    return null
  }

  return (
    <Container top='medium'>
      <NavigationTabPanel value={tabValues.BASIC_INFO}>
        <BasicInfoTab companyId={clientId} />
      </NavigationTabPanel>

      <NavigationTabPanel value={tabValues.INTERNAL_DATA}>
        <InternalDataTab companyId={clientId} />
      </NavigationTabPanel>

      <NavigationTabPanel value={tabValues.NOTES}>
        <NotesTab companyId={clientId} companyName={clientName} />
      </NavigationTabPanel>

      <NavigationTabPanel value={tabValues.COMPANY_JOBS}>
        <JobsTab companyId={clientId} />
      </NavigationTabPanel>

      <NavigationTabPanel value={tabValues.CONTACTS}>
        <ContactsTab companyId={clientId} />
      </NavigationTabPanel>

      <NavigationTabPanel value={tabValues.WEB_AND_SOCIAL}>
        <WebAndSocialTab companyId={clientId} />
      </NavigationTabPanel>

      <NavigationTabPanel value={tabValues.LEGAL}>
        <LegalTab companyId={clientId} />
      </NavigationTabPanel>

      <NavigationTabPanel value={tabValues.BILLING}>
        <BillingTab companyId={clientId} />
      </NavigationTabPanel>

      {topScreenClientId && (
        <NavigationTabPanel value={tabValues.TOPSCREEN}>
          <TopscreenTab topscreenClientId={topScreenClientId} />
        </NavigationTabPanel>
      )}
    </Container>
  )
}

export default ClientProfileTabPanel
