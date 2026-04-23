import React from 'react'
import { ModalSuspender } from '@staff-portal/modals-service'
import { render } from '@testing-library/react'

import { useGetAvailableJobs } from '../../data/available-jobs/use-get-available-jobs'
import AssignToJobModalForm from '../AssignToJobModalForm/AssignToJobModalForm'
import AssignToJobModalContent from './AssignToJobModalContent'

jest.mock('../../data/available-jobs/use-get-available-jobs')
jest.mock('../AssignToJobModalForm/AssignToJobModalForm')
jest.mock('@staff-portal/modals-service', () => ({
  ModalSuspender: jest.fn()
}))

const ModalSuspenderMock = ModalSuspender as unknown as jest.Mock
const useGetAvailableJobsMock = useGetAvailableJobs as jest.Mock
const AssignToJobModalFormMock = AssignToJobModalForm as jest.Mock

const COMPANY_REPRESENTATIVE_ID = Symbol() as unknown as string
const HIDE_MODAL = Symbol() as unknown as () => void
const OPTIONS = Symbol()

const renderComponent = () =>
  render(
    <AssignToJobModalContent
      companyRepresentativeId={COMPANY_REPRESENTATIVE_ID}
      hideModal={HIDE_MODAL}
    />
  )

describe('AssignToJobModalContent', () => {
  describe('when data is loading', () => {
    it('shows modal suspender', () => {
      useGetAvailableJobsMock.mockReturnValue({ loading: true })
      ModalSuspenderMock.mockReturnValue(null)

      renderComponent()

      expect(ModalSuspenderMock).toHaveBeenCalled()
      expect(useGetAvailableJobsMock).toHaveBeenCalledWith({
        companyRepresentativeId: COMPANY_REPRESENTATIVE_ID
      })
    })
  })

  describe('when data is loaded', () => {
    it('shows modal contents', () => {
      useGetAvailableJobsMock.mockReturnValue({
        loading: false,
        options: OPTIONS
      })
      AssignToJobModalFormMock.mockReturnValue(null)

      renderComponent()

      expect(AssignToJobModalFormMock).toHaveBeenCalledWith(
        {
          hideModal: HIDE_MODAL,
          companyRepresentativeId: COMPANY_REPRESENTATIVE_ID,
          availableJobs: OPTIONS
        },
        {}
      )
      expect(useGetAvailableJobsMock).toHaveBeenCalledWith({
        companyRepresentativeId: COMPANY_REPRESENTATIVE_ID
      })
    })
  })
})
