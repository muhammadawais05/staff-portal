import React from 'react'
import { render, screen } from '@testing-library/react'
import { NO_VALUE } from '@staff-portal/config'
import { OperationCallableTypes } from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'

import SourcerField, { Props } from './SourcerField'

const defaultProps: Props = {
  id: 'VjEtVGFsZW50LTExNTQ5Mw',
  sourcer: {
    __typename: 'Staff',
    id: 'VjEtU3RhZmYtMTIwMjIzNA',
    webResource: {
      text: 'Caitlyn Andres',
      url: 'https://staging.toptal.net/platform/staff/staff/1202234'
    }
  },
  changeTalentSourcerOperation: {
    callable: OperationCallableTypes.ENABLED,
    messages: []
  }
}

const arrangeTest = (props = defaultProps) =>
  render(
    <TestWrapper>
      <SourcerField
        id={props.id}
        sourcer={props.sourcer}
        changeTalentSourcerOperation={props.changeTalentSourcerOperation}
      />
    </TestWrapper>
  )

describe('SourcerField', () => {
  describe('when the sourcer exists', () => {
    it('links to the sourcer', () => {
      const sourcerName = 'Sourcer Name'
      const sourcerUrl = 'https://sourcer-url.com'

      arrangeTest({
        ...defaultProps,
        sourcer: {
          __typename: 'Staff',
          id: 'VjEtU3RhZmYtMTIwMjIzNA',
          webResource: {
            text: sourcerName,
            url: sourcerUrl
          }
        }
      })

      expect(screen.getByText(sourcerName)).toHaveAttribute('href', sourcerUrl)
    })
  })

  describe('when the sourcer does not exist', () => {
    it('shows an empty value', () => {
      arrangeTest({
        ...defaultProps,
        sourcer: null
      })

      expect(screen.getByText(NO_VALUE)).toBeInTheDocument()
    })
  })

  describe('when the user has permission to change the sourcer', () => {
    it('shows the change button', () => {
      arrangeTest({
        ...defaultProps,
        changeTalentSourcerOperation: {
          callable: OperationCallableTypes.ENABLED,
          messages: []
        }
      })

      expect(screen.getByRole('button', { name: 'Change' })).toBeInTheDocument()
    })
  })

  describe('when the user does not have permission to change the sourcer', () => {
    it('hides the change button', () => {
      arrangeTest({
        ...defaultProps,
        changeTalentSourcerOperation: {
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
