import { Table } from '@toptal/picasso'
import React, { ComponentProps } from 'react'
import { Form } from '@toptal/picasso-forms'
import renderComponent from '@staff-portal/billing/src/utils/tests'
import fixtures from '@staff-portal/billing/src/_fixtures'
import { EMPTY_DATA } from '@staff-portal/billing/src/_lib/helpers'

import EngagementsTableRow from '.'

jest.mock('@staff-portal/forms', () => ({
  SelectableTableRowCheckboxCell: ({ disabled = false }) => (
    <td>
      <input
        data-testid='EngagementsTableRow-checkbox'
        type='checkbox'
        disabled={disabled}
      />
    </td>
  )
}))

const companyCDlink =
  'https://staging.toptal.net/platform/staff/companies/2296837'

const engagement = {
  ...fixtures.MockGetConsolidationDefaults.data.node.consolidationDefaults
    .nodes[0].engagements.nodes[0],
  isWorking: true,
  effectivePurchaseOrder: {
    poNumber: '123456',
    webResource: {
      text: '555555',
      url: 'https://staging.toptal.net/platform/staff/purchase_orders/3456'
    }
  },
  job: {
    id: 'VjEtSm9iLTIzNTEwNg',
    title: 'Chief Solutions Designer (235106)',
    purchaseOrder: {
      poNumber: '223456',
      webResource: {
        text: '228313',
        url: 'https://staging.toptal.net/platform/staff/purchase_orders/3456'
      }
    },
    webResource: {
      text: 'Chief Solutions Designer (235106)',
      url: 'https://staging.toptal.net/platform/staff/jobs/235106'
    }
  }
}

const render = (
  props: ComponentProps<typeof EngagementsTableRow> = { engagement }
) =>
  renderComponent(
    <Form onSubmit={jest.fn()}>
      <Table>
        <Table.Body>
          <EngagementsTableRow {...props} />
        </Table.Body>
      </Table>
    </Form>
  )

describe('EngagementsTableRow', () => {
  it('default render', () => {
    const { queryByTestId } = render()

    expect(queryByTestId('EngagementsTableRow')).toBeInTheDocument()

    expect(queryByTestId('EngagementsTableRow-company')).toContainHTML(
      'Bergnaum, Altenwerth and Hansen'
    )

    expect(queryByTestId('EngagementsTableRow-job')).toContainHTML(
      'Chief Solutions Designer (235106)'
    )

    expect(queryByTestId('EngagementsTableRow-talent')).toContainHTML(
      'Twila Jacobson'
    )

    expect(queryByTestId('EngagementsTableRow-po-number')).toContainHTML(
      '555555'
    )
  })

  describe('when `isSelectable` is `true`', () => {
    describe('when `consolidationDefault` is not null', () => {
      it(`default render`, () => {
        const { queryByTestId } = render({
          engagement: {
            ...engagement,
            consolidationDefault: {
              id: 'VjEtQ29uc29saWRhdGlvbkRlZmF1bHQtMQ',
              name: 'CD Name',
              client: {
                id: 'VjEtQ29uc29saWRhdGlvbkRlZmF1bHQtQM',
                webResource: {
                  text: 'Company Name',
                  url: companyCDlink
                }
              }
            }
          },
          isSelectable: true
        })

        const cd = queryByTestId('EngagementsTableRow-consolidationDefault')

        expect(cd).toHaveTextContent('CD Name')
        expect(cd).toContainHTML(`${companyCDlink}#legal_and_billing`)

        expect(
          queryByTestId('EngagementsTableRow-checkbox')
        ).toBeInTheDocument()
      })
    })

    describe('when `consolidationDefault` is null', () => {
      it(`default render`, () => {
        const { queryByTestId } = render({
          engagement: {
            ...engagement
          },
          isSelectable: true
        })

        const cd = queryByTestId('EngagementsTableRow-consolidationDefault')

        expect(cd).toHaveTextContent(EMPTY_DATA)

        expect(
          queryByTestId('EngagementsTableRow-checkbox')
        ).toBeInTheDocument()
      })
    })

    describe('when engagement is not working', () => {
      it(`renders a disabled state with a tooltip`, () => {
        const { queryByTestId, getByRole } = render({
          engagement: {
            ...engagement,
            isWorking: false
          },
          isSelectable: true
        })

        expect(queryByTestId(`Tooltip-content`)).toHaveTextContent(
          'This engagement is no longer active.'
        )

        expect(getByRole('checkbox')).toBeDisabled()
      })
    })

    describe('when engagement belongs to another CD', () => {
      it(`renders a disabled state with a tooltip that points to the CD`, () => {
        const { queryByTestId } = render({
          engagement: {
            ...engagement,
            consolidationDefault: {
              id: 'VjEtQ29uc29saWRhdGlvbkRlZmF1bHQtMQ',
              name: 'CD Name',
              client: {
                id: 'VjEtQ29uc29saWRhdGlvbkRlZmF1bHQtQM',
                webResource: {
                  text: 'Company Name',
                  url: companyCDlink
                }
              }
            }
          },
          parentConsolidationDefaultId: '0000Q29uc29saWRhdGlvbkRlZmF1bHQtMQ',
          isSelectable: true
        })

        expect(queryByTestId(`Tooltip-content`)).toContainHTML(
          `${companyCDlink}#legal_and_billing`
        )
      })
    })

    describe('when engagement belongs to another CD, but the CD is deleted', () => {
      it(`does not render a disabled hint tooltip`, () => {
        const { queryByTestId } = render({
          engagement: {
            ...engagement,
            consolidationDefault: {
              id: 'VjEtQ29uc29saWRhdGlvbkRlZmF1bHQtMQ',
              name: 'CD Name',
              deleted: true,
              client: {
                id: 'VjEtQ29uc29saWRhdGlvbkRlZmF1bHQtQM',
                webResource: {
                  text: 'Company Name',
                  url: companyCDlink
                }
              }
            }
          },
          parentConsolidationDefaultId: '0000Q29uc29saWRhdGlvbkRlZmF1bHQtMQ',
          isSelectable: true
        })

        expect(queryByTestId(`Tooltip-content`)).toBeNull()
      })
    })
  })
})
