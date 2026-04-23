import React, { ComponentProps } from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'
import fixtures from '@staff-portal/billing/src/_fixtures'
import { EMPTY_DATA } from '@staff-portal/billing/src/_lib/helpers'

import { Engagement } from './EngagementsTable'
import EngagementsTable from '.'

const engagements =
  fixtures.MockGetConsolidationDefaults.data.node.consolidationDefaults.nodes[0]
    .engagements.nodes

const render = (
  props: ComponentProps<typeof EngagementsTable> = { engagements }
) => renderComponent(<EngagementsTable {...props} />)

const buildEngagement = ({
  purchaseOrderLine = null,
  job = null
}: Partial<Engagement>) => ({
  ...engagements[0],
  job,
  purchaseOrderLine
})

const purchaseOrderLine = {
  id: 'id',
  poLineNumber: '123456789',
  webResource: {
    text: 'engagement',
    url: '#'
  },
  purchaseOrder: {
    id: 'poId',
    poNumber: '1234',
    webResource: {
      url: '#',
      text: 'job'
    }
  }
}

const job = {
  id: '1234',
  title: 'Some job',
  purchaseOrderLine: {
    id: 'id',
    poLineNumber: '1234',
    webResource: {
      url: '#',
      text: 'job'
    },
    purchaseOrder: {
      id: 'poId',
      poNumber: '1234',
      webResource: {
        url: '#',
        text: 'job'
      }
    }
  },
  webResource: {
    text: 'Hello',
    url: '#'
  }
}

describe('EngagementsTable', () => {
  it('default render', () => {
    const { getAllByTestId } = render()

    expect(getAllByTestId('EngagementsTableRow')).not.toBeNull()
  })

  describe('when only engagement is defined', () => {
    it('will render engagement PO', () => {
      const { queryByTestId } = render({
        engagements: [buildEngagement({ purchaseOrderLine })]
      })

      expect(queryByTestId('EngagementsTableRow-po-number')).toHaveTextContent(
        'engagement'
      )
    })
  })

  describe('when only job is defined', () => {
    it('will render job PO', () => {
      const { queryByTestId } = render({
        engagements: [buildEngagement({ job })]
      })

      expect(queryByTestId('EngagementsTableRow-po-number')).toHaveTextContent(
        'job'
      )
    })
  })

  describe('when both engagement & job are null', () => {
    it('will render EMPTY_DATA', () => {
      const { queryByTestId } = render({
        engagements: [buildEngagement({})]
      })

      expect(queryByTestId('EngagementsTableRow-po-number')).toHaveTextContent(
        EMPTY_DATA
      )
    })
  })
  describe('when both engagement & job are defined', () => {
    it('will render engagement PO', () => {
      const { queryByTestId } = render({
        engagements: [buildEngagement({ job, purchaseOrderLine })]
      })

      expect(queryByTestId('EngagementsTableRow-po-number')).toHaveTextContent(
        'engagement'
      )
    })
  })

  it('displays empty message', () => {
    const { queryByTestId } = render({
      engagements: []
    })

    expect(queryByTestId('EngagementsTableRow')).not.toBeInTheDocument()
  })
})
