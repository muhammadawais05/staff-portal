import {
  BillCycle,
  OperationCallableTypes,
  WeekDay
} from '@staff-portal/graphql/staff'
import fixtures from '@staff-portal/billing/src/_fixtures'

import defaultResponses from '../../../support/defaultResponse/billingDetailsDefault'
import setupServer from '../../../support/commands/setupServer'

// TODO: remove resetSetup, once https://toptal-core.atlassian.net/browse/SPB-1966 would be resolved
// and it would be possible to update a state of the button in the previous test

const jobTemplateResponseFragment = {
  billCycle: BillCycle.SEMI_MONTHLY,
  billDay: null,
  commitment: null,
  id: 'VjEtSm9iVGVtcGxhdGUtMjYw',
  operations: {
    deleteJobTemplate: {
      callable: OperationCallableTypes.ENABLED,
      messages: [],
      __typename: 'Operation'
    },
    updateJobTemplate: {
      callable: OperationCallableTypes.ENABLED,
      messages: [],
      __typename: 'Operation'
    },
    __typename: 'JobTemplateOperations'
  },
  __typename: 'JobTemplate'
}

const GetClientJobTemplate = {
  data: {
    node: {
      id: 'VjEtQ2xpZW50LTIxNzM4OQ',
      jobTemplate: {
        billCycle: 'WEEKLY',
        billDay: null,
        commitment: 'PART_TIME',
        id: 'VjEtSm9iVGVtcGxhdGUtMjIx',
        operations: {
          updateJobTemplate: {
            callable: 'ENABLED',
            messages: [],
            __typename: 'Operation'
          },
          deleteJobTemplate: {
            callable: 'ENABLED',
            messages: [],
            __typename: 'Operation'
          },
          __typename: 'JobTemplateOperations'
        },
        __typename: 'JobTemplate'
      },
      parent: null,
      jobTemplateChangeInfo: {
        affectedChildren: { totalCount: 2, __typename: 'ClientConnection' },
        excludedChildren: {
          nodes: [
            {
              id: 'VjEtQ2xpZW50LTQ4NzIwMA',
              webResource: {
                text: 'Reinger, Schulist and Kuhn',
                url: 'https://staging.toptal.net/platform/staff/companies/2296167',
                __typename: 'Link'
              },
              __typename: 'Client'
            }
          ],
          totalCount: 1,
          __typename: 'ClientConnection'
        },
        __typename: 'ClientJobTemplateChangeInfo'
      },
      __typename: 'Client'
    }
  }
}

const resetSetup = (overriddenResponses = {}) => {
  cy.mockGraphQL((operationName: string) =>
    setupServer({
      operationName,
      defaultResponses: {
        ...defaultResponses,
        CreateJobTemplate: {
          data: {
            createJobTemplate: {
              clientMutationId: null,
              success: true,
              errors: [],
              client: {
                jobTemplate: jobTemplateResponseFragment,
                __typename: 'Client'
              },
              __typename: 'CreateJobTemplatePayload'
            }
          }
        },
        GetJobTemplate: {
          data: {
            node: {
              id: fixtures.MockClient.id,
              jobTemplate: null,
              __typename: 'Client'
            }
          }
        },
        SetDeleteJobTemplate: {
          data: {
            deleteJobTemplate: {
              clientMutationId: null,
              success: true,
              errors: [],
              __typename: 'DeleteJobTemplatePayload'
            }
          }
        },
        GetClientJobTemplate
      },
      overriddenResponses
    })
  )
  cy.visit('/', {
    onBeforeLoad: contentWindow => {
      contentWindow.DATA_WIDGET = 'StaffBillingDetailsWidget'
    }
  })
  cy.waitForReact()
}

describe('when a job template is created successfully', () => {
  it('displays a title', () => {
    resetSetup()

    cy.getByTestId('JobBillingDefaultsActions-create').click()
    cy.getByTestId('JobTemplateModalForm-title').should(
      'contain',
      'Create Job Template'
    )
  })

  it('billing day is disabled by default', () => {
    cy.getByTestId('JobTemplateModalForm-billDay')
      .find('input')
      .should('be.disabled')
  })

  it('resets a field for billing day, when invoice frequency is reset', () => {
    cy.selectByValue({
      field: 'BillCycleSelect',
      value: BillCycle.SEMI_MONTHLY
    })

    cy.selectByValue({
      field: 'JobTemplateModalForm-billDay',
      value: WeekDay.MONDAY
    })

    cy.getByTestId('BillCycleSelect')
      .find('[data-testid="reset-adornment"]')
      .find('button')
      .click({ force: true })

    cy.getByTestId('JobTemplateModalForm-billDay')
      .find('input')
      .should('be.disabled')
      .should('have.value', '')
  })

  it('displays a success notification', () => {
    cy.selectByValue({
      field: 'BillCycleSelect',
      value: BillCycle.SEMI_MONTHLY
    })

    cy.getByTestId('JobTemplateModalForm-submit').click()
    cy.getNotification().should(
      'contain',
      'The Job Template was successfully created.'
    )
  })
})

describe('when a job template is not created successfully', () => {
  it('shows form error if form is not filled', () => {
    resetSetup({
      CreateJobTemplate: {
        data: {
          createJobTemplate: {
            clientMutationId: null,
            success: false,
            errors: [
              {
                code: '',
                key: 'subject.base',
                message: 'Must set at least one template value',
                __typename: 'StandardUserError'
              }
            ],
            client: null,
            __typename: 'CreateJobTemplatePayload'
          }
        }
      },
      GetClientJobTemplate
    })

    cy.getByTestId('JobBillingDefaultsActions-create').click()

    cy.getByTestId('JobTemplateModalForm-submit').click()
    cy.getByTestId('FormBaseErrorContainer-error').should(
      'contain',
      'Must set at least one template value'
    )
  })
})

describe('updating job template', () => {
  it('successfully updates job template', () => {
    resetSetup({
      GetClientBillingDetails: {
        data: {
          node: {
            ...fixtures.MockClient,
            jobTemplate: jobTemplateResponseFragment
          },
          viewer: {
            permits: { canManageBillingOptions: true }
          }
        }
      },
      GetJobTemplate: {
        data: {
          node: {
            id: fixtures.MockClient.id,
            jobTemplate: jobTemplateResponseFragment,
            __typename: 'Client'
          }
        }
      },
      UpdateJobTemplate: {
        data: {
          updateJobTemplate: {
            clientMutationId: null,
            errors: [],
            success: true,
            jobTemplate: jobTemplateResponseFragment,
            __typename: 'UpdateJobTemplatePayload'
          }
        }
      },
      GetClientJobTemplate
    })

    cy.getByTestId('JobBillingDefaultsActions-update').click()
    cy.getByTestId('JobTemplateModalForm-title').should(
      'contain',
      'Update Job Template'
    )

    cy.selectByValue({
      field: 'BillCycleSelect',
      value: BillCycle.SEMI_MONTHLY
    })

    cy.getByTestId('JobTemplateModalForm-submit').click()
    cy.getNotification().should(
      'contain',
      'The Job Template was successfully updated.'
    )
  })
})

describe(`when update a job template, but it's already removed`, () => {
  it('shows error message if update failed', () => {
    resetSetup({
      GetClientBillingDetails: {
        data: {
          node: {
            ...fixtures.MockClient,
            jobTemplate: jobTemplateResponseFragment
          },
          viewer: {
            permits: { canManageBillingOptions: true }
          }
        }
      },
      GetClientJobTemplate: {
        data: {
          node: {
            ...GetClientJobTemplate.data.node,
            jobTemplate: {
              ...GetClientJobTemplate.data.node.jobTemplate,
              operations: {
                updateJobTemplate: {
                  callable: OperationCallableTypes.DISABLED,
                  messages: [],
                  __typename: 'Operation'
                },
                deleteJobTemplate: {
                  callable: 'ENABLED',
                  messages: [],
                  __typename: 'Operation'
                },
                __typename: 'JobTemplateOperations'
              }
            }
          }
        }
      }
    })

    cy.getByTestId('JobBillingDefaultsActions-update').click()
    cy.getNotification().should(
      'contain',
      'The requested resource is no longer available'
    )
  })
})

describe('when a button to delete a job template is clicked', () => {
  before(() => {
    resetSetup({
      GetClientBillingDetails: {
        data: {
          node: {
            ...fixtures.MockClient,
            jobTemplate: jobTemplateResponseFragment
          },
          viewer: {
            permits: { canManageBillingOptions: true }
          }
        }
      },
      GetClientJobTemplate
    })
  })

  it('displays a modal', () => {
    cy.getByTestId('JobBillingDefaultsActions-remove').click()

    cy.getByTestId('Confirmation-title').should(
      'contain',
      'Remove Job Template?'
    )
    cy.getByTestId('Confirmation-description').should(
      'contain',
      'Are you sure you want to remove this Job Template?'
    )
  })

  it('displays a notification after a job template is deleted', () => {
    cy.getByTestId('Confirmation-action').click()

    cy.getNotification().should(
      'have.text',
      'The Job Template was successfully removed.'
    )
  })
})
