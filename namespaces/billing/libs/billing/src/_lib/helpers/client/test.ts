import fixtures from '../../../_fixtures'
import * as clientHelpers from '.'

const matchers = fixtures.MockInvoice.subjectObject.matchers.nodes

describe('#getMatcherRoleByType', () => {
  describe('when valid matcher requested', () => {
    it('return with the proper role', () => {
      expect(
        clientHelpers.getMatcherRoleByType({
          matchers,
          talentType: 'product_manager'
        })
      ).toEqual({
        __typename: 'Staff',
        fullName: 'Carolina Della Corte',
        id: 'VjEtU3RhZmYtMTY2NDI4OA',
        webResource: {
          __typename: 'Link',
          text: 'Carolina Della Corte',
          url: 'http://localhost:3000/platform/staff/staff/1664288'
        }
      })
    })
  })

  describe('when invalid matcher requested', () => {
    it('return `null`', () => {
      expect(
        clientHelpers.getMatcherRoleByType({
          matchers,
          talentType: 'finance_expert'
        })
      ).toBeUndefined()
    })
  })

  describe('when matchers are empty', () => {
    it('return `null`', () => {
      expect(
        clientHelpers.getMatcherRoleByType({
          matchers: [],
          talentType: 'finance_expert'
        })
      ).toBeUndefined()
    })
  })

  describe('when matchers are `null', () => {
    it('return `null`', () => {
      expect(
        clientHelpers.getMatcherRoleByType({
          matchers: null,
          talentType: 'finance_expert'
        })
      ).toBeUndefined()
    })
  })
})
