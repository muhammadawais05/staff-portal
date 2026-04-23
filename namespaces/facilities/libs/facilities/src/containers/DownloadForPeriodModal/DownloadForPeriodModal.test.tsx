import React, { ComponentProps, ReactNode, Suspense } from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import { Form } from '@toptal/picasso-forms'
import { Button } from '@toptal/picasso'
import { ModalForm, Modal } from '@staff-portal/modals-service'
import { FormDatePickerWrapper } from '@staff-portal/forms'

import DownloadForPeriodModal from '.'

jest.mock('@staff-portal/modals-service', () => ({
  ...jest.requireActual('@staff-portal/modals-service'),
  Modal: jest.fn(),
  ModalForm: jest.fn()
}))

jest.mock('@toptal/picasso', () => ({
  ...jest.requireActual('@toptal/picasso'),
  Button: jest.fn()
}))
jest.mock('@toptal/picasso-forms', () => ({
  ...jest.requireActual('@toptal/picasso-forms'),
  Form: {
    ConfigProvider: jest.fn(),
    SubmitButton: jest.fn()
  }
}))
jest.mock('@staff-portal/forms', () => ({
  ...jest.requireActual('@staff-portal/forms'),
  FormDatePickerWrapper: jest.fn()
}))

const ButtonMock = Button as unknown as jest.Mock
const FormMock = Form as unknown as jest.Mock & {
  SubmitButton: jest.Mock
  ConfigProvider: jest.Mock
}
const FormDatePickerWrapperMock = FormDatePickerWrapper as jest.Mock

const ModalMock = Modal as unknown as jest.Mock & {
  Content: jest.Mock
  Actions: jest.Mock
}
const ModalFormMock = ModalForm as jest.Mock

const createPropsMock = (): ComponentProps<typeof DownloadForPeriodModal> => ({
  hideModal: () => {},
  title: 'Modal Title',
  initialStartDate: '2022-01-01',
  initialEndDate: '2022-01-31',
  downloadButtonText: 'Download Button',
  operationVariables: 'operation-variables' as unknown as undefined,
  loading: 'loading' as unknown as boolean,
  onSubmit: () => {}
})

describe('DownloadForPeriodModal', () => {
  beforeEach(() => {
    const modalFormMockFunc = jest.fn(
      ({ title, children }: { title: string; children: ReactNode }) => (
        <>
          <div data-testid='modal-title'>{title}</div>
          {children}
        </>
      )
    )

    ModalMock.mockImplementation(({ children }) => <>{children}</>)
    ModalFormMock.mockImplementation(modalFormMockFunc)
    ModalMock.Content = jest.fn(({ children }) => <>{children}</>)
    ModalMock.Actions = jest.fn(({ children }) => <>{children}</>)
    FormDatePickerWrapperMock.mockImplementation(() => null)
    FormMock.SubmitButton = jest.fn(({ children }) => <>{children}</>)
    FormMock.ConfigProvider = jest.fn(({ children }) => <>{children}</>)

    ButtonMock.mockImplementation(() => null)
  })

  it('renders inner components with expected props passed', () => {
    const props = createPropsMock()

    render(
      <TestWrapper>
        <Suspense fallback={null}>
          <DownloadForPeriodModal {...props} />
        </Suspense>
      </TestWrapper>
    )

    expect(screen.getByTestId('modal-title').textContent).toBe(props.title)

    expect(ModalFormMock).toHaveBeenCalledTimes(1)
    expect(ModalFormMock).toHaveBeenCalledWith(
      expect.objectContaining({
        title: props.title,
        initialValues: {
          startDate: props.initialStartDate,
          endDate: props.initialEndDate
        }
      }),
      {}
    )

    expect(ButtonMock).toHaveBeenCalledTimes(1)
    expect(ButtonMock).toHaveBeenCalledWith(
      expect.objectContaining({
        disabled: props.loading
      }),
      {}
    )

    expect(FormMock.SubmitButton).toHaveBeenCalledTimes(1)
    expect(FormMock.SubmitButton).toHaveBeenCalledWith(
      expect.objectContaining({
        disabled: props.loading,
        children: props.downloadButtonText
      }),
      {}
    )
  })
})
