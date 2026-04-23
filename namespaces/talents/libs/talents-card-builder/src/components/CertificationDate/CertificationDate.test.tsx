import React from 'react'
import { render } from '@toptal/picasso/test-utils'

import CertificationDate from './CertificationDate'

describe('CertificationDate', () => {
  it('renders certifications validity years', () => {
    const { container } = render(
      <CertificationDate
        validFromYear={2012}
        validFromMonth={0}
        validToYear={2012}
        validToMonth={11}
      />
    )

    expect(container.textContent).toBe('January 2012 – December 2012')
  })

  describe('when certificate is never expiring', () => {
    it('renders just a from date', () => {
      const { container } = render(
        <CertificationDate
          validFromYear={2012}
          validFromMonth={0}
          validToYear={null}
          validToMonth={null}
        />
      )

      expect(container.textContent).toBe('January 2012')
    })
  })

  describe('when certificate dates are empty', () => {
    it('renders nothing', () => {
      const { container } = render(
        <CertificationDate
          validFromYear={null}
          validFromMonth={null}
          validToYear={null}
          validToMonth={null}
        />
      )

      expect(container.textContent).toBe('')
    })
  })
})
