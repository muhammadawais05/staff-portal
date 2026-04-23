/* eslint-disable max-lines-per-function */
export const myBilling = function(sinceDate: string) {
  return {
    overview: {
      __typename: 'Overview',
      invoicesDisputed: { __typename: 'InvoicesConnection', nodes: [] },
      invoicesOverdue: {
        __typename: 'InvoicesConnection',
        nodes: [
          {
            __typename: 'Invoice',
            amount: '9600.0',
            subject: {
              __typename: 'Client',
              contact: {
                __typename: 'CompanyRepresentative',
                webResource: {
                  __typename: 'Link',
                  text: 'Sandy Smith',
                  url: 'http://localhost:3000/platform/staff/company_representatives/1111247'
                }
              },
              netTerms: 90,
              webResource: {
                __typename: 'Link',
                text: 'Weber, Smitham and Lehner',
                url: 'http://localhost:3000/platform/staff/companies/1111246'
              }
            },
            dueDate: '2019-09-10',
            id: 'VjEtSW52b2ljZS0yOTEzOTc',
            issueDate: '2018-12-31',
            job: {
              __typename: 'Job',
              webResource: {
                __typename: 'Link',
                text: 'Senior Security Developer (144329)',
                url: 'http://localhost:3000/platform/staff/jobs/144329'
              }
            }
          },
          {
            __typename: 'Invoice',
            amount: '9600.0',
            subject: {
              __typename: 'Client',
              contact: {
                __typename: 'CompanyRepresentative',
                webResource: {
                  __typename: 'Link',
                  text: 'Sandy Smith',
                  url: 'http://localhost:3000/platform/staff/company_representatives/1111247'
                }
              },
              netTerms: 90,
              webResource: {
                __typename: 'Link',
                text: 'Weber, Smitham and Lehner',
                url: 'http://localhost:3000/platform/staff/companies/1111246'
              }
            },
            dueDate: '2019-04-14',
            id: 'VjEtSW52b2ljZS0yOTM3NTM',
            issueDate: '2019-01-14',
            job: {
              __typename: 'Job',
              webResource: {
                __typename: 'Link',
                text: 'Senior Security Developer (144329)',
                url: 'http://localhost:3000/platform/staff/jobs/144329'
              }
            }
          },
          {
            __typename: 'Invoice',
            amount: '9600.0',
            subject: {
              __typename: 'Client',
              contact: {
                __typename: 'CompanyRepresentative',
                webResource: {
                  __typename: 'Link',
                  text: 'Sandy Smith',
                  url: 'http://localhost:3000/platform/staff/company_representatives/1111247'
                }
              },
              netTerms: 90,
              webResource: {
                __typename: 'Link',
                text: 'Weber, Smitham and Lehner',
                url: 'http://localhost:3000/platform/staff/companies/1111246'
              }
            },
            dueDate: '2019-05-12',
            id: 'VjEtSW52b2ljZS0zMDAxMjI',
            issueDate: '2019-02-11',
            job: {
              __typename: 'Job',
              webResource: {
                __typename: 'Link',
                text: 'Senior Security Developer (144329)',
                url: 'http://localhost:3000/platform/staff/jobs/144329'
              }
            }
          },
          {
            __typename: 'Invoice',
            amount: '4800.0',
            subject: {
              __typename: 'Client',
              contact: {
                __typename: 'CompanyRepresentative',
                webResource: {
                  __typename: 'Link',
                  text: 'Sandy Smith',
                  url: 'http://localhost:3000/platform/staff/company_representatives/1111247'
                }
              },
              netTerms: 90,
              webResource: {
                __typename: 'Link',
                text: 'Weber, Smitham and Lehner',
                url: 'http://localhost:3000/platform/staff/companies/1111246'
              }
            },
            dueDate: '2019-05-22',
            id: 'VjEtSW52b2ljZS0zMDI1NTQ',
            issueDate: '2019-02-21',
            job: {
              __typename: 'Job',
              webResource: {
                __typename: 'Link',
                text: 'Senior Security Developer (144329)',
                url: 'http://localhost:3000/platform/staff/jobs/144329'
              }
            }
          }
        ]
      },
      invoicesOverview:
        sinceDate === '1970-01-01'
          ? {
              __typename: 'InvoicesTotals',
              draft: '315715.15',
              inCollections: '315715.15',
              pendingReceipt: '315715.15',
              writtenOff: '315715.15',
              credited: '315715.15',
              disputed: '0.0',
              outstanding: '5351644.22',
              overdue: '752527.5',
              paid: '11790147.45'
            }
          : {
              __typename: 'InvoicesTotals',
              draft: '315715.15',
              inCollections: '315715.15',
              pendingReceipt: '315715.15',
              writtenOff: '315715.15',
              credited: '315715.15',
              disputed: '0.0',
              outstanding: '1128988.25',
              overdue: '0.0',
              paid: '315715.0'
            },
      purchaseOrdersExpiration: {
        __typename: 'PurchaseOrderConnection',
        nodes: [
          {
            __typename: 'PurchaseOrder',
            draftedAmount: '0.0',
            budgetSpent: false,
            client: {
              __typename: 'Client',
              webResource: {
                __typename: 'Link',
                text: 'Weber, Smitham and Lehner',
                url: 'http://localhost:3000/platform/staff/companies/1111246'
              }
            },
            expiryDate: '2020-12-31',
            id: 'VjEtUHVyY2hhc2VPcmRlci0xNzcx',
            invoicedAmount: '11590.0',
            threshold: null,
            totalAmount: '35900.0',
            webResource: {
              __typename: 'Link',
              text: '994176585',
              url: 'http://localhost:3000/platform/staff/purchase_orders/1771'
            }
          },
          {
            __typename: 'PurchaseOrder',
            draftedAmount: '0.0',
            budgetSpent: false,
            client: {
              __typename: 'Client',
              webResource: {
                __typename: 'Link',
                text: 'Gusikowski, Wiza and Murazik',
                url: 'http://localhost:3000/platform/staff/companies/1645890'
              }
            },
            expiryDate: '2020-12-31',
            id: 'VjEtUHVyY2hhc2VPcmRlci0xNzEx',
            invoicedAmount: '50200.0',
            threshold: null,
            totalAmount: '687530.0',
            webResource: {
              __typename: 'Link',
              text: '4467',
              url: 'http://localhost:3000/platform/staff/purchase_orders/1711'
            }
          },
          {
            __typename: 'PurchaseOrder',
            draftedAmount: '0.0',
            budgetSpent: false,
            client: {
              __typename: 'Client',
              webResource: {
                __typename: 'Link',
                text: 'Gusikowski, Wiza and Murazik',
                url: 'http://localhost:3000/platform/staff/companies/1645890'
              }
            },
            expiryDate: '2020-12-31',
            id: 'VjEtUHVyY2hhc2VPcmRlci0xNzA5',
            invoicedAmount: '17480.0',
            threshold: '75.0',
            totalAmount: '95000.0',
            webResource: {
              __typename: 'Link',
              text: '4425',
              url: 'http://localhost:3000/platform/staff/purchase_orders/1709'
            }
          },
          {
            __typename: 'PurchaseOrder',
            draftedAmount: '0.0',
            budgetSpent: false,
            client: {
              __typename: 'Client',
              webResource: {
                __typename: 'Link',
                text: 'Schroeder, Turner and Weimann',
                url: 'http://localhost:3000/platform/staff/companies/609522'
              }
            },
            expiryDate: '2020-07-15',
            id: 'VjEtUHVyY2hhc2VPcmRlci0xNzU4',
            invoicedAmount: '0',
            threshold: '75.0',
            totalAmount: '46080.0',
            webResource: {
              __typename: 'Link',
              text: '994169163',
              url: 'http://localhost:3000/platform/staff/purchase_orders/1758'
            }
          },
          {
            __typename: 'PurchaseOrder',
            draftedAmount: '0.0',
            budgetSpent: false,
            client: {
              __typename: 'Client',
              webResource: {
                __typename: 'Link',
                text: 'Champlin, Schmitt and Rippin',
                url: 'http://localhost:3000/platform/staff/companies/731786'
              }
            },
            expiryDate: '2020-06-30',
            id: 'VjEtUHVyY2hhc2VPcmRlci0xNzQ0',
            invoicedAmount: '15840.0',
            threshold: null,
            totalAmount: '50226.0',
            webResource: {
              __typename: 'Link',
              text: '994165810',
              url: 'http://localhost:3000/platform/staff/purchase_orders/1744'
            }
          }
        ]
      },
      purchaseOrdersLimit: {
        __typename: 'PurchaseOrderConnection',
        nodes: [
          {
            __typename: 'PurchaseOrder',
            draftedAmount: '0.0',
            budgetSpent: true,
            client: {
              __typename: 'Client',
              webResource: {
                __typename: 'Link',
                text: 'Weber, Smitham and Lehner',
                url: 'http://localhost:3000/platform/staff/companies/1111246'
              }
            },
            expiryDate: null,
            id: 'VjEtUHVyY2hhc2VPcmRlci00MTU',
            invoicedAmount: '28800.0',
            threshold: '75.0',
            totalAmount: '20160.0',
            webResource: {
              __typename: 'Link',
              text: '993997054',
              url: 'http://localhost:3000/platform/staff/purchase_orders/415'
            }
          },
          {
            __typename: 'PurchaseOrder',
            draftedAmount: '0.0',
            budgetSpent: true,
            client: {
              __typename: 'Client',
              webResource: {
                __typename: 'Link',
                text: 'Beer-Bauch ME',
                url: 'http://localhost:3000/platform/staff/companies/731828'
              }
            },
            expiryDate: null,
            id: 'VjEtUHVyY2hhc2VPcmRlci0yODU',
            invoicedAmount: '69472.52',
            threshold: '85.0',
            totalAmount: '62400.0',
            webResource: {
              __typename: 'Link',
              text: '993881013',
              url: 'http://localhost:3000/platform/staff/purchase_orders/285'
            }
          },
          {
            __typename: 'PurchaseOrder',
            draftedAmount: '0.0',
            budgetSpent: true,
            client: {
              __typename: 'Client',
              webResource: {
                __typename: 'Link',
                text: 'Hahn, Miller and Douglas',
                url: 'http://localhost:3000/platform/staff/companies/1581333'
              }
            },
            expiryDate: null,
            id: 'VjEtUHVyY2hhc2VPcmRlci0xNTkx',
            invoicedAmount: '77000.0',
            threshold: '85.0',
            totalAmount: '70000.0',
            webResource: {
              __typename: 'Link',
              text: '4150583462',
              url: 'http://localhost:3000/platform/staff/purchase_orders/1591'
            }
          },
          {
            __typename: 'PurchaseOrder',
            draftedAmount: '0.0',
            budgetSpent: true,
            client: {
              __typename: 'Client',
              webResource: {
                __typename: 'Link',
                text: 'Weber, Smitham and Lehner',
                url: 'http://localhost:3000/platform/staff/companies/1111246'
              }
            },
            expiryDate: null,
            id: 'VjEtUHVyY2hhc2VPcmRlci0zNDM',
            invoicedAmount: '86400.0',
            threshold: '75.0',
            totalAmount: '80640.0',
            webResource: {
              __typename: 'Link',
              text: '993935743',
              url: 'http://localhost:3000/platform/staff/purchase_orders/343'
            }
          },
          {
            __typename: 'PurchaseOrder',
            draftedAmount: '0.0',
            budgetSpent: true,
            client: {
              __typename: 'Client',
              webResource: {
                __typename: 'Link',
                text: 'Schroeder, Turner and Weimann',
                url: 'http://localhost:3000/platform/staff/companies/609522'
              }
            },
            expiryDate: null,
            id: 'VjEtUHVyY2hhc2VPcmRlci0zMTE',
            invoicedAmount: '50400.0',
            threshold: '75.0',
            totalAmount: '46800.0',
            webResource: {
              __typename: 'Link',
              text: '993905059',
              url: 'http://localhost:3000/platform/staff/purchase_orders/311'
            }
          }
        ]
      },
      timesheets: { __typename: 'TimesheetsConnection', nodes: [] }
    }
  }
}

// eslint-disable-next-line func-style
export function teamBilling(sinceDate: string) {
  return {
    overview: {
      __typename: 'Overview',
      invoicesDisputed: {
        __typename: 'InvoicesConnection',
        nodes: [
          {
            __typename: 'Invoice',
            amount: '500.0',
            subject: {
              __typename: 'Client',
              contact: {
                __typename: 'CompanyRepresentative',
                webResource: {
                  __typename: 'Link',
                  text: 'Jacquiline Frami',
                  url: 'http://localhost:3000/platform/staff/company_representatives/1479046'
                }
              },
              netTerms: 10,
              webResource: {
                __typename: 'Link',
                text: 'Schimmel-Wolf XZ',
                url: 'http://localhost:3000/platform/staff/companies/1476747'
              }
            },
            dueDate: '2019-06-24',
            id: 'VjEtSW52b2ljZS0zMjkxNjA',
            issueDate: '2019-06-24',
            job: {
              __typename: 'Job',
              webResource: {
                __typename: 'Link',
                text: 'Lead Marketing Developer (176873)',
                url: 'http://localhost:3000/platform/staff/jobs/176873'
              }
            }
          },
          {
            __typename: 'Invoice',
            amount: '5568.0',
            subject: {
              __typename: 'Client',
              contact: {
                __typename: 'CompanyRepresentative',
                webResource: {
                  __typename: 'Link',
                  text: 'Jacquiline Frami',
                  url: 'http://localhost:3000/platform/staff/company_representatives/1479046'
                }
              },
              netTerms: 10,
              webResource: {
                __typename: 'Link',
                text: 'Schimmel-Wolf XZ',
                url: 'http://localhost:3000/platform/staff/companies/1476747'
              }
            },
            dueDate: '2019-09-11',
            id: 'VjEtSW52b2ljZS0zNDQ0ODg',
            issueDate: '2019-09-01',
            job: {
              __typename: 'Job',
              webResource: {
                __typename: 'Link',
                text: 'Lead Marketing Developer (176873)',
                url: 'http://localhost:3000/platform/staff/jobs/176873'
              }
            }
          },
          {
            __typename: 'Invoice',
            amount: '6786.0',
            subject: {
              __typename: 'Client',
              contact: {
                __typename: 'CompanyRepresentative',
                webResource: {
                  __typename: 'Link',
                  text: 'Jacquiline Frami',
                  url: 'http://localhost:3000/platform/staff/company_representatives/1479046'
                }
              },
              netTerms: 10,
              webResource: {
                __typename: 'Link',
                text: 'Schimmel-Wolf XZ',
                url: 'http://localhost:3000/platform/staff/companies/1476747'
              }
            },
            dueDate: '2019-08-15',
            id: 'VjEtSW52b2ljZS0zMzg1MzA',
            issueDate: '2019-08-05',
            job: {
              __typename: 'Job',
              webResource: {
                __typename: 'Link',
                text: 'Lead Marketing Developer (176873)',
                url: 'http://localhost:3000/platform/staff/jobs/176873'
              }
            }
          },
          {
            __typename: 'Invoice',
            amount: '5568.0',
            subject: {
              __typename: 'Client',
              contact: {
                __typename: 'CompanyRepresentative',
                webResource: {
                  __typename: 'Link',
                  text: 'Jacquiline Frami',
                  url: 'http://localhost:3000/platform/staff/company_representatives/1479046'
                }
              },
              netTerms: 10,
              webResource: {
                __typename: 'Link',
                text: 'Schimmel-Wolf XZ',
                url: 'http://localhost:3000/platform/staff/companies/1476747'
              }
            },
            dueDate: '2019-08-28',
            id: 'VjEtSW52b2ljZS0zNDEyMDg',
            issueDate: '2019-08-18',
            job: {
              __typename: 'Job',
              webResource: {
                __typename: 'Link',
                text: 'Lead Marketing Developer (176873)',
                url: 'http://localhost:3000/platform/staff/jobs/176873'
              }
            }
          },
          {
            __typename: 'Invoice',
            amount: '3828.0',
            subject: {
              __typename: 'Client',
              contact: {
                __typename: 'CompanyRepresentative',
                webResource: {
                  __typename: 'Link',
                  text: 'Jacquiline Frami',
                  url: 'http://localhost:3000/platform/staff/company_representatives/1479046'
                }
              },
              netTerms: 10,
              webResource: {
                __typename: 'Link',
                text: 'Schimmel-Wolf XZ',
                url: 'http://localhost:3000/platform/staff/companies/1476747'
              }
            },
            dueDate: '2019-08-05',
            id: 'VjEtSW52b2ljZS0zMzU5NzM',
            issueDate: '2019-07-26',
            job: {
              __typename: 'Job',
              webResource: {
                __typename: 'Link',
                text: 'Lead Marketing Developer (176873)',
                url: 'http://localhost:3000/platform/staff/jobs/176873'
              }
            }
          }
        ]
      },
      invoicesOverdue: {
        __typename: 'InvoicesConnection',
        nodes: [
          {
            __typename: 'Invoice',
            amount: '680.0',
            subject: {
              __typename: 'Client',
              contact: {
                __typename: 'CompanyRepresentative',
                webResource: {
                  __typename: 'Link',
                  text: 'Echo Pouros',
                  url: 'http://localhost:3000/platform/staff/company_representatives/1135476'
                }
              },
              netTerms: 90,
              webResource: {
                __typename: 'Link',
                text: 'Hartmann, Daugherty and Braun',
                url: 'http://localhost:3000/platform/staff/companies/409838'
              }
            },
            dueDate: '2018-07-30',
            id: 'VjEtSW52b2ljZS0yNDk0NzU',
            issueDate: '2018-05-01',
            job: {
              __typename: 'Job',
              webResource: {
                __typename: 'Link',
                text: 'Chief Solutions Developer (135215)',
                url: 'http://localhost:3000/platform/staff/jobs/135215'
              }
            }
          },
          {
            __typename: 'Invoice',
            amount: '910.0',
            subject: {
              __typename: 'Client',
              contact: {
                __typename: 'CompanyRepresentative',
                webResource: {
                  __typename: 'Link',
                  text: 'Leola Lebsack',
                  url: 'http://localhost:3000/platform/staff/company_representatives/1034071'
                }
              },
              netTerms: 90,
              webResource: {
                __typename: 'Link',
                text: 'Lindgren, Schmidt and Krajcik',
                url: 'http://localhost:3000/platform/staff/companies/650439'
              }
            },
            dueDate: '2018-11-11',
            id: 'VjEtSW52b2ljZS0yNjY5NTI',
            issueDate: '2018-08-13',
            job: {
              __typename: 'Job',
              webResource: {
                __typename: 'Link',
                text: 'Chief Program Developer (133328)',
                url: 'http://localhost:3000/platform/staff/jobs/133328'
              }
            }
          },
          {
            __typename: 'Invoice',
            amount: '6800.0',
            subject: {
              __typename: 'Client',
              contact: {
                __typename: 'CompanyRepresentative',
                webResource: {
                  __typename: 'Link',
                  text: 'Echo Pouros',
                  url: 'http://localhost:3000/platform/staff/company_representatives/1135476'
                }
              },
              netTerms: 90,
              webResource: {
                __typename: 'Link',
                text: 'Hartmann, Daugherty and Braun',
                url: 'http://localhost:3000/platform/staff/companies/409838'
              }
            },
            dueDate: '2018-11-19',
            id: 'VjEtSW52b2ljZS0yNjgyODY',
            issueDate: '2018-08-21',
            job: {
              __typename: 'Job',
              webResource: {
                __typename: 'Link',
                text: 'Chief Security Developer (141718)',
                url: 'http://localhost:3000/platform/staff/jobs/141718'
              }
            }
          },
          {
            __typename: 'Invoice',
            amount: '6800.0',
            subject: {
              __typename: 'Client',
              contact: {
                __typename: 'CompanyRepresentative',
                webResource: {
                  __typename: 'Link',
                  text: 'Echo Pouros',
                  url: 'http://localhost:3000/platform/staff/company_representatives/1135476'
                }
              },
              netTerms: 90,
              webResource: {
                __typename: 'Link',
                text: 'Hartmann, Daugherty and Braun',
                url: 'http://localhost:3000/platform/staff/companies/409838'
              }
            },
            dueDate: '2018-11-19',
            id: 'VjEtSW52b2ljZS0yNjgyODU',
            issueDate: '2018-08-21',
            job: {
              __typename: 'Job',
              webResource: {
                __typename: 'Link',
                text: 'Chief Research Developer (141716)',
                url: 'http://localhost:3000/platform/staff/jobs/141716'
              }
            }
          },
          {
            __typename: 'Invoice',
            amount: '6120.0',
            subject: {
              __typename: 'Client',
              contact: {
                __typename: 'CompanyRepresentative',
                webResource: {
                  __typename: 'Link',
                  text: 'Echo Pouros',
                  url: 'http://localhost:3000/platform/staff/company_representatives/1135476'
                }
              },
              netTerms: 90,
              webResource: {
                __typename: 'Link',
                text: 'Hartmann, Daugherty and Braun',
                url: 'http://localhost:3000/platform/staff/companies/409838'
              }
            },
            dueDate: '2018-11-30',
            id: 'VjEtSW52b2ljZS0yNzAxMTU',
            issueDate: '2018-09-01',
            job: {
              __typename: 'Job',
              webResource: {
                __typename: 'Link',
                text: 'Chief Research Developer (141716)',
                url: 'http://localhost:3000/platform/staff/jobs/141716'
              }
            }
          }
        ]
      },
      invoicesOverview:
        sinceDate === '1970-01-01'
          ? {
              __typename: 'InvoicesTotals',
              disputed: '24081.6',
              outstanding: '42312190.11',
              overdue: '8413751.21',
              paid: '248650836.23'
            }
          : {
              __typename: 'InvoicesTotals',
              disputed: '0.0',
              outstanding: '19248734.64',
              overdue: '1487737.78',
              paid: '5985190.78'
            },
      purchaseOrdersExpiration: {
        __typename: 'PurchaseOrderConnection',
        nodes: [
          {
            __typename: 'PurchaseOrder',
            draftedAmount: '0.0',
            budgetSpent: false,
            client: {
              __typename: 'Client',
              webResource: {
                __typename: 'Link',
                text: 'Quitzon, Konopelski and Toy',
                url: 'http://localhost:3000/platform/staff/companies/1259373'
              }
            },
            expiryDate: '2021-01-02',
            id: 'VjEtUHVyY2hhc2VPcmRlci0xNjk4',
            invoicedAmount: '281960.0',
            threshold: '85.0',
            totalAmount: '1017240.0',
            webResource: {
              __typename: 'Link',
              text: '6000240484',
              url: 'http://localhost:3000/platform/staff/purchase_orders/1698'
            }
          },
          {
            __typename: 'PurchaseOrder',
            draftedAmount: '0.0',
            budgetSpent: false,
            client: {
              __typename: 'Client',
              webResource: {
                __typename: 'Link',
                text: 'Hartmann, Daugherty and Braun',
                url: 'http://localhost:3000/platform/staff/companies/409838'
              }
            },
            expiryDate: '2020-12-31',
            id: 'VjEtUHVyY2hhc2VPcmRlci0xNzQz',
            invoicedAmount: '0',
            threshold: null,
            totalAmount: '45360.0',
            webResource: {
              __typename: 'Link',
              text: '994165098',
              url: 'http://localhost:3000/platform/staff/purchase_orders/1743'
            }
          },
          {
            __typename: 'PurchaseOrder',
            draftedAmount: '0.0',
            budgetSpent: false,
            client: {
              __typename: 'Client',
              webResource: {
                __typename: 'Link',
                text: 'Hartmann, Daugherty and Braun',
                url: 'http://localhost:3000/platform/staff/companies/409838'
              }
            },
            expiryDate: '2020-12-31',
            id: 'VjEtUHVyY2hhc2VPcmRlci0xNjg5',
            invoicedAmount: '42840.0',
            threshold: '75.0',
            totalAmount: '45360.0',
            webResource: {
              __typename: 'Link',
              text: '994138513',
              url: 'http://localhost:3000/platform/staff/purchase_orders/1689'
            }
          },
          {
            __typename: 'PurchaseOrder',
            draftedAmount: '0.0',
            budgetSpent: false,
            client: {
              __typename: 'Client',
              webResource: {
                __typename: 'Link',
                text: 'Keeling-Rath UM',
                url: 'http://localhost:3000/platform/staff/companies/535890'
              }
            },
            expiryDate: '2020-12-31',
            id: 'VjEtUHVyY2hhc2VPcmRlci0xNjE0',
            invoicedAmount: '162480.0',
            threshold: '75.0',
            totalAmount: '208680.0',
            webResource: {
              __typename: 'Link',
              text: '8502448324',
              url: 'http://localhost:3000/platform/staff/purchase_orders/1614'
            }
          },
          {
            __typename: 'PurchaseOrder',
            draftedAmount: '0.0',
            budgetSpent: false,
            client: {
              __typename: 'Client',
              webResource: {
                __typename: 'Link',
                text: 'Weber, Smitham and Lehner',
                url: 'http://localhost:3000/platform/staff/companies/1111246'
              }
            },
            expiryDate: '2020-12-31',
            id: 'VjEtUHVyY2hhc2VPcmRlci0xNzcx',
            invoicedAmount: '11590.0',
            threshold: null,
            totalAmount: '35900.0',
            webResource: {
              __typename: 'Link',
              text: '994176585',
              url: 'http://localhost:3000/platform/staff/purchase_orders/1771'
            }
          }
        ]
      },
      purchaseOrdersLimit: {
        __typename: 'PurchaseOrderConnection',
        nodes: [
          {
            __typename: 'PurchaseOrder',
            draftedAmount: '0.0',
            budgetSpent: true,
            client: {
              __typename: 'Client',
              webResource: {
                __typename: 'Link',
                text: 'Bergnaum-Renner MH',
                url: 'http://localhost:3000/platform/staff/companies/647103'
              }
            },
            expiryDate: null,
            id: 'VjEtUHVyY2hhc2VPcmRlci0yNDg',
            invoicedAmount: '108000.0',
            threshold: '85.0',
            totalAmount: '25000.0',
            webResource: {
              __typename: 'Link',
              text: '3000206630',
              url: 'http://localhost:3000/platform/staff/purchase_orders/248'
            }
          },
          {
            __typename: 'PurchaseOrder',
            draftedAmount: '0.0',
            budgetSpent: true,
            client: {
              __typename: 'Client',
              webResource: {
                __typename: 'Link',
                text: 'Skiles-Fadel FV',
                url: 'http://localhost:3000/platform/staff/companies/406974'
              }
            },
            expiryDate: null,
            id: 'VjEtUHVyY2hhc2VPcmRlci0yNDU',
            invoicedAmount: '81280.0',
            threshold: '85.0',
            totalAmount: '38400.0',
            webResource: {
              __typename: 'Link',
              text: '17509',
              url: 'http://localhost:3000/platform/staff/purchase_orders/245'
            }
          },
          {
            __typename: 'PurchaseOrder',
            draftedAmount: '0.0',
            budgetSpent: true,
            client: {
              __typename: 'Client',
              webResource: {
                __typename: 'Link',
                text: 'Hamill-Brekke BU',
                url: 'http://localhost:3000/platform/staff/companies/1623041'
              }
            },
            expiryDate: null,
            id: 'VjEtUHVyY2hhc2VPcmRlci0xNjUy',
            invoicedAmount: '257140.76',
            threshold: '75.0',
            totalAmount: '248312.0',
            webResource: {
              __typename: 'Link',
              text: '8600219414',
              url: 'http://localhost:3000/platform/staff/purchase_orders/1652'
            }
          },
          {
            __typename: 'PurchaseOrder',
            draftedAmount: '0.0',
            budgetSpent: true,
            client: {
              __typename: 'Client',
              webResource: {
                __typename: 'Link',
                text: 'Weber, Smitham and Lehner',
                url: 'http://localhost:3000/platform/staff/companies/1111246'
              }
            },
            expiryDate: null,
            id: 'VjEtUHVyY2hhc2VPcmRlci00MTU',
            invoicedAmount: '28800.0',
            threshold: '75.0',
            totalAmount: '20160.0',
            webResource: {
              __typename: 'Link',
              text: '993997054',
              url: 'http://localhost:3000/platform/staff/purchase_orders/415'
            }
          },
          {
            __typename: 'PurchaseOrder',
            draftedAmount: '0.0',
            budgetSpent: true,
            client: {
              __typename: 'Client',
              webResource: {
                __typename: 'Link',
                text: 'Schinner, Kozey and Sipes',
                url: 'http://localhost:3000/platform/staff/companies/1278862'
              }
            },
            expiryDate: '2019-12-31',
            id: 'VjEtUHVyY2hhc2VPcmRlci0xNTc1',
            invoicedAmount: '190840.0',
            threshold: '85.0',
            totalAmount: '182400.0',
            webResource: {
              __typename: 'Link',
              text: 'BE19090131',
              url: 'http://localhost:3000/platform/staff/purchase_orders/1575'
            }
          }
        ]
      },
      timesheets: {
        __typename: 'TimesheetsConnection',
        nodes: [
          {
            __typename: 'Timesheet',
            client: {
              __typename: 'Client',
              webResource: {
                __typename: 'Link',
                text: 'Bogan-Feeney LZ',
                url: 'http://localhost:3000/platform/staff/companies/577108'
              }
            },
            dueDate: '2020-06-11',
            id: 'VjEtVGltZXNoZWV0LTQ0MDU4OQ',
            job: {
              __typename: 'Job',
              webResource: {
                __typename: 'Link',
                text: 'Lead Research Developer (157316)',
                url: 'http://localhost:3000/platform/staff/jobs/157316'
              }
            },
            recruiter: {
              __typename: 'Staff',
              webResource: {
                __typename: 'Link',
                text: 'Pablo Sebastián Sánchez',
                url: 'http://localhost:3000/platform/staff/staff/328473'
              }
            },
            talent: {
              __typename: 'Talent',
              webResource: {
                __typename: 'Link',
                text: 'Duncan Erdman',
                url: 'http://localhost:3000/platform/staff/talents/123154'
              }
            }
          },
          {
            __typename: 'Timesheet',
            client: {
              __typename: 'Client',
              webResource: {
                __typename: 'Link',
                text: 'Schaden-Mueller WZ',
                url: 'http://localhost:3000/platform/staff/companies/655264'
              }
            },
            dueDate: '2020-06-11',
            id: 'VjEtVGltZXNoZWV0LTQ0MDU5MQ',
            job: {
              __typename: 'Job',
              webResource: {
                __typename: 'Link',
                text: 'Principal Brand Developer (172859)',
                url: 'http://localhost:3000/platform/staff/jobs/172859'
              }
            },
            recruiter: {
              __typename: 'Staff',
              webResource: {
                __typename: 'Link',
                text: 'Ivan Radigales Creus',
                url: 'http://localhost:3000/platform/staff/staff/420287'
              }
            },
            talent: {
              __typename: 'Talent',
              webResource: {
                __typename: 'Link',
                text: 'Andrea Ebert',
                url: 'http://localhost:3000/platform/staff/talents/862512'
              }
            }
          },
          {
            __typename: 'Timesheet',
            client: {
              __typename: 'Client',
              webResource: {
                __typename: 'Link',
                text: 'Schaden-Mueller WZ',
                url: 'http://localhost:3000/platform/staff/companies/655264'
              }
            },
            dueDate: '2020-06-11',
            id: 'VjEtVGltZXNoZWV0LTQ0MDU5Mg',
            job: {
              __typename: 'Job',
              webResource: {
                __typename: 'Link',
                text: 'Principal Brand Developer (172859)',
                url: 'http://localhost:3000/platform/staff/jobs/172859'
              }
            },
            recruiter: {
              __typename: 'Staff',
              webResource: {
                __typename: 'Link',
                text: 'Ivan Radigales Creus',
                url: 'http://localhost:3000/platform/staff/staff/420287'
              }
            },
            talent: {
              __typename: 'Talent',
              webResource: {
                __typename: 'Link',
                text: 'Vincenza Hettinger',
                url: 'http://localhost:3000/platform/staff/talents/338116'
              }
            }
          },
          {
            __typename: 'Timesheet',
            client: {
              __typename: 'Client',
              webResource: {
                __typename: 'Link',
                text: 'Schaden-Mueller WZ',
                url: 'http://localhost:3000/platform/staff/companies/655264'
              }
            },
            dueDate: '2020-06-11',
            id: 'VjEtVGltZXNoZWV0LTQ0MDU5Mw',
            job: {
              __typename: 'Job',
              webResource: {
                __typename: 'Link',
                text: 'Principal Brand Developer (173300)',
                url: 'http://localhost:3000/platform/staff/jobs/173300'
              }
            },
            recruiter: {
              __typename: 'Staff',
              webResource: {
                __typename: 'Link',
                text: 'Ivan Radigales Creus',
                url: 'http://localhost:3000/platform/staff/staff/420287'
              }
            },
            talent: {
              __typename: 'Talent',
              webResource: {
                __typename: 'Link',
                text: 'Hyman Cassin',
                url: 'http://localhost:3000/platform/staff/talents/127252'
              }
            }
          },
          {
            __typename: 'Timesheet',
            client: {
              __typename: 'Client',
              webResource: {
                __typename: 'Link',
                text: 'Schaden-Mueller WZ',
                url: 'http://localhost:3000/platform/staff/companies/655264'
              }
            },
            dueDate: '2020-06-11',
            id: 'VjEtVGltZXNoZWV0LTQ0MDU5NA',
            job: {
              __typename: 'Job',
              webResource: {
                __typename: 'Link',
                text: 'Senior Marketing Developer (162398)',
                url: 'http://localhost:3000/platform/staff/jobs/162398'
              }
            },
            recruiter: {
              __typename: 'Staff',
              webResource: {
                __typename: 'Link',
                text: 'Ivan Radigales Creus',
                url: 'http://localhost:3000/platform/staff/staff/420287'
              }
            },
            talent: {
              __typename: 'Talent',
              webResource: {
                __typename: 'Link',
                text: 'Samella Smitham',
                url: 'http://localhost:3000/platform/staff/talents/844490'
              }
            }
          }
        ]
      }
    }
  }
}
