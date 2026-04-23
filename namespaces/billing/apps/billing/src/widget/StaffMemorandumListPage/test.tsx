import React from 'react'
import { BaseAppProps } from '@staff-portal/billing/src/@types/types'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import WidgetStaffMemorandumListPage from '.'

jest.mock('@staff-portal/billing/src/components/App')
jest.mock('@staff-portal/billing/src/utils')
jest.mock('@staff-portal/billing/src/components/Modals')
jest.mock('../../modules/memorandum/pages/MemorandumList')

const render = (props: BaseAppProps) =>
  renderComponent(<WidgetStaffMemorandumListPage {...props} />)

describe('WidgetStaffMemorandumListPage', () => {
  it('renders all required components', () => {
    const { getByTestId } = render()

    expect(getByTestId('App')).toBeInTheDocument()
    expect(getByTestId('ScrollToTop')).toBeInTheDocument()
    expect(getByTestId('MemorandumList')).toBeInTheDocument()
    expect(getByTestId('Modals')).toBeInTheDocument()
  })
})
