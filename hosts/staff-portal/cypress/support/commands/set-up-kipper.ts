import { LineChartResponse } from '@staff-portal/charts'

import { kipperChartsMock } from '~integration/mocks'

const CHARTS_PATH = 'https://kipper-staging.toptal.net/api/v1/chart.json*'

export const setUpKipper = (data?: Partial<LineChartResponse>) => {
  cy.intercept(CHARTS_PATH, {
    statusCode: 200,
    body: kipperChartsMock(data)
  })
}
