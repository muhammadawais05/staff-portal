import React, { ComponentProps } from 'react'
import { OperationCallableTypes } from '@staff-portal/graphql/staff'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import NetTermsItem from './NetTermsItem'

jest.mock(
  '@staff-portal/billing/src/_lib/customHooks/useFormSubmission',
  () => () => ({
    handleOnRootLevelError: jest.fn()
  })
)
jest.mock('./utils/useGetNetTerms')
jest.mock('../../data', () => ({
  ...(jest.requireActual('../../data') as object),
  useSetUpdateClientNetTermsMutation: () => [jest.fn()]
}))

const render = (props: ComponentProps<typeof NetTermsItem>) =>
  renderComponent(<NetTermsItem {...props} />)

describe('NetTermsItem', () => {
  describe('when operation is enabled and netTerms is not empty', () => {
    it('should render both label and edit button', () => {
      const { getByTestId } = render({
        initialValues: {
          clientId: 'VjEtQ2xpZW50LTUwNDg0NQ',
          netTerms: 4
        },
        operation: {
          callable: OperationCallableTypes.ENABLED,
          messages: []
        }
      })

      expect(getByTestId('NetTermsItem')).toBeInTheDocument()
      expect(getByTestId('NetTermsItem-label')).toHaveTextContent('Net 4')
      expect(getByTestId('NetTermsItem-disabled')).toHaveTextContent('false')
    })
  })

  describe('when operation is hidden and netTerms is 0', () => {
    it('should not render edit button and label should have Upon Receipt', () => {
      const { getByTestId } = render({
        initialValues: {
          clientId: 'VjEtQ2xpZW50LTUwNDg0NQ',
          netTerms: 0
        },
        operation: {
          callable: OperationCallableTypes.HIDDEN,
          messages: []
        }
      })

      expect(getByTestId('NetTermsItem')).toBeInTheDocument()
      expect(getByTestId('NetTermsItem-label')).toHaveTextContent(
        'Upon Receipt'
      )
      expect(getByTestId('NetTermsItem-disabled')).toHaveTextContent('true')
    })
  })
})
