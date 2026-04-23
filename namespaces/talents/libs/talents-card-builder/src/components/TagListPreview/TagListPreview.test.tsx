import React from 'react'
import { render, screen } from '@toptal/picasso/test-utils'
import { TestWrapper } from '@staff-portal/test-utils'
import { Form } from '@toptal/picasso-forms'

import TagListPreview, { TagListPreviewProps } from './TagListPreview'
import getTagItemMock from '../../mocks/get-tag-item-mock/get-tag-item-mock'

const renderComponent = (props: Pick<TagListPreviewProps, 'data'>) =>
  render(
    <TestWrapper>
      <Form onSubmit={jest.fn()}>
        <TagListPreview
          title='Industries title'
          sortable={false}
          sortableKey='skills'
          testId='industryItemPreview'
          {...props}
        />
      </Form>
    </TestWrapper>
  )

describe('TagListPreview', () => {
  it('renders industries data', () => {
    const industry1 = getTagItemMock({
      name: 'Industry Name 1'
    })

    const industry2 = getTagItemMock({
      name: 'Industry Name 2'
    })

    renderComponent({
      data: [industry1, industry2]
    })

    expect(screen.getByText('Industries title')).toBeInTheDocument()
    expect(screen.getByText('Industry Name 1')).toBeInTheDocument()
    expect(screen.getByText('Industry Name 2')).toBeInTheDocument()
  })

  describe('when data is empty', () => {
    it('renders nothing', () => {
      renderComponent({
        data: []
      })

      expect(screen.queryByText('Industries title')).not.toBeInTheDocument()
    })
  })
})
