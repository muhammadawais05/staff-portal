import React, { ComponentProps } from 'react'
import { OperationCallableTypes } from '@staff-portal/graphql/staff'
import renderComponent from '@staff-portal/billing/src/utils/tests'
import { EMPTY_DATA } from '@staff-portal/billing/src/_lib/helpers'

import { YesOrNoItem } from './YesOrNoItem'

const render = (props: ComponentProps<typeof YesOrNoItem>) =>
  renderComponent(<YesOrNoItem data-testid='YesOrNoItem' {...props} />)

const mockQueryValue = jest.fn().mockReturnValue({
  request: () => {},
  data: null,
  loading: false
})

describe('YesOrNoItem', () => {
  describe('when operation is enabled and field is defined', () => {
    it('should render both label with YES and edit button', () => {
      const { getByTestId } = render({
        value: true,
        operation: {
          callable: OperationCallableTypes.ENABLED,
          messages: []
        },
        onSubmit: jest.fn(),
        name: 'test',
        queryValue: mockQueryValue
      })

      expect(getByTestId('YesOrNoItem-test')).toBeInTheDocument()
      expect(getByTestId('YesOrNoItem-test-viewer')).toHaveTextContent('Yes')
    })
    it('should render both label with NO and edit button', () => {
      const { getByTestId } = render({
        value: false,
        operation: {
          callable: OperationCallableTypes.ENABLED,
          messages: []
        },
        onSubmit: jest.fn(),
        name: 'test',
        queryValue: mockQueryValue
      })

      expect(getByTestId('YesOrNoItem-test-viewer')).toHaveTextContent('No')
    })
  })

  describe('when operation is hidden and field is undefined', () => {
    it('should not render edit button and label should have empty data sign', () => {
      const { getByTestId } = render({
        value: null,
        hasEmptyOption: true,
        operation: {
          callable: OperationCallableTypes.HIDDEN,
          messages: []
        },
        onSubmit: jest.fn(),
        name: 'test',
        queryValue: mockQueryValue
      })

      expect(getByTestId('YesOrNoItem-test-viewer')).toHaveTextContent(
        EMPTY_DATA
      )
    })
  })
})
