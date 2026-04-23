import React from 'react'
import { render, screen } from '@toptal/picasso/test-utils'
import { RouteContext } from '@staff-portal/navigation'

import WebResourceLink, { Props } from './WebResourceLink'

const renderWrapper = (props: Props) =>
  render(
    <RouteContext.Provider value={path => ({ url: path })}>
      <WebResourceLink {...props} />
    </RouteContext.Provider>
  )

describe('WebResourceLink', () => {
  it('renders label unlinked if url is not passed', () => {
    renderWrapper({ link: { text: 'Unlinked' } })

    const label = screen.getByText('Unlinked')

    expect(label).toBeInTheDocument()
    expect(label.closest('a')).toBeNull()
  })

  it('renders label with correct link if url is passed', () => {
    renderWrapper({ link: { text: 'Linked', url: 'http://back.to.hell/' } })

    const label = screen.getByText('Linked')

    expect(label).toBeInTheDocument()
    expect(label.closest('a')?.href).toBe('http://back.to.hell/')
  })
})
