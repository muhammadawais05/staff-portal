export default {
  __typename: 'MemorandumCategoryConnection',
  nodes: [
    {
      __typename: 'MemorandumCategory',
      credit:
        'The start date of the engagement with {talent} on {job} was updated from {old_engagement_start_date} to {new_engagement_start_date}. This resulted in a credit of {working_period} that has been applied to invoice #{invoice_id}.',
      debit:
        'The start date of the engagement with {talent} on {job} was updated from {old_engagement_start_date} to {new_engagement_start_date}. This resulted in an additional charge of {working_period}.',
      id: 'VjEtTWVtb3JhbmR1bUNhdGVnb3J5LTE1',
      name: 'Start date'
    },
    {
      __typename: 'MemorandumCategory',
      credit:
        'The end date of the engagement with {talent} on {job} was updated from {old_engagement_end_date} to {new_engagement_end_date}. This resulted in a credit of {working_period} that has been applied to invoice #{invoice_id}.',
      debit:
        'The end date of the engagement with {talent} on {job} was updated from {old_engagement_end_date} to {new_engagement_end_date}. This resulted in an additional charge of {working_period}.',
      id: 'VjEtTWVtb3JhbmR1bUNhdGVnb3J5LTE2',
      name: 'End date'
    },
    {
      __typename: 'MemorandumCategory',
      credit:
        'The engagement with {talent} on {job} was closed on {engagement_end_date}. This resulted in a credit of {working_period} that has been applied to invoice #{invoice_id}.',
      debit: null,
      id: 'VjEtTWVtb3JhbmR1bUNhdGVnb3J5LTE3',
      name: 'Engagement closed'
    },
    {
      __typename: 'MemorandumCategory',
      credit:
        'The {weekly_or_hourly} rate on the engagement with {client} on {job} was updated from {old_rate} to {new_rate}. This resulted in a credit of {working_period} during the period from {date_from} to {date_to}',
      debit:
        'The {weekly_or_hourly} rate on the engagement with {client} on {job} was updated from {old_rate} to {new_rate}. This resulted in a debit of {working_period} during the period from {date_from} to {date_to}.',
      id: 'VjEtTWVtb3JhbmR1bUNhdGVnb3J5LTE4',
      name: 'Talent rate'
    },
    {
      __typename: 'MemorandumCategory',
      credit:
        'The {weekly_or_hourly} rate on the engagement with {talent} for {job} was updated from {old_rate} to {new_rate}. This resulted in a credit of {working_period} during the period from {date_from} to {date_to} that was applied to invoice #{invoice_id}.',
      debit:
        'The {weekly_or_hourly} rate on the engagement with {talent} for {job} was updated from {old_rate} to {new_rate}. This resulted in a debit of {working_period} during the period from {date_from} to {date_to}.',
      id: 'VjEtTWVtb3JhbmR1bUNhdGVnb3J5LTE5',
      name: 'Company rate'
    },
    {
      __typename: 'MemorandumCategory',
      credit:
        'The engagement with {talent} for {job} was updated from {old_commitment} to {new_commitment}. This resulted in a credit of {working_period} during the period from {date_from} to {date_to} that was applied to invoice #{invoice_id}.',
      debit:
        'The engagement with {talent} for {job} was updated from {old_commitment} to {new_commitment}. This resulted in an additional charge of {working_period} during the period from {date_from} to {date_to} that was applied to invoice #{invoice_id}.',
      id: 'VjEtTWVtb3JhbmR1bUNhdGVnb3J5LTIw',
      name: 'Commitment'
    },
    {
      __typename: 'MemorandumCategory',
      credit:
        'The trial period on the engagement with {talent} on {job} was rejected. This resulted in a credit of {working_period} that has been applied to invoice #{invoice_id}.',
      debit: null,
      id: 'VjEtTWVtb3JhbmR1bUNhdGVnb3J5LTIx',
      name: 'Rejected trial'
    },
    {
      __typename: 'MemorandumCategory',
      credit:
        'The trial period on the engagement with {talent} on {job} was failed. This resulted in a credit of {working_period} that has been applied to invoice #{invoice_id}.',
      debit: null,
      id: 'VjEtTWVtb3JhbmR1bUNhdGVnb3J5LTIy',
      name: 'Failed trial'
    },
    {
      __typename: 'MemorandumCategory',
      credit:
        'The billing period from {billing_date_from} to {billing_date_to} on the engagement with {talent} for {job} was voided. This resulted in a credit of {working_period} that was applied to invoice #{invoice_id}.',
      debit: null,
      id: 'VjEtTWVtb3JhbmR1bUNhdGVnb3J5LTIz',
      name: 'Delete a billing cycle'
    },
    {
      __typename: 'MemorandumCategory',
      credit:
        'The hours worked during the billing period from {billing_date_from} to {billing_date_to} on the engagement with {talent} for {job} were updated. This resulted in a credit of {amount} that was applied to invoice #{invoice_id}.',
      debit:
        'The hours worked during the billing period from {billing_date_from} to {billing_date_to} on the engagement with {talent} for {job} were updated. This resulted in a debit of {working_period}.',
      id: 'VjEtTWVtb3JhbmR1bUNhdGVnb3J5LTI0',
      name: 'Update of a timesheet'
    },
    {
      __typename: 'MemorandumCategory',
      credit:
        'The hours worked during the billing period from {billing_date_from} to {billing_date_to} on the engagement with {talent} for {job} were reversed. This resulted in a credit of {working_period} that was applied to invoice #{invoice_id}.',
      debit: null,
      id: 'VjEtTWVtb3JhbmR1bUNhdGVnb3J5LTI1',
      name: 'Unsubmit a timesheet'
    },
    {
      __typename: 'MemorandumCategory',
      credit:
        'A break from {break_from} to {break_to} on the engagement with {talent} for {job} was added to the billing period from {billing_date_from} to {billing_date_to}. This resulted in a credit of {working_period}.that was applied to invoice #{invoice_id}.',
      debit: null,
      id: 'VjEtTWVtb3JhbmR1bUNhdGVnb3J5LTI2',
      name: 'Engagement break created'
    },
    {
      __typename: 'MemorandumCategory',
      credit:
        'The break during the billing period from {billing_date_from} to {billing_date_to} on the engagement with {talent} for {job} was updated from {old_break_from} - {old_break_to} to {new_break_from} - {new_break_to}. This resulted in a credit of {working_period} that was applied to invoice #{invoice_id}.',
      debit:
        'The break during the billing period from {billing_date_from} to {billing_date_to} on the engagement with {talent} for {job} was updated from {old_break_from} - {old_break_to} to {new_break_from} - {new_break_to}. This resulted in an additional charge of {working_period}.',
      id: 'VjEtTWVtb3JhbmR1bUNhdGVnb3J5LTI3',
      name: 'Engagement break updated'
    },
    {
      __typename: 'MemorandumCategory',
      credit: null,
      debit:
        'The break during the billing period from {billing_date_from} to {billing_date_to} on the engagement with {talent} for {job} was removed. This resulted in an additional charge of {working_period} that was applied to invoice #{invoice_id}.',
      id: 'VjEtTWVtb3JhbmR1bUNhdGVnb3J5LTI4',
      name: 'Engagement break removed'
    },
    {
      __typename: 'MemorandumCategory',
      credit:
        'Credit issued for short payment on invoice #{invoice_id}. Please note that wire fees may be deducted from the amount sent. In the future, these fees will no longer be credited. Please ensure the entire invoice will be paid when sending a wire transfer. Toptal does offer other payment methods such as automatic withdrawal (ACH) to avoid these fees. If you have any questions please contact us at payment@toptal.com.',
      debit: null,
      id: 'VjEtTWVtb3JhbmR1bUNhdGVnb3J5LTI5',
      name: 'Wire fees'
    },
    {
      __typename: 'MemorandumCategory',
      credit:
        'Credit issued to {job} with {talent} for {billing_date_from} to {billing_date_to} applied to invoice #{invoice_id}.',
      debit: null,
      id: 'VjEtTWVtb3JhbmR1bUNhdGVnb3J5LTMw',
      name: 'Generic credit'
    },
    {
      __typename: 'MemorandumCategory',
      credit:
        'Credit issued to {job} with {talent} for {billing_date_from} to {billing_date_to} for payment method discount applied to invoice #{invoice_id}.',
      debit: null,
      id: 'VjEtTWVtb3JhbmR1bUNhdGVnb3J5LTMx',
      name: '3% discount'
    },
    {
      __typename: 'MemorandumCategory',
      credit:
        'Credit issued for deposit refunded due to the job being deleted and applied to invoice #{invoice_id}.',
      debit: null,
      id: 'VjEtTWVtb3JhbmR1bUNhdGVnb3J5LTMy',
      name: 'Deposit refund'
    },
    {
      __typename: 'MemorandumCategory',
      credit:
        'Toptal services provided at no charge, credit issued and applied to invoice #{invoice_id}.',
      debit: null,
      id: 'VjEtTWVtb3JhbmR1bUNhdGVnb3J5LTMz',
      name: 'Investment credit'
    },
    {
      __typename: 'MemorandumCategory',
      credit:
        'Credit issued to {job} with {talent} for {billing_date_from} to {billing_date_to} applied to invoice #{invoice_id}. (CX)',
      debit: null,
      id: 'VjEtTWVtb3JhbmR1bUNhdGVnb3J5LTM0',
      name: 'Disputes - customer service credit'
    },
    {
      __typename: 'MemorandumCategory',
      credit:
        'Credit issued for a late fee refund and applied to invoice #{invoice_id}.',
      debit: null,
      id: 'VjEtTWVtb3JhbmR1bUNhdGVnb3J5LTM1',
      name: 'Late fee credit'
    },
    {
      __typename: 'MemorandumCategory',
      credit:
        'Credit issued for intermediary bank fee and applied to invoice #{invoice_id}.',
      debit: null,
      id: 'VjEtTWVtb3JhbmR1bUNhdGVnb3J5LTM2',
      name: 'Intermediary bank wire fee'
    },
    {
      __typename: 'MemorandumCategory',
      credit:
        'Credit issued to {job} with {talent} for {billing_date_from} to {billing_date_to} applied to invoice #{invoice_id}. (CXE)',
      debit: null,
      id: 'VjEtTWVtb3JhbmR1bUNhdGVnb3J5LTM3',
      name: 'Enterprise customer service credit'
    },
    {
      __typename: 'MemorandumCategory',
      credit:
        'Credit issued for short payment from the Net of tax WH and applied to invoice #{invoice_id}.',
      debit: null,
      id: 'VjEtTWVtb3JhbmR1bUNhdGVnb3J5LTM4',
      name: 'Tax deduction'
    },
    {
      __typename: 'MemorandumCategory',
      credit: 'Credit issued for talent payment.',
      debit:
        'Debit memo issued for the talent payment as {payer_name} will be paying {talent} directly.',
      id: 'VjEtTWVtb3JhbmR1bUNhdGVnb3J5LTM5',
      name: 'Fulcrum'
    },
    {
      __typename: 'MemorandumCategory',
      credit:
        'Credit issued for Beeline/MSP fees deducted from payment and applied to invoice #{invoice_id}.',
      debit: null,
      id: 'VjEtTWVtb3JhbmR1bUNhdGVnb3J5LTQw',
      name: 'ExxonMobil Beeline fees'
    },
    {
      __typename: 'MemorandumCategory',
      credit:
        'Credit issued for Fieldglass fees deducted from payment and applied to invoice #{invoice_id}.',
      debit: null,
      id: 'VjEtTWVtb3JhbmR1bUNhdGVnb3J5LTQx',
      name: 'Fieldglass fees'
    },
    {
      __typename: 'MemorandumCategory',
      credit:
        'Credit issued for PrO Service fee deducted from payment and applied to invoice #{invoice_id}.',
      debit: null,
      id: 'VjEtTWVtb3JhbmR1bUNhdGVnb3J5LTQy',
      name: 'Fuel by McKinsey PrO Service fees'
    },
    {
      __typename: 'MemorandumCategory',
      credit:
        'Adjustment for the monthly rebate of {rebate_per_hour} per hour. {hours_billed} hours billed.',
      debit:
        'Adjustment for the monthly rebate of {rebate_per_hour} per hour. {hours_billed} hours billed.',
      id: 'VjEtTWVtb3JhbmR1bUNhdGVnb3J5LTQz',
      name: 'Pfizer JL Rebate'
    },
    {
      __typename: 'MemorandumCategory',
      credit:
        'Credit issued for an early payment discount deducted from the payment and applied to invoice #{invoice_id}.',
      debit: null,
      id: 'VjEtTWVtb3JhbmR1bUNhdGVnb3J5LTQ0',
      name: 'Early payment discount'
    },
    {
      __typename: 'MemorandumCategory',
      credit:
        'Credit issued for the exchange rate variance and applied to invoice #{invoice_id}',
      debit:
        'Debit issued for the exchange rate variance and applied to invoice #{invoice_id}.',
      id: 'VjEtTWVtb3JhbmR1bUNhdGVnb3J5LTQ1',
      name: 'Exchange rate variance'
    }
  ]
}
