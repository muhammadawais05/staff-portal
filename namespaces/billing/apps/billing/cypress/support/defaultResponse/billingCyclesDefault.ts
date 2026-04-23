import fixtures from '@staff-portal/billing/src/_fixtures'

import billingPermitsQueries from './billingPermitsQueries'

export default {
  ...billingPermitsQueries,
  SetChangeCommitment: {
    data: {
      changeEngagementCommitment: {
        engagement: {
          id: fixtures.MockEngagement.id,
          __typename: 'Engagement'
        },
        success: true,
        errors: []
      }
    }
  },
  SetChangeProductBillingFrequency: {
    data: {
      changeProductBillingFrequency: {
        engagement: {
          id: fixtures.MockEngagement.id,
          __typename: 'Engagement'
        },
        success: true,
        errors: []
      }
    }
  },

  GetBillingCycles: { data: fixtures.MockBillingCyclesTable },
  GetBillingCyclesWithTimesheets: {
    data: {
      billingCyclesWithTimesheets: fixtures.MockBillingCyclesWithTimesheet
    }
  },
  GetEngagement: {
    data: {
      node: fixtures.MockEngagement
    }
  },
  GetExperiments: {
    data: {
      experiments: {
        poLines: {
          enabled: false
        }
      }
    }
  },
  BillingCycles: {
    data: {
      billingCycles: fixtures.MockBillingCycles
    }
  },
  GetBillingCycle: {
    data: {
      billingCycle: fixtures.MockBillingCyclesWithTimesheet[0]
    }
  },

  BillingCyclesTable: {
    data: fixtures.MockBillingCyclesTable
  },

  GetExtraExpenses: {
    data: {
      node: {
        __typename: 'Engagement',
        id: '123457',
        extraExpenses: fixtures.MockExtraExpenses
      }
    }
  },
  SetCreateEngagementExtraExpenses: {
    data: {
      createEngagementExtraExpenses: {
        __typename: 'CreateEngagementExtraExpensesPayload',
        extraExpense: fixtures.MockExtraExpenses,
        errors: [],
        notice: '',
        success: true
      }
    }
  },
  GetPlacementFees: {
    data: {
      node: {
        __typename: 'Engagement',
        id: '123457',
        placementFees: fixtures.MockPlacementFees
      }
    }
  },
  SetCreateEngagementPlacementFee: {
    data: {
      createEngagementPlacementFee: {
        __typename: 'CreateEngagementPlacementFeePayload',
        placementFees: fixtures.MockPlacementFees,
        errors: [],
        notice: '',
        success: true
      }
    }
  },
  SetTimesheetUpdate: {
    data: {
      updateTimesheet: {
        __typename: 'UpdateTimesheetPayload',
        success: true,
        errors: [],
        notice: '',
        billingCycle: fixtures.MockBillingCyclesWithTimesheet[0]
      }
    }
  },
  SetTimesheetSubmit: {
    data: {
      submitTimesheet: {
        success: true,
        errors: [],
        notice: '',
        billingCycle: fixtures.MockBillingCyclesWithTimesheet[0],
        __typename: 'SubmitTimesheetPayload'
      }
    }
  },
  SetTimesheetUnsubmit: {
    data: {
      unsubmitTimesheet: {
        success: true,
        errors: [],
        notice: '',
        billingCycle: {
          ...fixtures.MockBillingCyclesWithTimesheet[0],
          timesheetSubmitted: false
        },
        __typename: 'UnsubmitTimesheetPayload'
      }
    }
  }
}
