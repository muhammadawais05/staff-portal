import React, { ReactNode } from 'react'
import { render } from '@toptal/picasso/test-utils'
import { Typography } from '@toptal/picasso'

import { translateWithComponent } from '.'

describe('_lib/translation', () => {
  it('translateWithComponent', () => {
    const linkWrapper = ({ children }: { children: ReactNode }) => {
      return <Typography data-testid='test-wrapper'>{children}</Typography>
    }
    const sampleText =
      'This is a sample test and <0>***FORMATTED_TEXT***</0> should be wrapped in a Typography component'
    const result = translateWithComponent(sampleText, linkWrapper)

    const { getByTestId } = render(<div data-testid='container'>{result}</div>)

    expect(getByTestId('container')).toContainHTML('This is a sample test and')
    expect(getByTestId('test-wrapper')).toContainHTML('***FORMATTED_TEXT***')
    expect(getByTestId('container')).toContainHTML(
      'should be wrapped in a Typography component'
    )
  })
})
