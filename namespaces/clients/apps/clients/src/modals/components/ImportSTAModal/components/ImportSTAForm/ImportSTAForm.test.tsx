import React from 'react'
import { render, screen } from '@toptal/picasso/test-utils'
import { TestWrapperWithMocks } from '@staff-portal/test-utils'
import { FormDatePickerWrapper } from '@staff-portal/forms'
import { DEFAULT_ISO_DATE_FORMAT } from '@staff-portal/date-time-utils'

import ImportSTAForm from './ImportSTAForm'
import { useImportSTA } from '../../hooks'

jest.mock('../../hooks', () => ({
  useImportSTA: jest.fn()
}))

jest.mock('@staff-portal/forms', () => ({
  ...jest.requireActual('@staff-portal/forms'),
  FormDatePickerWrapper: jest.fn()
}))

const renderComponent = () => {
  return render(
    <TestWrapperWithMocks>
      <ImportSTAForm companyId={'123'} hideModal={() => {}} />
    </TestWrapperWithMocks>
  )
}

const FormDatePickerWrapperMock = FormDatePickerWrapper as jest.Mock
const useImportSTAMock = useImportSTA as jest.Mock

describe('ImportSTAForm', () => {
  describe('when you pass expected props', () => {
    it('renders as expected', () => {
      useImportSTAMock.mockReturnValue({
        handleSubmit: () => {},
        loading: false,
        contractEffectiveDateEnabled: false
      })

      renderComponent()

      expect(screen.getByTestId('ImportSTAForm-form')).toBeInTheDocument()
      expect(screen.getByTestId('ImportSTAForm-GUID')).toBeInTheDocument()
      expect(screen.getByTestId('ImportSTAForm-submit')).toBeInTheDocument()
    })
  })

  describe('when contract effective date is enabled', () => {
    it('renders contractEffectiveDate field', () => {
      FormDatePickerWrapperMock.mockReturnValue(null)
      useImportSTAMock.mockReturnValue({
        handleSubmit: () => {},
        loading: false,
        contractEffectiveDateEnabled: true
      })

      renderComponent()

      expect(FormDatePickerWrapperMock).toHaveBeenCalledTimes(1)
      expect(FormDatePickerWrapperMock).toHaveBeenCalledWith(
        expect.objectContaining({
          outputDateFormat: DEFAULT_ISO_DATE_FORMAT
        }),
        {}
      )
    })
  })
})
