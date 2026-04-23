import React, { ComponentProps } from 'react'
import { DocumentStatus } from '@staff-portal/graphql/staff'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import CommercialDocumentStatus from '.'

const render = (props: ComponentProps<typeof CommercialDocumentStatus>) =>
  renderComponent(
    <CommercialDocumentStatus
      {...props}
      data-testid='CommercialDocumentStatus'
    />
  )

describe.each([
  [
    {
      document: {
        consolidatedDocument: { id: 'abc123' },
        status: DocumentStatus.DISPUTED
      }
    },
    { text: '—', colorClass: 'PicassoTypography-darkGrey' }
  ],
  [
    {
      document: { consolidatedDocument: null, status: DocumentStatus.DISPUTED }
    },
    { text: 'Disputed', colorClass: 'PicassoTypography-red' }
  ],
  [
    {
      document: {
        status: DocumentStatus.DISPUTED,
        statusComment: 'example chronicles comment'
      }
    },
    { text: 'Disputed', colorClass: 'PicassoTypography-red' }
  ],
  [
    {
      document: {
        status: DocumentStatus.DISPUTED
      }
    },
    { text: 'Disputed', colorClass: 'PicassoTypography-red' }
  ],
  [
    {
      document: {
        status: DocumentStatus.DISPUTED,
        actionDueOn: '2020-05-05'
      },
      withDate: true
    },
    { text: 'Disputed due May 5, 2020', colorClass: 'PicassoTypography-red' }
  ],
  [
    {
      document: {
        status: DocumentStatus.DISPUTED,
        actionDueOn: '2020-05-05'
      },
      withDate: false
    },
    { text: 'Disputed', colorClass: 'PicassoTypography-red' }
  ]
])('CommercialDocumentStatus', (props, { text, colorClass }) => {
  describe(`when 'document' is "${JSON.stringify(props.document)}"`, () => {
    describe(`when 'nodeType' is "${props.nodeType}"`, () => {
      describe(`when 'withDate' is "${JSON.stringify(props.withDate)}"`, () => {
        it('renders status properly', () => {
          const { getByTestId } = render(props)

          const element = getByTestId('CommercialDocumentStatus')

          expect(element.innerHTML).toBe(text)
          expect(element.className).toContain(colorClass)
        })
      })
    })
  })
})
