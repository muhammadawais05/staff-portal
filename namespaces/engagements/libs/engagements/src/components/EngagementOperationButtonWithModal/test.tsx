import React from 'react'
import { render } from '@toptal/picasso/test-utils'
import { Button, ButtonProps } from '@toptal/picasso'
import { TestWrapper } from '@staff-portal/test-utils'

import EngagementOperationButtonWithModal, {
  Props
} from './EngagementOperationButtonWithModal'
import { createEngagementCommonActionsFragmentMock } from '../../data/engagement-common-actions-fragment/mocks'
import { useHandleOperationClick } from '../../services'
import { useMakeRenderEngagementLazyOperation } from '../../data'

jest.mock('@toptal/picasso', () => ({
  ...jest.requireActual('@toptal/picasso'),
  Button: jest.fn()
}))

jest.mock('../../services', () => ({
  useHandleOperationClick: jest.fn()
}))

jest.mock('../../data', () => ({
  useMakeRenderEngagementLazyOperation: jest.fn()
}))

const ButtonMock = Button as unknown as jest.Mock
const useHandleOperationClickMock = useHandleOperationClick as jest.Mock
const useMakeRenderEngagementLazyOperationMock =
  useMakeRenderEngagementLazyOperation as jest.Mock

const engagementMock = createEngagementCommonActionsFragmentMock()

const onClickMock = jest.fn()
const getUseHandleOperationClickMock = (
  partialResult: Partial<ReturnType<typeof useHandleOperationClick>> = {}
): ReturnType<typeof useHandleOperationClick> => ({
  operationIsLoading: false,
  setOperationIsLoading: jest.fn(),
  handleOperationClick: () => onClickMock,
  ...partialResult
})

const getUseMakeRenderEngagementLazyOperationMock =
  (
    params: {
      disabled: boolean
    } = {
      disabled: false
    }
  ) =>
  () =>
  () =>
  (callback: (data: typeof params) => React.ReactNode) =>
    callback(params)

const defaultProps: Props = {
  children: 'Import TOP',
  engagement: engagementMock,
  operationName: 'importTop',
  modalData: {
    loading: false,
    showModal: jest.fn()
  },
  size: 'medium',
  variant: 'primary',
  'data-testid': 'testId'
}
const defaultButtonProps: ButtonProps = {
  children: defaultProps.children,
  disabled: false,
  loading: false,
  size: defaultProps.size,
  variant: defaultProps.variant,
  'data-testid': defaultProps['data-testid'],
  onClick: onClickMock
}

const arrangeTest = (partialProps: Partial<Props> = {}) => {
  const props = {
    ...defaultProps,
    ...partialProps
  }

  render(
    <TestWrapper>
      <EngagementOperationButtonWithModal {...props} />
    </TestWrapper>
  )
}

describe('EngagementOperationButtonWithModal', () => {
  beforeEach(() => {
    ButtonMock.mockImplementation(() => <div />)
    useHandleOperationClickMock.mockReturnValue(
      getUseHandleOperationClickMock()
    )
    useMakeRenderEngagementLazyOperationMock.mockImplementation(
      getUseMakeRenderEngagementLazyOperationMock()
    )
  })

  it('passes correct props to the `Button`', () => {
    arrangeTest()

    expect(ButtonMock).toHaveBeenCalledWith(
      defaultButtonProps,
      expect.anything()
    )
  })

  it('passes loading state to the `Button` when operation is loading', () => {
    useHandleOperationClickMock.mockReturnValue(
      getUseHandleOperationClickMock({
        operationIsLoading: true
      })
    )

    arrangeTest()

    const expectedProps: ButtonProps = {
      ...defaultButtonProps,
      loading: true
    }

    expect(ButtonMock).toHaveBeenCalledWith(expectedProps, expect.anything())
  })

  it('passes loading state to the `Button` when modal is loading', () => {
    arrangeTest({
      modalData: {
        ...defaultProps.modalData,
        loading: true
      }
    })

    const expectedProps: ButtonProps = {
      ...defaultButtonProps,
      loading: true
    }

    expect(ButtonMock).toHaveBeenCalledWith(expectedProps, expect.anything())
  })

  it('passes disabled state to the `Button` when operation is disabled', () => {
    useMakeRenderEngagementLazyOperationMock.mockImplementation(
      getUseMakeRenderEngagementLazyOperationMock({
        disabled: true
      })
    )

    arrangeTest()

    const expectedProps: ButtonProps = {
      ...defaultButtonProps,
      disabled: true
    }

    expect(ButtonMock).toHaveBeenCalledWith(expectedProps, expect.anything())
  })
})
