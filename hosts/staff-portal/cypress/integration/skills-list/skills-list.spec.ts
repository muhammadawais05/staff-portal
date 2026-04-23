import { SkillNameResolvers } from '@staff-portal/graphql/staff'

import { verticalsWithSkillCategoriesMock } from '~integration/mocks'
import {
  skillNameListItemMock,
  skillNameListItemOperationsMock
} from '~integration/mocks/fragments'
import {
  errorOperationMock,
  successOperationMock
} from '~integration/mocks/operations'
import { SkillsPage } from '~integration/modules/pages'
import { enabledOperationMock } from '~integration/mocks/enabled-operation-mock'
import { convertToResolver } from '~integration/utils'

describe('Skills list page', () => {
  const page = new SkillsPage()

  beforeEach(() => {
    cy.updateStaffMocks({
      Query: {
        skillNames: () => ({
          nodes: [],
          totalCount: 0
        }),
        verticals: () => ({
          nodes: verticalsWithSkillCategoriesMock()
        })
      }
    })
  })

  describe('no skills available', () => {
    beforeEach(() => {
      page.visit()
    })

    it('renders empty message', () => {
      page.getPageTitle().should('contain', 'Skills (0)')

      page
        .getEmptyMessage()
        .should('exist')
        .should('contain', 'There are no skills for this search criteria')
    })
  })

  describe('skill is available', () => {
    beforeEach(() => {
      cy.updateStaffMocks({
        Query: {
          skillNames: () => ({
            nodes: [skillNameListItemMock()],
            totalCount: 1
          })
        }
      })
      page.visit()
    })

    it('renders skill data', () => {
      page.getPageTitle().should('contain', 'Skills (1)')

      page.getSkillNamesListTable().should('exist')
    })
  })

  describe('skill can be deleted', () => {
    beforeEach(() => {
      cy.updateStaffMocks({
        Node: {
          __resolveType: (_parent, _context, info) => {
            switch (info?.operation.name?.value) {
              case 'GetLazyOperation':
                return 'SkillName'
              default:
                return null
            }
          }
        },
        SkillName: convertToResolver<SkillNameResolvers, 'SkillName'>(
          skillNameListItemMock({
            operations: skillNameListItemOperationsMock({
              removeSkillName: enabledOperationMock()
            })
          })
        ),
        Query: {
          skillNames: () => ({
            nodes: [
              skillNameListItemMock({
                operations: skillNameListItemOperationsMock({
                  removeSkillName: enabledOperationMock()
                })
              })
            ],
            totalCount: 1
          })
        }
      })
      page.visit()
    })

    describe('when skill trash button is clicked', () => {
      it('opens the confirmation modal', () => {
        page.requestRemovePrompt()
        page
          .getModal()
          .should('contain.text', 'Are you sure you want to delete this skill?')
      })
    })

    describe('when skill removal prompt is submitted', () => {
      beforeEach(() => page.requestRemovePrompt())

      it('displays error notification on failure', () => {
        cy.updateStaffMocks({
          Mutation: {
            removeSkillName: () =>
              errorOperationMock([
                {
                  code: 'blah',
                  key: 'base',
                  message: 'Something went wrong. Please try again later.'
                }
              ])
          }
        })

        page.getDeleteButton().click()
        cy.getNotification().should(
          'have.text',
          'Something went wrong. Please try again later.'
        )
      })

      it('displays success notification and hide prompt on success', () => {
        cy.updateStaffMocks({
          Mutation: {
            removeSkillName: successOperationMock
          }
        })

        page.getDeleteButton().click()
        cy.getNotification().should(
          'have.text',
          'The Skill was successfully deleted.'
        )
        page.getModal().should('not.exist')
      })
    })
  })

  describe('skill can be cloned', () => {
    beforeEach(() => {
      cy.updateStaffMocks({
        Node: {
          __resolveType: (_parent, _context, info) => {
            switch (info?.operation.name?.value) {
              case 'GetLazyOperation':
                return 'SkillName'
              default:
                return null
            }
          }
        },
        SkillName: convertToResolver<SkillNameResolvers, 'SkillName'>(
          skillNameListItemMock({
            operations: skillNameListItemOperationsMock({
              cloneSkillName: enabledOperationMock()
            })
          })
        ),
        Query: {
          skillNames: () => ({
            nodes: [
              skillNameListItemMock({
                operations: skillNameListItemOperationsMock({
                  cloneSkillName: enabledOperationMock()
                })
              })
            ],
            totalCount: 1
          })
        }
      })
      page.visit()
    })

    describe('when skill clone button is clicked', () => {
      it('opens the clone modal', () => {
        page.requestClonePrompt()
        page
          .getModal()
          .should(
            'contain.text',
            'If a new name matches an existing skill, the skills will be merged.'
          )
      })
    })

    describe('when skill clone prompt is submitted', () => {
      beforeEach(() => page.requestClonePrompt())

      it('displays error notification on failure', () => {
        cy.updateStaffMocks({
          Mutation: {
            cloneSkillName: () =>
              errorOperationMock([
                {
                  code: 'blah',
                  key: 'base',
                  message: 'Something went wrong. Please try again later.'
                }
              ])
          }
        })

        page.getCloneButton().click()
        cy.getNotification().should(
          'have.text',
          'Something went wrong. Please try again later.'
        )
      })

      it('displays success notification and hide clone modal on success', () => {
        cy.updateStaffMocks({
          Mutation: {
            cloneSkillName: successOperationMock
          }
        })

        page.getCloneButton().click()
        cy.getNotification().should(
          'have.text',
          'The skill .NET Security Model was successfully cloned as .NET Security Model'
        )
        page.getModal().should('not.exist')
      })
    })
  })
})
