import React, { useState } from 'react'
import { Container, Typography } from '@toptal/picasso'
import Picasso from '@toptal/picasso-provider'
import { QueryParams } from '@staff-portal/query-params-state'

import FiltersAmountRange from '../FiltersAmountRange'
import Filters from '../../Filters'
import { FilterConfigType } from '../../../types'

export default {
  title: 'FiltersAmountRange',
  component: FiltersAmountRange
}

interface StoryQueryParams extends QueryParams {
  page?: string | number
}

export const Default = () => {
  const [filters, setFilters] = useState<StoryQueryParams>()

  return (
    <Picasso>
      <Container top='small' left='small' right='small'>
        <Filters
          values={filters}
          onChange={setFilters}
          config={[
            [
              {
                type: FilterConfigType.AMOUNT_RANGE,
                name: 'amount',
                label: 'Amount'
              }
            ]
          ]}
        />
        <Container top='small'>
          <Typography as='pre'>
            <Typography as='code'>
              Filters: {JSON.stringify(filters, undefined, 2)}
            </Typography>
          </Typography>
        </Container>
      </Container>
    </Picasso>
  )
}
