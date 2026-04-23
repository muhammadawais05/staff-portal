import React, { ComponentProps } from 'react'

import fixtures from '../../_fixtures'
import ContactLink from '.'
import renderComponent from '../../utils/tests'

const render = (props: ComponentProps<typeof ContactLink>) =>
  renderComponent(<ContactLink {...props} />)

describe('ContactLink', () => {
  describe('when `contact` not defined', () => {
    describe('when `emptyState` defined', () => {
      it('renders `emptyState`', () => {
        const { queryByTestId } = render({
          emptyState: <>"It's empty"</>
        })

        expect(queryByTestId('ContactLink-empty')).toContainHTML("It's empty")
        expect(queryByTestId('ContactLink')).toBeNull()
      })
    })

    describe('when `emptyState` not defined', () => {
      it('renders default `emptyState`', () => {
        const { queryByTestId } = render({})

        expect(queryByTestId('ContactLink-empty')).toContainHTML('—')
        expect(queryByTestId('ContactLink')).toBeNull()
      })
    })
  })

  describe('when `contact` is defined', () => {
    it('renders `empty` state', () => {
      const { queryByTestId } = render({
        contact: fixtures.MockInvoice.subjectObject.matchers.nodes[0].role
      })

      expect(queryByTestId('ContactLink-link')).toContainHTML(
        'href="http://localhost:3000/platform/staff/staff/1439719"'
      )
      expect(queryByTestId('ContactLink-link')).toContainHTML('Raymond Sharma')
    })
  })
})
