import { RoleType } from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

import { buildRoleEmailMessagesPath } from '.'

describe('buildRoleEmailMessagesPath', () => {
  it('gives a right URL for CLIENT role', () => {
    const roleId = encodeEntityId('123', RoleType.CLIENT)

    expect(buildRoleEmailMessagesPath(roleId)).toBe(
      '/clients/123/email_messages'
    )
  })
  it('gives a right URL for LEADER role', () => {
    const roleId = encodeEntityId('123', RoleType.LEADER)

    expect(buildRoleEmailMessagesPath(roleId)).toBe(
      '/leaders/123/email_messages'
    )
  })
  it('gives a right URL for COMPANY_REPRESENTATIVE role', () => {
    const roleId = encodeEntityId('123', RoleType.COMPANY_REPRESENTATIVE)

    expect(buildRoleEmailMessagesPath(roleId)).toBe(
      '/company_representatives/123/email_messages'
    )
  })
  it('gives a right URL for REFERRAL_PARTNER role', () => {
    const roleId = encodeEntityId('123', RoleType.REFERRAL_PARTNER)

    expect(buildRoleEmailMessagesPath(roleId)).toBe(
      '/referral_partners/123/email_messages'
    )
  })
  it('gives a right URL for STAFF role', () => {
    const roleId = encodeEntityId('123', RoleType.STAFF)

    expect(buildRoleEmailMessagesPath(roleId)).toBe('/staff/123/email_messages')
  })
  it('gives a right URL for TALENT role', () => {
    const roleId = encodeEntityId('123', RoleType.TALENT)

    expect(buildRoleEmailMessagesPath(roleId)).toBe(
      '/talents/123/email_messages'
    )
  })
  it('gives a right URL for TALENT_PARTNER role', () => {
    const roleId = encodeEntityId('123', RoleType.TALENT_PARTNER)

    expect(buildRoleEmailMessagesPath(roleId)).toBe(
      '/talent_partners/123/email_messages'
    )
  })
})
