import { render } from '@testing-library/react'
import React from 'react'
import { TestWrapper } from '@staff-portal/test-utils'

import { TaskColRenderProps } from '../../types'
import { renderRelatedToCol } from './render-related-to-col'

describe('Render related tasks', () => {
  it('should show text with Purchase Order # message link for a purchase order request', () => {
    const {
      container: { textContent }
    } = render(
      <TestWrapper>
        {renderRelatedToCol({
          task: {
            relatedTo: {
              id: 'VjEtUHVyY2hhc2VPcmRlci0yMTk4',
              webResource: {
                url: 'http://test.co'
              }
            }
          }
        } as TaskColRenderProps)}
      </TestWrapper>
    )

    expect(textContent).toContain('Purchase Order #2198')
  })

  it('should show text from response for a non purchase order request', () => {
    const {
      container: { textContent }
    } = render(
      <TestWrapper>
        {renderRelatedToCol({
          task: {
            relatedTo: {
              id: 'VjEtQ2xpZW50LTIxOTg=',
              webResource: {
                text: '1234',
                url: 'http://test.co'
              }
            }
          }
        } as TaskColRenderProps)}
      </TestWrapper>
    )

    expect(textContent).toContain('1234')
  })
})
