import React from 'react'
import { render } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import TalentCommissionsSection from './TalentCommissionsSection'
import { useGetTalentJobCommissionsPermissions } from './data/get-talent-job-commissions-permissions.staff.gql'

jest.mock('@staff-portal/billing-widgets', () => ({
  StaffCommissionWidget: () => <div data-testid='commissions-widget' />
}))

jest.mock('@staff-portal/data-layer-service')
jest.mock('./data/get-talent-job-commissions-permissions.staff.gql')

const mockUseGetTalentJobCommissionsPermissions =
  useGetTalentJobCommissionsPermissions as jest.Mock

const arrangeTest = (
  talentId: string,
  data: { viewer: { permits: { canViewJobCommissions: boolean } } } | null,
  loading: boolean
) => {
  mockUseGetTalentJobCommissionsPermissions.mockReturnValue({ data, loading })

  return render(
    <TestWrapper>
      <TalentCommissionsSection talentId={talentId} />
    </TestWrapper>
  )
}

describe('TalentCommissionsSection', () => {
  it('shows section with widget on it', async () => {
    const id = 'VjEtVGFsZW50LTE5NzE4OTc'

    const { getByTestId } = arrangeTest(
      id,
      { viewer: { permits: { canViewJobCommissions: true } } },
      false
    )

    expect(getByTestId('talent-commissions-section')).toBeInTheDocument()
  })
  describe('when page is loading', () => {
    it('displays the skeleton loader', async () => {
      const id = 'VjEtVGFsZW50LTE5NzE4OTc'

      const { getByTestId } = arrangeTest(id, null, true)

      expect(getByTestId('skeleton-loader')).toBeInTheDocument()
    })
  })
  describe('when user does not have permission', () => {
    it('does not display the section', async () => {
      const id = 'VjEtVGFsZW50LTE5NzE4OTc'

      const { queryByTestId } = arrangeTest(
        id,
        { viewer: { permits: { canViewJobCommissions: false } } },
        false
      )

      expect(
        queryByTestId('talent-commissions-section')
      ).not.toBeInTheDocument()
    })
  })
})
