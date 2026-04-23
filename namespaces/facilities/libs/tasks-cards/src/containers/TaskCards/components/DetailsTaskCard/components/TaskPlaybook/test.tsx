import React from 'react'
import { render } from '@testing-library/react'
import { TestWrapperWithMocks } from '@staff-portal/test-utils'
import { WebResourceFragment } from '@staff-portal/facilities'

import TaskPlaybook from './TaskPlaybook'

const arrangeTest = (webResource: WebResourceFragment) => {
  const playbookTemplate = {
    ...webResource
  } as WebResourceFragment

  const {
    container: { textContent }
  } = render(
    <TestWrapperWithMocks addTypename={false}>
      <TaskPlaybook playbookTemplate={playbookTemplate} />
    </TestWrapperWithMocks>
  )

  return { textContent }
}

describe('TaskPlaybook', () => {
  it('displays required copies', () => {
    const { textContent } = arrangeTest({
      webResource: {
        text: 'Playbook name',
        url: 'http://test.com'
      }
    })

    expect(textContent).toContain(
      'This is a system-generated task. Playbook: Playbook name'
    )
    expect(textContent).toContain(
      'You can find a detailed description of the playbook guidelines here'
    )
  })

  it('does not show helpbox copy if there is no webResource url', () => {
    const { textContent } = arrangeTest({
      webResource: { url: undefined, text: '' }
    })

    expect(textContent).not.toContain(
      'You can find a detailed description of the playbook guidelines here'
    )
  })
})
