import { RoleType } from '@staff-portal/graphql/staff'

export type EditAvatarModalProps = {
  roleId: string
  roleType: RoleType
  hideModal: () => void
}
