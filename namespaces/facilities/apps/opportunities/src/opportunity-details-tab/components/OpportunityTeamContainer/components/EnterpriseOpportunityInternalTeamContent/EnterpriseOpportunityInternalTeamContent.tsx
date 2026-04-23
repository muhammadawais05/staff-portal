import React from 'react'
import { DetailedList } from '@staff-portal/ui'
import { NO_VALUE } from '@staff-portal/config'

import OpportunitySalesClaimer from '../OpportunityTeamSalesClaimer'
import OpportunityClaimerCategory from '../OpportunityClaimerCategory'
import OpportunityClientPartner from '../OpportunityTeamClientPartner'
import OpportunityClientPartnerCategory from '../OpportunityClientPartnerCategory'
import OpportunityAccountManager from '../OpportunityAccountManager'
import OpportunityRelationshipManager from '../OpportunityRelationshipManager'
import OpportunityProjectDeliveryManager from '../OpportunityProjectDeliveryManager'
import OpportunitySdr from '../OpportunitySdr'
import OpportunityFinanceTeamMember from '../OpportunityFinanceTeamMember'
import { OpportunityTeamFragment } from '../../data'

interface Props {
  opportunity: OpportunityTeamFragment
}

const EnterpriseOpportunityInternalTeamContent = ({ opportunity }: Props) => {
  const {
    id: opportunityId,
    salesClaimer,
    clientPartner,
    accountManager,
    sdr,
    client,
    projectDeliveryManager,
    relationshipManager,
    operations: {
      updateOpportunitySalesClaimer,
      updateOpportunityClientPartner,
      updateOpportunityAccountManager,
      updateOpportunityProjectDeliveryManager,
      updateOpportunitySdr,
      updateOpportunityRelationshipManager
    }
  } = opportunity

  if (!client) {
    return null
  }

  const {
    id: clientId,
    financeTeamMember,
    claimerCategory,
    clientPartnerCategory,
    operations: {
      updateClientFinanceTeamMember,
      updateClientClaimerCategory,
      updateClientPartnerCategory
    }
  } = client

  const hasClientPartnerCategory = clientPartnerCategory !== undefined
  const hasClaimerCategory = claimerCategory !== undefined
  const hasFinanceTeamMember = financeTeamMember !== undefined

  return (
    <DetailedList striped defaultValue={NO_VALUE}>
      <DetailedList.Row>
        <DetailedList.Item label='Sales claimer'>
          <OpportunitySalesClaimer
            opportunityId={opportunityId}
            salesClaimer={salesClaimer}
            operation={updateOpportunitySalesClaimer}
          />
        </DetailedList.Item>
        {hasClaimerCategory && (
          <DetailedList.Item label='Claimer category'>
            <OpportunityClaimerCategory
              claimerCategory={claimerCategory}
              clientId={clientId}
              operation={updateClientClaimerCategory}
            />
          </DetailedList.Item>
        )}
      </DetailedList.Row>
      <DetailedList.Row>
        <DetailedList.Item label='Client partner'>
          <OpportunityClientPartner
            opportunityId={opportunityId}
            clientPartner={clientPartner}
            operation={updateOpportunityClientPartner}
          />
        </DetailedList.Item>
        {hasClientPartnerCategory && (
          <DetailedList.Item label='Client Partner category'>
            <OpportunityClientPartnerCategory
              clientPartnerCategory={clientPartnerCategory}
              clientId={clientId}
              operation={updateClientPartnerCategory}
            />
          </DetailedList.Item>
        )}
      </DetailedList.Row>
      <DetailedList.Row>
        <DetailedList.Item label='Account Manager'>
          <OpportunityAccountManager
            opportunityId={opportunityId}
            accountManager={accountManager}
            operation={updateOpportunityAccountManager}
          />
        </DetailedList.Item>
        <DetailedList.Item label='Relationship Manager'>
          <OpportunityRelationshipManager
            opportunityId={opportunityId}
            relationshipManager={relationshipManager}
            operation={updateOpportunityRelationshipManager}
          />
        </DetailedList.Item>
      </DetailedList.Row>
      <DetailedList.Row>
        <DetailedList.Item label='Delivery Manager'>
          <OpportunityProjectDeliveryManager
            opportunityId={opportunityId}
            projectDeliveryManager={projectDeliveryManager}
            operation={updateOpportunityProjectDeliveryManager}
          />
        </DetailedList.Item>
        <DetailedList.Item value=' ' />
      </DetailedList.Row>
      <DetailedList.Row>
        <DetailedList.Item label='SDR'>
          <OpportunitySdr
            opportunityId={opportunityId}
            sdr={sdr}
            operation={updateOpportunitySdr}
          />
        </DetailedList.Item>
        <DetailedList.Item value=' ' />
      </DetailedList.Row>
      {hasFinanceTeamMember && (
        <DetailedList.Row>
          <DetailedList.Item label='Finance team member'>
            <OpportunityFinanceTeamMember
              financeTeamMember={financeTeamMember}
              clientId={clientId}
              operation={updateClientFinanceTeamMember}
            />
          </DetailedList.Item>
          <DetailedList.Item value=' ' />
        </DetailedList.Row>
      )}
    </DetailedList>
  )
}

export default EnterpriseOpportunityInternalTeamContent
