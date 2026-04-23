/* global cy */
import { Resolvers as StaffResolvers } from '@staff-portal/graphql/staff'
import { Resolvers as LensResolvers } from '@staff-portal/graphql/lens'

export const updateStaffMocks = (mocks: StaffResolvers = {}) => {
  cy.get(`@staffSchema`).invoke('addResolversToSchema', mocks)
}

export const resetStaffMocks = (mocks: StaffResolvers = {}) => {
  cy.get(`@staffSchema`).invoke('resetStaffMocks', mocks)
}

export const resetLensMocks = (mocks: LensResolvers = {}) => {
  cy.get(`@lensSchema`).invoke('resetLensMocks', mocks)
}
