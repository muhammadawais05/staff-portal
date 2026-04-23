import { ReferredRoleEdgeFragment } from '../../data/referred-role-edge-fragment/referred-role-edge-fragment.staff.gql.types'
import { getReferralRole } from './get-referral-role'

const arrangeTest = (type?: string) => {
  let node = {}

  if (type) {
    node = { type }
  }

  return getReferralRole(node as ReferredRoleEdgeFragment['node'])
}

describe('getReferralRole', () => {
  it('display company as default', () => {
    expect(arrangeTest()).toBe('Company')
  })

  it('display the role type', () => {
    expect(arrangeTest('manager')).toBe('Manager')
  })

  it('shows the role spitted in title case', () => {
    expect(arrangeTest('accountManager')).toBe('Account Manager')
  })
})
