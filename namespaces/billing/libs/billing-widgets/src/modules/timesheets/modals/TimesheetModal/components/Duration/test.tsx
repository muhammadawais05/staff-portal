import React, { ComponentProps } from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import Duration from '.'

const render = (props: ComponentProps<typeof Duration>) =>
  renderComponent(<Duration {...props} />)

describe('Duration', () => {
  describe('when hours is `0`', () => {
    it('default render', () => {
      const { getByText } = render({ minutes: '587' })

      expect(getByText('9 hrs')).toBeInTheDocument()
      expect(getByText('47 mins')).toBeInTheDocument()
    })
  })

  describe('when hours is not `0`', () => {
    it('default render', () => {
      const { getByText } = render({ hours: '12', minutes: '22' })

      expect(getByText('12 hrs')).toBeInTheDocument()
      expect(getByText('22 mins')).toBeInTheDocument()
    })
  })
})
