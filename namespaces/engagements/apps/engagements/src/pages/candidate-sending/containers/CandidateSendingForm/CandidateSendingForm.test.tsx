import React, { ComponentProps, ReactNode } from 'react'
import { render } from '@toptal/picasso/test-utils'
import { Form, FormSpy, useForm } from '@toptal/picasso-forms'
import { ScrollToTop } from '@staff-portal/ui'

import {
  CancelStepButton,
  NextStepButton,
  PreviousStepButton
} from '../../components'
import { useCandidateSendingContext, useHandleQueryErrors } from '../../hooks'
import CandidateSendingForm from './CandidateSendingForm'
import { FormRegisteredFieldsInitializer } from './components'
import { CandidateSendingStepDirection } from '../../enums'

jest.mock('@staff-portal/data-layer-service')
jest.mock('@staff-portal/ui', () => ({
  ...jest.requireActual('@staff-portal/ui'),
  ScrollToTop: jest.fn()
}))
jest.mock('@toptal/picasso-forms', () => ({
  ...jest.requireActual('@toptal/picasso-forms'),
  Form: jest.fn(),
  FormSpy: jest.fn(),
  useForm: jest.fn()
}))

jest.mock('./components', () => ({
  FormRegisteredFieldsInitializer: jest.fn()
}))
jest.mock('../../components', () => ({
  CancelStepButton: jest.fn(),
  NextStepButton: jest.fn(),
  PreviousStepButton: jest.fn()
}))
jest.mock('../../hooks', () => ({
  useCandidateSendingContext: jest.fn(),
  useHandleQueryErrors: jest.fn()
}))

const useCandidateSendingContextMock = useCandidateSendingContext as jest.Mock
const useHandleQueryErrorsMock = useHandleQueryErrors as jest.Mock
const useFormMock = useForm as jest.Mock

const FormRegisteredFieldsInitializerMock =
  FormRegisteredFieldsInitializer as jest.Mock
const ScrollToTopMock = ScrollToTop as jest.Mock
const CancelStepButtonMock = CancelStepButton as jest.Mock
const NextStepButtonMock = NextStepButton as jest.Mock
const PreviousStepButtonMock = PreviousStepButton as jest.Mock
const FormMock = Form as unknown as jest.Mock
const FormSpyMock = FormSpy as jest.Mock

const renderComponent = ({
  children,
  initialValues,
  destroyOnUnregister,
  formValues,
  direction
}: ComponentProps<typeof CandidateSendingForm> & {
  formValues?: typeof initialValues
  direction?: CandidateSendingStepDirection
}) => {
  useCandidateSendingContextMock.mockImplementation(() => ({
    direction,
    stepAttributesForCurrentStep: {
      availabilityConfirmed: true,
      trialLength: 1
    },
    persistedStepAttributesForCurrentStep: {
      availabilityConfirmed: false,
      trialLength: 2
    }
  }))
  useHandleQueryErrorsMock.mockImplementation(() => ({}))
  useFormMock.mockImplementation(() => ({
    getRegisteredFields: jest.fn()
  }))

  ScrollToTopMock.mockImplementation(() => null)
  CancelStepButtonMock.mockImplementation(() => null)
  NextStepButtonMock.mockImplementation(() => null)
  PreviousStepButtonMock.mockImplementation(() => null)
  FormRegisteredFieldsInitializerMock.mockImplementation(() => null)
  FormMock.mockImplementation(
    ({ children }: { children: ReactNode }) => children
  )
  FormSpyMock.mockImplementation(({ children }) =>
    children({ values: formValues })
  )

  return render(
    <CandidateSendingForm
      children={children}
      initialValues={initialValues}
      destroyOnUnregister={destroyOnUnregister}
    />
  )
}

describe('CandidateSendingAvailabilityStep', () => {
  describe('when data is available', () => {
    it('renders default buttons', () => {
      renderComponent({
        children: false,
        initialValues: null,
        destroyOnUnregister: false
      })

      expect(CancelStepButtonMock).toHaveBeenCalledTimes(1)
      expect(CancelStepButtonMock).toHaveBeenCalledWith(
        expect.objectContaining({
          disabled: false
        }),
        {}
      )
      expect(NextStepButtonMock).toHaveBeenCalledTimes(1)
      expect(NextStepButtonMock).toHaveBeenCalledWith(
        expect.objectContaining({
          disabled: false,
          loading: false
        }),
        {}
      )
      expect(PreviousStepButtonMock).toHaveBeenCalledTimes(1)
      expect(PreviousStepButtonMock).toHaveBeenCalledWith(
        expect.objectContaining({
          disabled: false,
          loading: false,
          onClick: expect.anything()
        }),
        {}
      )
    })

    describe('when `destroyOnUnregister` is falsy', () => {
      it('does not call `FormRegisteredFieldsInitializer`', () => {
        renderComponent({
          children: false,
          initialValues: null,
          destroyOnUnregister: false
        })

        expect(FormRegisteredFieldsInitializerMock).toHaveBeenCalledTimes(0)
      })
    })

    describe('when `destroyOnUnregister` is true', () => {
      it('calls `FormRegisteredFieldsInitializer`', () => {
        renderComponent({
          children: undefined,
          initialValues: null,
          destroyOnUnregister: true
        })

        expect(FormRegisteredFieldsInitializerMock).toHaveBeenCalledTimes(1)
      })
    })

    describe('when direction is `Backward`', () => {
      it('sets initialValues to `stepAttributesForCurrentStep` values', () => {
        renderComponent({
          children: undefined,
          initialValues: {},
          direction: CandidateSendingStepDirection.Backward
        })

        expect(FormMock).toHaveBeenCalledTimes(1)
        expect(FormMock).toHaveBeenCalledWith(
          expect.objectContaining({
            initialValues: {
              availabilityConfirmed: true,
              trialLength: 1
            }
          }),
          {}
        )
      })
    })

    describe('when direction is not `Backward`', () => {
      it('sets initialValues to `persistedStepAttributesForCurrentStep` values', () => {
        renderComponent({
          children: undefined,
          initialValues: {}
        })

        expect(FormMock).toHaveBeenCalledTimes(1)
        expect(FormMock).toHaveBeenCalledWith(
          expect.objectContaining({
            initialValues: {
              availabilityConfirmed: false,
              trialLength: 2
            }
          }),
          {}
        )
      })
    })
  })
})
