import React, { ComponentProps } from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import JobTemplateWarning from '.'

const render = (props: ComponentProps<typeof JobTemplateWarning>) =>
  renderComponent(<JobTemplateWarning {...props} />)

describe('JobTemplateWarning', () => {
  describe('when no warning is visible', () => {
    it('renders nothing', () => {
      const { queryByTestId } = render({ client: { id: '456' } })

      expect(
        queryByTestId('JobTemplateWarning-parent-template')
      ).not.toBeInTheDocument()
      expect(
        queryByTestId('JobTemplateWarning-affected-children')
      ).not.toBeInTheDocument()
      expect(
        queryByTestId('JobTemplateWarning-excluded')
      ).not.toBeInTheDocument()
    })
  })

  describe('when all warnings are visible', () => {
    it('renders the parent related warning text', () => {
      const { queryByTestId } = render({
        client: {
          id: '456',
          jobTemplateChangeInfo: {
            excludedChildren: {
              totalCount: 5,
              nodes: [
                {
                  id: '1',
                  webResource: {
                    url: 'http://example.com',
                    text: 'excludedChildren1 Link'
                  }
                },
                {
                  id: '2',
                  webResource: {
                    url: 'http://example.com',
                    text: 'excludedChildren2 Link'
                  }
                }
              ]
            },
            affectedChildren: { totalCount: 15 }
          },
          parent: {
            id: '123',
            fullName: 'example fullname',
            webResource: {
              url: 'Example Parent Link',
              text: 'http://example.com'
            },
            jobTemplate: { id: 'exampleId' }
          }
        }
      })

      expect(
        queryByTestId('JobTemplateWarning-parent-template')
      ).toBeInTheDocument()
      expect(
        queryByTestId('JobTemplateWarning-affected-children')
      ).toBeInTheDocument()
      expect(queryByTestId('JobTemplateWarning-excluded')).toBeInTheDocument()
    })
  })

  describe('verify each variation individually', () => {
    describe('when the client has a parent job template', () => {
      it('renders the parent related warning text', () => {
        const { getByTestId } = render({
          client: {
            id: '456',
            parent: {
              id: '123',
              fullName: 'example fullname',
              webResource: {
                url: 'Example Parent Link',
                text: 'http://example.com'
              },
              jobTemplate: { id: 'exampleId' }
            }
          }
        })

        expect(
          getByTestId('JobTemplateWarning-parent-template')
        ).toHaveTextContent(
          'already has billing defaults. These changes will override those settings.'
        )
      })
    })

    describe('when the client has a affected child', () => {
      it('renders the affected children related warning text', () => {
        const { getByTestId } = render({
          client: {
            id: '456',
            jobTemplateChangeInfo: {
              affectedChildren: { totalCount: 15 }
            }
          }
        })

        expect(
          getByTestId('JobTemplateWarning-affected-children')
        ).toHaveTextContent(
          'These defaults will affect 15 subsidiary companies.'
        )
      })
    })

    describe('when the client has a excluded child', () => {
      it('renders the excluded children warning text', () => {
        const { getByTestId } = render({
          client: {
            id: '456',
            jobTemplateChangeInfo: {
              excludedChildren: {
                totalCount: 5,
                nodes: [
                  {
                    id: '1',
                    webResource: {
                      url: 'http://example.com',
                      text: 'excludedChildren1 Link'
                    }
                  },
                  {
                    id: '2',
                    webResource: {
                      url: 'http://example.com',
                      text: 'excludedChildren2 Link'
                    }
                  }
                ]
              }
            }
          }
        })

        expect(getByTestId('JobTemplateWarning-excluded')).toHaveTextContent(
          "5 subsidiary companies won't be affected by this change: "
        )

        expect(
          getByTestId('JobTemplateWarning-excluded-children-link-0')
        ).toHaveTextContent('excludedChildren1 Link')

        expect(
          getByTestId('JobTemplateWarning-excluded-children-link-1')
        ).toHaveTextContent('excludedChildren2 Link')
      })
    })
  })
})
