import React from 'react'
import { render, screen } from '@toptal/picasso/test-utils'

import BasicInfo from './BasicInfo'

describe('BasicInfo', () => {
  it('renders the talent information', () => {
    render(<BasicInfo fullName='John Doe' location='Gdansk, Poland' />)

    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('Gdansk, Poland')).toBeInTheDocument()
  })
})
