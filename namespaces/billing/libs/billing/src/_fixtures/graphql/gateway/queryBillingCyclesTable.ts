import faker from 'faker/locale/en'

export default {
  engagementDocuments: {
    __typename: 'BillingEngagementDocuments',
    commissions: [
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '90.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/416541',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 1055015,
        gid: 'gid://platform/Payment/1055015',
        paidAmount: '0',
        status: 'OVERDUE',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Sachin Bhagwata'
        },
        url: 'http://localhost:3000/platform/staff/payments/1055015',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #1055015',
          url: 'http://localhost:3000/platform/staff/payments/1055015'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '90.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/416541',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 1055014,
        gid: 'gid://platform/Payment/1055014',
        paidAmount: '0',
        status: 'OVERDUE',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Travis Hopkins'
        },
        url: 'http://localhost:3000/platform/staff/payments/1055014',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #1055014',
          url: 'http://localhost:3000/platform/staff/payments/1055014'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '54.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/418523',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 1055013,
        gid: 'gid://platform/Payment/1055013',
        paidAmount: '0',
        status: 'OVERDUE',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Sachin Bhagwata'
        },
        url: 'http://localhost:3000/platform/staff/payments/1055013',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #1055013',
          url: 'http://localhost:3000/platform/staff/payments/1055013'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '54.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/418523',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 1055012,
        gid: 'gid://platform/Payment/1055012',
        paidAmount: '0',
        status: 'OVERDUE',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Travis Hopkins'
        },
        url: 'http://localhost:3000/platform/staff/payments/1055012',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #1055012',
          url: 'http://localhost:3000/platform/staff/payments/1055012'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '28.8',
        billingCycleGid: 'gid://platform/Billing::Cycle/418859',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 1055011,
        gid: 'gid://platform/Payment/1055011',
        paidAmount: '0',
        status: 'OVERDUE',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Sachin Bhagwata'
        },
        url: 'http://localhost:3000/platform/staff/payments/1055011',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #1055011',
          url: 'http://localhost:3000/platform/staff/payments/1055011'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '28.8',
        billingCycleGid: 'gid://platform/Billing::Cycle/418859',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 1055010,
        gid: 'gid://platform/Payment/1055010',
        paidAmount: '0',
        status: 'OVERDUE',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Travis Hopkins'
        },
        url: 'http://localhost:3000/platform/staff/payments/1055010',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #1055010',
          url: 'http://localhost:3000/platform/staff/payments/1055010'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '72.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/420555',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 1055009,
        gid: 'gid://platform/Payment/1055009',
        paidAmount: '0',
        status: 'OVERDUE',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Sachin Bhagwata'
        },
        url: 'http://localhost:3000/platform/staff/payments/1055009',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #1055009',
          url: 'http://localhost:3000/platform/staff/payments/1055009'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '72.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/420555',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 1055008,
        gid: 'gid://platform/Payment/1055008',
        paidAmount: '0',
        status: 'OVERDUE',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Travis Hopkins'
        },
        url: 'http://localhost:3000/platform/staff/payments/1055008',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #1055008',
          url: 'http://localhost:3000/platform/staff/payments/1055008'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '100.8',
        billingCycleGid: 'gid://platform/Billing::Cycle/422502',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 1055007,
        gid: 'gid://platform/Payment/1055007',
        paidAmount: '0',
        status: 'OVERDUE',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Sachin Bhagwata'
        },
        url: 'http://localhost:3000/platform/staff/payments/1055007',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #1055007',
          url: 'http://localhost:3000/platform/staff/payments/1055007'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '100.8',
        billingCycleGid: 'gid://platform/Billing::Cycle/422502',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 1055006,
        gid: 'gid://platform/Payment/1055006',
        paidAmount: '0',
        status: 'OVERDUE',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Travis Hopkins'
        },
        url: 'http://localhost:3000/platform/staff/payments/1055006',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #1055006',
          url: 'http://localhost:3000/platform/staff/payments/1055006'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '18.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/408661',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 1054925,
        gid: 'gid://platform/Payment/1054925',
        paidAmount: '0',
        status: 'OVERDUE',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Jelena Ristic-Spasovski'
        },
        url: 'http://localhost:3000/platform/staff/payments/1054925',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #1054925',
          url: 'http://localhost:3000/platform/staff/payments/1054925'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '90.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/408661',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 1054924,
        gid: 'gid://platform/Payment/1054924',
        paidAmount: '0',
        status: 'OVERDUE',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Sachin Bhagwata'
        },
        url: 'http://localhost:3000/platform/staff/payments/1054924',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #1054924',
          url: 'http://localhost:3000/platform/staff/payments/1054924'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '90.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/408661',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 1054923,
        gid: 'gid://platform/Payment/1054923',
        paidAmount: '0',
        status: 'OVERDUE',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Travis Hopkins'
        },
        url: 'http://localhost:3000/platform/staff/payments/1054923',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #1054923',
          url: 'http://localhost:3000/platform/staff/payments/1054923'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '18.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/412525',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 1054922,
        gid: 'gid://platform/Payment/1054922',
        paidAmount: '0',
        status: 'OVERDUE',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Jelena Ristic-Spasovski'
        },
        url: 'http://localhost:3000/platform/staff/payments/1054922',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #1054922',
          url: 'http://localhost:3000/platform/staff/payments/1054922'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '90.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/412525',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 1054921,
        gid: 'gid://platform/Payment/1054921',
        paidAmount: '0',
        status: 'OVERDUE',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Sachin Bhagwata'
        },
        url: 'http://localhost:3000/platform/staff/payments/1054921',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #1054921',
          url: 'http://localhost:3000/platform/staff/payments/1054921'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '90.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/412525',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 1054920,
        gid: 'gid://platform/Payment/1054920',
        paidAmount: '0',
        status: 'OVERDUE',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Travis Hopkins'
        },
        url: 'http://localhost:3000/platform/staff/payments/1054920',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #1054920',
          url: 'http://localhost:3000/platform/staff/payments/1054920'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '90.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/414530',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 1054919,
        gid: 'gid://platform/Payment/1054919',
        paidAmount: '0',
        status: 'OVERDUE',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Sachin Bhagwata'
        },
        url: 'http://localhost:3000/platform/staff/payments/1054919',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #1054919',
          url: 'http://localhost:3000/platform/staff/payments/1054919'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '90.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/414530',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 1054918,
        gid: 'gid://platform/Payment/1054918',
        paidAmount: '0',
        status: 'OVERDUE',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Travis Hopkins'
        },
        url: 'http://localhost:3000/platform/staff/payments/1054918',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #1054918',
          url: 'http://localhost:3000/platform/staff/payments/1054918'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '7.2',
        billingCycleGid: 'gid://platform/Billing::Cycle/399140',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 991266,
        gid: 'gid://platform/Payment/991266',
        paidAmount: '7.2',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Jelena Ristic-Spasovski'
        },
        url: 'http://localhost:3000/platform/staff/payments/991266',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #991266',
          url: 'http://localhost:3000/platform/staff/payments/991266'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '36.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/399140',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 991264,
        gid: 'gid://platform/Payment/991264',
        paidAmount: '36.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Sachin Bhagwata'
        },
        url: 'http://localhost:3000/platform/staff/payments/991264',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #991264',
          url: 'http://localhost:3000/platform/staff/payments/991264'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '36.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/399140',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 991262,
        gid: 'gid://platform/Payment/991262',
        paidAmount: '36.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Travis Hopkins'
        },
        url: 'http://localhost:3000/platform/staff/payments/991262',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #991262',
          url: 'http://localhost:3000/platform/staff/payments/991262'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '18.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/400946',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 991259,
        gid: 'gid://platform/Payment/991259',
        paidAmount: '18.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Jelena Ristic-Spasovski'
        },
        url: 'http://localhost:3000/platform/staff/payments/991259',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #991259',
          url: 'http://localhost:3000/platform/staff/payments/991259'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '90.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/400946',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 991258,
        gid: 'gid://platform/Payment/991258',
        paidAmount: '90.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Sachin Bhagwata'
        },
        url: 'http://localhost:3000/platform/staff/payments/991258',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #991258',
          url: 'http://localhost:3000/platform/staff/payments/991258'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '90.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/400946',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 991257,
        gid: 'gid://platform/Payment/991257',
        paidAmount: '90.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Travis Hopkins'
        },
        url: 'http://localhost:3000/platform/staff/payments/991257',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #991257',
          url: 'http://localhost:3000/platform/staff/payments/991257'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '18.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/402868',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 991256,
        gid: 'gid://platform/Payment/991256',
        paidAmount: '18.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Jelena Ristic-Spasovski'
        },
        url: 'http://localhost:3000/platform/staff/payments/991256',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #991256',
          url: 'http://localhost:3000/platform/staff/payments/991256'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '90.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/402868',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 991255,
        gid: 'gid://platform/Payment/991255',
        paidAmount: '90.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Sachin Bhagwata'
        },
        url: 'http://localhost:3000/platform/staff/payments/991255',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #991255',
          url: 'http://localhost:3000/platform/staff/payments/991255'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '90.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/402868',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 991254,
        gid: 'gid://platform/Payment/991254',
        paidAmount: '90.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Travis Hopkins'
        },
        url: 'http://localhost:3000/platform/staff/payments/991254',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #991254',
          url: 'http://localhost:3000/platform/staff/payments/991254'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '18.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/404818',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 991253,
        gid: 'gid://platform/Payment/991253',
        paidAmount: '18.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Jelena Ristic-Spasovski'
        },
        url: 'http://localhost:3000/platform/staff/payments/991253',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #991253',
          url: 'http://localhost:3000/platform/staff/payments/991253'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '90.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/404818',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 991252,
        gid: 'gid://platform/Payment/991252',
        paidAmount: '90.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Sachin Bhagwata'
        },
        url: 'http://localhost:3000/platform/staff/payments/991252',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #991252',
          url: 'http://localhost:3000/platform/staff/payments/991252'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '90.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/404818',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 991251,
        gid: 'gid://platform/Payment/991251',
        paidAmount: '90.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Travis Hopkins'
        },
        url: 'http://localhost:3000/platform/staff/payments/991251',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #991251',
          url: 'http://localhost:3000/platform/staff/payments/991251'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '18.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/406696',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 991250,
        gid: 'gid://platform/Payment/991250',
        paidAmount: '18.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Jelena Ristic-Spasovski'
        },
        url: 'http://localhost:3000/platform/staff/payments/991250',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #991250',
          url: 'http://localhost:3000/platform/staff/payments/991250'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '90.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/406696',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 991249,
        gid: 'gid://platform/Payment/991249',
        paidAmount: '90.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Sachin Bhagwata'
        },
        url: 'http://localhost:3000/platform/staff/payments/991249',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #991249',
          url: 'http://localhost:3000/platform/staff/payments/991249'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '90.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/406696',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 991248,
        gid: 'gid://platform/Payment/991248',
        paidAmount: '90.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Travis Hopkins'
        },
        url: 'http://localhost:3000/platform/staff/payments/991248',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #991248',
          url: 'http://localhost:3000/platform/staff/payments/991248'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '18.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/391484',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 967712,
        gid: 'gid://platform/Payment/967712',
        paidAmount: '18.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Jelena Ristic-Spasovski'
        },
        url: 'http://localhost:3000/platform/staff/payments/967712',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #967712',
          url: 'http://localhost:3000/platform/staff/payments/967712'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '90.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/391484',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 967711,
        gid: 'gid://platform/Payment/967711',
        paidAmount: '90.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Sachin Bhagwata'
        },
        url: 'http://localhost:3000/platform/staff/payments/967711',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #967711',
          url: 'http://localhost:3000/platform/staff/payments/967711'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '90.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/391484',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 967710,
        gid: 'gid://platform/Payment/967710',
        paidAmount: '90.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Travis Hopkins'
        },
        url: 'http://localhost:3000/platform/staff/payments/967710',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #967710',
          url: 'http://localhost:3000/platform/staff/payments/967710'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '18.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/393446',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 967709,
        gid: 'gid://platform/Payment/967709',
        paidAmount: '18.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Jelena Ristic-Spasovski'
        },
        url: 'http://localhost:3000/platform/staff/payments/967709',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #967709',
          url: 'http://localhost:3000/platform/staff/payments/967709'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '90.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/393446',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 967708,
        gid: 'gid://platform/Payment/967708',
        paidAmount: '90.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Sachin Bhagwata'
        },
        url: 'http://localhost:3000/platform/staff/payments/967708',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #967708',
          url: 'http://localhost:3000/platform/staff/payments/967708'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '90.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/393446',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 967707,
        gid: 'gid://platform/Payment/967707',
        paidAmount: '90.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Travis Hopkins'
        },
        url: 'http://localhost:3000/platform/staff/payments/967707',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #967707',
          url: 'http://localhost:3000/platform/staff/payments/967707'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '18.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/395078',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 967706,
        gid: 'gid://platform/Payment/967706',
        paidAmount: '18.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Jelena Ristic-Spasovski'
        },
        url: 'http://localhost:3000/platform/staff/payments/967706',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #967706',
          url: 'http://localhost:3000/platform/staff/payments/967706'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '90.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/395078',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 967705,
        gid: 'gid://platform/Payment/967705',
        paidAmount: '90.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Sachin Bhagwata'
        },
        url: 'http://localhost:3000/platform/staff/payments/967705',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #967705',
          url: 'http://localhost:3000/platform/staff/payments/967705'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '90.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/395078',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 967704,
        gid: 'gid://platform/Payment/967704',
        paidAmount: '90.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Travis Hopkins'
        },
        url: 'http://localhost:3000/platform/staff/payments/967704',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #967704',
          url: 'http://localhost:3000/platform/staff/payments/967704'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '7.2',
        billingCycleGid: 'gid://platform/Billing::Cycle/397369',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 967703,
        gid: 'gid://platform/Payment/967703',
        paidAmount: '7.2',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Jelena Ristic-Spasovski'
        },
        url: 'http://localhost:3000/platform/staff/payments/967703',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #967703',
          url: 'http://localhost:3000/platform/staff/payments/967703'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '36.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/397369',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 967702,
        gid: 'gid://platform/Payment/967702',
        paidAmount: '36.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Sachin Bhagwata'
        },
        url: 'http://localhost:3000/platform/staff/payments/967702',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #967702',
          url: 'http://localhost:3000/platform/staff/payments/967702'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '36.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/397369',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 967701,
        gid: 'gid://platform/Payment/967701',
        paidAmount: '36.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Travis Hopkins'
        },
        url: 'http://localhost:3000/platform/staff/payments/967701',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #967701',
          url: 'http://localhost:3000/platform/staff/payments/967701'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '18.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/381417',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 943084,
        gid: 'gid://platform/Payment/943084',
        paidAmount: '18.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Jelena Ristic-Spasovski'
        },
        url: 'http://localhost:3000/platform/staff/payments/943084',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #943084',
          url: 'http://localhost:3000/platform/staff/payments/943084'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '90.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/381417',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 943083,
        gid: 'gid://platform/Payment/943083',
        paidAmount: '90.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Sachin Bhagwata'
        },
        url: 'http://localhost:3000/platform/staff/payments/943083',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #943083',
          url: 'http://localhost:3000/platform/staff/payments/943083'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '90.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/381417',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 943082,
        gid: 'gid://platform/Payment/943082',
        paidAmount: '90.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Travis Hopkins'
        },
        url: 'http://localhost:3000/platform/staff/payments/943082',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #943082',
          url: 'http://localhost:3000/platform/staff/payments/943082'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '18.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/383390',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 943081,
        gid: 'gid://platform/Payment/943081',
        paidAmount: '18.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Jelena Ristic-Spasovski'
        },
        url: 'http://localhost:3000/platform/staff/payments/943081',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #943081',
          url: 'http://localhost:3000/platform/staff/payments/943081'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '90.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/383390',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 943080,
        gid: 'gid://platform/Payment/943080',
        paidAmount: '90.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Sachin Bhagwata'
        },
        url: 'http://localhost:3000/platform/staff/payments/943080',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #943080',
          url: 'http://localhost:3000/platform/staff/payments/943080'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '90.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/383390',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 943079,
        gid: 'gid://platform/Payment/943079',
        paidAmount: '90.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Travis Hopkins'
        },
        url: 'http://localhost:3000/platform/staff/payments/943079',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #943079',
          url: 'http://localhost:3000/platform/staff/payments/943079'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '18.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/385309',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 943078,
        gid: 'gid://platform/Payment/943078',
        paidAmount: '18.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Jelena Ristic-Spasovski'
        },
        url: 'http://localhost:3000/platform/staff/payments/943078',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #943078',
          url: 'http://localhost:3000/platform/staff/payments/943078'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '90.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/385309',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 943077,
        gid: 'gid://platform/Payment/943077',
        paidAmount: '90.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Sachin Bhagwata'
        },
        url: 'http://localhost:3000/platform/staff/payments/943077',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #943077',
          url: 'http://localhost:3000/platform/staff/payments/943077'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '90.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/385309',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 943076,
        gid: 'gid://platform/Payment/943076',
        paidAmount: '90.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Travis Hopkins'
        },
        url: 'http://localhost:3000/platform/staff/payments/943076',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #943076',
          url: 'http://localhost:3000/platform/staff/payments/943076'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '18.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/387309',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 943075,
        gid: 'gid://platform/Payment/943075',
        paidAmount: '18.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Jelena Ristic-Spasovski'
        },
        url: 'http://localhost:3000/platform/staff/payments/943075',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #943075',
          url: 'http://localhost:3000/platform/staff/payments/943075'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '90.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/387309',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 943074,
        gid: 'gid://platform/Payment/943074',
        paidAmount: '90.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Sachin Bhagwata'
        },
        url: 'http://localhost:3000/platform/staff/payments/943074',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #943074',
          url: 'http://localhost:3000/platform/staff/payments/943074'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '90.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/387309',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 943073,
        gid: 'gid://platform/Payment/943073',
        paidAmount: '90.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Travis Hopkins'
        },
        url: 'http://localhost:3000/platform/staff/payments/943073',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #943073',
          url: 'http://localhost:3000/platform/staff/payments/943073'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '18.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/389167',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 943072,
        gid: 'gid://platform/Payment/943072',
        paidAmount: '18.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Jelena Ristic-Spasovski'
        },
        url: 'http://localhost:3000/platform/staff/payments/943072',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #943072',
          url: 'http://localhost:3000/platform/staff/payments/943072'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '90.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/389167',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 943071,
        gid: 'gid://platform/Payment/943071',
        paidAmount: '90.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Sachin Bhagwata'
        },
        url: 'http://localhost:3000/platform/staff/payments/943071',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #943071',
          url: 'http://localhost:3000/platform/staff/payments/943071'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '90.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/389167',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 943070,
        gid: 'gid://platform/Payment/943070',
        paidAmount: '90.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Travis Hopkins'
        },
        url: 'http://localhost:3000/platform/staff/payments/943070',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #943070',
          url: 'http://localhost:3000/platform/staff/payments/943070'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '4.5',
        billingCycleGid: 'gid://platform/Billing::Cycle/374212',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 943047,
        gid: 'gid://platform/Payment/943047',
        paidAmount: '4.5',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Maja Rancic'
        },
        url: 'http://localhost:3000/platform/staff/payments/943047',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #943047',
          url: 'http://localhost:3000/platform/staff/payments/943047'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '22.5',
        billingCycleGid: 'gid://platform/Billing::Cycle/374212',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 943045,
        gid: 'gid://platform/Payment/943045',
        paidAmount: '22.5',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Patryk Matuszewski'
        },
        url: 'http://localhost:3000/platform/staff/payments/943045',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #943045',
          url: 'http://localhost:3000/platform/staff/payments/943045'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '13.5',
        billingCycleGid: 'gid://platform/Billing::Cycle/374212',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 943043,
        gid: 'gid://platform/Payment/943043',
        paidAmount: '13.5',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Andrés Felipe Pineda'
        },
        url: 'http://localhost:3000/platform/staff/payments/943043',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #943043',
          url: 'http://localhost:3000/platform/staff/payments/943043'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '4.5',
        billingCycleGid: 'gid://platform/Billing::Cycle/374212',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 943042,
        gid: 'gid://platform/Payment/943042',
        paidAmount: '4.5',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Aly Woolfrey'
        },
        url: 'http://localhost:3000/platform/staff/payments/943042',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #943042',
          url: 'http://localhost:3000/platform/staff/payments/943042'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '18.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/374212',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 943041,
        gid: 'gid://platform/Payment/943041',
        paidAmount: '18.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Jelena Ristic-Spasovski'
        },
        url: 'http://localhost:3000/platform/staff/payments/943041',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #943041',
          url: 'http://localhost:3000/platform/staff/payments/943041'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '90.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/374212',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 943040,
        gid: 'gid://platform/Payment/943040',
        paidAmount: '90.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Sachin Bhagwata'
        },
        url: 'http://localhost:3000/platform/staff/payments/943040',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #943040',
          url: 'http://localhost:3000/platform/staff/payments/943040'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '90.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/374212',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 943038,
        gid: 'gid://platform/Payment/943038',
        paidAmount: '90.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Travis Hopkins'
        },
        url: 'http://localhost:3000/platform/staff/payments/943038',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #943038',
          url: 'http://localhost:3000/platform/staff/payments/943038'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '4.5',
        billingCycleGid: 'gid://platform/Billing::Cycle/376101',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 943035,
        gid: 'gid://platform/Payment/943035',
        paidAmount: '4.5',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Maja Rancic'
        },
        url: 'http://localhost:3000/platform/staff/payments/943035',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #943035',
          url: 'http://localhost:3000/platform/staff/payments/943035'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '22.5',
        billingCycleGid: 'gid://platform/Billing::Cycle/376101',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 943034,
        gid: 'gid://platform/Payment/943034',
        paidAmount: '22.5',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Patryk Matuszewski'
        },
        url: 'http://localhost:3000/platform/staff/payments/943034',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #943034',
          url: 'http://localhost:3000/platform/staff/payments/943034'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '13.5',
        billingCycleGid: 'gid://platform/Billing::Cycle/376101',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 943033,
        gid: 'gid://platform/Payment/943033',
        paidAmount: '13.5',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Andrés Felipe Pineda'
        },
        url: 'http://localhost:3000/platform/staff/payments/943033',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #943033',
          url: 'http://localhost:3000/platform/staff/payments/943033'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '4.5',
        billingCycleGid: 'gid://platform/Billing::Cycle/376101',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 943032,
        gid: 'gid://platform/Payment/943032',
        paidAmount: '4.5',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Aly Woolfrey'
        },
        url: 'http://localhost:3000/platform/staff/payments/943032',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #943032',
          url: 'http://localhost:3000/platform/staff/payments/943032'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '18.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/376101',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 943031,
        gid: 'gid://platform/Payment/943031',
        paidAmount: '18.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Jelena Ristic-Spasovski'
        },
        url: 'http://localhost:3000/platform/staff/payments/943031',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #943031',
          url: 'http://localhost:3000/platform/staff/payments/943031'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '90.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/376101',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 943030,
        gid: 'gid://platform/Payment/943030',
        paidAmount: '90.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Sachin Bhagwata'
        },
        url: 'http://localhost:3000/platform/staff/payments/943030',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #943030',
          url: 'http://localhost:3000/platform/staff/payments/943030'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '90.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/376101',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 943029,
        gid: 'gid://platform/Payment/943029',
        paidAmount: '90.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Travis Hopkins'
        },
        url: 'http://localhost:3000/platform/staff/payments/943029',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #943029',
          url: 'http://localhost:3000/platform/staff/payments/943029'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '4.5',
        billingCycleGid: 'gid://platform/Billing::Cycle/377618',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 943028,
        gid: 'gid://platform/Payment/943028',
        paidAmount: '4.5',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Maja Rancic'
        },
        url: 'http://localhost:3000/platform/staff/payments/943028',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #943028',
          url: 'http://localhost:3000/platform/staff/payments/943028'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '22.5',
        billingCycleGid: 'gid://platform/Billing::Cycle/377618',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 943027,
        gid: 'gid://platform/Payment/943027',
        paidAmount: '22.5',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Patryk Matuszewski'
        },
        url: 'http://localhost:3000/platform/staff/payments/943027',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #943027',
          url: 'http://localhost:3000/platform/staff/payments/943027'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '13.5',
        billingCycleGid: 'gid://platform/Billing::Cycle/377618',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 943026,
        gid: 'gid://platform/Payment/943026',
        paidAmount: '13.5',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Andrés Felipe Pineda'
        },
        url: 'http://localhost:3000/platform/staff/payments/943026',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #943026',
          url: 'http://localhost:3000/platform/staff/payments/943026'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '4.5',
        billingCycleGid: 'gid://platform/Billing::Cycle/377618',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 943025,
        gid: 'gid://platform/Payment/943025',
        paidAmount: '4.5',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Aly Woolfrey'
        },
        url: 'http://localhost:3000/platform/staff/payments/943025',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #943025',
          url: 'http://localhost:3000/platform/staff/payments/943025'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '18.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/377618',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 943024,
        gid: 'gid://platform/Payment/943024',
        paidAmount: '18.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Jelena Ristic-Spasovski'
        },
        url: 'http://localhost:3000/platform/staff/payments/943024',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #943024',
          url: 'http://localhost:3000/platform/staff/payments/943024'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '90.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/377618',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 943020,
        gid: 'gid://platform/Payment/943020',
        paidAmount: '90.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Sachin Bhagwata'
        },
        url: 'http://localhost:3000/platform/staff/payments/943020',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #943020',
          url: 'http://localhost:3000/platform/staff/payments/943020'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '90.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/377618',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 943016,
        gid: 'gid://platform/Payment/943016',
        paidAmount: '90.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Travis Hopkins'
        },
        url: 'http://localhost:3000/platform/staff/payments/943016',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #943016',
          url: 'http://localhost:3000/platform/staff/payments/943016'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '18.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/379533',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 943014,
        gid: 'gid://platform/Payment/943014',
        paidAmount: '18.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Jelena Ristic-Spasovski'
        },
        url: 'http://localhost:3000/platform/staff/payments/943014',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #943014',
          url: 'http://localhost:3000/platform/staff/payments/943014'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '90.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/379533',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 943012,
        gid: 'gid://platform/Payment/943012',
        paidAmount: '90.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Sachin Bhagwata'
        },
        url: 'http://localhost:3000/platform/staff/payments/943012',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #943012',
          url: 'http://localhost:3000/platform/staff/payments/943012'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '90.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/379533',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 943010,
        gid: 'gid://platform/Payment/943010',
        paidAmount: '90.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Travis Hopkins'
        },
        url: 'http://localhost:3000/platform/staff/payments/943010',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #943010',
          url: 'http://localhost:3000/platform/staff/payments/943010'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '4.5',
        billingCycleGid: 'gid://platform/Billing::Cycle/366747',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 891778,
        gid: 'gid://platform/Payment/891778',
        paidAmount: '4.5',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Maja Rancic'
        },
        url: 'http://localhost:3000/platform/staff/payments/891778',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #891778',
          url: 'http://localhost:3000/platform/staff/payments/891778'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '22.5',
        billingCycleGid: 'gid://platform/Billing::Cycle/366747',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 891777,
        gid: 'gid://platform/Payment/891777',
        paidAmount: '22.5',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Patryk Matuszewski'
        },
        url: 'http://localhost:3000/platform/staff/payments/891777',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #891777',
          url: 'http://localhost:3000/platform/staff/payments/891777'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '13.5',
        billingCycleGid: 'gid://platform/Billing::Cycle/366747',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 891776,
        gid: 'gid://platform/Payment/891776',
        paidAmount: '13.5',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Andrés Felipe Pineda'
        },
        url: 'http://localhost:3000/platform/staff/payments/891776',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #891776',
          url: 'http://localhost:3000/platform/staff/payments/891776'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '4.5',
        billingCycleGid: 'gid://platform/Billing::Cycle/366747',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 891775,
        gid: 'gid://platform/Payment/891775',
        paidAmount: '4.5',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Aly Woolfrey'
        },
        url: 'http://localhost:3000/platform/staff/payments/891775',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #891775',
          url: 'http://localhost:3000/platform/staff/payments/891775'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '18.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/366747',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 891774,
        gid: 'gid://platform/Payment/891774',
        paidAmount: '18.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Jelena Ristic-Spasovski'
        },
        url: 'http://localhost:3000/platform/staff/payments/891774',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #891774',
          url: 'http://localhost:3000/platform/staff/payments/891774'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '90.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/366747',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 891773,
        gid: 'gid://platform/Payment/891773',
        paidAmount: '90.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Sachin Bhagwata'
        },
        url: 'http://localhost:3000/platform/staff/payments/891773',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #891773',
          url: 'http://localhost:3000/platform/staff/payments/891773'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '90.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/366747',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 891772,
        gid: 'gid://platform/Payment/891772',
        paidAmount: '90.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Travis Hopkins'
        },
        url: 'http://localhost:3000/platform/staff/payments/891772',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #891772',
          url: 'http://localhost:3000/platform/staff/payments/891772'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '4.5',
        billingCycleGid: 'gid://platform/Billing::Cycle/368627',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 891771,
        gid: 'gid://platform/Payment/891771',
        paidAmount: '4.5',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Maja Rancic'
        },
        url: 'http://localhost:3000/platform/staff/payments/891771',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #891771',
          url: 'http://localhost:3000/platform/staff/payments/891771'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '22.5',
        billingCycleGid: 'gid://platform/Billing::Cycle/368627',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 891770,
        gid: 'gid://platform/Payment/891770',
        paidAmount: '22.5',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Patryk Matuszewski'
        },
        url: 'http://localhost:3000/platform/staff/payments/891770',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #891770',
          url: 'http://localhost:3000/platform/staff/payments/891770'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '13.5',
        billingCycleGid: 'gid://platform/Billing::Cycle/368627',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 891769,
        gid: 'gid://platform/Payment/891769',
        paidAmount: '13.5',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Andrés Felipe Pineda'
        },
        url: 'http://localhost:3000/platform/staff/payments/891769',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #891769',
          url: 'http://localhost:3000/platform/staff/payments/891769'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '4.5',
        billingCycleGid: 'gid://platform/Billing::Cycle/368627',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 891768,
        gid: 'gid://platform/Payment/891768',
        paidAmount: '4.5',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Aly Woolfrey'
        },
        url: 'http://localhost:3000/platform/staff/payments/891768',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #891768',
          url: 'http://localhost:3000/platform/staff/payments/891768'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '18.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/368627',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 891767,
        gid: 'gid://platform/Payment/891767',
        paidAmount: '18.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Jelena Ristic-Spasovski'
        },
        url: 'http://localhost:3000/platform/staff/payments/891767',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #891767',
          url: 'http://localhost:3000/platform/staff/payments/891767'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '90.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/368627',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 891766,
        gid: 'gid://platform/Payment/891766',
        paidAmount: '90.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Sachin Bhagwata'
        },
        url: 'http://localhost:3000/platform/staff/payments/891766',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #891766',
          url: 'http://localhost:3000/platform/staff/payments/891766'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '90.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/368627',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 891765,
        gid: 'gid://platform/Payment/891765',
        paidAmount: '90.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Travis Hopkins'
        },
        url: 'http://localhost:3000/platform/staff/payments/891765',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #891765',
          url: 'http://localhost:3000/platform/staff/payments/891765'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '4.5',
        billingCycleGid: 'gid://platform/Billing::Cycle/370473',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 891764,
        gid: 'gid://platform/Payment/891764',
        paidAmount: '4.5',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Maja Rancic'
        },
        url: 'http://localhost:3000/platform/staff/payments/891764',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #891764',
          url: 'http://localhost:3000/platform/staff/payments/891764'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '22.5',
        billingCycleGid: 'gid://platform/Billing::Cycle/370473',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 891763,
        gid: 'gid://platform/Payment/891763',
        paidAmount: '22.5',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Patryk Matuszewski'
        },
        url: 'http://localhost:3000/platform/staff/payments/891763',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #891763',
          url: 'http://localhost:3000/platform/staff/payments/891763'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '13.5',
        billingCycleGid: 'gid://platform/Billing::Cycle/370473',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 891762,
        gid: 'gid://platform/Payment/891762',
        paidAmount: '13.5',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Andrés Felipe Pineda'
        },
        url: 'http://localhost:3000/platform/staff/payments/891762',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #891762',
          url: 'http://localhost:3000/platform/staff/payments/891762'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '4.5',
        billingCycleGid: 'gid://platform/Billing::Cycle/370473',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 891761,
        gid: 'gid://platform/Payment/891761',
        paidAmount: '4.5',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Aly Woolfrey'
        },
        url: 'http://localhost:3000/platform/staff/payments/891761',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #891761',
          url: 'http://localhost:3000/platform/staff/payments/891761'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '18.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/370473',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 891760,
        gid: 'gid://platform/Payment/891760',
        paidAmount: '18.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Jelena Ristic-Spasovski'
        },
        url: 'http://localhost:3000/platform/staff/payments/891760',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #891760',
          url: 'http://localhost:3000/platform/staff/payments/891760'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '90.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/370473',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 891759,
        gid: 'gid://platform/Payment/891759',
        paidAmount: '90.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Sachin Bhagwata'
        },
        url: 'http://localhost:3000/platform/staff/payments/891759',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #891759',
          url: 'http://localhost:3000/platform/staff/payments/891759'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '90.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/370473',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 891758,
        gid: 'gid://platform/Payment/891758',
        paidAmount: '90.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Travis Hopkins'
        },
        url: 'http://localhost:3000/platform/staff/payments/891758',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #891758',
          url: 'http://localhost:3000/platform/staff/payments/891758'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '4.5',
        billingCycleGid: 'gid://platform/Billing::Cycle/372361',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 891757,
        gid: 'gid://platform/Payment/891757',
        paidAmount: '4.5',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Maja Rancic'
        },
        url: 'http://localhost:3000/platform/staff/payments/891757',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #891757',
          url: 'http://localhost:3000/platform/staff/payments/891757'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '22.5',
        billingCycleGid: 'gid://platform/Billing::Cycle/372361',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 891756,
        gid: 'gid://platform/Payment/891756',
        paidAmount: '22.5',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Patryk Matuszewski'
        },
        url: 'http://localhost:3000/platform/staff/payments/891756',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #891756',
          url: 'http://localhost:3000/platform/staff/payments/891756'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '13.5',
        billingCycleGid: 'gid://platform/Billing::Cycle/372361',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 891755,
        gid: 'gid://platform/Payment/891755',
        paidAmount: '13.5',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Andrés Felipe Pineda'
        },
        url: 'http://localhost:3000/platform/staff/payments/891755',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #891755',
          url: 'http://localhost:3000/platform/staff/payments/891755'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '4.5',
        billingCycleGid: 'gid://platform/Billing::Cycle/372361',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 891754,
        gid: 'gid://platform/Payment/891754',
        paidAmount: '4.5',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Aly Woolfrey'
        },
        url: 'http://localhost:3000/platform/staff/payments/891754',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #891754',
          url: 'http://localhost:3000/platform/staff/payments/891754'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '18.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/372361',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 891753,
        gid: 'gid://platform/Payment/891753',
        paidAmount: '18.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Jelena Ristic-Spasovski'
        },
        url: 'http://localhost:3000/platform/staff/payments/891753',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #891753',
          url: 'http://localhost:3000/platform/staff/payments/891753'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '90.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/372361',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 891752,
        gid: 'gid://platform/Payment/891752',
        paidAmount: '90.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Sachin Bhagwata'
        },
        url: 'http://localhost:3000/platform/staff/payments/891752',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #891752',
          url: 'http://localhost:3000/platform/staff/payments/891752'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '90.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/372361',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 891751,
        gid: 'gid://platform/Payment/891751',
        paidAmount: '90.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Travis Hopkins'
        },
        url: 'http://localhost:3000/platform/staff/payments/891751',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #891751',
          url: 'http://localhost:3000/platform/staff/payments/891751'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '54.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/357825',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 886967,
        gid: 'gid://platform/Payment/886967',
        paidAmount: '54.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Sachin Bhagwata'
        },
        url: 'http://localhost:3000/platform/staff/payments/886967',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #886967',
          url: 'http://localhost:3000/platform/staff/payments/886967'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '10.8',
        billingCycleGid: 'gid://platform/Billing::Cycle/357825',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 886966,
        gid: 'gid://platform/Payment/886966',
        paidAmount: '10.8',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Jelena Ristic-Spasovski'
        },
        url: 'http://localhost:3000/platform/staff/payments/886966',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #886966',
          url: 'http://localhost:3000/platform/staff/payments/886966'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '2.7',
        billingCycleGid: 'gid://platform/Billing::Cycle/357825',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 886965,
        gid: 'gid://platform/Payment/886965',
        paidAmount: '2.7',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Aly Woolfrey'
        },
        url: 'http://localhost:3000/platform/staff/payments/886965',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #886965',
          url: 'http://localhost:3000/platform/staff/payments/886965'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '8.1',
        billingCycleGid: 'gid://platform/Billing::Cycle/357825',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 886964,
        gid: 'gid://platform/Payment/886964',
        paidAmount: '8.1',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Andrés Felipe Pineda'
        },
        url: 'http://localhost:3000/platform/staff/payments/886964',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #886964',
          url: 'http://localhost:3000/platform/staff/payments/886964'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '13.5',
        billingCycleGid: 'gid://platform/Billing::Cycle/357825',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 886963,
        gid: 'gid://platform/Payment/886963',
        paidAmount: '13.5',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Patryk Matuszewski'
        },
        url: 'http://localhost:3000/platform/staff/payments/886963',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #886963',
          url: 'http://localhost:3000/platform/staff/payments/886963'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '2.7',
        billingCycleGid: 'gid://platform/Billing::Cycle/357825',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 886962,
        gid: 'gid://platform/Payment/886962',
        paidAmount: '2.7',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Maja Rancic'
        },
        url: 'http://localhost:3000/platform/staff/payments/886962',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #886962',
          url: 'http://localhost:3000/platform/staff/payments/886962'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '54.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/357825',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 886961,
        gid: 'gid://platform/Payment/886961',
        paidAmount: '54.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Travis Hopkins'
        },
        url: 'http://localhost:3000/platform/staff/payments/886961',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #886961',
          url: 'http://localhost:3000/platform/staff/payments/886961'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '1.8',
        billingCycleGid: 'gid://platform/Billing::Cycle/359946',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 886957,
        gid: 'gid://platform/Payment/886957',
        paidAmount: '1.8',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Aly Woolfrey'
        },
        url: 'http://localhost:3000/platform/staff/payments/886957',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #886957',
          url: 'http://localhost:3000/platform/staff/payments/886957'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '7.2',
        billingCycleGid: 'gid://platform/Billing::Cycle/359946',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 886956,
        gid: 'gid://platform/Payment/886956',
        paidAmount: '7.2',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Jelena Ristic-Spasovski'
        },
        url: 'http://localhost:3000/platform/staff/payments/886956',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #886956',
          url: 'http://localhost:3000/platform/staff/payments/886956'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '36.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/359946',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 886955,
        gid: 'gid://platform/Payment/886955',
        paidAmount: '36.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Sachin Bhagwata'
        },
        url: 'http://localhost:3000/platform/staff/payments/886955',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #886955',
          url: 'http://localhost:3000/platform/staff/payments/886955'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '36.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/359946',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 886954,
        gid: 'gid://platform/Payment/886954',
        paidAmount: '36.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Travis Hopkins'
        },
        url: 'http://localhost:3000/platform/staff/payments/886954',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #886954',
          url: 'http://localhost:3000/platform/staff/payments/886954'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '5.4',
        billingCycleGid: 'gid://platform/Billing::Cycle/359946',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 886953,
        gid: 'gid://platform/Payment/886953',
        paidAmount: '5.4',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Andrés Felipe Pineda'
        },
        url: 'http://localhost:3000/platform/staff/payments/886953',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #886953',
          url: 'http://localhost:3000/platform/staff/payments/886953'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '9.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/359946',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 886951,
        gid: 'gid://platform/Payment/886951',
        paidAmount: '9.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Patryk Matuszewski'
        },
        url: 'http://localhost:3000/platform/staff/payments/886951',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #886951',
          url: 'http://localhost:3000/platform/staff/payments/886951'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '1.8',
        billingCycleGid: 'gid://platform/Billing::Cycle/359946',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 886949,
        gid: 'gid://platform/Payment/886949',
        paidAmount: '1.8',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Maja Rancic'
        },
        url: 'http://localhost:3000/platform/staff/payments/886949',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #886949',
          url: 'http://localhost:3000/platform/staff/payments/886949'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '2.25',
        billingCycleGid: 'gid://platform/Billing::Cycle/359539',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 886947,
        gid: 'gid://platform/Payment/886947',
        paidAmount: '2.25',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Maja Rancic'
        },
        url: 'http://localhost:3000/platform/staff/payments/886947',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #886947',
          url: 'http://localhost:3000/platform/staff/payments/886947'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '11.25',
        billingCycleGid: 'gid://platform/Billing::Cycle/359539',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 886946,
        gid: 'gid://platform/Payment/886946',
        paidAmount: '11.25',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Patryk Matuszewski'
        },
        url: 'http://localhost:3000/platform/staff/payments/886946',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #886946',
          url: 'http://localhost:3000/platform/staff/payments/886946'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '6.75',
        billingCycleGid: 'gid://platform/Billing::Cycle/359539',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 886945,
        gid: 'gid://platform/Payment/886945',
        paidAmount: '6.75',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Andrés Felipe Pineda'
        },
        url: 'http://localhost:3000/platform/staff/payments/886945',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #886945',
          url: 'http://localhost:3000/platform/staff/payments/886945'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '2.25',
        billingCycleGid: 'gid://platform/Billing::Cycle/359539',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 886944,
        gid: 'gid://platform/Payment/886944',
        paidAmount: '2.25',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Aly Woolfrey'
        },
        url: 'http://localhost:3000/platform/staff/payments/886944',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #886944',
          url: 'http://localhost:3000/platform/staff/payments/886944'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '9.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/359539',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 886943,
        gid: 'gid://platform/Payment/886943',
        paidAmount: '9.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Jelena Ristic-Spasovski'
        },
        url: 'http://localhost:3000/platform/staff/payments/886943',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #886943',
          url: 'http://localhost:3000/platform/staff/payments/886943'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '45.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/359539',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 886942,
        gid: 'gid://platform/Payment/886942',
        paidAmount: '45.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Sachin Bhagwata'
        },
        url: 'http://localhost:3000/platform/staff/payments/886942',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #886942',
          url: 'http://localhost:3000/platform/staff/payments/886942'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '45.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/359539',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 886941,
        gid: 'gid://platform/Payment/886941',
        paidAmount: '45.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Travis Hopkins'
        },
        url: 'http://localhost:3000/platform/staff/payments/886941',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #886941',
          url: 'http://localhost:3000/platform/staff/payments/886941'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '2.25',
        billingCycleGid: 'gid://platform/Billing::Cycle/361354',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 886940,
        gid: 'gid://platform/Payment/886940',
        paidAmount: '2.25',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Maja Rancic'
        },
        url: 'http://localhost:3000/platform/staff/payments/886940',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #886940',
          url: 'http://localhost:3000/platform/staff/payments/886940'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '11.25',
        billingCycleGid: 'gid://platform/Billing::Cycle/361354',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 886939,
        gid: 'gid://platform/Payment/886939',
        paidAmount: '11.25',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Patryk Matuszewski'
        },
        url: 'http://localhost:3000/platform/staff/payments/886939',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #886939',
          url: 'http://localhost:3000/platform/staff/payments/886939'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '6.75',
        billingCycleGid: 'gid://platform/Billing::Cycle/361354',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 886938,
        gid: 'gid://platform/Payment/886938',
        paidAmount: '6.75',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Andrés Felipe Pineda'
        },
        url: 'http://localhost:3000/platform/staff/payments/886938',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #886938',
          url: 'http://localhost:3000/platform/staff/payments/886938'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '2.25',
        billingCycleGid: 'gid://platform/Billing::Cycle/361354',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 886937,
        gid: 'gid://platform/Payment/886937',
        paidAmount: '2.25',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Aly Woolfrey'
        },
        url: 'http://localhost:3000/platform/staff/payments/886937',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #886937',
          url: 'http://localhost:3000/platform/staff/payments/886937'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '9.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/361354',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 886936,
        gid: 'gid://platform/Payment/886936',
        paidAmount: '9.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Jelena Ristic-Spasovski'
        },
        url: 'http://localhost:3000/platform/staff/payments/886936',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #886936',
          url: 'http://localhost:3000/platform/staff/payments/886936'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '45.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/361354',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 886935,
        gid: 'gid://platform/Payment/886935',
        paidAmount: '45.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Sachin Bhagwata'
        },
        url: 'http://localhost:3000/platform/staff/payments/886935',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #886935',
          url: 'http://localhost:3000/platform/staff/payments/886935'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '45.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/361354',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 886934,
        gid: 'gid://platform/Payment/886934',
        paidAmount: '45.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Travis Hopkins'
        },
        url: 'http://localhost:3000/platform/staff/payments/886934',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #886934',
          url: 'http://localhost:3000/platform/staff/payments/886934'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '2.25',
        billingCycleGid: 'gid://platform/Billing::Cycle/363121',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 886933,
        gid: 'gid://platform/Payment/886933',
        paidAmount: '2.25',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Maja Rancic'
        },
        url: 'http://localhost:3000/platform/staff/payments/886933',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #886933',
          url: 'http://localhost:3000/platform/staff/payments/886933'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '11.25',
        billingCycleGid: 'gid://platform/Billing::Cycle/363121',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 886932,
        gid: 'gid://platform/Payment/886932',
        paidAmount: '11.25',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Patryk Matuszewski'
        },
        url: 'http://localhost:3000/platform/staff/payments/886932',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #886932',
          url: 'http://localhost:3000/platform/staff/payments/886932'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '6.75',
        billingCycleGid: 'gid://platform/Billing::Cycle/363121',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 886931,
        gid: 'gid://platform/Payment/886931',
        paidAmount: '6.75',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Andrés Felipe Pineda'
        },
        url: 'http://localhost:3000/platform/staff/payments/886931',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #886931',
          url: 'http://localhost:3000/platform/staff/payments/886931'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '2.25',
        billingCycleGid: 'gid://platform/Billing::Cycle/363121',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 886930,
        gid: 'gid://platform/Payment/886930',
        paidAmount: '2.25',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Aly Woolfrey'
        },
        url: 'http://localhost:3000/platform/staff/payments/886930',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #886930',
          url: 'http://localhost:3000/platform/staff/payments/886930'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '9.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/363121',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 886929,
        gid: 'gid://platform/Payment/886929',
        paidAmount: '9.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Jelena Ristic-Spasovski'
        },
        url: 'http://localhost:3000/platform/staff/payments/886929',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #886929',
          url: 'http://localhost:3000/platform/staff/payments/886929'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '45.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/363121',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 886928,
        gid: 'gid://platform/Payment/886928',
        paidAmount: '45.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Sachin Bhagwata'
        },
        url: 'http://localhost:3000/platform/staff/payments/886928',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #886928',
          url: 'http://localhost:3000/platform/staff/payments/886928'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '45.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/363121',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 886927,
        gid: 'gid://platform/Payment/886927',
        paidAmount: '45.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Travis Hopkins'
        },
        url: 'http://localhost:3000/platform/staff/payments/886927',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #886927',
          url: 'http://localhost:3000/platform/staff/payments/886927'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '2.25',
        billingCycleGid: 'gid://platform/Billing::Cycle/364955',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 886926,
        gid: 'gid://platform/Payment/886926',
        paidAmount: '2.25',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Maja Rancic'
        },
        url: 'http://localhost:3000/platform/staff/payments/886926',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #886926',
          url: 'http://localhost:3000/platform/staff/payments/886926'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '11.25',
        billingCycleGid: 'gid://platform/Billing::Cycle/364955',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 886925,
        gid: 'gid://platform/Payment/886925',
        paidAmount: '11.25',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Patryk Matuszewski'
        },
        url: 'http://localhost:3000/platform/staff/payments/886925',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #886925',
          url: 'http://localhost:3000/platform/staff/payments/886925'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '6.75',
        billingCycleGid: 'gid://platform/Billing::Cycle/364955',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 886924,
        gid: 'gid://platform/Payment/886924',
        paidAmount: '6.75',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Andrés Felipe Pineda'
        },
        url: 'http://localhost:3000/platform/staff/payments/886924',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #886924',
          url: 'http://localhost:3000/platform/staff/payments/886924'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '2.25',
        billingCycleGid: 'gid://platform/Billing::Cycle/364955',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 886923,
        gid: 'gid://platform/Payment/886923',
        paidAmount: '2.25',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Aly Woolfrey'
        },
        url: 'http://localhost:3000/platform/staff/payments/886923',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #886923',
          url: 'http://localhost:3000/platform/staff/payments/886923'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '9.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/364955',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 886922,
        gid: 'gid://platform/Payment/886922',
        paidAmount: '9.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Jelena Ristic-Spasovski'
        },
        url: 'http://localhost:3000/platform/staff/payments/886922',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #886922',
          url: 'http://localhost:3000/platform/staff/payments/886922'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '45.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/364955',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 886921,
        gid: 'gid://platform/Payment/886921',
        paidAmount: '45.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Sachin Bhagwata'
        },
        url: 'http://localhost:3000/platform/staff/payments/886921',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #886921',
          url: 'http://localhost:3000/platform/staff/payments/886921'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '45.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/364955',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 886920,
        gid: 'gid://platform/Payment/886920',
        paidAmount: '45.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Travis Hopkins'
        },
        url: 'http://localhost:3000/platform/staff/payments/886920',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #886920',
          url: 'http://localhost:3000/platform/staff/payments/886920'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '9.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/349318',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 870228,
        gid: 'gid://platform/Payment/870228',
        paidAmount: '9.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Maja Rancic'
        },
        url: 'http://localhost:3000/platform/staff/payments/870228',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #870228',
          url: 'http://localhost:3000/platform/staff/payments/870228'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '45.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/349318',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 870227,
        gid: 'gid://platform/Payment/870227',
        paidAmount: '45.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Patryk Matuszewski'
        },
        url: 'http://localhost:3000/platform/staff/payments/870227',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #870227',
          url: 'http://localhost:3000/platform/staff/payments/870227'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '27.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/349318',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 870226,
        gid: 'gid://platform/Payment/870226',
        paidAmount: '27.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Andrés Felipe Pineda'
        },
        url: 'http://localhost:3000/platform/staff/payments/870226',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #870226',
          url: 'http://localhost:3000/platform/staff/payments/870226'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '9.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/349318',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 870225,
        gid: 'gid://platform/Payment/870225',
        paidAmount: '9.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Aly Woolfrey'
        },
        url: 'http://localhost:3000/platform/staff/payments/870225',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #870225',
          url: 'http://localhost:3000/platform/staff/payments/870225'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '36.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/349318',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 870224,
        gid: 'gid://platform/Payment/870224',
        paidAmount: '36.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Jelena Ristic-Spasovski'
        },
        url: 'http://localhost:3000/platform/staff/payments/870224',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #870224',
          url: 'http://localhost:3000/platform/staff/payments/870224'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '180.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/349318',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 870223,
        gid: 'gid://platform/Payment/870223',
        paidAmount: '180.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Sachin Bhagwata'
        },
        url: 'http://localhost:3000/platform/staff/payments/870223',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #870223',
          url: 'http://localhost:3000/platform/staff/payments/870223'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '180.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/349318',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 870222,
        gid: 'gid://platform/Payment/870222',
        paidAmount: '180.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Travis Hopkins'
        },
        url: 'http://localhost:3000/platform/staff/payments/870222',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #870222',
          url: 'http://localhost:3000/platform/staff/payments/870222'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '4.5',
        billingCycleGid: 'gid://platform/Billing::Cycle/352627',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 870221,
        gid: 'gid://platform/Payment/870221',
        paidAmount: '4.5',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Maja Rancic'
        },
        url: 'http://localhost:3000/platform/staff/payments/870221',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #870221',
          url: 'http://localhost:3000/platform/staff/payments/870221'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '22.5',
        billingCycleGid: 'gid://platform/Billing::Cycle/352627',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 870220,
        gid: 'gid://platform/Payment/870220',
        paidAmount: '22.5',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Patryk Matuszewski'
        },
        url: 'http://localhost:3000/platform/staff/payments/870220',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #870220',
          url: 'http://localhost:3000/platform/staff/payments/870220'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '13.5',
        billingCycleGid: 'gid://platform/Billing::Cycle/352627',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 870219,
        gid: 'gid://platform/Payment/870219',
        paidAmount: '13.5',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Andrés Felipe Pineda'
        },
        url: 'http://localhost:3000/platform/staff/payments/870219',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #870219',
          url: 'http://localhost:3000/platform/staff/payments/870219'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '4.5',
        billingCycleGid: 'gid://platform/Billing::Cycle/352627',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 870218,
        gid: 'gid://platform/Payment/870218',
        paidAmount: '4.5',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Aly Woolfrey'
        },
        url: 'http://localhost:3000/platform/staff/payments/870218',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #870218',
          url: 'http://localhost:3000/platform/staff/payments/870218'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '18.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/352627',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 870217,
        gid: 'gid://platform/Payment/870217',
        paidAmount: '18.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Jelena Ristic-Spasovski'
        },
        url: 'http://localhost:3000/platform/staff/payments/870217',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #870217',
          url: 'http://localhost:3000/platform/staff/payments/870217'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '90.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/352627',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 870216,
        gid: 'gid://platform/Payment/870216',
        paidAmount: '90.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Sachin Bhagwata'
        },
        url: 'http://localhost:3000/platform/staff/payments/870216',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #870216',
          url: 'http://localhost:3000/platform/staff/payments/870216'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '90.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/352627',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 870215,
        gid: 'gid://platform/Payment/870215',
        paidAmount: '90.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Travis Hopkins'
        },
        url: 'http://localhost:3000/platform/staff/payments/870215',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #870215',
          url: 'http://localhost:3000/platform/staff/payments/870215'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '1.8',
        billingCycleGid: 'gid://platform/Billing::Cycle/354370',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 870214,
        gid: 'gid://platform/Payment/870214',
        paidAmount: '1.8',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Maja Rancic'
        },
        url: 'http://localhost:3000/platform/staff/payments/870214',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #870214',
          url: 'http://localhost:3000/platform/staff/payments/870214'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '9.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/354370',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 870213,
        gid: 'gid://platform/Payment/870213',
        paidAmount: '9.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Patryk Matuszewski'
        },
        url: 'http://localhost:3000/platform/staff/payments/870213',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #870213',
          url: 'http://localhost:3000/platform/staff/payments/870213'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '5.4',
        billingCycleGid: 'gid://platform/Billing::Cycle/354370',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 870212,
        gid: 'gid://platform/Payment/870212',
        paidAmount: '5.4',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Andrés Felipe Pineda'
        },
        url: 'http://localhost:3000/platform/staff/payments/870212',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #870212',
          url: 'http://localhost:3000/platform/staff/payments/870212'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '1.8',
        billingCycleGid: 'gid://platform/Billing::Cycle/354370',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 870211,
        gid: 'gid://platform/Payment/870211',
        paidAmount: '1.8',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Aly Woolfrey'
        },
        url: 'http://localhost:3000/platform/staff/payments/870211',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #870211',
          url: 'http://localhost:3000/platform/staff/payments/870211'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '7.2',
        billingCycleGid: 'gid://platform/Billing::Cycle/354370',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 870210,
        gid: 'gid://platform/Payment/870210',
        paidAmount: '7.2',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Jelena Ristic-Spasovski'
        },
        url: 'http://localhost:3000/platform/staff/payments/870210',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #870210',
          url: 'http://localhost:3000/platform/staff/payments/870210'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '36.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/354370',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 870209,
        gid: 'gid://platform/Payment/870209',
        paidAmount: '36.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Sachin Bhagwata'
        },
        url: 'http://localhost:3000/platform/staff/payments/870209',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #870209',
          url: 'http://localhost:3000/platform/staff/payments/870209'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '36.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/354370',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 870208,
        gid: 'gid://platform/Payment/870208',
        paidAmount: '36.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Travis Hopkins'
        },
        url: 'http://localhost:3000/platform/staff/payments/870208',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #870208',
          url: 'http://localhost:3000/platform/staff/payments/870208'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '4.5',
        billingCycleGid: 'gid://platform/Billing::Cycle/356031',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 870207,
        gid: 'gid://platform/Payment/870207',
        paidAmount: '4.5',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Maja Rancic'
        },
        url: 'http://localhost:3000/platform/staff/payments/870207',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #870207',
          url: 'http://localhost:3000/platform/staff/payments/870207'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '22.5',
        billingCycleGid: 'gid://platform/Billing::Cycle/356031',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 870206,
        gid: 'gid://platform/Payment/870206',
        paidAmount: '22.5',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Patryk Matuszewski'
        },
        url: 'http://localhost:3000/platform/staff/payments/870206',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #870206',
          url: 'http://localhost:3000/platform/staff/payments/870206'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '13.5',
        billingCycleGid: 'gid://platform/Billing::Cycle/356031',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 870205,
        gid: 'gid://platform/Payment/870205',
        paidAmount: '13.5',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Andrés Felipe Pineda'
        },
        url: 'http://localhost:3000/platform/staff/payments/870205',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #870205',
          url: 'http://localhost:3000/platform/staff/payments/870205'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '4.5',
        billingCycleGid: 'gid://platform/Billing::Cycle/356031',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 870204,
        gid: 'gid://platform/Payment/870204',
        paidAmount: '4.5',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Aly Woolfrey'
        },
        url: 'http://localhost:3000/platform/staff/payments/870204',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #870204',
          url: 'http://localhost:3000/platform/staff/payments/870204'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '18.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/356031',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 870203,
        gid: 'gid://platform/Payment/870203',
        paidAmount: '18.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Jelena Ristic-Spasovski'
        },
        url: 'http://localhost:3000/platform/staff/payments/870203',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #870203',
          url: 'http://localhost:3000/platform/staff/payments/870203'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '90.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/356031',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 870202,
        gid: 'gid://platform/Payment/870202',
        paidAmount: '90.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Sachin Bhagwata'
        },
        url: 'http://localhost:3000/platform/staff/payments/870202',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #870202',
          url: 'http://localhost:3000/platform/staff/payments/870202'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '90.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/356031',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 870201,
        gid: 'gid://platform/Payment/870201',
        paidAmount: '90.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Travis Hopkins'
        },
        url: 'http://localhost:3000/platform/staff/payments/870201',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #870201',
          url: 'http://localhost:3000/platform/staff/payments/870201'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '6.3',
        billingCycleGid: 'gid://platform/Billing::Cycle/343027',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 843190,
        gid: 'gid://platform/Payment/843190',
        paidAmount: '6.3',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Maja Rancic'
        },
        url: 'http://localhost:3000/platform/staff/payments/843190',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #843190',
          url: 'http://localhost:3000/platform/staff/payments/843190'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '31.5',
        billingCycleGid: 'gid://platform/Billing::Cycle/343027',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 843189,
        gid: 'gid://platform/Payment/843189',
        paidAmount: '31.5',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Patryk Matuszewski'
        },
        url: 'http://localhost:3000/platform/staff/payments/843189',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #843189',
          url: 'http://localhost:3000/platform/staff/payments/843189'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '18.9',
        billingCycleGid: 'gid://platform/Billing::Cycle/343027',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 843188,
        gid: 'gid://platform/Payment/843188',
        paidAmount: '18.9',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Andrés Felipe Pineda'
        },
        url: 'http://localhost:3000/platform/staff/payments/843188',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #843188',
          url: 'http://localhost:3000/platform/staff/payments/843188'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '6.3',
        billingCycleGid: 'gid://platform/Billing::Cycle/343027',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 843187,
        gid: 'gid://platform/Payment/843187',
        paidAmount: '6.3',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Aly Woolfrey'
        },
        url: 'http://localhost:3000/platform/staff/payments/843187',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #843187',
          url: 'http://localhost:3000/platform/staff/payments/843187'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '25.2',
        billingCycleGid: 'gid://platform/Billing::Cycle/343027',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 843186,
        gid: 'gid://platform/Payment/843186',
        paidAmount: '25.2',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Taylor Emard'
        },
        url: 'http://localhost:3000/platform/staff/payments/843186',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #843186',
          url: 'http://localhost:3000/platform/staff/payments/843186'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '126.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/343027',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 843185,
        gid: 'gid://platform/Payment/843185',
        paidAmount: '126.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Sachin Bhagwata'
        },
        url: 'http://localhost:3000/platform/staff/payments/843185',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #843185',
          url: 'http://localhost:3000/platform/staff/payments/843185'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '126.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/343027',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 843184,
        gid: 'gid://platform/Payment/843184',
        paidAmount: '126.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Travis Hopkins'
        },
        url: 'http://localhost:3000/platform/staff/payments/843184',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #843184',
          url: 'http://localhost:3000/platform/staff/payments/843184'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '9.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/345990',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 843183,
        gid: 'gid://platform/Payment/843183',
        paidAmount: '9.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Maja Rancic'
        },
        url: 'http://localhost:3000/platform/staff/payments/843183',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #843183',
          url: 'http://localhost:3000/platform/staff/payments/843183'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '45.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/345990',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 843182,
        gid: 'gid://platform/Payment/843182',
        paidAmount: '45.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Patryk Matuszewski'
        },
        url: 'http://localhost:3000/platform/staff/payments/843182',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #843182',
          url: 'http://localhost:3000/platform/staff/payments/843182'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '27.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/345990',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 843181,
        gid: 'gid://platform/Payment/843181',
        paidAmount: '27.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Andrés Felipe Pineda'
        },
        url: 'http://localhost:3000/platform/staff/payments/843181',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #843181',
          url: 'http://localhost:3000/platform/staff/payments/843181'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '9.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/345990',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 843180,
        gid: 'gid://platform/Payment/843180',
        paidAmount: '9.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Aly Woolfrey'
        },
        url: 'http://localhost:3000/platform/staff/payments/843180',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #843180',
          url: 'http://localhost:3000/platform/staff/payments/843180'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '36.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/345990',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 843179,
        gid: 'gid://platform/Payment/843179',
        paidAmount: '36.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Taylor Emard'
        },
        url: 'http://localhost:3000/platform/staff/payments/843179',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #843179',
          url: 'http://localhost:3000/platform/staff/payments/843179'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '180.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/345990',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 843178,
        gid: 'gid://platform/Payment/843178',
        paidAmount: '180.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Sachin Bhagwata'
        },
        url: 'http://localhost:3000/platform/staff/payments/843178',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #843178',
          url: 'http://localhost:3000/platform/staff/payments/843178'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '180.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/345990',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 843177,
        gid: 'gid://platform/Payment/843177',
        paidAmount: '180.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Travis Hopkins'
        },
        url: 'http://localhost:3000/platform/staff/payments/843177',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #843177',
          url: 'http://localhost:3000/platform/staff/payments/843177'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '9.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/339863',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 843160,
        gid: 'gid://platform/Payment/843160',
        paidAmount: '9.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Maja Rancic'
        },
        url: 'http://localhost:3000/platform/staff/payments/843160',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #843160',
          url: 'http://localhost:3000/platform/staff/payments/843160'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '45.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/339863',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 843159,
        gid: 'gid://platform/Payment/843159',
        paidAmount: '45.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Patryk Matuszewski'
        },
        url: 'http://localhost:3000/platform/staff/payments/843159',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #843159',
          url: 'http://localhost:3000/platform/staff/payments/843159'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '27.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/339863',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 843158,
        gid: 'gid://platform/Payment/843158',
        paidAmount: '27.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Andrés Felipe Pineda'
        },
        url: 'http://localhost:3000/platform/staff/payments/843158',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #843158',
          url: 'http://localhost:3000/platform/staff/payments/843158'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '9.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/339863',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 843157,
        gid: 'gid://platform/Payment/843157',
        paidAmount: '9.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Aly Woolfrey'
        },
        url: 'http://localhost:3000/platform/staff/payments/843157',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #843157',
          url: 'http://localhost:3000/platform/staff/payments/843157'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '36.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/339863',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 843156,
        gid: 'gid://platform/Payment/843156',
        paidAmount: '36.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Taylor Emard'
        },
        url: 'http://localhost:3000/platform/staff/payments/843156',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #843156',
          url: 'http://localhost:3000/platform/staff/payments/843156'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '180.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/339863',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 843155,
        gid: 'gid://platform/Payment/843155',
        paidAmount: '180.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Sachin Bhagwata'
        },
        url: 'http://localhost:3000/platform/staff/payments/843155',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #843155',
          url: 'http://localhost:3000/platform/staff/payments/843155'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '180.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/339863',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 843154,
        gid: 'gid://platform/Payment/843154',
        paidAmount: '180.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Staff',
          id: faker.datatype.uuid(),
          fullName: 'Travis Hopkins'
        },
        url: 'http://localhost:3000/platform/staff/payments/843154',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #843154',
          url: 'http://localhost:3000/platform/staff/payments/843154'
        }
      }
    ],
    invoices: [
      {
        __typename: 'Invoice',
        dueDate: '',
        description: '',
        id: faker.datatype.uuid(),
        amount: '8360.0',

        billingCycleGid: 'gid://platform/Billing::Cycle/432684',
        consolidatedDocument: null,
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 411187,
        gid: 'gid://platform/Invoice/411187',
        kind: 'COMPANY_BILL',
        paidAmount: '0',
        status: 'OUTSTANDING',
        subjectObject: {
          __typename: 'Client',
          id: faker.datatype.uuid(),
          fullName: 'Jacobs, Nikolaus and Leuschke'
        },
        url: 'http://localhost:3000/platform/staff/invoices/411187',
        webResource: {
          __typename: 'Link',
          text: 'Invoice #411187',
          url: 'http://localhost:3000/platform/staff/invoices/411187'
        }
      },
      {
        __typename: 'Invoice',
        dueDate: '',
        description: '',
        id: faker.datatype.uuid(),
        amount: '420.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/432684',
        consolidatedDocument: null,
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 415963,
        gid: 'gid://platform/Invoice/415963',
        kind: 'EXTRA_HOURS',
        paidAmount: '0',
        status: 'OUTSTANDING',
        subjectObject: {
          __typename: 'Client',
          id: faker.datatype.uuid(),
          fullName: 'Jacobs, Nikolaus and Leuschke'
        },
        url: 'http://localhost:3000/platform/staff/invoices/415963',
        webResource: {
          __typename: 'Link',
          text: 'Invoice #415963',
          url: 'http://localhost:3000/platform/staff/invoices/415963'
        }
      },
      {
        __typename: 'Invoice',
        dueDate: '',
        description: '',
        id: faker.datatype.uuid(),
        amount: '8360.0',

        billingCycleGid: 'gid://platform/Billing::Cycle/428827',
        consolidatedDocument: {
          __typename: 'Invoice',
          dueDate: '',
          description: '',
          id: faker.datatype.uuid(),
          amount: '16720.0',
          billingCycleGid: null,
          creditedAmount: '0',
          debitedAmount: '0',
          documentNumber: 407126,
          gid: 'gid://platform/Invoice/407126',
          kind: 'COMPANY_BILL',
          paidAmount: '0',
          status: 'OUTSTANDING',
          subjectObject: {
            __typename: 'Client',
            id: faker.datatype.uuid(),
            fullName: 'Jacobs, Nikolaus and Leuschke'
          },
          url: 'http://localhost:3000/platform/staff/invoices/407126',
          webResource: {
            __typename: 'Link',
            text: 'Invoice #407126',
            url: 'http://localhost:3000/platform/staff/invoices/407126'
          }
        },
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 407125,
        gid: 'gid://platform/Invoice/407125',
        kind: 'COMPANY_BILL',
        paidAmount: '0',
        status: 'OUTSTANDING',
        subjectObject: {
          __typename: 'Client',
          id: faker.datatype.uuid(),
          fullName: 'Jacobs, Nikolaus and Leuschke'
        },
        url: 'http://localhost:3000/platform/staff/invoices/407125',
        webResource: {
          __typename: 'Link',
          text: 'Invoice #407125',
          url: 'http://localhost:3000/platform/staff/invoices/407125'
        }
      },
      {
        __typename: 'Invoice',
        dueDate: '',
        description: '',
        id: faker.datatype.uuid(),
        amount: '8360.0',

        billingCycleGid: 'gid://platform/Billing::Cycle/424656',
        consolidatedDocument: {
          __typename: 'Invoice',
          dueDate: '',
          description: '',
          id: faker.datatype.uuid(),
          amount: '16720.0',
          billingCycleGid: null,
          creditedAmount: '0',
          debitedAmount: '0',
          documentNumber: 407126,
          gid: 'gid://platform/Invoice/407126',
          paidAmount: '0',
          status: 'OUTSTANDING',
          subjectObject: {
            __typename: 'Client',
            id: faker.datatype.uuid(),
            fullName: 'Jacobs, Nikolaus and Leuschke'
          },
          url: 'http://localhost:3000/platform/staff/invoices/407126',
          webResource: {
            __typename: 'Link',
            text: 'Invoice #407126',
            url: 'http://localhost:3000/platform/staff/invoices/407126'
          }
        },
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 403508,
        gid: 'gid://platform/Invoice/403508',
        kind: 'COMPANY_BILL',
        paidAmount: '0',
        status: 'OUTSTANDING',
        subjectObject: {
          __typename: 'Client',
          id: faker.datatype.uuid(),
          fullName: 'Jacobs, Nikolaus and Leuschke'
        },
        url: 'http://localhost:3000/platform/staff/invoices/403508',
        webResource: {
          __typename: 'Link',
          text: 'Invoice #403508',
          url: 'http://localhost:3000/platform/staff/invoices/403508'
        }
      },
      {
        __typename: 'Invoice',
        dueDate: '',
        description: '',
        id: faker.datatype.uuid(),
        amount: '5320.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/422502',
        consolidatedDocument: {
          __typename: 'Invoice',
          dueDate: '',
          description: '',
          id: faker.datatype.uuid(),
          amount: '16720.0',
          billingCycleGid: null,
          creditedAmount: '0',
          debitedAmount: '0',
          documentNumber: 399776,
          gid: 'gid://platform/Invoice/399776',
          kind: 'COMPANY_BILL',
          paidAmount: '16720.0',
          status: 'PAID',
          subjectObject: {
            __typename: 'Client',
            id: faker.datatype.uuid(),
            fullName: 'Jacobs, Nikolaus and Leuschke'
          },
          url: 'http://localhost:3000/platform/staff/invoices/399776',
          webResource: {
            __typename: 'Link',
            text: 'Invoice #399776',
            url: 'http://localhost:3000/platform/staff/invoices/399776'
          }
        },
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 399515,
        gid: 'gid://platform/Invoice/399515',
        kind: 'COMPANY_BILL',
        paidAmount: '5320.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Client',
          id: faker.datatype.uuid(),
          fullName: 'Jacobs, Nikolaus and Leuschke'
        },
        url: 'http://localhost:3000/platform/staff/invoices/399515',
        webResource: {
          __typename: 'Link',
          text: 'Invoice #399515',
          url: 'http://localhost:3000/platform/staff/invoices/399515'
        }
      },
      {
        __typename: 'Invoice',
        dueDate: '',
        description: '',
        id: faker.datatype.uuid(),
        amount: '3800.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/420555',
        consolidatedDocument: {
          __typename: 'Invoice',
          dueDate: '',
          description: '',
          id: faker.datatype.uuid(),
          amount: '16720.0',
          billingCycleGid: null,
          creditedAmount: '0',
          debitedAmount: '0',
          documentNumber: 399776,
          gid: 'gid://platform/Invoice/399776',
          kind: 'COMPANY_BILL',
          paidAmount: '16720.0',
          status: 'PAID',
          subjectObject: {
            __typename: 'Client',
            id: faker.datatype.uuid(),
            fullName: 'Jacobs, Nikolaus and Leuschke'
          },
          url: 'http://localhost:3000/platform/staff/invoices/399776',
          webResource: {
            __typename: 'Link',
            text: 'Invoice #399776',
            url: 'http://localhost:3000/platform/staff/invoices/399776'
          }
        },
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 397301,
        gid: 'gid://platform/Invoice/397301',
        kind: 'COMPANY_BILL',
        paidAmount: '3800.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Client',
          id: faker.datatype.uuid(),
          fullName: 'Jacobs, Nikolaus and Leuschke'
        },
        url: 'http://localhost:3000/platform/staff/invoices/397301',
        webResource: {
          __typename: 'Link',
          text: 'Invoice #397301',
          url: 'http://localhost:3000/platform/staff/invoices/397301'
        }
      },
      {
        __typename: 'Invoice',
        dueDate: '',
        description: '',
        id: faker.datatype.uuid(),
        amount: '1520.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/418859',
        consolidatedDocument: {
          __typename: 'Invoice',
          dueDate: '',
          description: '',
          id: faker.datatype.uuid(),
          amount: '16720.0',
          billingCycleGid: null,
          creditedAmount: '0',
          debitedAmount: '0',
          documentNumber: 399776,
          gid: 'gid://platform/Invoice/399776',
          kind: 'COMPANY_BILL',
          paidAmount: '16720.0',
          status: 'PAID',
          subjectObject: {
            __typename: 'Client',
            id: faker.datatype.uuid(),
            fullName: 'Jacobs, Nikolaus and Leuschke'
          },
          url: 'http://localhost:3000/platform/staff/invoices/399776',
          webResource: {
            __typename: 'Link',
            text: 'Invoice #399776',
            url: 'http://localhost:3000/platform/staff/invoices/399776'
          }
        },
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 395501,
        gid: 'gid://platform/Invoice/395501',
        kind: 'COMPANY_BILL',
        paidAmount: '1520.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Client',
          id: faker.datatype.uuid(),
          fullName: 'Jacobs, Nikolaus and Leuschke'
        },
        url: 'http://localhost:3000/platform/staff/invoices/395501',
        webResource: {
          __typename: 'Link',
          text: 'Invoice #395501',
          url: 'http://localhost:3000/platform/staff/invoices/395501'
        }
      },
      {
        __typename: 'Invoice',
        dueDate: '',
        description: '',
        id: faker.datatype.uuid(),
        amount: '2280.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/418523',
        consolidatedDocument: {
          __typename: 'Invoice',
          dueDate: '',
          description: '',
          id: faker.datatype.uuid(),
          amount: '16720.0',
          billingCycleGid: null,
          creditedAmount: '0',
          debitedAmount: '0',
          documentNumber: 399776,
          gid: 'gid://platform/Invoice/399776',
          kind: 'COMPANY_BILL',
          paidAmount: '16720.0',
          status: 'PAID',
          subjectObject: {
            __typename: 'Client',
            id: faker.datatype.uuid(),
            fullName: 'Jacobs, Nikolaus and Leuschke'
          },
          url: 'http://localhost:3000/platform/staff/invoices/399776',
          webResource: {
            __typename: 'Link',
            text: 'Invoice #399776',
            url: 'http://localhost:3000/platform/staff/invoices/399776'
          }
        },
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 394072,
        gid: 'gid://platform/Invoice/394072',
        kind: 'COMPANY_BILL',
        paidAmount: '2280.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Client',
          id: faker.datatype.uuid(),
          fullName: 'Jacobs, Nikolaus and Leuschke'
        },
        url: 'http://localhost:3000/platform/staff/invoices/394072',
        webResource: {
          __typename: 'Link',
          text: 'Invoice #394072',
          url: 'http://localhost:3000/platform/staff/invoices/394072'
        }
      },
      {
        __typename: 'Invoice',
        dueDate: '',
        description: '',
        id: faker.datatype.uuid(),
        amount: '3800.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/416541',
        consolidatedDocument: {
          __typename: 'Invoice',
          dueDate: '',
          description: '',
          id: faker.datatype.uuid(),
          amount: '16720.0',
          billingCycleGid: null,
          creditedAmount: '0',
          debitedAmount: '0',
          documentNumber: 399776,
          gid: 'gid://platform/Invoice/399776',
          kind: 'COMPANY_BILL',
          paidAmount: '16720.0',
          status: 'PAID',
          subjectObject: {
            __typename: 'Client',
            id: faker.datatype.uuid(),
            fullName: 'Jacobs, Nikolaus and Leuschke'
          },
          url: 'http://localhost:3000/platform/staff/invoices/399776',
          webResource: {
            __typename: 'Link',
            text: 'Invoice #399776',
            url: 'http://localhost:3000/platform/staff/invoices/399776'
          }
        },
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 393541,
        gid: 'gid://platform/Invoice/393541',
        kind: 'COMPANY_BILL',
        paidAmount: '3800.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Client',
          id: faker.datatype.uuid(),
          fullName: 'Jacobs, Nikolaus and Leuschke'
        },
        url: 'http://localhost:3000/platform/staff/invoices/393541',
        webResource: {
          __typename: 'Link',
          text: 'Invoice #393541',
          url: 'http://localhost:3000/platform/staff/invoices/393541'
        }
      },
      {
        __typename: 'Invoice',
        dueDate: '',
        description: '',
        id: faker.datatype.uuid(),
        amount: '3800.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/414530',
        consolidatedDocument: {
          __typename: 'Invoice',
          dueDate: '',
          description: '',
          id: faker.datatype.uuid(),
          amount: '11400.0',
          billingCycleGid: null,
          creditedAmount: '0',
          debitedAmount: '0',
          documentNumber: 391730,
          gid: 'gid://platform/Invoice/391730',
          kind: 'COMPANY_BILL',
          paidAmount: '11400.0',
          status: 'PAID',
          subjectObject: {
            __typename: 'Client',
            id: faker.datatype.uuid(),
            fullName: 'Jacobs, Nikolaus and Leuschke'
          },
          url: 'http://localhost:3000/platform/staff/invoices/391730',
          webResource: {
            __typename: 'Link',
            text: 'Invoice #391730',
            url: 'http://localhost:3000/platform/staff/invoices/391730'
          }
        },
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 391696,
        gid: 'gid://platform/Invoice/391696',
        kind: 'COMPANY_BILL',
        paidAmount: '3800.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Client',
          id: faker.datatype.uuid(),
          fullName: 'Jacobs, Nikolaus and Leuschke'
        },
        url: 'http://localhost:3000/platform/staff/invoices/391696',
        webResource: {
          __typename: 'Link',
          text: 'Invoice #391696',
          url: 'http://localhost:3000/platform/staff/invoices/391696'
        }
      },
      {
        __typename: 'Invoice',
        dueDate: '',
        description: '',
        id: faker.datatype.uuid(),
        amount: '3800.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/412525',
        consolidatedDocument: {
          __typename: 'Invoice',
          dueDate: '',
          description: '',
          id: faker.datatype.uuid(),
          amount: '11400.0',
          billingCycleGid: null,
          creditedAmount: '0',
          debitedAmount: '0',
          documentNumber: 391730,
          gid: 'gid://platform/Invoice/391730',
          kind: 'COMPANY_BILL',
          paidAmount: '11400.0',
          status: 'PAID',
          subjectObject: {
            __typename: 'Client',
            id: faker.datatype.uuid(),
            fullName: 'Jacobs, Nikolaus and Leuschke'
          },
          url: 'http://localhost:3000/platform/staff/invoices/391730',
          webResource: {
            __typename: 'Link',
            text: 'Invoice #391730',
            url: 'http://localhost:3000/platform/staff/invoices/391730'
          }
        },
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 389796,
        gid: 'gid://platform/Invoice/389796',
        kind: 'COMPANY_BILL',
        paidAmount: '3800.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Client',
          id: faker.datatype.uuid(),
          fullName: 'Jacobs, Nikolaus and Leuschke'
        },
        url: 'http://localhost:3000/platform/staff/invoices/389796',
        webResource: {
          __typename: 'Link',
          text: 'Invoice #389796',
          url: 'http://localhost:3000/platform/staff/invoices/389796'
        }
      },
      {
        __typename: 'Invoice',
        dueDate: '',
        description: '',
        id: faker.datatype.uuid(),
        amount: '3800.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/408661',
        consolidatedDocument: {
          __typename: 'Invoice',
          dueDate: '',
          description: '',
          id: faker.datatype.uuid(),
          amount: '11400.0',
          billingCycleGid: null,
          creditedAmount: '0',
          debitedAmount: '0',
          documentNumber: 391730,
          gid: 'gid://platform/Invoice/391730',
          kind: 'COMPANY_BILL',
          paidAmount: '11400.0',
          status: 'PAID',
          subjectObject: {
            __typename: 'Client',
            id: faker.datatype.uuid(),
            fullName: 'Jacobs, Nikolaus and Leuschke'
          },
          url: 'http://localhost:3000/platform/staff/invoices/391730',
          webResource: {
            __typename: 'Link',
            text: 'Invoice #391730',
            url: 'http://localhost:3000/platform/staff/invoices/391730'
          }
        },
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 386016,
        gid: 'gid://platform/Invoice/386016',
        kind: 'COMPANY_BILL',
        paidAmount: '3800.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Client',
          id: faker.datatype.uuid(),
          fullName: 'Jacobs, Nikolaus and Leuschke'
        },
        url: 'http://localhost:3000/platform/staff/invoices/386016',
        webResource: {
          __typename: 'Link',
          text: 'Invoice #386016',
          url: 'http://localhost:3000/platform/staff/invoices/386016'
        }
      },
      {
        __typename: 'Invoice',
        dueDate: '',
        description: '',
        id: faker.datatype.uuid(),
        amount: '3800.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/406696',
        consolidatedDocument: {
          __typename: 'Invoice',
          dueDate: '',
          description: '',
          id: faker.datatype.uuid(),
          amount: '16720.0',
          billingCycleGid: null,
          creditedAmount: '0',
          debitedAmount: '0',
          documentNumber: 384231,
          gid: 'gid://platform/Invoice/384231',
          kind: 'COMPANY_BILL',
          paidAmount: '16720.0',
          status: 'PAID',
          subjectObject: {
            __typename: 'Client',
            id: faker.datatype.uuid(),
            fullName: 'Jacobs, Nikolaus and Leuschke'
          },
          url: 'http://localhost:3000/platform/staff/invoices/384231',
          webResource: {
            __typename: 'Link',
            text: 'Invoice #384231',
            url: 'http://localhost:3000/platform/staff/invoices/384231'
          }
        },
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 384199,
        gid: 'gid://platform/Invoice/384199',
        kind: 'COMPANY_BILL',
        paidAmount: '3800.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Client',
          id: faker.datatype.uuid(),
          fullName: 'Jacobs, Nikolaus and Leuschke'
        },
        url: 'http://localhost:3000/platform/staff/invoices/384199',
        webResource: {
          __typename: 'Link',
          text: 'Invoice #384199',
          url: 'http://localhost:3000/platform/staff/invoices/384199'
        }
      },
      {
        __typename: 'Invoice',
        dueDate: '',
        description: '',
        id: faker.datatype.uuid(),
        amount: '3800.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/404818',
        consolidatedDocument: {
          __typename: 'Invoice',
          dueDate: '',
          description: '',
          id: faker.datatype.uuid(),
          amount: '16720.0',
          billingCycleGid: null,
          creditedAmount: '0',
          debitedAmount: '0',
          documentNumber: 384231,
          gid: 'gid://platform/Invoice/384231',
          kind: 'COMPANY_BILL',
          paidAmount: '16720.0',
          status: 'PAID',
          subjectObject: {
            __typename: 'Client',
            id: faker.datatype.uuid(),
            fullName: 'Jacobs, Nikolaus and Leuschke'
          },
          url: 'http://localhost:3000/platform/staff/invoices/384231',
          webResource: {
            __typename: 'Link',
            text: 'Invoice #384231',
            url: 'http://localhost:3000/platform/staff/invoices/384231'
          }
        },
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 382327,
        gid: 'gid://platform/Invoice/382327',
        kind: 'COMPANY_BILL',
        paidAmount: '3800.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Client',
          id: faker.datatype.uuid(),
          fullName: 'Jacobs, Nikolaus and Leuschke'
        },
        url: 'http://localhost:3000/platform/staff/invoices/382327',
        webResource: {
          __typename: 'Link',
          text: 'Invoice #382327',
          url: 'http://localhost:3000/platform/staff/invoices/382327'
        }
      },
      {
        __typename: 'Invoice',
        dueDate: '',
        description: '',
        id: faker.datatype.uuid(),
        amount: '3800.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/402868',
        consolidatedDocument: {
          __typename: 'Invoice',
          dueDate: '',
          description: '',
          id: faker.datatype.uuid(),
          amount: '16720.0',
          billingCycleGid: null,
          creditedAmount: '0',
          debitedAmount: '0',
          documentNumber: 384231,
          gid: 'gid://platform/Invoice/384231',
          kind: 'COMPANY_BILL',
          paidAmount: '16720.0',
          status: 'PAID',
          subjectObject: {
            __typename: 'Client',
            id: faker.datatype.uuid(),
            fullName: 'Jacobs, Nikolaus and Leuschke'
          },
          url: 'http://localhost:3000/platform/staff/invoices/384231',
          webResource: {
            __typename: 'Link',
            text: 'Invoice #384231',
            url: 'http://localhost:3000/platform/staff/invoices/384231'
          }
        },
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 380559,
        gid: 'gid://platform/Invoice/380559',
        kind: 'COMPANY_BILL',
        paidAmount: '3800.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Client',
          id: faker.datatype.uuid(),
          fullName: 'Jacobs, Nikolaus and Leuschke'
        },
        url: 'http://localhost:3000/platform/staff/invoices/380559',
        webResource: {
          __typename: 'Link',
          text: 'Invoice #380559',
          url: 'http://localhost:3000/platform/staff/invoices/380559'
        }
      },
      {
        __typename: 'Invoice',
        dueDate: '',
        description: '',
        id: faker.datatype.uuid(),
        amount: '3800.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/400946',
        consolidatedDocument: {
          __typename: 'Invoice',
          dueDate: '',
          description: '',
          id: faker.datatype.uuid(),
          amount: '16720.0',
          billingCycleGid: null,
          creditedAmount: '0',
          debitedAmount: '0',
          documentNumber: 384231,
          gid: 'gid://platform/Invoice/384231',
          kind: 'COMPANY_BILL',
          paidAmount: '16720.0',
          status: 'PAID',
          subjectObject: {
            __typename: 'Client',
            id: faker.datatype.uuid(),
            fullName: 'Jacobs, Nikolaus and Leuschke'
          },
          url: 'http://localhost:3000/platform/staff/invoices/384231',
          webResource: {
            __typename: 'Link',
            text: 'Invoice #384231',
            url: 'http://localhost:3000/platform/staff/invoices/384231'
          }
        },
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 378748,
        gid: 'gid://platform/Invoice/378748',
        kind: 'COMPANY_BILL',
        paidAmount: '3800.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Client',
          id: faker.datatype.uuid(),
          fullName: 'Jacobs, Nikolaus and Leuschke'
        },
        url: 'http://localhost:3000/platform/staff/invoices/378748',
        webResource: {
          __typename: 'Link',
          text: 'Invoice #378748',
          url: 'http://localhost:3000/platform/staff/invoices/378748'
        }
      },
      {
        __typename: 'Invoice',
        dueDate: '',
        description: '',
        id: faker.datatype.uuid(),
        amount: '1520.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/399140',
        consolidatedDocument: {
          __typename: 'Invoice',
          dueDate: '',
          description: '',
          id: faker.datatype.uuid(),
          amount: '16720.0',
          billingCycleGid: null,
          creditedAmount: '0',
          debitedAmount: '0',
          documentNumber: 384231,
          gid: 'gid://platform/Invoice/384231',
          kind: 'COMPANY_BILL',
          paidAmount: '16720.0',
          status: 'PAID',
          subjectObject: {
            __typename: 'Client',
            id: faker.datatype.uuid(),
            fullName: 'Jacobs, Nikolaus and Leuschke'
          },
          url: 'http://localhost:3000/platform/staff/invoices/384231',
          webResource: {
            __typename: 'Link',
            text: 'Invoice #384231',
            url: 'http://localhost:3000/platform/staff/invoices/384231'
          }
        },
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 377001,
        gid: 'gid://platform/Invoice/377001',
        kind: 'COMPANY_BILL',
        paidAmount: '1520.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Client',
          id: faker.datatype.uuid(),
          fullName: 'Jacobs, Nikolaus and Leuschke'
        },
        url: 'http://localhost:3000/platform/staff/invoices/377001',
        webResource: {
          __typename: 'Link',
          text: 'Invoice #377001',
          url: 'http://localhost:3000/platform/staff/invoices/377001'
        }
      },
      {
        __typename: 'Invoice',
        dueDate: '',
        description: '',
        id: faker.datatype.uuid(),
        amount: '1520.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/397369',
        consolidatedDocument: {
          __typename: 'Invoice',
          dueDate: '',
          description: '',
          id: faker.datatype.uuid(),
          amount: '12920.0',
          billingCycleGid: null,
          creditedAmount: '0',
          debitedAmount: '0',
          documentNumber: 375869,
          gid: 'gid://platform/Invoice/375869',
          kind: 'COMPANY_BILL',
          paidAmount: '12920.0',
          status: 'PAID',
          subjectObject: {
            __typename: 'Client',
            id: faker.datatype.uuid(),
            fullName: 'Jacobs, Nikolaus and Leuschke'
          },
          url: 'http://localhost:3000/platform/staff/invoices/375869',
          webResource: {
            __typename: 'Link',
            text: 'Invoice #375869',
            url: 'http://localhost:3000/platform/staff/invoices/375869'
          }
        },
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 375506,
        gid: 'gid://platform/Invoice/375506',
        kind: 'COMPANY_BILL',
        paidAmount: '1520.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Client',
          id: faker.datatype.uuid(),
          fullName: 'Jacobs, Nikolaus and Leuschke'
        },
        url: 'http://localhost:3000/platform/staff/invoices/375506',
        webResource: {
          __typename: 'Link',
          text: 'Invoice #375506',
          url: 'http://localhost:3000/platform/staff/invoices/375506'
        }
      },
      {
        __typename: 'Invoice',
        dueDate: '',
        description: '',
        id: faker.datatype.uuid(),
        amount: '3800.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/395078',
        consolidatedDocument: {
          __typename: 'Invoice',
          dueDate: '',
          description: '',
          id: faker.datatype.uuid(),
          amount: '12920.0',
          billingCycleGid: null,
          creditedAmount: '0',
          debitedAmount: '0',
          documentNumber: 375869,
          gid: 'gid://platform/Invoice/375869',
          kind: 'COMPANY_BILL',
          paidAmount: '12920.0',
          status: 'PAID',
          subjectObject: {
            __typename: 'Client',
            id: faker.datatype.uuid(),
            fullName: 'Jacobs, Nikolaus and Leuschke'
          },
          url: 'http://localhost:3000/platform/staff/invoices/375869',
          webResource: {
            __typename: 'Link',
            text: 'Invoice #375869',
            url: 'http://localhost:3000/platform/staff/invoices/375869'
          }
        },
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 373943,
        gid: 'gid://platform/Invoice/373943',
        kind: 'COMPANY_BILL',
        paidAmount: '3800.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Client',
          id: faker.datatype.uuid(),
          fullName: 'Jacobs, Nikolaus and Leuschke'
        },
        url: 'http://localhost:3000/platform/staff/invoices/373943',
        webResource: {
          __typename: 'Link',
          text: 'Invoice #373943',
          url: 'http://localhost:3000/platform/staff/invoices/373943'
        }
      },
      {
        __typename: 'Invoice',
        dueDate: '',
        description: '',
        id: faker.datatype.uuid(),
        amount: '3800.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/393446',
        consolidatedDocument: {
          __typename: 'Invoice',
          dueDate: '',
          description: '',
          id: faker.datatype.uuid(),
          amount: '12920.0',
          billingCycleGid: null,
          creditedAmount: '0',
          debitedAmount: '0',
          documentNumber: 375869,
          gid: 'gid://platform/Invoice/375869',
          kind: 'COMPANY_BILL',
          paidAmount: '12920.0',
          status: 'PAID',
          subjectObject: {
            __typename: 'Client',
            id: faker.datatype.uuid(),
            fullName: 'Jacobs, Nikolaus and Leuschke'
          },
          url: 'http://localhost:3000/platform/staff/invoices/375869',
          webResource: {
            __typename: 'Link',
            text: 'Invoice #375869',
            url: 'http://localhost:3000/platform/staff/invoices/375869'
          }
        },
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 371764,
        gid: 'gid://platform/Invoice/371764',
        kind: 'COMPANY_BILL',
        paidAmount: '3800.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Client',
          id: faker.datatype.uuid(),
          fullName: 'Jacobs, Nikolaus and Leuschke'
        },
        url: 'http://localhost:3000/platform/staff/invoices/371764',
        webResource: {
          __typename: 'Link',
          text: 'Invoice #371764',
          url: 'http://localhost:3000/platform/staff/invoices/371764'
        }
      },
      {
        __typename: 'Invoice',
        dueDate: '',
        description: '',
        id: faker.datatype.uuid(),
        amount: '3800.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/391484',
        consolidatedDocument: {
          __typename: 'Invoice',
          dueDate: '',
          description: '',
          id: faker.datatype.uuid(),
          amount: '12920.0',
          billingCycleGid: null,
          creditedAmount: '0',
          debitedAmount: '0',
          documentNumber: 375869,
          gid: 'gid://platform/Invoice/375869',
          kind: 'COMPANY_BILL',
          paidAmount: '12920.0',
          status: 'PAID',
          subjectObject: {
            __typename: 'Client',
            id: faker.datatype.uuid(),
            fullName: 'Jacobs, Nikolaus and Leuschke'
          },
          url: 'http://localhost:3000/platform/staff/invoices/375869',
          webResource: {
            __typename: 'Link',
            text: 'Invoice #375869',
            url: 'http://localhost:3000/platform/staff/invoices/375869'
          }
        },
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 370224,
        gid: 'gid://platform/Invoice/370224',
        kind: 'COMPANY_BILL',
        paidAmount: '3800.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Client',
          id: faker.datatype.uuid(),
          fullName: 'Jacobs, Nikolaus and Leuschke'
        },
        url: 'http://localhost:3000/platform/staff/invoices/370224',
        webResource: {
          __typename: 'Link',
          text: 'Invoice #370224',
          url: 'http://localhost:3000/platform/staff/invoices/370224'
        }
      },
      {
        __typename: 'Invoice',
        dueDate: '',
        description: '',
        id: faker.datatype.uuid(),
        amount: '3800.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/389167',
        consolidatedDocument: {
          __typename: 'Invoice',
          dueDate: '',
          description: '',
          id: faker.datatype.uuid(),
          amount: '21494.46',
          billingCycleGid: null,
          creditedAmount: '0',
          debitedAmount: '0',
          documentNumber: 368680,
          gid: 'gid://platform/Invoice/368680',
          kind: 'COMPANY_BILL',
          paidAmount: '21494.46',
          status: 'PAID',
          subjectObject: {
            __typename: 'Client',
            id: faker.datatype.uuid(),
            fullName: 'Jacobs, Nikolaus and Leuschke'
          },
          url: 'http://localhost:3000/platform/staff/invoices/368680',
          webResource: {
            __typename: 'Link',
            text: 'Invoice #368680',
            url: 'http://localhost:3000/platform/staff/invoices/368680'
          }
        },
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 368419,
        gid: 'gid://platform/Invoice/368419',
        kind: 'COMPANY_BILL',
        paidAmount: '3800.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Client',
          id: faker.datatype.uuid(),
          fullName: 'Jacobs, Nikolaus and Leuschke'
        },
        url: 'http://localhost:3000/platform/staff/invoices/368419',
        webResource: {
          __typename: 'Link',
          text: 'Invoice #368419',
          url: 'http://localhost:3000/platform/staff/invoices/368419'
        }
      },
      {
        __typename: 'Invoice',
        dueDate: '',
        description: '',
        id: faker.datatype.uuid(),
        amount: '3800.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/387309',
        consolidatedDocument: {
          __typename: 'Invoice',
          dueDate: '',
          description: '',
          id: faker.datatype.uuid(),
          amount: '21494.46',
          billingCycleGid: null,
          creditedAmount: '0',
          debitedAmount: '0',
          documentNumber: 368680,
          gid: 'gid://platform/Invoice/368680',
          kind: 'COMPANY_BILL',
          paidAmount: '21494.46',
          status: 'PAID',
          subjectObject: {
            __typename: 'Client',
            id: faker.datatype.uuid(),
            fullName: 'Jacobs, Nikolaus and Leuschke'
          },
          url: 'http://localhost:3000/platform/staff/invoices/368680',
          webResource: {
            __typename: 'Link',
            text: 'Invoice #368680',
            url: 'http://localhost:3000/platform/staff/invoices/368680'
          }
        },
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 366283,
        gid: 'gid://platform/Invoice/366283',
        kind: 'COMPANY_BILL',
        paidAmount: '3800.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Client',
          id: faker.datatype.uuid(),
          fullName: 'Jacobs, Nikolaus and Leuschke'
        },
        url: 'http://localhost:3000/platform/staff/invoices/366283',
        webResource: {
          __typename: 'Link',
          text: 'Invoice #366283',
          url: 'http://localhost:3000/platform/staff/invoices/366283'
        }
      },
      {
        __typename: 'Invoice',
        dueDate: '',
        description: '',
        id: faker.datatype.uuid(),
        amount: '3800.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/385309',
        consolidatedDocument: {
          __typename: 'Invoice',
          dueDate: '',
          description: '',
          id: faker.datatype.uuid(),
          amount: '21494.46',
          billingCycleGid: null,
          creditedAmount: '0',
          debitedAmount: '0',
          documentNumber: 368680,
          gid: 'gid://platform/Invoice/368680',
          kind: 'COMPANY_BILL',
          paidAmount: '21494.46',
          status: 'PAID',
          subjectObject: {
            __typename: 'Client',
            id: faker.datatype.uuid(),
            fullName: 'Jacobs, Nikolaus and Leuschke'
          },
          url: 'http://localhost:3000/platform/staff/invoices/368680',
          webResource: {
            __typename: 'Link',
            text: 'Invoice #368680',
            url: 'http://localhost:3000/platform/staff/invoices/368680'
          }
        },
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 364496,
        gid: 'gid://platform/Invoice/364496',
        kind: 'COMPANY_BILL',
        paidAmount: '3800.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Client',
          id: faker.datatype.uuid(),
          fullName: 'Jacobs, Nikolaus and Leuschke'
        },
        url: 'http://localhost:3000/platform/staff/invoices/364496',
        webResource: {
          __typename: 'Link',
          text: 'Invoice #364496',
          url: 'http://localhost:3000/platform/staff/invoices/364496'
        }
      },
      {
        __typename: 'Invoice',
        dueDate: '',
        description: '',
        id: faker.datatype.uuid(),
        amount: '3800.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/383390',
        consolidatedDocument: {
          __typename: 'Invoice',
          dueDate: '',
          description: '',
          id: faker.datatype.uuid(),
          amount: '21494.46',
          billingCycleGid: null,
          creditedAmount: '0',
          debitedAmount: '0',
          documentNumber: 368680,
          gid: 'gid://platform/Invoice/368680',
          kind: 'COMPANY_BILL',
          paidAmount: '21494.46',
          status: 'PAID',
          subjectObject: {
            __typename: 'Client',
            id: faker.datatype.uuid(),
            fullName: 'Jacobs, Nikolaus and Leuschke'
          },
          url: 'http://localhost:3000/platform/staff/invoices/368680',
          webResource: {
            __typename: 'Link',
            text: 'Invoice #368680',
            url: 'http://localhost:3000/platform/staff/invoices/368680'
          }
        },
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 362635,
        gid: 'gid://platform/Invoice/362635',
        kind: 'COMPANY_BILL',
        paidAmount: '3800.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Client',
          id: faker.datatype.uuid(),
          fullName: 'Jacobs, Nikolaus and Leuschke'
        },
        url: 'http://localhost:3000/platform/staff/invoices/362635',
        webResource: {
          __typename: 'Link',
          text: 'Invoice #362635',
          url: 'http://localhost:3000/platform/staff/invoices/362635'
        }
      },
      {
        __typename: 'Invoice',
        dueDate: '',
        description: '',
        id: faker.datatype.uuid(),
        amount: '3800.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/381417',
        consolidatedDocument: {
          __typename: 'Invoice',
          dueDate: '',
          description: '',
          id: faker.datatype.uuid(),
          amount: '21494.46',
          billingCycleGid: null,
          creditedAmount: '0',
          debitedAmount: '0',
          documentNumber: 368680,
          gid: 'gid://platform/Invoice/368680',
          kind: 'COMPANY_BILL',
          paidAmount: '21494.46',
          status: 'PAID',
          subjectObject: {
            __typename: 'Client',
            id: faker.datatype.uuid(),
            fullName: 'Jacobs, Nikolaus and Leuschke'
          },
          url: 'http://localhost:3000/platform/staff/invoices/368680',
          webResource: {
            __typename: 'Link',
            text: 'Invoice #368680',
            url: 'http://localhost:3000/platform/staff/invoices/368680'
          }
        },
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 360745,
        gid: 'gid://platform/Invoice/360745',
        kind: 'COMPANY_BILL',
        paidAmount: '3800.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Client',
          id: faker.datatype.uuid(),
          fullName: 'Jacobs, Nikolaus and Leuschke'
        },
        url: 'http://localhost:3000/platform/staff/invoices/360745',
        webResource: {
          __typename: 'Link',
          text: 'Invoice #360745',
          url: 'http://localhost:3000/platform/staff/invoices/360745'
        }
      },
      {
        __typename: 'Invoice',
        dueDate: '',
        description: '',
        id: faker.datatype.uuid(),
        amount: '3800.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/379533',
        consolidatedDocument: {
          __typename: 'Invoice',
          dueDate: '',
          description: '',
          id: faker.datatype.uuid(),
          amount: '15200.0',
          billingCycleGid: null,
          creditedAmount: '0',
          debitedAmount: '0',
          documentNumber: 368676,
          gid: 'gid://platform/Invoice/368676',
          kind: 'COMPANY_BILL',
          paidAmount: '15200.0',
          status: 'PAID',
          subjectObject: {
            __typename: 'Client',
            id: faker.datatype.uuid(),
            fullName: 'Jacobs, Nikolaus and Leuschke'
          },
          url: 'http://localhost:3000/platform/staff/invoices/368676',
          webResource: {
            __typename: 'Link',
            text: 'Invoice #368676',
            url: 'http://localhost:3000/platform/staff/invoices/368676'
          }
        },
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 358912,
        gid: 'gid://platform/Invoice/358912',
        kind: 'COMPANY_BILL',
        paidAmount: '3800.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Client',
          id: faker.datatype.uuid(),
          fullName: 'Jacobs, Nikolaus and Leuschke'
        },
        url: 'http://localhost:3000/platform/staff/invoices/358912',
        webResource: {
          __typename: 'Link',
          text: 'Invoice #358912',
          url: 'http://localhost:3000/platform/staff/invoices/358912'
        }
      },
      {
        __typename: 'Invoice',
        dueDate: '',
        description: '',
        id: faker.datatype.uuid(),
        amount: '3800.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/377618',
        consolidatedDocument: {
          __typename: 'Invoice',
          dueDate: '',
          description: '',
          id: faker.datatype.uuid(),
          amount: '15200.0',
          billingCycleGid: null,
          creditedAmount: '0',
          debitedAmount: '0',
          documentNumber: 368676,
          gid: 'gid://platform/Invoice/368676',
          kind: 'COMPANY_BILL',
          paidAmount: '15200.0',
          status: 'PAID',
          subjectObject: {
            __typename: 'Client',
            id: faker.datatype.uuid(),
            fullName: 'Jacobs, Nikolaus and Leuschke'
          },
          url: 'http://localhost:3000/platform/staff/invoices/368676',
          webResource: {
            __typename: 'Link',
            text: 'Invoice #368676',
            url: 'http://localhost:3000/platform/staff/invoices/368676'
          }
        },
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 357145,
        gid: 'gid://platform/Invoice/357145',
        kind: 'COMPANY_BILL',
        paidAmount: '3800.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Client',
          id: faker.datatype.uuid(),
          fullName: 'Jacobs, Nikolaus and Leuschke'
        },
        url: 'http://localhost:3000/platform/staff/invoices/357145',
        webResource: {
          __typename: 'Link',
          text: 'Invoice #357145',
          url: 'http://localhost:3000/platform/staff/invoices/357145'
        }
      },
      {
        __typename: 'Invoice',
        dueDate: '',
        description: '',
        id: faker.datatype.uuid(),
        amount: '3800.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/376101',
        consolidatedDocument: {
          __typename: 'Invoice',
          dueDate: '',
          description: '',
          id: faker.datatype.uuid(),
          amount: '15200.0',
          billingCycleGid: null,
          creditedAmount: '0',
          debitedAmount: '0',
          documentNumber: 368676,
          gid: 'gid://platform/Invoice/368676',
          kind: 'COMPANY_BILL',
          paidAmount: '15200.0',
          status: 'PAID',
          subjectObject: {
            __typename: 'Client',
            id: faker.datatype.uuid(),
            fullName: 'Jacobs, Nikolaus and Leuschke'
          },
          url: 'http://localhost:3000/platform/staff/invoices/368676',
          webResource: {
            __typename: 'Link',
            text: 'Invoice #368676',
            url: 'http://localhost:3000/platform/staff/invoices/368676'
          }
        },
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 355381,
        gid: 'gid://platform/Invoice/355381',
        kind: 'COMPANY_BILL',
        paidAmount: '3800.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Client',
          id: faker.datatype.uuid(),
          fullName: 'Jacobs, Nikolaus and Leuschke'
        },
        url: 'http://localhost:3000/platform/staff/invoices/355381',
        webResource: {
          __typename: 'Link',
          text: 'Invoice #355381',
          url: 'http://localhost:3000/platform/staff/invoices/355381'
        }
      },
      {
        __typename: 'Invoice',
        dueDate: '',
        description: '',
        id: faker.datatype.uuid(),
        amount: '3800.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/374212',
        consolidatedDocument: {
          __typename: 'Invoice',
          dueDate: '',
          description: '',
          id: faker.datatype.uuid(),
          amount: '15200.0',
          billingCycleGid: null,
          creditedAmount: '0',
          debitedAmount: '0',
          documentNumber: 368676,
          gid: 'gid://platform/Invoice/368676',
          kind: 'COMPANY_BILL',
          paidAmount: '15200.0',
          status: 'PAID',
          subjectObject: {
            __typename: 'Client',
            id: faker.datatype.uuid(),
            fullName: 'Jacobs, Nikolaus and Leuschke'
          },
          url: 'http://localhost:3000/platform/staff/invoices/368676',
          webResource: {
            __typename: 'Link',
            text: 'Invoice #368676',
            url: 'http://localhost:3000/platform/staff/invoices/368676'
          }
        },
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 353935,
        gid: 'gid://platform/Invoice/353935',
        kind: 'COMPANY_BILL',
        paidAmount: '3800.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Client',
          id: faker.datatype.uuid(),
          fullName: 'Jacobs, Nikolaus and Leuschke'
        },
        url: 'http://localhost:3000/platform/staff/invoices/353935',
        webResource: {
          __typename: 'Link',
          text: 'Invoice #353935',
          url: 'http://localhost:3000/platform/staff/invoices/353935'
        }
      },
      {
        __typename: 'Invoice',
        dueDate: '',
        description: '',
        id: faker.datatype.uuid(),
        amount: '3800.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/372361',
        consolidatedDocument: {
          __typename: 'Invoice',
          dueDate: '',
          description: '',
          id: faker.datatype.uuid(),
          amount: '15200.0',
          billingCycleGid: null,
          creditedAmount: '0',
          debitedAmount: '0',
          documentNumber: 352223,
          gid: 'gid://platform/Invoice/352223',
          kind: 'COMPANY_BILL',
          paidAmount: '15200.0',
          status: 'PAID',
          subjectObject: {
            __typename: 'Client',
            id: faker.datatype.uuid(),
            fullName: 'Jacobs, Nikolaus and Leuschke'
          },
          url: 'http://localhost:3000/platform/staff/invoices/352223',
          webResource: {
            __typename: 'Link',
            text: 'Invoice #352223',
            url: 'http://localhost:3000/platform/staff/invoices/352223'
          }
        },
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 352166,
        gid: 'gid://platform/Invoice/352166',
        kind: 'COMPANY_BILL',
        paidAmount: '3800.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Client',
          id: faker.datatype.uuid(),
          fullName: 'Jacobs, Nikolaus and Leuschke'
        },
        url: 'http://localhost:3000/platform/staff/invoices/352166',
        webResource: {
          __typename: 'Link',
          text: 'Invoice #352166',
          url: 'http://localhost:3000/platform/staff/invoices/352166'
        }
      },
      {
        __typename: 'Invoice',
        dueDate: '',
        description: '',
        id: faker.datatype.uuid(),
        amount: '3800.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/370473',
        consolidatedDocument: {
          __typename: 'Invoice',
          dueDate: '',
          description: '',
          id: faker.datatype.uuid(),
          amount: '15200.0',
          billingCycleGid: null,
          creditedAmount: '0',
          debitedAmount: '0',
          documentNumber: 352223,
          gid: 'gid://platform/Invoice/352223',
          kind: 'COMPANY_BILL',
          paidAmount: '15200.0',
          status: 'PAID',
          subjectObject: {
            __typename: 'Client',
            id: faker.datatype.uuid(),
            fullName: 'Jacobs, Nikolaus and Leuschke'
          },
          url: 'http://localhost:3000/platform/staff/invoices/352223',
          webResource: {
            __typename: 'Link',
            text: 'Invoice #352223',
            url: 'http://localhost:3000/platform/staff/invoices/352223'
          }
        },
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 350385,
        gid: 'gid://platform/Invoice/350385',
        kind: 'COMPANY_BILL',
        paidAmount: '3800.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Client',
          id: faker.datatype.uuid(),
          fullName: 'Jacobs, Nikolaus and Leuschke'
        },
        url: 'http://localhost:3000/platform/staff/invoices/350385',
        webResource: {
          __typename: 'Link',
          text: 'Invoice #350385',
          url: 'http://localhost:3000/platform/staff/invoices/350385'
        }
      },
      {
        __typename: 'Invoice',
        dueDate: '',
        description: '',
        id: faker.datatype.uuid(),
        amount: '3800.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/368627',
        consolidatedDocument: {
          __typename: 'Invoice',
          dueDate: '',
          description: '',
          id: faker.datatype.uuid(),
          amount: '15200.0',
          billingCycleGid: null,
          creditedAmount: '0',
          debitedAmount: '0',
          documentNumber: 352223,
          gid: 'gid://platform/Invoice/352223',
          kind: 'COMPANY_BILL',
          paidAmount: '15200.0',
          status: 'PAID',
          subjectObject: {
            __typename: 'Client',
            id: faker.datatype.uuid(),
            fullName: 'Jacobs, Nikolaus and Leuschke'
          },
          url: 'http://localhost:3000/platform/staff/invoices/352223',
          webResource: {
            __typename: 'Link',
            text: 'Invoice #352223',
            url: 'http://localhost:3000/platform/staff/invoices/352223'
          }
        },
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 348613,
        gid: 'gid://platform/Invoice/348613',
        kind: 'COMPANY_BILL',
        paidAmount: '3800.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Client',
          id: faker.datatype.uuid(),
          fullName: 'Jacobs, Nikolaus and Leuschke'
        },
        url: 'http://localhost:3000/platform/staff/invoices/348613',
        webResource: {
          __typename: 'Link',
          text: 'Invoice #348613',
          url: 'http://localhost:3000/platform/staff/invoices/348613'
        }
      },
      {
        __typename: 'Invoice',
        dueDate: '',
        description: '',
        id: faker.datatype.uuid(),
        amount: '3800.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/366747',
        consolidatedDocument: {
          __typename: 'Invoice',
          dueDate: '',
          description: '',
          id: faker.datatype.uuid(),
          amount: '15200.0',
          billingCycleGid: null,
          creditedAmount: '0',
          debitedAmount: '0',
          documentNumber: 352223,
          gid: 'gid://platform/Invoice/352223',
          kind: 'COMPANY_BILL',
          paidAmount: '15200.0',
          status: 'PAID',
          subjectObject: {
            __typename: 'Client',
            id: faker.datatype.uuid(),
            fullName: 'Jacobs, Nikolaus and Leuschke'
          },
          url: 'http://localhost:3000/platform/staff/invoices/352223',
          webResource: {
            __typename: 'Link',
            text: 'Invoice #352223',
            url: 'http://localhost:3000/platform/staff/invoices/352223'
          }
        },
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 346879,
        gid: 'gid://platform/Invoice/346879',
        kind: 'COMPANY_BILL',
        paidAmount: '3800.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Client',
          id: faker.datatype.uuid(),
          fullName: 'Jacobs, Nikolaus and Leuschke'
        },
        url: 'http://localhost:3000/platform/staff/invoices/346879',
        webResource: {
          __typename: 'Link',
          text: 'Invoice #346879',
          url: 'http://localhost:3000/platform/staff/invoices/346879'
        }
      },
      {
        __typename: 'Invoice',
        dueDate: '',
        description: '',
        id: faker.datatype.uuid(),
        amount: '1900.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/364955',
        consolidatedDocument: {
          __typename: 'Invoice',
          dueDate: '',
          description: '',
          id: faker.datatype.uuid(),
          amount: '11400.0',
          billingCycleGid: null,
          creditedAmount: '0',
          debitedAmount: '0',
          documentNumber: 350925,
          gid: 'gid://platform/Invoice/350925',
          kind: 'COMPANY_BILL',
          paidAmount: '11400.0',
          status: 'PAID',
          subjectObject: {
            __typename: 'Client',
            id: faker.datatype.uuid(),
            fullName: 'Jacobs, Nikolaus and Leuschke'
          },
          url: 'http://localhost:3000/platform/staff/invoices/350925',
          webResource: {
            __typename: 'Link',
            text: 'Invoice #350925',
            url: 'http://localhost:3000/platform/staff/invoices/350925'
          }
        },
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 345172,
        gid: 'gid://platform/Invoice/345172',
        kind: 'COMPANY_BILL',
        paidAmount: '1900.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Client',
          id: faker.datatype.uuid(),
          fullName: 'Jacobs, Nikolaus and Leuschke'
        },
        url: 'http://localhost:3000/platform/staff/invoices/345172',
        webResource: {
          __typename: 'Link',
          text: 'Invoice #345172',
          url: 'http://localhost:3000/platform/staff/invoices/345172'
        }
      },
      {
        __typename: 'Invoice',
        dueDate: '',
        description: '',
        id: faker.datatype.uuid(),
        amount: '1900.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/363121',
        consolidatedDocument: {
          __typename: 'Invoice',
          dueDate: '',
          description: '',
          id: faker.datatype.uuid(),
          amount: '11400.0',
          billingCycleGid: null,
          creditedAmount: '0',
          debitedAmount: '0',
          documentNumber: 350925,
          gid: 'gid://platform/Invoice/350925',
          kind: 'COMPANY_BILL',
          paidAmount: '11400.0',
          status: 'PAID',
          subjectObject: {
            __typename: 'Client',
            id: faker.datatype.uuid(),
            fullName: 'Jacobs, Nikolaus and Leuschke'
          },
          url: 'http://localhost:3000/platform/staff/invoices/350925',
          webResource: {
            __typename: 'Link',
            text: 'Invoice #350925',
            url: 'http://localhost:3000/platform/staff/invoices/350925'
          }
        },
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 343484,
        gid: 'gid://platform/Invoice/343484',
        kind: 'COMPANY_BILL',
        paidAmount: '1900.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Client',
          id: faker.datatype.uuid(),
          fullName: 'Jacobs, Nikolaus and Leuschke'
        },
        url: 'http://localhost:3000/platform/staff/invoices/343484',
        webResource: {
          __typename: 'Link',
          text: 'Invoice #343484',
          url: 'http://localhost:3000/platform/staff/invoices/343484'
        }
      },
      {
        __typename: 'Invoice',
        dueDate: '',
        description: '',
        id: faker.datatype.uuid(),
        amount: '1900.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/361354',
        consolidatedDocument: {
          __typename: 'Invoice',
          dueDate: '',
          description: '',
          id: faker.datatype.uuid(),
          amount: '11400.0',
          billingCycleGid: null,
          creditedAmount: '0',
          debitedAmount: '0',
          documentNumber: 350925,
          gid: 'gid://platform/Invoice/350925',
          kind: 'COMPANY_BILL',
          paidAmount: '11400.0',
          status: 'PAID',
          subjectObject: {
            __typename: 'Client',
            id: faker.datatype.uuid(),
            fullName: 'Jacobs, Nikolaus and Leuschke'
          },
          url: 'http://localhost:3000/platform/staff/invoices/350925',
          webResource: {
            __typename: 'Link',
            text: 'Invoice #350925',
            url: 'http://localhost:3000/platform/staff/invoices/350925'
          }
        },
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 341857,
        gid: 'gid://platform/Invoice/341857',
        kind: 'COMPANY_BILL',
        paidAmount: '1900.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Client',
          id: faker.datatype.uuid(),
          fullName: 'Jacobs, Nikolaus and Leuschke'
        },
        url: 'http://localhost:3000/platform/staff/invoices/341857',
        webResource: {
          __typename: 'Link',
          text: 'Invoice #341857',
          url: 'http://localhost:3000/platform/staff/invoices/341857'
        }
      },
      {
        __typename: 'Invoice',
        dueDate: '',
        description: '',
        id: faker.datatype.uuid(),
        amount: '1900.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/359539',
        consolidatedDocument: {
          __typename: 'Invoice',
          dueDate: '',
          description: '',
          id: faker.datatype.uuid(),
          amount: '11400.0',
          billingCycleGid: null,
          creditedAmount: '0',
          debitedAmount: '0',
          documentNumber: 350925,
          gid: 'gid://platform/Invoice/350925',
          kind: 'COMPANY_BILL',
          paidAmount: '11400.0',
          status: 'PAID',
          subjectObject: {
            __typename: 'Client',
            id: faker.datatype.uuid(),
            fullName: 'Jacobs, Nikolaus and Leuschke'
          },
          url: 'http://localhost:3000/platform/staff/invoices/350925',
          webResource: {
            __typename: 'Link',
            text: 'Invoice #350925',
            url: 'http://localhost:3000/platform/staff/invoices/350925'
          }
        },
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 340240,
        gid: 'gid://platform/Invoice/340240',
        kind: 'COMPANY_BILL',
        paidAmount: '1900.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Client',
          id: faker.datatype.uuid(),
          fullName: 'Jacobs, Nikolaus and Leuschke'
        },
        url: 'http://localhost:3000/platform/staff/invoices/340240',
        webResource: {
          __typename: 'Link',
          text: 'Invoice #340240',
          url: 'http://localhost:3000/platform/staff/invoices/340240'
        }
      },
      {
        __typename: 'Invoice',
        dueDate: '',
        description: '',
        id: faker.datatype.uuid(),
        amount: '760.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/359946',
        consolidatedDocument: {
          __typename: 'Invoice',
          dueDate: '',
          description: '',
          id: faker.datatype.uuid(),
          amount: '11400.0',
          billingCycleGid: null,
          creditedAmount: '0',
          debitedAmount: '0',
          documentNumber: 350925,
          gid: 'gid://platform/Invoice/350925',
          kind: 'COMPANY_BILL',
          paidAmount: '11400.0',
          status: 'PAID',
          subjectObject: {
            __typename: 'Client',
            id: faker.datatype.uuid(),
            fullName: 'Jacobs, Nikolaus and Leuschke'
          },
          url: 'http://localhost:3000/platform/staff/invoices/350925',
          webResource: {
            __typename: 'Link',
            text: 'Invoice #350925',
            url: 'http://localhost:3000/platform/staff/invoices/350925'
          }
        },
        creditedAmount: '0',
        debitedAmount: '760.0',
        documentNumber: 339025,
        gid: 'gid://platform/Invoice/339025',
        kind: 'COMPANY_BILL',
        paidAmount: '760.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Client',
          id: faker.datatype.uuid(),
          fullName: 'Jacobs, Nikolaus and Leuschke'
        },
        url: 'http://localhost:3000/platform/staff/invoices/339025',
        webResource: {
          __typename: 'Link',
          text: 'Invoice #339025',
          url: 'http://localhost:3000/platform/staff/invoices/339025'
        }
      },
      {
        __typename: 'Invoice',
        dueDate: '',
        description: '',
        id: faker.datatype.uuid(),
        amount: '3800.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/357825',
        consolidatedDocument: {
          __typename: 'Invoice',
          dueDate: '',
          description: '',
          id: faker.datatype.uuid(),
          amount: '11400.0',
          billingCycleGid: null,
          creditedAmount: '0',
          debitedAmount: '0',
          documentNumber: 350925,
          gid: 'gid://platform/Invoice/350925',
          kind: 'COMPANY_BILL',
          paidAmount: '11400.0',
          status: 'PAID',
          subjectObject: {
            __typename: 'Client',
            id: faker.datatype.uuid(),
            fullName: 'Jacobs, Nikolaus and Leuschke'
          },
          url: 'http://localhost:3000/platform/staff/invoices/350925',
          webResource: {
            __typename: 'Link',
            text: 'Invoice #350925',
            url: 'http://localhost:3000/platform/staff/invoices/350925'
          }
        },
        creditedAmount: '1520.0',
        debitedAmount: '0',
        documentNumber: 338546,
        gid: 'gid://platform/Invoice/338546',
        kind: 'COMPANY_BILL',
        paidAmount: '2280.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Client',
          id: faker.datatype.uuid(),
          fullName: 'Jacobs, Nikolaus and Leuschke'
        },
        url: 'http://localhost:3000/platform/staff/invoices/338546',
        webResource: {
          __typename: 'Link',
          text: 'Invoice #338546',
          url: 'http://localhost:3000/platform/staff/invoices/338546'
        }
      },
      {
        __typename: 'Invoice',
        dueDate: '',
        description: '',
        id: faker.datatype.uuid(),
        amount: '3800.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/356031',
        consolidatedDocument: {
          __typename: 'Invoice',
          dueDate: '',
          description: '',
          id: faker.datatype.uuid(),
          amount: '16720.0',
          billingCycleGid: null,
          creditedAmount: '0',
          debitedAmount: '0',
          documentNumber: 345872,
          gid: 'gid://platform/Invoice/345872',
          kind: 'COMPANY_BILL',
          paidAmount: '16720.0',
          status: 'PAID',
          subjectObject: {
            __typename: 'Client',
            id: faker.datatype.uuid(),
            fullName: 'Jacobs, Nikolaus and Leuschke'
          },
          url: 'http://localhost:3000/platform/staff/invoices/345872',
          webResource: {
            __typename: 'Link',
            text: 'Invoice #345872',
            url: 'http://localhost:3000/platform/staff/invoices/345872'
          }
        },
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 336945,
        gid: 'gid://platform/Invoice/336945',
        kind: 'COMPANY_BILL',
        paidAmount: '3800.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Client',
          id: faker.datatype.uuid(),
          fullName: 'Jacobs, Nikolaus and Leuschke'
        },
        url: 'http://localhost:3000/platform/staff/invoices/336945',
        webResource: {
          __typename: 'Link',
          text: 'Invoice #336945',
          url: 'http://localhost:3000/platform/staff/invoices/336945'
        }
      },
      {
        __typename: 'Invoice',
        dueDate: '',
        description: '',
        id: faker.datatype.uuid(),
        amount: '1520.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/354370',
        consolidatedDocument: {
          __typename: 'Invoice',
          dueDate: '',
          description: '',
          id: faker.datatype.uuid(),
          amount: '16720.0',
          billingCycleGid: null,
          creditedAmount: '0',
          debitedAmount: '0',
          documentNumber: 345872,
          gid: 'gid://platform/Invoice/345872',
          kind: 'COMPANY_BILL',
          paidAmount: '16720.0',
          status: 'PAID',
          subjectObject: {
            __typename: 'Client',
            id: faker.datatype.uuid(),
            fullName: 'Jacobs, Nikolaus and Leuschke'
          },
          url: 'http://localhost:3000/platform/staff/invoices/345872',
          webResource: {
            __typename: 'Link',
            text: 'Invoice #345872',
            url: 'http://localhost:3000/platform/staff/invoices/345872'
          }
        },
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 335359,
        gid: 'gid://platform/Invoice/335359',
        kind: 'COMPANY_BILL',
        paidAmount: '1520.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Client',
          id: faker.datatype.uuid(),
          fullName: 'Jacobs, Nikolaus and Leuschke'
        },
        url: 'http://localhost:3000/platform/staff/invoices/335359',
        webResource: {
          __typename: 'Link',
          text: 'Invoice #335359',
          url: 'http://localhost:3000/platform/staff/invoices/335359'
        }
      },
      {
        __typename: 'Invoice',
        dueDate: '',
        description: '',
        id: faker.datatype.uuid(),
        amount: '3800.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/352627',
        consolidatedDocument: {
          __typename: 'Invoice',
          dueDate: '',
          description: '',
          id: faker.datatype.uuid(),
          amount: '16720.0',
          billingCycleGid: null,
          creditedAmount: '0',
          debitedAmount: '0',
          documentNumber: 345872,
          gid: 'gid://platform/Invoice/345872',
          kind: 'COMPANY_BILL',
          paidAmount: '16720.0',
          status: 'PAID',
          subjectObject: {
            __typename: 'Client',
            id: faker.datatype.uuid(),
            fullName: 'Jacobs, Nikolaus and Leuschke'
          },
          url: 'http://localhost:3000/platform/staff/invoices/345872',
          webResource: {
            __typename: 'Link',
            text: 'Invoice #345872',
            url: 'http://localhost:3000/platform/staff/invoices/345872'
          }
        },
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 333793,
        gid: 'gid://platform/Invoice/333793',
        kind: 'COMPANY_BILL',
        paidAmount: '3800.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Client',
          id: faker.datatype.uuid(),
          fullName: 'Jacobs, Nikolaus and Leuschke'
        },
        url: 'http://localhost:3000/platform/staff/invoices/333793',
        webResource: {
          __typename: 'Link',
          text: 'Invoice #333793',
          url: 'http://localhost:3000/platform/staff/invoices/333793'
        }
      },
      {
        __typename: 'Invoice',
        dueDate: '',
        description: '',
        id: faker.datatype.uuid(),
        amount: '7600.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/349318',
        consolidatedDocument: {
          __typename: 'Invoice',
          dueDate: '',
          description: '',
          id: faker.datatype.uuid(),
          amount: '16720.0',
          billingCycleGid: null,
          creditedAmount: '0',
          debitedAmount: '0',
          documentNumber: 345872,
          gid: 'gid://platform/Invoice/345872',
          kind: 'COMPANY_BILL',
          paidAmount: '16720.0',
          status: 'PAID',
          subjectObject: {
            __typename: 'Client',
            id: faker.datatype.uuid(),
            fullName: 'Jacobs, Nikolaus and Leuschke'
          },
          url: 'http://localhost:3000/platform/staff/invoices/345872',
          webResource: {
            __typename: 'Link',
            text: 'Invoice #345872',
            url: 'http://localhost:3000/platform/staff/invoices/345872'
          }
        },
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 332202,
        gid: 'gid://platform/Invoice/332202',
        kind: 'COMPANY_BILL',
        paidAmount: '7600.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Client',
          id: faker.datatype.uuid(),
          fullName: 'Jacobs, Nikolaus and Leuschke'
        },
        url: 'http://localhost:3000/platform/staff/invoices/332202',
        webResource: {
          __typename: 'Link',
          text: 'Invoice #332202',
          url: 'http://localhost:3000/platform/staff/invoices/332202'
        }
      },
      {
        __typename: 'Invoice',
        dueDate: '',
        description: '',
        id: faker.datatype.uuid(),
        amount: '7600.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/345990',
        consolidatedDocument: {
          __typename: 'Invoice',
          dueDate: '',
          description: '',
          id: faker.datatype.uuid(),
          amount: '12920.0',
          billingCycleGid: null,
          creditedAmount: '0',
          debitedAmount: '0',
          documentNumber: 331139,
          gid: 'gid://platform/Invoice/331139',
          kind: 'COMPANY_BILL',
          paidAmount: '12920.0',
          status: 'PAID',
          subjectObject: {
            __typename: 'Client',
            id: faker.datatype.uuid(),
            fullName: 'Jacobs, Nikolaus and Leuschke'
          },
          url: 'http://localhost:3000/platform/staff/invoices/331139',
          webResource: {
            __typename: 'Link',
            text: 'Invoice #331139',
            url: 'http://localhost:3000/platform/staff/invoices/331139'
          }
        },
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 329081,
        gid: 'gid://platform/Invoice/329081',
        kind: 'COMPANY_BILL',
        paidAmount: '7600.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Client',
          id: faker.datatype.uuid(),
          fullName: 'Jacobs, Nikolaus and Leuschke'
        },
        url: 'http://localhost:3000/platform/staff/invoices/329081',
        webResource: {
          __typename: 'Link',
          text: 'Invoice #329081',
          url: 'http://localhost:3000/platform/staff/invoices/329081'
        }
      },
      {
        __typename: 'Invoice',
        dueDate: '',
        description: '',
        id: faker.datatype.uuid(),
        amount: '5320.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/343027',
        consolidatedDocument: {
          __typename: 'Invoice',
          dueDate: '',
          description: '',
          id: faker.datatype.uuid(),
          amount: '12920.0',
          billingCycleGid: null,
          creditedAmount: '0',
          debitedAmount: '0',
          documentNumber: 331139,
          gid: 'gid://platform/Invoice/331139',
          kind: 'COMPANY_BILL',
          paidAmount: '12920.0',
          status: 'PAID',
          subjectObject: {
            __typename: 'Client',
            id: faker.datatype.uuid(),
            fullName: 'Jacobs, Nikolaus and Leuschke'
          },
          url: 'http://localhost:3000/platform/staff/invoices/331139',
          webResource: {
            __typename: 'Link',
            text: 'Invoice #331139',
            url: 'http://localhost:3000/platform/staff/invoices/331139'
          }
        },
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 325985,
        gid: 'gid://platform/Invoice/325985',
        kind: 'COMPANY_BILL',
        paidAmount: '5320.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Client',
          id: faker.datatype.uuid(),
          fullName: 'Jacobs, Nikolaus and Leuschke'
        },
        url: 'http://localhost:3000/platform/staff/invoices/325985',
        webResource: {
          __typename: 'Link',
          text: 'Invoice #325985',
          url: 'http://localhost:3000/platform/staff/invoices/325985'
        }
      },
      {
        __typename: 'Invoice',
        dueDate: '',
        description: '',
        id: faker.datatype.uuid(),
        amount: '7600.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/339863',
        consolidatedDocument: null,
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 323401,
        gid: 'gid://platform/Invoice/323401',
        kind: 'COMPANY_BILL',
        paidAmount: '7600.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Client',
          id: faker.datatype.uuid(),
          fullName: 'Jacobs, Nikolaus and Leuschke'
        },
        url: 'http://localhost:3000/platform/staff/invoices/323401',
        webResource: {
          __typename: 'Link',
          text: 'Invoice #323401',
          url: 'http://localhost:3000/platform/staff/invoices/323401'
        }
      }
    ],
    payments: [
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '5192.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/432684',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 1044847,
        gid: 'gid://platform/Payment/1044847',
        paidAmount: '0',
        status: 'OUTSTANDING',
        subjectObject: {
          __typename: 'Talent',
          id: faker.datatype.uuid(),
          fullName: 'Hye Stracke'
        },
        url: 'http://localhost:3000/platform/staff/payments/1044847',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #1044847',
          url: 'http://localhost:3000/platform/staff/payments/1044847'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: true,
        amount: '5192.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/432684',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 1155847,
        gid: 'gid://platform/Payment/1155847',
        paidAmount: '0',
        status: 'OUTSTANDING',
        subjectObject: {
          __typename: 'Talent',
          id: faker.datatype.uuid(),
          fullName: 'Hye Stracke'
        },
        url: 'http://localhost:3000/platform/staff/payments/1155847',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #1155847',
          url: 'http://localhost:3000/platform/staff/payments/1155847'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '5192.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/428827',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 1032059,
        gid: 'gid://platform/Payment/1032059',
        paidAmount: '5192.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Talent',
          id: faker.datatype.uuid(),
          fullName: 'Hye Stracke'
        },
        url: 'http://localhost:3000/platform/staff/payments/1032059',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #1032059',
          url: 'http://localhost:3000/platform/staff/payments/1032059'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '5192.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/424656',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 1019938,
        gid: 'gid://platform/Payment/1019938',
        paidAmount: '5192.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Talent',
          id: faker.datatype.uuid(),
          fullName: 'Hye Stracke'
        },
        url: 'http://localhost:3000/platform/staff/payments/1019938',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #1019938',
          url: 'http://localhost:3000/platform/staff/payments/1019938'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '3304.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/422502',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 1007959,
        gid: 'gid://platform/Payment/1007959',
        paidAmount: '3304.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Talent',
          id: faker.datatype.uuid(),
          fullName: 'Hye Stracke'
        },
        url: 'http://localhost:3000/platform/staff/payments/1007959',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #1007959',
          url: 'http://localhost:3000/platform/staff/payments/1007959'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '2360.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/420555',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 1000058,
        gid: 'gid://platform/Payment/1000058',
        paidAmount: '2360.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Talent',
          id: faker.datatype.uuid(),
          fullName: 'Hye Stracke'
        },
        url: 'http://localhost:3000/platform/staff/payments/1000058',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #1000058',
          url: 'http://localhost:3000/platform/staff/payments/1000058'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '944.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/418859',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 993758,
        gid: 'gid://platform/Payment/993758',
        paidAmount: '944.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Talent',
          id: faker.datatype.uuid(),
          fullName: 'Hye Stracke'
        },
        url: 'http://localhost:3000/platform/staff/payments/993758',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #993758',
          url: 'http://localhost:3000/platform/staff/payments/993758'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '1200.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/418523',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 991291,
        gid: 'gid://platform/Payment/991291',
        paidAmount: '1200.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Talent',
          id: faker.datatype.uuid(),
          fullName: 'Hye Stracke'
        },
        url: 'http://localhost:3000/platform/staff/payments/991291',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #991291',
          url: 'http://localhost:3000/platform/staff/payments/991291'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '2000.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/416541',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 988056,
        gid: 'gid://platform/Payment/988056',
        paidAmount: '2000.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Talent',
          id: faker.datatype.uuid(),
          fullName: 'Hye Stracke'
        },
        url: 'http://localhost:3000/platform/staff/payments/988056',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #988056',
          url: 'http://localhost:3000/platform/staff/payments/988056'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '2000.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/414530',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 983359,
        gid: 'gid://platform/Payment/983359',
        paidAmount: '2000.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Talent',
          id: faker.datatype.uuid(),
          fullName: 'Hye Stracke'
        },
        url: 'http://localhost:3000/platform/staff/payments/983359',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #983359',
          url: 'http://localhost:3000/platform/staff/payments/983359'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '2000.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/412525',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 978043,
        gid: 'gid://platform/Payment/978043',
        paidAmount: '2000.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Talent',
          id: faker.datatype.uuid(),
          fullName: 'Hye Stracke'
        },
        url: 'http://localhost:3000/platform/staff/payments/978043',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #978043',
          url: 'http://localhost:3000/platform/staff/payments/978043'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '2000.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/408661',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 966526,
        gid: 'gid://platform/Payment/966526',
        paidAmount: '2000.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Talent',
          id: faker.datatype.uuid(),
          fullName: 'Hye Stracke'
        },
        url: 'http://localhost:3000/platform/staff/payments/966526',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #966526',
          url: 'http://localhost:3000/platform/staff/payments/966526'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '2000.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/406696',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 960866,
        gid: 'gid://platform/Payment/960866',
        paidAmount: '2000.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Talent',
          id: faker.datatype.uuid(),
          fullName: 'Hye Stracke'
        },
        url: 'http://localhost:3000/platform/staff/payments/960866',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #960866',
          url: 'http://localhost:3000/platform/staff/payments/960866'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '2000.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/404818',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 955289,
        gid: 'gid://platform/Payment/955289',
        paidAmount: '2000.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Talent',
          id: faker.datatype.uuid(),
          fullName: 'Hye Stracke'
        },
        url: 'http://localhost:3000/platform/staff/payments/955289',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #955289',
          url: 'http://localhost:3000/platform/staff/payments/955289'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '2000.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/402868',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 949852,
        gid: 'gid://platform/Payment/949852',
        paidAmount: '2000.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Talent',
          id: faker.datatype.uuid(),
          fullName: 'Hye Stracke'
        },
        url: 'http://localhost:3000/platform/staff/payments/949852',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #949852',
          url: 'http://localhost:3000/platform/staff/payments/949852'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '2000.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/400946',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 944931,
        gid: 'gid://platform/Payment/944931',
        paidAmount: '2000.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Talent',
          id: faker.datatype.uuid(),
          fullName: 'Hye Stracke'
        },
        url: 'http://localhost:3000/platform/staff/payments/944931',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #944931',
          url: 'http://localhost:3000/platform/staff/payments/944931'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '800.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/399140',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 939412,
        gid: 'gid://platform/Payment/939412',
        paidAmount: '800.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Talent',
          id: faker.datatype.uuid(),
          fullName: 'Hye Stracke'
        },
        url: 'http://localhost:3000/platform/staff/payments/939412',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #939412',
          url: 'http://localhost:3000/platform/staff/payments/939412'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '800.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/397369',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 934288,
        gid: 'gid://platform/Payment/934288',
        paidAmount: '800.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Talent',
          id: faker.datatype.uuid(),
          fullName: 'Hye Stracke'
        },
        url: 'http://localhost:3000/platform/staff/payments/934288',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #934288',
          url: 'http://localhost:3000/platform/staff/payments/934288'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '2000.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/395078',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 928729,
        gid: 'gid://platform/Payment/928729',
        paidAmount: '2000.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Talent',
          id: faker.datatype.uuid(),
          fullName: 'Hye Stracke'
        },
        url: 'http://localhost:3000/platform/staff/payments/928729',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #928729',
          url: 'http://localhost:3000/platform/staff/payments/928729'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '2000.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/393446',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 922628,
        gid: 'gid://platform/Payment/922628',
        paidAmount: '2000.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Talent',
          id: faker.datatype.uuid(),
          fullName: 'Hye Stracke'
        },
        url: 'http://localhost:3000/platform/staff/payments/922628',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #922628',
          url: 'http://localhost:3000/platform/staff/payments/922628'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '2000.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/391484',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 917230,
        gid: 'gid://platform/Payment/917230',
        paidAmount: '2000.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Talent',
          id: faker.datatype.uuid(),
          fullName: 'Hye Stracke'
        },
        url: 'http://localhost:3000/platform/staff/payments/917230',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #917230',
          url: 'http://localhost:3000/platform/staff/payments/917230'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '2000.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/389167',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 911715,
        gid: 'gid://platform/Payment/911715',
        paidAmount: '2000.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Talent',
          id: faker.datatype.uuid(),
          fullName: 'Hye Stracke'
        },
        url: 'http://localhost:3000/platform/staff/payments/911715',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #911715',
          url: 'http://localhost:3000/platform/staff/payments/911715'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '2000.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/387309',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 905634,
        gid: 'gid://platform/Payment/905634',
        paidAmount: '2000.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Talent',
          id: faker.datatype.uuid(),
          fullName: 'Hye Stracke'
        },
        url: 'http://localhost:3000/platform/staff/payments/905634',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #905634',
          url: 'http://localhost:3000/platform/staff/payments/905634'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '2000.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/385309',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 899641,
        gid: 'gid://platform/Payment/899641',
        paidAmount: '2000.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Talent',
          id: faker.datatype.uuid(),
          fullName: 'Hye Stracke'
        },
        url: 'http://localhost:3000/platform/staff/payments/899641',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #899641',
          url: 'http://localhost:3000/platform/staff/payments/899641'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '2000.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/383390',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 894077,
        gid: 'gid://platform/Payment/894077',
        paidAmount: '2000.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Talent',
          id: faker.datatype.uuid(),
          fullName: 'Hye Stracke'
        },
        url: 'http://localhost:3000/platform/staff/payments/894077',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #894077',
          url: 'http://localhost:3000/platform/staff/payments/894077'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '2000.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/381417',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 887930,
        gid: 'gid://platform/Payment/887930',
        paidAmount: '2000.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Talent',
          id: faker.datatype.uuid(),
          fullName: 'Hye Stracke'
        },
        url: 'http://localhost:3000/platform/staff/payments/887930',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #887930',
          url: 'http://localhost:3000/platform/staff/payments/887930'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '2000.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/379533',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 882158,
        gid: 'gid://platform/Payment/882158',
        paidAmount: '2000.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Talent',
          id: faker.datatype.uuid(),
          fullName: 'Hye Stracke'
        },
        url: 'http://localhost:3000/platform/staff/payments/882158',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #882158',
          url: 'http://localhost:3000/platform/staff/payments/882158'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '2000.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/377618',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 876601,
        gid: 'gid://platform/Payment/876601',
        paidAmount: '2000.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Talent',
          id: faker.datatype.uuid(),
          fullName: 'Hye Stracke'
        },
        url: 'http://localhost:3000/platform/staff/payments/876601',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #876601',
          url: 'http://localhost:3000/platform/staff/payments/876601'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '2000.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/376101',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 871102,
        gid: 'gid://platform/Payment/871102',
        paidAmount: '2000.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Talent',
          id: faker.datatype.uuid(),
          fullName: 'Hye Stracke'
        },
        url: 'http://localhost:3000/platform/staff/payments/871102',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #871102',
          url: 'http://localhost:3000/platform/staff/payments/871102'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '2000.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/374212',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 866240,
        gid: 'gid://platform/Payment/866240',
        paidAmount: '2000.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Talent',
          id: faker.datatype.uuid(),
          fullName: 'Hye Stracke'
        },
        url: 'http://localhost:3000/platform/staff/payments/866240',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #866240',
          url: 'http://localhost:3000/platform/staff/payments/866240'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '2000.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/372361',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 860991,
        gid: 'gid://platform/Payment/860991',
        paidAmount: '2000.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Talent',
          id: faker.datatype.uuid(),
          fullName: 'Hye Stracke'
        },
        url: 'http://localhost:3000/platform/staff/payments/860991',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #860991',
          url: 'http://localhost:3000/platform/staff/payments/860991'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '2000.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/370473',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 855443,
        gid: 'gid://platform/Payment/855443',
        paidAmount: '2000.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Talent',
          id: faker.datatype.uuid(),
          fullName: 'Hye Stracke'
        },
        url: 'http://localhost:3000/platform/staff/payments/855443',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #855443',
          url: 'http://localhost:3000/platform/staff/payments/855443'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '2000.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/368627',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 850250,
        gid: 'gid://platform/Payment/850250',
        paidAmount: '2000.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Talent',
          id: faker.datatype.uuid(),
          fullName: 'Hye Stracke'
        },
        url: 'http://localhost:3000/platform/staff/payments/850250',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #850250',
          url: 'http://localhost:3000/platform/staff/payments/850250'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '2000.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/366747',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 844589,
        gid: 'gid://platform/Payment/844589',
        paidAmount: '2000.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Talent',
          id: faker.datatype.uuid(),
          fullName: 'Hye Stracke'
        },
        url: 'http://localhost:3000/platform/staff/payments/844589',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #844589',
          url: 'http://localhost:3000/platform/staff/payments/844589'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '1000.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/364955',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 839616,
        gid: 'gid://platform/Payment/839616',
        paidAmount: '1000.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Talent',
          id: faker.datatype.uuid(),
          fullName: 'Hye Stracke'
        },
        url: 'http://localhost:3000/platform/staff/payments/839616',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #839616',
          url: 'http://localhost:3000/platform/staff/payments/839616'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '1000.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/363121',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 833634,
        gid: 'gid://platform/Payment/833634',
        paidAmount: '1000.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Talent',
          id: faker.datatype.uuid(),
          fullName: 'Hye Stracke'
        },
        url: 'http://localhost:3000/platform/staff/payments/833634',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #833634',
          url: 'http://localhost:3000/platform/staff/payments/833634'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '1000.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/361354',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 828771,
        gid: 'gid://platform/Payment/828771',
        paidAmount: '1000.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Talent',
          id: faker.datatype.uuid(),
          fullName: 'Hye Stracke'
        },
        url: 'http://localhost:3000/platform/staff/payments/828771',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #828771',
          url: 'http://localhost:3000/platform/staff/payments/828771'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '1000.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/359539',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 823797,
        gid: 'gid://platform/Payment/823797',
        paidAmount: '1000.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Talent',
          id: faker.datatype.uuid(),
          fullName: 'Hye Stracke'
        },
        url: 'http://localhost:3000/platform/staff/payments/823797',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #823797',
          url: 'http://localhost:3000/platform/staff/payments/823797'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '400.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/359946',
        creditedAmount: '400.0',
        debitedAmount: '0',
        documentNumber: 820664,
        gid: 'gid://platform/Payment/820664',
        paidAmount: '800.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Talent',
          id: faker.datatype.uuid(),
          fullName: 'Hye Stracke'
        },
        url: 'http://localhost:3000/platform/staff/payments/820664',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #820664',
          url: 'http://localhost:3000/platform/staff/payments/820664'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '2000.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/357825',
        creditedAmount: '0',
        debitedAmount: '800.0',
        documentNumber: 818555,
        gid: 'gid://platform/Payment/818555',
        paidAmount: '1200.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Talent',
          id: faker.datatype.uuid(),
          fullName: 'Hye Stracke'
        },
        url: 'http://localhost:3000/platform/staff/payments/818555',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #818555',
          url: 'http://localhost:3000/platform/staff/payments/818555'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '2000.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/356031',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 813390,
        gid: 'gid://platform/Payment/813390',
        paidAmount: '2000.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Talent',
          id: faker.datatype.uuid(),
          fullName: 'Hye Stracke'
        },
        url: 'http://localhost:3000/platform/staff/payments/813390',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #813390',
          url: 'http://localhost:3000/platform/staff/payments/813390'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '800.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/354370',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 808773,
        gid: 'gid://platform/Payment/808773',
        paidAmount: '800.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Talent',
          id: faker.datatype.uuid(),
          fullName: 'Hye Stracke'
        },
        url: 'http://localhost:3000/platform/staff/payments/808773',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #808773',
          url: 'http://localhost:3000/platform/staff/payments/808773'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '2000.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/352627',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 803800,
        gid: 'gid://platform/Payment/803800',
        paidAmount: '2000.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Talent',
          id: faker.datatype.uuid(),
          fullName: 'Hye Stracke'
        },
        url: 'http://localhost:3000/platform/staff/payments/803800',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #803800',
          url: 'http://localhost:3000/platform/staff/payments/803800'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '4000.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/349318',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 799077,
        gid: 'gid://platform/Payment/799077',
        paidAmount: '4000.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Talent',
          id: faker.datatype.uuid(),
          fullName: 'Hye Stracke'
        },
        url: 'http://localhost:3000/platform/staff/payments/799077',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #799077',
          url: 'http://localhost:3000/platform/staff/payments/799077'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '4000.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/345990',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 789262,
        gid: 'gid://platform/Payment/789262',
        paidAmount: '4000.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Talent',
          id: faker.datatype.uuid(),
          fullName: 'Hye Stracke'
        },
        url: 'http://localhost:3000/platform/staff/payments/789262',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #789262',
          url: 'http://localhost:3000/platform/staff/payments/789262'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '2800.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/343027',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 779721,
        gid: 'gid://platform/Payment/779721',
        paidAmount: '2800.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Talent',
          id: faker.datatype.uuid(),
          fullName: 'Hye Stracke'
        },
        url: 'http://localhost:3000/platform/staff/payments/779721',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #779721',
          url: 'http://localhost:3000/platform/staff/payments/779721'
        }
      },
      {
        __typename: 'Payment',
        id: faker.datatype.uuid(),
        dueDate: '',
        description: '',
        extraHours: false,
        amount: '4000.0',
        billingCycleGid: 'gid://platform/Billing::Cycle/339863',
        creditedAmount: '0',
        debitedAmount: '0',
        documentNumber: 771933,
        gid: 'gid://platform/Payment/771933',
        paidAmount: '4000.0',
        status: 'PAID',
        subjectObject: {
          __typename: 'Talent',
          id: faker.datatype.uuid(),
          fullName: 'Hye Stracke'
        },
        url: 'http://localhost:3000/platform/staff/payments/771933',
        webResource: {
          __typename: 'Link',
          text: 'Notice of Payment #771933',
          url: 'http://localhost:3000/platform/staff/payments/771933'
        }
      }
    ]
  },
  node: {
    __typename: 'Engagement',
    id: 'VjEtRW5nYWdlbWVudC0xNzE2MDg',
    billingCycles: {
      __typename: 'BillingCyclesConnection',
      nodes: [
        {
          __typename: 'BillingCycle',
          actualCommitment: {
            __typename: 'Commitment',
            availability: 'full_time',
            availabilityHours: 40,
            companyRate: '3800.0',
            startDate: '2020-03-12',
            talentRate: '2360.0'
          },
          endDate: '2020-05-31',
          gid: 'gid://platform/Billing::Cycle/436655',
          hours: '80.0',
          chargedHours: '80.0',
          extraHours: '0.0',
          kind: 'development',
          originalCommitment: {
            __typename: 'Commitment',
            availability: 'full_time',
            availabilityHours: 40,
            companyRate: '3800.0',
            startDate: '2020-03-12',
            talentRate: '2360.0'
          },
          startDate: '2020-05-16',
          status: 'pending'
        },
        {
          __typename: 'BillingCycle',
          actualCommitment: {
            __typename: 'Commitment',
            availability: 'full_time',
            availabilityHours: 40,
            companyRate: '3800.0',
            startDate: '2020-03-12',
            talentRate: '2360.0'
          },
          endDate: '2020-05-15',
          gid: 'gid://platform/Billing::Cycle/432684',
          hours: '88.0',
          chargedHours: '88.0',
          extraHours: '22.0',
          kind: 'development',
          originalCommitment: {
            __typename: 'Commitment',
            availability: 'full_time',
            availabilityHours: 40,
            companyRate: '3800.0',
            startDate: '2020-03-12',
            talentRate: '2360.0'
          },
          startDate: '2020-05-01',
          status: 'PAID'
        },
        {
          __typename: 'BillingCycle',
          actualCommitment: {
            __typename: 'Commitment',
            availability: 'full_time',
            availabilityHours: 40,
            companyRate: '3800.0',
            startDate: '2020-03-12',
            talentRate: '2360.0'
          },
          endDate: '2020-04-30',
          gid: 'gid://platform/Billing::Cycle/428827',
          hours: '88.0',
          chargedHours: '88.0',
          extraHours: '0.0',
          kind: 'development',
          originalCommitment: {
            __typename: 'Commitment',
            availability: 'full_time',
            availabilityHours: 40,
            companyRate: '3800.0',
            startDate: '2020-03-12',
            talentRate: '2360.0'
          },
          startDate: '2020-04-16',
          status: 'PAID'
        },
        {
          __typename: 'BillingCycle',
          actualCommitment: {
            __typename: 'Commitment',
            availability: 'full_time',
            availabilityHours: 40,
            companyRate: '3800.0',
            startDate: '2020-03-12',
            talentRate: '2360.0'
          },
          endDate: '2020-04-15',
          gid: 'gid://platform/Billing::Cycle/424656',
          hours: '88.0',
          chargedHours: '88.0',
          extraHours: '0.0',
          kind: 'development',
          originalCommitment: {
            __typename: 'Commitment',
            availability: 'full_time',
            availabilityHours: 40,
            companyRate: '3800.0',
            startDate: '2020-03-12',
            talentRate: '2360.0'
          },
          startDate: '2020-04-01',
          status: 'PAID'
        },
        {
          __typename: 'BillingCycle',
          actualCommitment: {
            __typename: 'Commitment',
            availability: 'full_time',
            availabilityHours: 40,
            companyRate: '3800.0',
            startDate: '2020-03-12',
            talentRate: '2360.0'
          },
          endDate: '2020-03-31',
          gid: 'gid://platform/Billing::Cycle/422502',
          hours: '56.0',
          chargedHours: '56.0',
          extraHours: '0.0',
          kind: 'development',
          originalCommitment: {
            __typename: 'Commitment',
            availability: 'full_time',
            availabilityHours: 40,
            companyRate: '3800.0',
            startDate: '2020-03-12',
            talentRate: '2360.0'
          },
          startDate: '2020-03-23',
          status: 'PAID'
        },
        {
          __typename: 'BillingCycle',
          actualCommitment: {
            __typename: 'Commitment',
            availability: 'full_time',
            availabilityHours: 40,
            companyRate: '3800.0',
            startDate: '2020-03-12',
            talentRate: '2360.0'
          },
          endDate: '2020-03-22',
          gid: 'gid://platform/Billing::Cycle/420555',
          hours: '40.0',
          chargedHours: '40.0',
          extraHours: '0.0',
          kind: 'development',
          originalCommitment: {
            __typename: 'Commitment',
            availability: 'full_time',
            availabilityHours: 40,
            companyRate: '3800.0',
            startDate: '2020-03-12',
            talentRate: '2360.0'
          },
          startDate: '2020-03-16',
          status: 'PAID'
        },
        {
          __typename: 'BillingCycle',
          actualCommitment: {
            __typename: 'Commitment',
            availability: 'full_time',
            availabilityHours: 40,
            companyRate: '3800.0',
            startDate: '2020-03-12',
            talentRate: '2360.0'
          },
          endDate: '2020-03-15',
          gid: 'gid://platform/Billing::Cycle/418859',
          hours: '16.0',
          chargedHours: '16.0',
          extraHours: '0.0',
          kind: 'development',
          originalCommitment: {
            __typename: 'Commitment',
            availability: 'full_time',
            availabilityHours: 40,
            companyRate: '3800.0',
            startDate: '2020-03-12',
            talentRate: '2360.0'
          },
          startDate: '2020-03-12',
          status: 'PAID'
        },
        {
          __typename: 'BillingCycle',
          actualCommitment: {
            __typename: 'Commitment',
            availability: 'full_time',
            availabilityHours: 40,
            companyRate: '3800.0',
            startDate: '2019-09-02',
            talentRate: '2000.0'
          },
          endDate: '2020-03-11',
          gid: 'gid://platform/Billing::Cycle/418523',
          hours: '24.0',
          chargedHours: '24.0',
          extraHours: '0.0',
          kind: 'development',
          originalCommitment: {
            __typename: 'Commitment',
            availability: 'full_time',
            availabilityHours: 40,
            companyRate: '3800.0',
            startDate: '2019-09-02',
            talentRate: '2000.0'
          },
          startDate: '2020-03-09',
          status: 'PAID'
        },
        {
          __typename: 'BillingCycle',
          actualCommitment: {
            __typename: 'Commitment',
            availability: 'full_time',
            availabilityHours: 40,
            companyRate: '3800.0',
            startDate: '2019-09-02',
            talentRate: '2000.0'
          },
          endDate: '2020-03-08',
          gid: 'gid://platform/Billing::Cycle/416541',
          hours: '40.0',
          chargedHours: '40.0',
          extraHours: '0.0',
          kind: 'development',
          originalCommitment: {
            __typename: 'Commitment',
            availability: 'full_time',
            availabilityHours: 40,
            companyRate: '3800.0',
            startDate: '2019-09-02',
            talentRate: '2000.0'
          },
          startDate: '2020-03-02',
          status: 'PAID'
        },
        {
          __typename: 'BillingCycle',
          actualCommitment: {
            __typename: 'Commitment',
            availability: 'full_time',
            availabilityHours: 40,
            companyRate: '3800.0',
            startDate: '2019-09-02',
            talentRate: '2000.0'
          },
          endDate: '2020-03-01',
          gid: 'gid://platform/Billing::Cycle/414530',
          hours: '40.0',
          chargedHours: '40.0',
          extraHours: '0.0',
          kind: 'development',
          originalCommitment: {
            __typename: 'Commitment',
            availability: 'full_time',
            availabilityHours: 40,
            companyRate: '3800.0',
            startDate: '2019-09-02',
            talentRate: '2000.0'
          },
          startDate: '2020-02-24',
          status: 'PAID'
        },
        {
          __typename: 'BillingCycle',
          actualCommitment: {
            __typename: 'Commitment',
            availability: 'full_time',
            availabilityHours: 40,
            companyRate: '3800.0',
            startDate: '2019-09-02',
            talentRate: '2000.0'
          },
          endDate: '2020-02-23',
          gid: 'gid://platform/Billing::Cycle/412525',
          hours: '40.0',
          chargedHours: '40.0',
          extraHours: '0.0',
          kind: 'development',
          originalCommitment: {
            __typename: 'Commitment',
            availability: 'full_time',
            availabilityHours: 40,
            companyRate: '3800.0',
            startDate: '2019-09-02',
            talentRate: '2000.0'
          },
          startDate: '2020-02-17',
          status: 'PAID'
        },
        {
          __typename: 'BillingCycle',
          actualCommitment: {
            __typename: 'Commitment',
            availability: 'full_time',
            availabilityHours: 40,
            companyRate: '3800.0',
            startDate: '2019-09-02',
            talentRate: '2000.0'
          },
          endDate: '2020-02-16',
          gid: 'gid://platform/Billing::Cycle/410539',
          hours: '0.0',
          chargedHours: '0.0',
          extraHours: '0.0',
          kind: 'development',
          originalCommitment: {
            __typename: 'Commitment',
            availability: 'full_time',
            availabilityHours: 40,
            companyRate: '3800.0',
            startDate: '2019-09-02',
            talentRate: '2000.0'
          },
          startDate: '2020-02-10',
          status: 'removed'
        },
        {
          __typename: 'BillingCycle',
          actualCommitment: {
            __typename: 'Commitment',
            availability: 'full_time',
            availabilityHours: 40,
            companyRate: '3800.0',
            startDate: '2019-09-02',
            talentRate: '2000.0'
          },
          endDate: '2020-02-09',
          gid: 'gid://platform/Billing::Cycle/408661',
          hours: '40.0',
          chargedHours: '40.0',
          extraHours: '0.0',
          kind: 'development',
          originalCommitment: {
            __typename: 'Commitment',
            availability: 'full_time',
            availabilityHours: 40,
            companyRate: '3800.0',
            startDate: '2019-09-02',
            talentRate: '2000.0'
          },
          startDate: '2020-02-03',
          status: 'PAID'
        },
        {
          __typename: 'BillingCycle',
          actualCommitment: {
            __typename: 'Commitment',
            availability: 'full_time',
            availabilityHours: 40,
            companyRate: '3800.0',
            startDate: '2019-09-02',
            talentRate: '2000.0'
          },
          endDate: '2020-02-02',
          gid: 'gid://platform/Billing::Cycle/406696',
          hours: '40.0',
          chargedHours: '40.0',
          extraHours: '0.0',
          kind: 'development',
          originalCommitment: {
            __typename: 'Commitment',
            availability: 'full_time',
            availabilityHours: 40,
            companyRate: '3800.0',
            startDate: '2019-09-02',
            talentRate: '2000.0'
          },
          startDate: '2020-01-27',
          status: 'PAID'
        },
        {
          __typename: 'BillingCycle',
          actualCommitment: {
            __typename: 'Commitment',
            availability: 'full_time',
            availabilityHours: 40,
            companyRate: '3800.0',
            startDate: '2019-09-02',
            talentRate: '2000.0'
          },
          endDate: '2020-01-26',
          gid: 'gid://platform/Billing::Cycle/404818',
          hours: '40.0',
          chargedHours: '40.0',
          extraHours: '0.0',
          kind: 'development',
          originalCommitment: {
            __typename: 'Commitment',
            availability: 'full_time',
            availabilityHours: 40,
            companyRate: '3800.0',
            startDate: '2019-09-02',
            talentRate: '2000.0'
          },
          startDate: '2020-01-20',
          status: 'PAID'
        },
        {
          __typename: 'BillingCycle',
          actualCommitment: {
            __typename: 'Commitment',
            availability: 'full_time',
            availabilityHours: 40,
            companyRate: '3800.0',
            startDate: '2019-09-02',
            talentRate: '2000.0'
          },
          endDate: '2020-01-19',
          gid: 'gid://platform/Billing::Cycle/402868',
          hours: '40.0',
          chargedHours: '40.0',
          extraHours: '0.0',
          kind: 'development',
          originalCommitment: {
            __typename: 'Commitment',
            availability: 'full_time',
            availabilityHours: 40,
            companyRate: '3800.0',
            startDate: '2019-09-02',
            talentRate: '2000.0'
          },
          startDate: '2020-01-13',
          status: 'PAID'
        },
        {
          __typename: 'BillingCycle',
          actualCommitment: {
            __typename: 'Commitment',
            availability: 'full_time',
            availabilityHours: 40,
            companyRate: '3800.0',
            startDate: '2019-09-02',
            talentRate: '2000.0'
          },
          endDate: '2020-01-12',
          gid: 'gid://platform/Billing::Cycle/400946',
          hours: '40.0',
          chargedHours: '40.0',
          extraHours: '0.0',
          kind: 'development',
          originalCommitment: {
            __typename: 'Commitment',
            availability: 'full_time',
            availabilityHours: 40,
            companyRate: '3800.0',
            startDate: '2019-09-02',
            talentRate: '2000.0'
          },
          startDate: '2020-01-06',
          status: 'PAID'
        },
        {
          __typename: 'BillingCycle',
          actualCommitment: {
            __typename: 'Commitment',
            availability: 'full_time',
            availabilityHours: 40,
            companyRate: '3800.0',
            startDate: '2019-09-02',
            talentRate: '2000.0'
          },
          endDate: '2020-01-05',
          gid: 'gid://platform/Billing::Cycle/399140',
          hours: '16.0',
          chargedHours: '16.0',
          extraHours: '0.0',
          kind: 'development',
          originalCommitment: {
            __typename: 'Commitment',
            availability: 'full_time',
            availabilityHours: 40,
            companyRate: '3800.0',
            startDate: '2019-09-02',
            talentRate: '2000.0'
          },
          startDate: '2019-12-30',
          status: 'PAID'
        },
        {
          __typename: 'BillingCycle',
          actualCommitment: {
            __typename: 'Commitment',
            availability: 'full_time',
            availabilityHours: 40,
            companyRate: '3800.0',
            startDate: '2019-09-02',
            talentRate: '2000.0'
          },
          endDate: '2019-12-29',
          gid: 'gid://platform/Billing::Cycle/397369',
          hours: '16.0',
          chargedHours: '16.0',
          extraHours: '0.0',
          kind: 'development',
          originalCommitment: {
            __typename: 'Commitment',
            availability: 'full_time',
            availabilityHours: 40,
            companyRate: '3800.0',
            startDate: '2019-09-02',
            talentRate: '2000.0'
          },
          startDate: '2019-12-23',
          status: 'PAID'
        },
        {
          __typename: 'BillingCycle',
          actualCommitment: {
            __typename: 'Commitment',
            availability: 'full_time',
            availabilityHours: 40,
            companyRate: '3800.0',
            startDate: '2019-09-02',
            talentRate: '2000.0'
          },
          endDate: '2019-12-22',
          gid: 'gid://platform/Billing::Cycle/395078',
          hours: '40.0',
          chargedHours: '40.0',
          extraHours: '0.0',
          kind: 'development',
          originalCommitment: {
            __typename: 'Commitment',
            availability: 'full_time',
            availabilityHours: 40,
            companyRate: '3800.0',
            startDate: '2019-09-02',
            talentRate: '2000.0'
          },
          startDate: '2019-12-16',
          status: 'PAID'
        },
        {
          __typename: 'BillingCycle',
          actualCommitment: {
            __typename: 'Commitment',
            availability: 'full_time',
            availabilityHours: 40,
            companyRate: '3800.0',
            startDate: '2019-09-02',
            talentRate: '2000.0'
          },
          endDate: '2019-12-15',
          gid: 'gid://platform/Billing::Cycle/393446',
          hours: '40.0',
          chargedHours: '40.0',
          extraHours: '0.0',
          kind: 'development',
          originalCommitment: {
            __typename: 'Commitment',
            availability: 'full_time',
            availabilityHours: 40,
            companyRate: '3800.0',
            startDate: '2019-09-02',
            talentRate: '2000.0'
          },
          startDate: '2019-12-09',
          status: 'PAID'
        },
        {
          __typename: 'BillingCycle',
          actualCommitment: {
            __typename: 'Commitment',
            availability: 'full_time',
            availabilityHours: 40,
            companyRate: '3800.0',
            startDate: '2019-09-02',
            talentRate: '2000.0'
          },
          endDate: '2019-12-08',
          gid: 'gid://platform/Billing::Cycle/391484',
          hours: '40.0',
          chargedHours: '40.0',
          extraHours: '0.0',
          kind: 'development',
          originalCommitment: {
            __typename: 'Commitment',
            availability: 'full_time',
            availabilityHours: 40,
            companyRate: '3800.0',
            startDate: '2019-09-02',
            talentRate: '2000.0'
          },
          startDate: '2019-12-02',
          status: 'PAID'
        },
        {
          __typename: 'BillingCycle',
          actualCommitment: {
            __typename: 'Commitment',
            availability: 'full_time',
            availabilityHours: 40,
            companyRate: '3800.0',
            startDate: '2019-09-02',
            talentRate: '2000.0'
          },
          endDate: '2019-12-01',
          gid: 'gid://platform/Billing::Cycle/389167',
          hours: '40.0',
          chargedHours: '40.0',
          extraHours: '0.0',
          kind: 'development',
          originalCommitment: {
            __typename: 'Commitment',
            availability: 'full_time',
            availabilityHours: 40,
            companyRate: '3800.0',
            startDate: '2019-09-02',
            talentRate: '2000.0'
          },
          startDate: '2019-11-25',
          status: 'PAID'
        },
        {
          __typename: 'BillingCycle',
          actualCommitment: {
            __typename: 'Commitment',
            availability: 'full_time',
            availabilityHours: 40,
            companyRate: '3800.0',
            startDate: '2019-09-02',
            talentRate: '2000.0'
          },
          endDate: '2019-11-24',
          gid: 'gid://platform/Billing::Cycle/387309',
          hours: '40.0',
          chargedHours: '40.0',
          extraHours: '0.0',
          kind: 'development',
          originalCommitment: {
            __typename: 'Commitment',
            availability: 'full_time',
            availabilityHours: 40,
            companyRate: '3800.0',
            startDate: '2019-09-02',
            talentRate: '2000.0'
          },
          startDate: '2019-11-18',
          status: 'PAID'
        },
        {
          __typename: 'BillingCycle',
          actualCommitment: {
            __typename: 'Commitment',
            availability: 'full_time',
            availabilityHours: 40,
            companyRate: '3800.0',
            startDate: '2019-09-02',
            talentRate: '2000.0'
          },
          endDate: '2019-11-17',
          gid: 'gid://platform/Billing::Cycle/385309',
          hours: '40.0',
          chargedHours: '40.0',
          extraHours: '0.0',
          kind: 'development',
          originalCommitment: {
            __typename: 'Commitment',
            availability: 'full_time',
            availabilityHours: 40,
            companyRate: '3800.0',
            startDate: '2019-09-02',
            talentRate: '2000.0'
          },
          startDate: '2019-11-11',
          status: 'PAID'
        },
        {
          __typename: 'BillingCycle',
          actualCommitment: {
            __typename: 'Commitment',
            availability: 'full_time',
            availabilityHours: 40,
            companyRate: '3800.0',
            startDate: '2019-09-02',
            talentRate: '2000.0'
          },
          endDate: '2019-11-10',
          gid: 'gid://platform/Billing::Cycle/383390',
          hours: '40.0',
          chargedHours: '40.0',
          extraHours: '0.0',
          kind: 'development',
          originalCommitment: {
            __typename: 'Commitment',
            availability: 'full_time',
            availabilityHours: 40,
            companyRate: '3800.0',
            startDate: '2019-09-02',
            talentRate: '2000.0'
          },
          startDate: '2019-11-04',
          status: 'PAID'
        },
        {
          __typename: 'BillingCycle',
          actualCommitment: {
            __typename: 'Commitment',
            availability: 'full_time',
            availabilityHours: 40,
            companyRate: '3800.0',
            startDate: '2019-09-02',
            talentRate: '2000.0'
          },
          endDate: '2019-11-03',
          gid: 'gid://platform/Billing::Cycle/381417',
          hours: '40.0',
          chargedHours: '40.0',
          extraHours: '0.0',
          kind: 'development',
          originalCommitment: {
            __typename: 'Commitment',
            availability: 'full_time',
            availabilityHours: 40,
            companyRate: '3800.0',
            startDate: '2019-09-02',
            talentRate: '2000.0'
          },
          startDate: '2019-10-28',
          status: 'PAID'
        },
        {
          __typename: 'BillingCycle',
          actualCommitment: {
            __typename: 'Commitment',
            availability: 'full_time',
            availabilityHours: 40,
            companyRate: '3800.0',
            startDate: '2019-09-02',
            talentRate: '2000.0'
          },
          endDate: '2019-10-27',
          gid: 'gid://platform/Billing::Cycle/379533',
          hours: '40.0',
          chargedHours: '40.0',
          extraHours: '0.0',
          kind: 'development',
          originalCommitment: {
            __typename: 'Commitment',
            availability: 'full_time',
            availabilityHours: 40,
            companyRate: '3800.0',
            startDate: '2019-09-02',
            talentRate: '2000.0'
          },
          startDate: '2019-10-21',
          status: 'PAID'
        },
        {
          __typename: 'BillingCycle',
          actualCommitment: {
            __typename: 'Commitment',
            availability: 'full_time',
            availabilityHours: 40,
            companyRate: '3800.0',
            startDate: '2019-09-02',
            talentRate: '2000.0'
          },
          endDate: '2019-10-20',
          gid: 'gid://platform/Billing::Cycle/377618',
          hours: '40.0',
          chargedHours: '40.0',
          extraHours: '0.0',
          kind: 'development',
          originalCommitment: {
            __typename: 'Commitment',
            availability: 'full_time',
            availabilityHours: 40,
            companyRate: '3800.0',
            startDate: '2019-09-02',
            talentRate: '2000.0'
          },
          startDate: '2019-10-14',
          status: 'PAID'
        },
        {
          __typename: 'BillingCycle',
          actualCommitment: {
            __typename: 'Commitment',
            availability: 'full_time',
            availabilityHours: 40,
            companyRate: '3800.0',
            startDate: '2019-09-02',
            talentRate: '2000.0'
          },
          endDate: '2019-10-13',
          gid: 'gid://platform/Billing::Cycle/376101',
          hours: '40.0',
          chargedHours: '40.0',
          extraHours: '0.0',
          kind: 'development',
          originalCommitment: {
            __typename: 'Commitment',
            availability: 'full_time',
            availabilityHours: 40,
            companyRate: '3800.0',
            startDate: '2019-09-02',
            talentRate: '2000.0'
          },
          startDate: '2019-10-07',
          status: 'PAID'
        },
        {
          __typename: 'BillingCycle',
          actualCommitment: {
            __typename: 'Commitment',
            availability: 'full_time',
            availabilityHours: 40,
            companyRate: '3800.0',
            startDate: '2019-09-02',
            talentRate: '2000.0'
          },
          endDate: '2019-10-06',
          gid: 'gid://platform/Billing::Cycle/374212',
          hours: '40.0',
          chargedHours: '40.0',
          extraHours: '0.0',
          kind: 'development',
          originalCommitment: {
            __typename: 'Commitment',
            availability: 'full_time',
            availabilityHours: 40,
            companyRate: '3800.0',
            startDate: '2019-09-02',
            talentRate: '2000.0'
          },
          startDate: '2019-09-30',
          status: 'PAID'
        },
        {
          __typename: 'BillingCycle',
          actualCommitment: {
            __typename: 'Commitment',
            availability: 'full_time',
            availabilityHours: 40,
            companyRate: '3800.0',
            startDate: '2019-09-02',
            talentRate: '2000.0'
          },
          endDate: '2019-09-29',
          gid: 'gid://platform/Billing::Cycle/372361',
          hours: '40.0',
          chargedHours: '40.0',
          extraHours: '0.0',
          kind: 'development',
          originalCommitment: {
            __typename: 'Commitment',
            availability: 'full_time',
            availabilityHours: 40,
            companyRate: '3800.0',
            startDate: '2019-09-02',
            talentRate: '2000.0'
          },
          startDate: '2019-09-23',
          status: 'PAID'
        },
        {
          __typename: 'BillingCycle',
          actualCommitment: {
            __typename: 'Commitment',
            availability: 'full_time',
            availabilityHours: 40,
            companyRate: '3800.0',
            startDate: '2019-09-02',
            talentRate: '2000.0'
          },
          endDate: '2019-09-22',
          gid: 'gid://platform/Billing::Cycle/370473',
          hours: '40.0',
          chargedHours: '40.0',
          extraHours: '0.0',
          kind: 'development',
          originalCommitment: {
            __typename: 'Commitment',
            availability: 'full_time',
            availabilityHours: 40,
            companyRate: '3800.0',
            startDate: '2019-09-02',
            talentRate: '2000.0'
          },
          startDate: '2019-09-16',
          status: 'PAID'
        },
        {
          __typename: 'BillingCycle',
          actualCommitment: {
            __typename: 'Commitment',
            availability: 'full_time',
            availabilityHours: 40,
            companyRate: '3800.0',
            startDate: '2019-09-02',
            talentRate: '2000.0'
          },
          endDate: '2019-09-15',
          gid: 'gid://platform/Billing::Cycle/368627',
          hours: '40.0',
          chargedHours: '40.0',
          extraHours: '0.0',
          kind: 'development',
          originalCommitment: {
            __typename: 'Commitment',
            availability: 'full_time',
            availabilityHours: 40,
            companyRate: '3800.0',
            startDate: '2019-09-02',
            talentRate: '2000.0'
          },
          startDate: '2019-09-09',
          status: 'PAID'
        },
        {
          __typename: 'BillingCycle',
          actualCommitment: {
            __typename: 'Commitment',
            availability: 'full_time',
            availabilityHours: 40,
            companyRate: '3800.0',
            startDate: '2019-09-02',
            talentRate: '2000.0'
          },
          endDate: '2019-09-08',
          gid: 'gid://platform/Billing::Cycle/366747',
          hours: '40.0',
          chargedHours: '40.0',
          extraHours: '0.0',
          kind: 'development',
          originalCommitment: {
            __typename: 'Commitment',
            availability: 'full_time',
            availabilityHours: 40,
            companyRate: '3800.0',
            startDate: '2019-09-02',
            talentRate: '2000.0'
          },
          startDate: '2019-09-02',
          status: 'PAID'
        },
        {
          __typename: 'BillingCycle',
          actualCommitment: {
            __typename: 'Commitment',
            availability: 'part_time',
            availabilityHours: 20,
            companyRate: '3800.0',
            startDate: '2019-08-05',
            talentRate: '2000.0'
          },
          endDate: '2019-09-01',
          gid: 'gid://platform/Billing::Cycle/364955',
          hours: '20.0',
          chargedHours: '20.0',
          extraHours: '0.0',
          kind: 'development',
          originalCommitment: {
            __typename: 'Commitment',
            availability: 'part_time',
            availabilityHours: 20,
            companyRate: '3800.0',
            startDate: '2019-08-05',
            talentRate: '2000.0'
          },
          startDate: '2019-08-26',
          status: 'PAID'
        },
        {
          __typename: 'BillingCycle',
          actualCommitment: {
            __typename: 'Commitment',
            availability: 'part_time',
            availabilityHours: 20,
            companyRate: '3800.0',
            startDate: '2019-08-05',
            talentRate: '2000.0'
          },
          endDate: '2019-08-25',
          gid: 'gid://platform/Billing::Cycle/363121',
          hours: '20.0',
          chargedHours: '20.0',
          extraHours: '0.0',
          kind: 'development',
          originalCommitment: {
            __typename: 'Commitment',
            availability: 'part_time',
            availabilityHours: 20,
            companyRate: '3800.0',
            startDate: '2019-08-05',
            talentRate: '2000.0'
          },
          startDate: '2019-08-19',
          status: 'PAID'
        },
        {
          __typename: 'BillingCycle',
          actualCommitment: {
            __typename: 'Commitment',
            availability: 'part_time',
            availabilityHours: 20,
            companyRate: '3800.0',
            startDate: '2019-08-05',
            talentRate: '2000.0'
          },
          endDate: '2019-08-18',
          gid: 'gid://platform/Billing::Cycle/361354',
          hours: '20.0',
          chargedHours: '20.0',
          extraHours: '0.0',
          kind: 'development',
          originalCommitment: {
            __typename: 'Commitment',
            availability: 'part_time',
            availabilityHours: 20,
            companyRate: '3800.0',
            startDate: '2019-08-05',
            talentRate: '2000.0'
          },
          startDate: '2019-08-12',
          status: 'PAID'
        },
        {
          __typename: 'BillingCycle',
          actualCommitment: {
            __typename: 'Commitment',
            availability: 'part_time',
            availabilityHours: 20,
            companyRate: '3800.0',
            startDate: '2019-08-05',
            talentRate: '2000.0'
          },
          endDate: '2019-08-11',
          gid: 'gid://platform/Billing::Cycle/359539',
          hours: '20.0',
          chargedHours: '20.0',
          extraHours: '0.0',
          kind: 'development',
          originalCommitment: {
            __typename: 'Commitment',
            availability: 'part_time',
            availabilityHours: 20,
            companyRate: '3800.0',
            startDate: '2019-08-05',
            talentRate: '2000.0'
          },
          startDate: '2019-08-05',
          status: 'PAID'
        },
        {
          __typename: 'BillingCycle',
          actualCommitment: {
            __typename: 'Commitment',
            availability: 'full_time',
            availabilityHours: 40,
            companyRate: '3800.0',
            startDate: '2019-08-01',
            talentRate: '2000.0'
          },
          endDate: '2019-08-04',
          gid: 'gid://platform/Billing::Cycle/359946',
          hours: '16.0',
          chargedHours: '16.0',
          extraHours: '0.0',
          kind: 'development',
          originalCommitment: {
            __typename: 'Commitment',
            availability: 'part_time',
            availabilityHours: 20,
            companyRate: '3800.0',
            startDate: '2019-08-01',
            talentRate: '2000.0'
          },
          startDate: '2019-08-01',
          status: 'PAID'
        },
        {
          __typename: 'BillingCycle',
          actualCommitment: {
            __typename: 'Commitment',
            availability: 'full_time',
            availabilityHours: 40,
            companyRate: '3800.0',
            startDate: '2019-05-16',
            talentRate: '2000.0'
          },
          endDate: '2019-07-31',
          gid: 'gid://platform/Billing::Cycle/357825',
          hours: '24.0',
          chargedHours: '24.0',
          extraHours: '0.0',
          kind: 'development',
          originalCommitment: {
            __typename: 'Commitment',
            availability: 'full_time',
            availabilityHours: 40,
            companyRate: '3800.0',
            startDate: '2019-05-16',
            talentRate: '2000.0'
          },
          startDate: '2019-07-29',
          status: 'PAID'
        },
        {
          __typename: 'BillingCycle',
          actualCommitment: {
            __typename: 'Commitment',
            availability: 'full_time',
            availabilityHours: 40,
            companyRate: '3800.0',
            startDate: '2019-05-16',
            talentRate: '2000.0'
          },
          endDate: '2019-07-28',
          gid: 'gid://platform/Billing::Cycle/356031',
          hours: '40.0',
          chargedHours: '40.0',
          extraHours: '0.0',
          kind: 'development',
          originalCommitment: {
            __typename: 'Commitment',
            availability: 'full_time',
            availabilityHours: 40,
            companyRate: '3800.0',
            startDate: '2019-05-16',
            talentRate: '2000.0'
          },
          startDate: '2019-07-22',
          status: 'PAID'
        },
        {
          __typename: 'BillingCycle',
          actualCommitment: {
            __typename: 'Commitment',
            availability: 'full_time',
            availabilityHours: 40,
            companyRate: '3800.0',
            startDate: '2019-05-16',
            talentRate: '2000.0'
          },
          endDate: '2019-07-21',
          gid: 'gid://platform/Billing::Cycle/354370',
          hours: '16.0',
          chargedHours: '16.0',
          extraHours: '0.0',
          kind: 'development',
          originalCommitment: {
            __typename: 'Commitment',
            availability: 'full_time',
            availabilityHours: 40,
            companyRate: '3800.0',
            startDate: '2019-05-16',
            talentRate: '2000.0'
          },
          startDate: '2019-07-15',
          status: 'PAID'
        },
        {
          __typename: 'BillingCycle',
          actualCommitment: {
            __typename: 'Commitment',
            availability: 'full_time',
            availabilityHours: 40,
            companyRate: '3800.0',
            startDate: '2019-05-16',
            talentRate: '2000.0'
          },
          endDate: '2019-07-14',
          gid: 'gid://platform/Billing::Cycle/352627',
          hours: '40.0',
          chargedHours: '40.0',
          extraHours: '0.0',
          kind: 'development',
          originalCommitment: {
            __typename: 'Commitment',
            availability: 'full_time',
            availabilityHours: 40,
            companyRate: '3800.0',
            startDate: '2019-05-16',
            talentRate: '2000.0'
          },
          startDate: '2019-07-08',
          status: 'PAID'
        },
        {
          __typename: 'BillingCycle',
          actualCommitment: {
            __typename: 'Commitment',
            availability: 'full_time',
            availabilityHours: 40,
            companyRate: '3800.0',
            startDate: '2019-05-16',
            talentRate: '2000.0'
          },
          endDate: '2019-07-07',
          gid: 'gid://platform/Billing::Cycle/349318',
          hours: '80.0',
          chargedHours: '80.0',
          extraHours: '0.0',
          kind: 'development',
          originalCommitment: {
            __typename: 'Commitment',
            availability: 'full_time',
            availabilityHours: 40,
            companyRate: '3800.0',
            startDate: '2019-05-16',
            talentRate: '2000.0'
          },
          startDate: '2019-06-24',
          status: 'PAID'
        },
        {
          __typename: 'BillingCycle',
          actualCommitment: {
            __typename: 'Commitment',
            availability: 'full_time',
            availabilityHours: 40,
            companyRate: '3800.0',
            startDate: '2019-05-16',
            talentRate: '2000.0'
          },
          endDate: '2019-06-23',
          gid: 'gid://platform/Billing::Cycle/345990',
          hours: '80.0',
          chargedHours: '80.0',
          extraHours: '0.0',
          kind: 'development',
          originalCommitment: {
            __typename: 'Commitment',
            availability: 'full_time',
            availabilityHours: 40,
            companyRate: '3800.0',
            startDate: '2019-05-16',
            talentRate: '2000.0'
          },
          startDate: '2019-06-10',
          status: 'PAID'
        },
        {
          __typename: 'BillingCycle',
          actualCommitment: {
            __typename: 'Commitment',
            availability: 'full_time',
            availabilityHours: 40,
            companyRate: '3800.0',
            startDate: '2019-05-16',
            talentRate: '2000.0'
          },
          endDate: '2019-06-09',
          gid: 'gid://platform/Billing::Cycle/343027',
          hours: '56.0',
          chargedHours: '56.0',
          extraHours: '0.0',
          kind: 'development',
          originalCommitment: {
            __typename: 'Commitment',
            availability: 'full_time',
            availabilityHours: 40,
            companyRate: '3800.0',
            startDate: '2019-05-16',
            talentRate: '2000.0'
          },
          startDate: '2019-05-30',
          status: 'PAID'
        },
        {
          __typename: 'BillingCycle',
          actualCommitment: {
            __typename: 'Commitment',
            availability: 'full_time',
            availabilityHours: 40,
            companyRate: '3800.0',
            startDate: '2019-05-16',
            talentRate: '2000.0'
          },
          endDate: '2019-05-29',
          gid: 'gid://platform/Billing::Cycle/339863',
          hours: '80.0',
          chargedHours: '80.0',
          extraHours: '0.0',
          kind: 'successful_trial',
          originalCommitment: {
            __typename: 'Commitment',
            availability: 'full_time',
            availabilityHours: 40,
            companyRate: '3800.0',
            startDate: '2019-05-16',
            talentRate: '2000.0'
          },
          startDate: '2019-05-16',
          status: 'PAID'
        }
      ]
    }
  }
}
