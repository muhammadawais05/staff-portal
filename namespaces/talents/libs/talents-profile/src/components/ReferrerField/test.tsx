import React from 'react'
import { render, screen } from '@testing-library/react'
import { NO_VALUE } from '@staff-portal/config'
import { OperationCallableTypes } from '@staff-portal/graphql/staff'
import { MockedResponse } from '@staff-portal/data-layer-service'
import { TestWrapperWithMocks } from '@staff-portal/test-utils'
import { createGetLazyOperationMock } from '@staff-portal/operations/src/mocks'
import { NodeType } from '@staff-portal/graphql'

import ReferrerField, { Props } from './ReferrerField'

const defaultProps: Props = {
  id: 'VjEtVGFsZW50LTExNTQ5Mw',
  referrer: {
    id: 'VjEtU3RhZmYtMTIwMjIzNA',
    __typename: 'Talent',
    webResource: {
      text: 'Caitlyn Andres',
      url: 'https://staging.toptal.net/platform/staff/staff/1202234'
    }
  },
  canIssueSourcingCommission: false,
  changeRoleReferrerOperation: {
    callable: OperationCallableTypes.ENABLED,
    messages: []
  }
}

const lazyOperationMock = createGetLazyOperationMock({
  operation: {
    callable: OperationCallableTypes.ENABLED,
    messages: []
  },
  variables: {
    nodeId: defaultProps.id,
    nodeType: NodeType.TALENT,
    operationName: 'changeRoleReferrer'
  }
})

const arrangeTest = (props = defaultProps, mocks: MockedResponse[] = []) =>
  render(
    <TestWrapperWithMocks mocks={[lazyOperationMock, ...mocks]}>
      <ReferrerField
        id={props.id}
        referrer={props.referrer}
        changeRoleReferrerOperation={props.changeRoleReferrerOperation}
        canIssueSourcingCommission={props.canIssueSourcingCommission}
      />
    </TestWrapperWithMocks>
  )

describe('ReferrerField', () => {
  describe('when the referrer exists', () => {
    it('links to the referrer', () => {
      const referrerName = 'Referrer Name'
      const referrerUrl = 'https://referrer-url.com'

      arrangeTest({
        ...defaultProps,
        referrer: {
          id: 'VjEtU3RhZmYtMTIwMjIzNA',
          __typename: 'TalentPartner',
          webResource: {
            text: referrerName,
            url: referrerUrl
          }
        }
      })

      expect(screen.getByText(referrerName)).toHaveAttribute(
        'href',
        referrerUrl
      )
    })
  })

  describe('when the referrer does not exist', () => {
    it('shows an empty value', () => {
      arrangeTest({ ...defaultProps, referrer: null })

      expect(screen.getByText(NO_VALUE)).toBeInTheDocument()
    })
  })

  describe('when the referrer url does not exist but text exist', () => {
    it('shows the text only', () => {
      const referrerName = 'Referrer Name'

      arrangeTest({
        ...defaultProps,
        referrer: {
          id: 'VjEtU3RhZmYtMTIwMjIzNA',
          __typename: 'TalentPartner',
          webResource: {
            text: referrerName,
            url: null
          }
        }
      })

      expect(screen.getByText(referrerName)).toBeInTheDocument()
    })
  })

  describe('when the user has permission to change the referrer', () => {
    it('shows the change button', () => {
      arrangeTest(defaultProps)

      expect(screen.getByRole('button', { name: 'Change' })).toBeInTheDocument()
    })
  })

  describe('when the user does not have permission to change the referrer', () => {
    it('hides the change button', () => {
      arrangeTest({
        ...defaultProps,
        changeRoleReferrerOperation: {
          callable: OperationCallableTypes.HIDDEN,
          messages: []
        }
      })

      expect(
        screen.queryByRole('button', { name: 'Change' })
      ).not.toBeInTheDocument()
    })
  })
})
