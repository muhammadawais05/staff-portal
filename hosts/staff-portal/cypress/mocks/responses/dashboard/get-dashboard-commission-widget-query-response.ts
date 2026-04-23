export const getDashboardCommissionWidgetQueryResponse = () => ({
  data: {
    widgets: {
      commissions: {
        months: [
          {
            year: 2021,
            month: 6,
            amount: '2390.84',
            __typename: 'CommissionsWidgetMonth'
          }
        ],
        totalAmount: '92782.92',
        __typename: 'CommissionsWidget'
      },
      __typename: 'Widgets'
    }
  }
})
