export type PerformedActionsRouterParams = {
  entityType: PerformedActionPathEntityType
}

export type PerformedActionPathEntityType = 'verticals'

export type PermissionFieldNameType = 'canViewVerticalHistory'

export type PerformedActionEntityData = {
  entityType: string
  titleEntityName: string
  permissionFieldName: PermissionFieldNameType
}

export type PerformedActionEntitiesData = {
  [key in PerformedActionPathEntityType]: PerformedActionEntityData
}
