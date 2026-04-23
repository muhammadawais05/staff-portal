import React, { ComponentProps } from 'react'
import { render } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import { ApplicationInfoField } from '@staff-portal/facilities'

import Origin from '.'

jest.mock('@staff-portal/facilities')

const arrangeTest = (props: ComponentProps<typeof Origin>) =>
  render(
    <TestWrapper>
      <Origin {...props} />
    </TestWrapper>
  )

describe('Origin', () => {
  const clientId = '123'

  it('default render', () => {
    const OriginFieldMock = (
      ApplicationInfoField as jest.Mock
    ).mockImplementation(() => null)

    arrangeTest({
      clientId
    })

    expect(OriginFieldMock).toHaveBeenCalledWith(
      {
        entityId: clientId
      },
      {}
    )
  })
})
