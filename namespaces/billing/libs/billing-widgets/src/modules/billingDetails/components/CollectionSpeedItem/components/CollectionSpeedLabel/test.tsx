import React, { ComponentProps } from 'react'
import { ClientCollectionSpeed } from '@staff-portal/graphql/staff'
import renderComponent from '@staff-portal/billing/src/utils/tests'
import { EMPTY_DATA } from '@staff-portal/billing/src/_lib/helpers'

import CollectionSpeedLabel from '.'

const render = (props: ComponentProps<typeof CollectionSpeedLabel>) =>
  renderComponent(<CollectionSpeedLabel {...props} />)

describe('CollectionSpeedLabel', () => {
  describe('when collection speed is defined', () => {
    it('displays a label with client collection speed', () => {
      const { getByTestId } = render({
        collectionSpeed: ClientCollectionSpeed.SLOW_PAY
      })

      expect(getByTestId('CollectionSpeedLabel-label')).toHaveTextContent(
        'Slow Pay'
      )
    })
  })

  describe('when collection speed is not defined', () => {
    it('displays a placeholder for value', () => {
      const { getByTestId } = render({
        collectionSpeed: undefined
      })

      expect(getByTestId('CollectionSpeedLabel-label')).toHaveTextContent(
        EMPTY_DATA
      )
    })
  })
})
