import { getClientProfilePath, getOpportunityPath } from '@staff-portal/routes'
import { decodeEntityId } from '@staff-portal/data-layer-service'
import { Table } from '@toptal/picasso'
import { LinkWrapper } from '@staff-portal/ui'
import { NO_VALUE } from '@staff-portal/config'
import React from 'react'
import {
  RepresentativeFragment,
  RepresentativeOpportunityFragment
} from '@staff-portal/client-representatives'
import * as Types from '@staff-portal/graphql/staff'
import { OpportunityStatus } from '@staff-portal/clients'
import { isOperationHidden } from '@staff-portal/operations'

import UnlinkOpportunityButton from '../UnlinkOpportunityButton/UnlinkOpportunityButton'
import { useGetUnlinkOpportunityOperation } from '../../data/get-unlink-opportunity-operation'

interface Props {
  representative: RepresentativeFragment
  opportunity: RepresentativeOpportunityFragment
}

const getRoleTags = (
  representative: RepresentativeFragment,
  opportunity?: Types.Maybe<RepresentativeOpportunityFragment>
) => {
  const result = []

  if (representative.id === opportunity?.buyer?.id) {
    result.push('Buyer')
  }
  if (representative.id === opportunity?.billingContact?.id) {
    result.push('Billing contact')
  }
  if (representative.main) {
    result.push('Primary')
  }

  if (result.length) {
    return result.join(', ')
  }

  return NO_VALUE
}

export const Opportunity = ({ representative, opportunity }: Props) => {
  const clientLink = opportunity.client
    ? getClientProfilePath(decodeEntityId(opportunity.client.id).id)
    : undefined
  const opportunityLink = getOpportunityPath(decodeEntityId(opportunity.id).id)

  const { operation } = useGetUnlinkOpportunityOperation(
    representative.id,
    opportunity.id
  )

  const actions = isOperationHidden(operation) ? (
    NO_VALUE
  ) : (
    <UnlinkOpportunityButton
      opportunityId={opportunity.id}
      representativeId={representative.id}
      operation={operation}
    />
  )

  return (
    <Table.Row key={opportunity.id}>
      <Table.Cell>
        <LinkWrapper wrapWhen={Boolean(opportunityLink)} href={opportunityLink}>
          {opportunity.name}
        </LinkWrapper>
      </Table.Cell>
      <Table.Cell>
        <LinkWrapper wrapWhen={Boolean(clientLink)} href={clientLink}>
          {opportunity.client?.fullName}
        </LinkWrapper>
      </Table.Cell>
      <Table.Cell>{getRoleTags(representative, opportunity)}</Table.Cell>
      <Table.Cell>
        <OpportunityStatus status={opportunity.status} />
      </Table.Cell>
      <Table.Cell>{actions}</Table.Cell>
    </Table.Row>
  )
}
