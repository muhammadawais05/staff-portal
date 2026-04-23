export default {
  actualCommitment: {
    availability: 'full_time'
  },
  childrenCycles: [
    {
      __typename: 'BillingCycle',
      id: '333677',
      operations: {
        __typename: 'BillingCycleOperations',
        timesheetApprove: {
          __typename: 'Operation',
          callable: 'DISABLED',
          messages: []
        },
        timesheetReject: {
          __typename: 'Operation',
          callable: 'DISABLED',
          messages: []
        },
        timesheetSubmit: {
          __typename: 'Operation',
          callable: 'DISABLED',
          messages: []
        },
        timesheetUnsubmit: {
          __typename: 'Operation',
          callable: 'DISABLED',
          messages: []
        },
        timesheetUpdate: {
          __typename: 'Operation',
          callable: 'DISABLED',
          messages: []
        }
      },
      actualCommitment: {
        __typename: 'Commitment',
        availability: 'full_time',
        availabilityHours: 40,
        companyRate: '2800.0',
        startDate: '2019-02-18',
        talentRate: '1600.0'
      },
      breaksPeriod: [],
      childrenCycles: [],
      commissions: [
        {
          __typename: 'CommercialDocument',
          amount: '24.0',
          billingCycleGid: 'gid://platform/Billing::Cycle/340565',
          creditedAmount: '0',
          debitedAmount: '0',
          gid: 'gid://platform/Payment/802740',
          paidAmount: '24.0',
          status: 'PAID',
          subjectObject: {
            __typename: 'Client',
            billingNotes: '',
            fullName: 'Vlad Miller'
          },
          url: 'http://localhost:3000/platform/staff/payments/802740'
        },
        {
          __typename: 'CommercialDocument',
          amount: '120.0',
          billingCycleGid: 'gid://platform/Billing::Cycle/340565',
          creditedAmount: '0',
          debitedAmount: '0',
          gid: 'gid://platform/Payment/802739',
          paidAmount: '120.0',
          status: 'PAID',
          subjectObject: {
            __typename: 'Client',
            billingNotes: '',
            fullName: 'Gary Gardner'
          },
          url: 'http://localhost:3000/platform/staff/payments/802739'
        },
        {
          __typename: 'CommercialDocument',
          amount: '120.0',
          billingCycleGid: 'gid://platform/Billing::Cycle/340565',
          creditedAmount: '0',
          debitedAmount: '0',
          gid: 'gid://platform/Payment/802738',
          paidAmount: '120.0',
          status: 'PAID',
          subjectObject: {
            __typename: 'Client',
            billingNotes: '',
            fullName: 'Noel Wilson'
          },
          url: 'http://localhost:3000/platform/staff/payments/802738'
        }
      ],
      endDate: '2019-06-02',
      gid: 'gid://platform/Billing::Cycle/340565',
      hours: '80.0',
      chargedHours: '80.0',
      invoices: [
        {
          __typename: 'CommercialDocument',
          amount: '5600.0',
          billingCycleGid: 'gid://platform/Billing::Cycle/340565',
          consolidatedDocument: {
            __typename: 'CommercialDocument',
            amount: '16800.0',
            documentNumber: 324744,
            gid: 'gid://platform/Invoice/324744',
            status: 'PAID',
            subjectObject: {
              __typename: 'Client',
              billingNotes: '',
              fullName: 'Daniel Group'
            },
            url: 'http://localhost:3000/platform/staff/invoices/324744'
          },
          creditedAmount: '0',
          debitedAmount: '0',
          documentNumber: 324155,
          gid: 'gid://platform/Invoice/324155',
          paidAmount: '5600.0',
          status: 'PAID',
          subjectObject: {
            __typename: 'Client',
            billingNotes: '',
            fullName: 'Daniel Group'
          },
          url: 'http://localhost:3000/platform/staff/invoices/324155'
        }
      ],
      kind: 'development',
      originalCommitment: {
        __typename: 'Commitment',
        availability: 'full_time',
        availabilityHours: 40,
        companyRate: '2800.0',
        startDate: '2019-02-18',
        talentRate: '1600.0'
      },
      payments: [
        {
          __typename: 'CommercialDocument',
          amount: '3200.0',
          billingCycleGid: 'gid://platform/Billing::Cycle/340565',
          creditedAmount: '0',
          debitedAmount: '0',
          gid: 'gid://platform/Payment/774099',
          paidAmount: '3200.0',
          status: 'PAID',
          subjectObject: {
            __typename: 'Client',
            billingNotes: '',
            fullName: 'Alethea Oga'
          },
          url: 'http://localhost:3000/platform/staff/payments/774099'
        }
      ],
      startDate: '2019-05-20',
      status: 'paid',
      timesheetApproved: false,
      timesheetComment: null,
      timesheetOverdue: false,
      timesheetRecords: [],
      timesheetRejected: false,
      timesheetRejectionComment: null,
      timesheetRequiresApproval: false,
      timesheetSubmissionBlocked: true,
      timesheetSubmissionDeadline: '2019-06-17T00:00:00-04:00',
      timesheetSubmitted: false
    },
    {
      __typename: 'BillingCycle',
      operations: {
        __typename: 'BillingCycleOperations',
        timesheetApprove: {
          __typename: 'Operation',
          callable: 'DISABLED',
          messages: []
        },
        timesheetReject: {
          __typename: 'Operation',
          callable: 'DISABLED',
          messages: []
        },
        timesheetSubmit: {
          __typename: 'Operation',
          callable: 'DISABLED',
          messages: []
        },
        timesheetUnsubmit: {
          __typename: 'Operation',
          callable: 'DISABLED',
          messages: []
        },
        timesheetUpdate: {
          __typename: 'Operation',
          callable: 'DISABLED',
          messages: []
        }
      },
      actualCommitment: {
        __typename: 'Commitment',
        availability: 'full_time',
        availabilityHours: 40,
        companyRate: '2800.0',
        startDate: '2019-02-18',
        talentRate: '1600.0'
      },
      breaksPeriod: [],
      childrenCycles: [],
      commissions: [
        {
          __typename: 'CommercialDocument',
          amount: '24.0',
          billingCycleGid: 'gid://platform/Billing::Cycle/337273',
          creditedAmount: '0',
          debitedAmount: '0',
          gid: 'gid://platform/Payment/802743',
          paidAmount: '24.0',
          status: 'PAID',
          subjectObject: {
            __typename: 'Client',
            billingNotes: '',
            fullName: 'Vlad Miller'
          },
          url: 'http://localhost:3000/platform/staff/payments/802743'
        },
        {
          __typename: 'CommercialDocument',
          amount: '120.0',
          billingCycleGid: 'gid://platform/Billing::Cycle/337273',
          creditedAmount: '0',
          debitedAmount: '0',
          gid: 'gid://platform/Payment/802742',
          paidAmount: '120.0',
          status: 'PAID',
          subjectObject: {
            __typename: 'Client',
            billingNotes: '',
            fullName: 'Gary Gardner'
          },
          url: 'http://localhost:3000/platform/staff/payments/802742'
        },
        {
          __typename: 'CommercialDocument',
          amount: '120.0',
          billingCycleGid: 'gid://platform/Billing::Cycle/337273',
          creditedAmount: '0',
          debitedAmount: '0',
          gid: 'gid://platform/Payment/802741',
          paidAmount: '120.0',
          status: 'PAID',
          subjectObject: {
            __typename: 'Client',
            billingNotes: '',
            fullName: 'Noel Wilson'
          },
          url: 'http://localhost:3000/platform/staff/payments/802741'
        }
      ],
      endDate: '2019-05-19',
      gid: 'gid://platform/Billing::Cycle/337273',
      hours: '80.0',
      chargedHours: '80.0',
      invoices: [
        {
          __typename: 'CommercialDocument',
          amount: '5600.0',
          billingCycleGid: 'gid://platform/Billing::Cycle/337273',
          consolidatedDocument: {
            __typename: 'CommercialDocument',
            amount: '16800.0',
            documentNumber: 324744,
            gid: 'gid://platform/Invoice/324744',
            status: 'PAID',
            subjectObject: {
              __typename: 'Client',
              billingNotes: '',
              fullName: 'Daniel Group'
            },
            url: 'http://localhost:3000/platform/staff/invoices/324744'
          },
          creditedAmount: '0',
          debitedAmount: '0',
          documentNumber: 320973,
          gid: 'gid://platform/Invoice/320973',
          paidAmount: '5600.0',
          status: 'PAID',
          subjectObject: {
            __typename: 'Client',
            billingNotes: '',
            fullName: 'Daniel Group'
          },
          url: 'http://localhost:3000/platform/staff/invoices/320973'
        }
      ],
      kind: 'trial',
      originalCommitment: {
        __typename: 'Commitment',
        availability: 'full_time',
        availabilityHours: 40,
        companyRate: '2800.0',
        startDate: '2019-02-18',
        talentRate: '1600.0'
      },
      payments: [
        {
          __typename: 'CommercialDocument',
          amount: '3200.0',
          billingCycleGid: 'gid://platform/Billing::Cycle/337273',
          creditedAmount: '0',
          debitedAmount: '0',
          gid: 'gid://platform/Payment/764581',
          paidAmount: '3200.0',
          status: 'PAID',
          subjectObject: {
            __typename: 'Client',
            billingNotes: '',
            fullName: 'Alethea Oga'
          },
          url: 'http://localhost:3000/platform/staff/payments/764581'
        }
      ],
      startDate: '2019-05-06',
      status: 'paid',
      timesheetApproved: false,
      timesheetComment: null,
      timesheetOverdue: false,
      timesheetRecords: [],
      timesheetRejected: false,
      timesheetRejectionComment: null,
      timesheetRequiresApproval: false,
      timesheetSubmissionBlocked: true,
      timesheetSubmissionDeadline: '2019-06-03T00:00:00-04:00',
      timesheetSubmitted: false
    },
    {
      __typename: 'BillingCycle',
      operations: {
        __typename: 'BillingCycleOperations',
        timesheetApprove: {
          __typename: 'Operation',
          callable: 'DISABLED',
          messages: []
        },
        timesheetReject: {
          __typename: 'Operation',
          callable: 'DISABLED',
          messages: []
        },
        timesheetSubmit: {
          __typename: 'Operation',
          callable: 'DISABLED',
          messages: []
        },
        timesheetUnsubmit: {
          __typename: 'Operation',
          callable: 'DISABLED',
          messages: []
        },
        timesheetUpdate: {
          __typename: 'Operation',
          callable: 'DISABLED',
          messages: []
        }
      },
      actualCommitment: {
        __typename: 'Commitment',
        availability: 'full_time',
        availabilityHours: 40,
        companyRate: '2800.0',
        startDate: '2019-02-18',
        talentRate: '1600.0'
      },
      breaksPeriod: [],
      childrenCycles: [],
      commissions: [
        {
          __typename: 'CommercialDocument',
          amount: '24.0',
          billingCycleGid: 'gid://platform/Billing::Cycle/334114',
          creditedAmount: '0',
          debitedAmount: '0',
          gid: 'gid://platform/Payment/802746',
          paidAmount: '24.0',
          status: 'PAID',
          subjectObject: {
            __typename: 'Client',
            billingNotes: '',
            fullName: 'Vlad Miller'
          },
          url: 'http://localhost:3000/platform/staff/payments/802746'
        },
        {
          __typename: 'CommercialDocument',
          amount: '120.0',
          billingCycleGid: 'gid://platform/Billing::Cycle/334114',
          creditedAmount: '0',
          debitedAmount: '0',
          gid: 'gid://platform/Payment/802745',
          paidAmount: '120.0',
          status: 'PAID',
          subjectObject: {
            __typename: 'Client',
            billingNotes: '',
            fullName: 'Gary Gardner'
          },
          url: 'http://localhost:3000/platform/staff/payments/802745'
        },
        {
          __typename: 'CommercialDocument',
          amount: '120.0',
          billingCycleGid: 'gid://platform/Billing::Cycle/334114',
          creditedAmount: '0',
          debitedAmount: '0',
          gid: 'gid://platform/Payment/802744',
          paidAmount: '120.0',
          status: 'PAID',
          subjectObject: {
            __typename: 'Client',
            billingNotes: '',
            fullName: 'Noel Wilson'
          },
          url: 'http://localhost:3000/platform/staff/payments/802744'
        }
      ],
      endDate: '2019-05-05',
      gid: 'gid://platform/Billing::Cycle/334114',
      hours: '80.0',
      chargedHours: '80.0',
      invoices: [
        {
          __typename: 'CommercialDocument',
          amount: '5600.0',
          billingCycleGid: 'gid://platform/Billing::Cycle/334114',
          consolidatedDocument: {
            __typename: 'CommercialDocument',
            amount: '16800.0',
            documentNumber: 324744,
            gid: 'gid://platform/Invoice/324744',
            status: 'PAID',
            subjectObject: {
              __typename: 'Client',
              billingNotes: '',
              fullName: 'Daniel Group'
            },
            url: 'http://localhost:3000/platform/staff/invoices/324744'
          },
          creditedAmount: '0',
          debitedAmount: '0',
          documentNumber: 317912,
          gid: 'gid://platform/Invoice/317912',
          paidAmount: '5600.0',
          status: 'PAID',
          subjectObject: {
            __typename: 'Client',
            billingNotes: '',
            fullName: 'Daniel Group'
          },
          url: 'http://localhost:3000/platform/staff/invoices/317912'
        }
      ],
      kind: 'development',
      originalCommitment: {
        __typename: 'Commitment',
        availability: 'full_time',
        availabilityHours: 40,
        companyRate: '2800.0',
        startDate: '2019-02-18',
        talentRate: '1600.0'
      },
      payments: [
        {
          __typename: 'CommercialDocument',
          amount: '3200.0',
          billingCycleGid: 'gid://platform/Billing::Cycle/334114',
          creditedAmount: '0',
          debitedAmount: '0',
          gid: 'gid://platform/Payment/755076',
          paidAmount: '3200.0',
          status: 'PAID',
          subjectObject: {
            __typename: 'Client',
            billingNotes: '',
            fullName: 'Alethea Oga'
          },
          url: 'http://localhost:3000/platform/staff/payments/755076'
        }
      ],
      startDate: '2019-04-22',
      status: 'paid',
      timesheetApproved: false,
      timesheetComment: null,
      timesheetOverdue: false,
      timesheetRecords: [],
      timesheetRejected: false,
      timesheetRejectionComment: null,
      timesheetRequiresApproval: false,
      timesheetSubmissionBlocked: true,
      timesheetSubmissionDeadline: '2019-05-20T00:00:00-04:00',
      timesheetSubmitted: false
    }
  ],
  commissions: [
    {
      __typename: 'CommercialDocument',
      amount: 792,
      billingCycleGid: 'gid://platform/Billing::Cycle/334226',
      creditedAmount: '0',
      debitedAmount: '0',
      gid: 'gid://platform/Payment/802813'
    }
  ],
  endDate: '2019-06-02',
  hours: '240',
  chargedHours: 240,
  invoices: [
    {
      __typename: 'CommercialDocument',
      amount: '16800.0',
      documentNumber: 324744,
      gid: 'gid://platform/Invoice/324744',
      status: 'PAID',
      subjectObject: {
        __typename: 'Client',
        billingNotes: '',
        fullName: 'Daniel Group'
      },
      url: 'http://localhost:3000/platform/staff/invoices/324744'
    }
  ],
  kind: 'multi',
  originalCommitment: {
    availability: 'full_time'
  },
  payments: [
    {
      __typename: 'CommercialDocument',
      amount: 9600,
      gid: 'gid://platform/Invoice/324844',
      status: 'PAID',
      subjectObject: {
        __typename: 'Client',
        billingNotes: '',
        fullName: 'Daniel Group'
      },
      url: 'http://localhost:3000/platform/staff/invoices/324844'
    }
  ],
  startDate: '2019-04-22',
  status: 'paid'
}
