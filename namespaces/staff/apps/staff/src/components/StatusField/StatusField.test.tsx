import React, { ComponentProps } from 'react'
import { render } from '@testing-library/react'
import { Typography } from '@toptal/picasso'
import { RoleStatus } from '@staff-portal/graphql/staff'

import { STAFF_STATUS_MAPPING } from '../../services'
import StatusField from './StatusField'

jest.mock('@toptal/picasso', () => ({
  Typography: jest.fn()
}))

const renderComponent = (props: ComponentProps<typeof StatusField>) =>
  render(<StatusField {...props} />)

const MockTypography = Typography as unknown as jest.Mock

describe('StatusField', () => {
  beforeEach(() => {
    MockTypography.mockReturnValueOnce(null)
  })

  it.each(Object.values(RoleStatus))(
    'renders status for the %s',
    cumulativeStatus => {
      renderComponent({
        cumulativeStatus
      })

      expect(MockTypography).toHaveBeenCalledTimes(1)
      expect(MockTypography).toHaveBeenCalledWith(
        {
          color: STAFF_STATUS_MAPPING[cumulativeStatus].color,
          titleCase: true,
          children: STAFF_STATUS_MAPPING[cumulativeStatus].text
        },
        {}
      )
    }
  )
})
