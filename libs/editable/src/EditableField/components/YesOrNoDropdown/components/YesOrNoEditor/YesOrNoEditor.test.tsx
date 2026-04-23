import React from 'react'
import { Option } from '@toptal/picasso/Select'
import { render, screen } from '@toptal/picasso/test-utils'

import YesOrNoEditor from '.'
import { YES_OR_NO_OPTIONS } from '../../../../config'

jest.mock('@toptal/picasso-forms', () => ({
  Form: {
    Select: (props: Record<string, string>) => (
      <div data-testid={props['data-testid'] || 'Select'}>
        {JSON.stringify(props)}
      </div>
    )
  }
}))

describe('YesOrNoEditor', () => {
  it('renders yes or no editor', () => {
    render(
      <YesOrNoEditor<Record<string, string>, Option<string | number>[]>
        name={'name'}
        options={YES_OR_NO_OPTIONS}
        value={1}
        disabled={false}
        onChange={() => {}}
        onBlur={() => {}}
      />
    )

    const select = screen.getByTestId('Select')

    expect(select).toHaveTextContent('"value":1')
    expect(select).toHaveTextContent('"disabled":false')
    expect(select).toHaveTextContent('"name":"name"')
    expect(select).toHaveTextContent('"width":"auto"')
    expect(select).toHaveTextContent('"size":"small"')
    expect(select).toHaveTextContent(
      `"options":${JSON.stringify(YES_OR_NO_OPTIONS)}`
    )
  })
})
