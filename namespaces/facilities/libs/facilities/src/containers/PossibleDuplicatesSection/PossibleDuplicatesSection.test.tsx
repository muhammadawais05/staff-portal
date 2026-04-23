import React, { ComponentProps } from 'react'
import { render, screen } from '@toptal/picasso/test-utils'
import { OperationCallableTypes } from '@staff-portal/graphql/staff'
import {
  GetLazyOperationVariables,
  // https://toptal-core.atlassian.net/browse/SPC-1804
  // eslint-disable-next-line no-restricted-imports
  LazyOperation
} from '@staff-portal/operations'

import PossibleDuplicatesSection from './PossibleDuplicatesSection'

jest.mock('@staff-portal/operations/src/components/LazyOperation', () =>
  jest.fn()
)

const mockedLazyOperation = LazyOperation as jest.Mock

const resolvePossibleDuplicates = () => {}
const operationVariables = {} as GetLazyOperationVariables
const enabledOperation = {
  messages: [],
  callable: OperationCallableTypes.ENABLED
}

const renderComponent = (
  props: Partial<ComponentProps<typeof PossibleDuplicatesSection>> = {}
) => {
  render(
    <PossibleDuplicatesSection
      loading={false}
      operationVariables={operationVariables}
      resolvePossibleDuplicates={resolvePossibleDuplicates}
      operation={enabledOperation}
      {...props}
    >
      {props.children}
    </PossibleDuplicatesSection>
  )
}

describe('PossibleDuplicatesSection', () => {
  beforeEach(() => {
    mockedLazyOperation.mockRejectedValue(null)
  })

  describe('when prop hidden is true', () => {
    it('does not render the section', () => {
      renderComponent({ hidden: true })

      expect(screen.queryByTestId('possible-duplicates-section')).toBeNull()
    })
  })

  describe('when called with the expected props', () => {
    it('renders section and children, and calls lazy operation', () => {
      mockedLazyOperation.mockImplementation(({ children }) =>
        children({ disabled: false })
      )

      renderComponent({
        children: <div data-testid='PossibleDuplicatesSection-children' />
      })

      expect(mockedLazyOperation).toHaveBeenCalledWith(
        {
          initialOperation: enabledOperation,
          getLazyOperationVariables: operationVariables,
          children: expect.any(Function)
        },
        {}
      )
      expect(
        screen.getByTestId('possible-duplicates-section')
      ).toBeInTheDocument()
      expect(
        screen.getByTestId('PossibleDuplicates-mark-as-resolved')
      ).toBeInTheDocument()
      expect(
        screen.getByTestId('PossibleDuplicatesSection-children')
      ).toBeInTheDocument()
    })
  })
})
