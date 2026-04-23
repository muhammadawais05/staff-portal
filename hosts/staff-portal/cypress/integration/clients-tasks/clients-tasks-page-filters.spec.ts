import { encodeEntityId } from '@staff-portal/data-layer-service'

import { updateTasksByClientPageStubs } from '~integration/mocks/schema-updates/tasks-by-client'
import {
  flagsFilterMocks,
  industriesFiltersMocks,
  matcherFiltersMocks,
  staffFiltersMocks
} from '~integration/mocks/schema-updates/tasks-by-client/tasks-by-client-page-stubs-update'
import { TasksByClientPage } from '~integration/modules/pages/companies/tasks-by-client-page'

describe('Clients Tasks Page', () => {
  const page = new TasksByClientPage()

  it('visits the page', () => {
    updateTasksByClientPageStubs()

    page.visit()

    page.sections.first().should('contain.text', 'Client Name')
  })

  describe('Filters', () => {
    it('list of clients is filtered by country', () => {
      updateTasksByClientPageStubs({
        filtersData: {
          ...flagsFilterMocks,
          ...industriesFiltersMocks,
          ...matcherFiltersMocks,
          ...staffFiltersMocks
        }
      })
      page.visit()

      page.filters.toggleButton.click()
      page.filters.selectDropdownValue({
        key: 'Country',
        value: 'VjEtQ291bnRyeS01OA'
      })

      cy.url().should('contain', 'country_id=58')
    })

    it('list of clients is filtered by applied on', () => {
      updateTasksByClientPageStubs()

      page.filters.selectDateRageFrom({
        key: 'Applied On',
        value: '2000-10-20'
      })

      cy.url().should('contain', 'applied_on%5Bfrom%5D=2000-10-02')
    })

    it('list of clients is filtered by matcher', () => {
      updateTasksByClientPageStubs({ filtersData: matcherFiltersMocks })

      page.filters.selectDropdownValue({
        key: 'Designer matcher',
        value: encodeEntityId('002', 'Staff')
      })

      cy.url().should('contain', 'talent_matchers%5Bdesigner%5D=002')
    })

    it('list of clients is filtered by claimer', () => {
      updateTasksByClientPageStubs({ filtersData: staffFiltersMocks })

      page.filters.selectDropdownValue({
        key: 'Claimer',
        value: encodeEntityId('002', 'Staff')
      })

      cy.url().should('contain', 'claimer_id=002')
    })

    it('list of clients is filtered by industry', () => {
      updateTasksByClientPageStubs({ filtersData: industriesFiltersMocks })

      page.filters.selectDropdownValue({
        key: 'Industry',
        value: 'Fashion'
      })

      cy.url().should('contain', 'industry=Fashion')
    })

    it('list of clients is filtered by flags', () => {
      updateTasksByClientPageStubs({ filtersData: flagsFilterMocks })

      page.filters.selectFlagFilter({ flag: 'Cool Flag' })

      cy.url().should('contain', 'flag_ids%5B%5D=0001')
    })

    it('list of clients is filtered by most interested in', () => {
      updateTasksByClientPageStubs()

      page.filters
        .getField('Most interested in')
        .contains('TopScreens')
        .click({ force: true })

      cy.url().should('contain', 'interested_in%5B%5D=top_screens')
    })

    it('list of clients is filtered by claimable', () => {
      updateTasksByClientPageStubs()

      page.filters.getField('Claimable').contains('Yes').click()

      cy.url().should('contain', 'claimable=true')
    })
  })
})
