import React from 'react'
import { DetailedList } from '@staff-portal/ui'
import { NO_VALUE } from '@staff-portal/config'
import { EditableStaffViewer } from '@staff-portal/staff'

import { OpportunityTeamFragment } from '../../data'
import OpportunityProjectSalesSpecialist from '../OpportunityProjectSalesSpecialist'
import OpportunityProjectRelationshipManager from '../OpportunityProjectRelationshipManager'
import OpportunityRelationshipManager from '../OpportunityRelationshipManager'
import OpportunityProjectDeliveryManager from '../OpportunityProjectDeliveryManager'

interface Props {
  opportunity: OpportunityTeamFragment
}

const ProjectOpportunityInternalTeamContent = ({ opportunity }: Props) => {
  const {
    id: opportunityId,
    owner,
    projectDeliveryManager,
    relationshipManager,
    projectRelationshipManager,
    projectSalesSpecialist,
    operations: {
      updateOpportunityProjectDeliveryManager,
      updateOpportunityRelationshipManager,
      updateOpportunityProjectRelationshipManager,
      updateOpportunityProjectSalesSpecialist
    }
  } = opportunity

  return (
    <DetailedList striped defaultValue={NO_VALUE}>
      <DetailedList.Row>
        <DetailedList.Item label='Opportunity Owner'>
          <EditableStaffViewer value={owner} />
        </DetailedList.Item>
        <DetailedList.Item label='Project sales specialist'>
          <OpportunityProjectSalesSpecialist
            projectSalesSpecialist={projectSalesSpecialist}
            opportunityId={opportunityId}
            operation={updateOpportunityProjectSalesSpecialist}
          />
        </DetailedList.Item>
      </DetailedList.Row>
      <DetailedList.Row>
        <DetailedList.Item label='Project relationship manager'>
          <OpportunityProjectRelationshipManager
            projectRelationshipManager={projectRelationshipManager}
            opportunityId={opportunityId}
            operation={updateOpportunityProjectRelationshipManager}
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
    </DetailedList>
  )
}

export default ProjectOpportunityInternalTeamContent
