import { OfacStatusDataTalentFragment } from '../containers/OFACComplianceSection/data/get-ofac-status-data'

export type AssociatedRole = NonNullable<
  OfacStatusDataTalentFragment['talentAssociatedRoles']
>['nodes'][0]
