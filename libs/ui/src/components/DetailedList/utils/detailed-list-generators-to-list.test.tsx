import React from 'react'

import {
  ArrayOfGenerators,
  detailedListGeneratorsToList
} from './detailed-list-generators-to-list'

describe('#detailedListGeneratorsToList', () => {
  it('returns array of detailed list items', () => {
    const props = { label: 'test' }
    const generators: ArrayOfGenerators<typeof props> = [
      false,
      () => ['test', null],
      () => ['test', undefined],
      ({ label }) => ['test', <div>{label}</div>]
    ]

    expect(detailedListGeneratorsToList(props, generators)).toEqual([
      {
        label: 'test',
        value: null
      },
      {
        label: 'test',
        value: undefined
      },
      {
        label: 'test',
        value: <div>test</div>
      }
    ])
  })
})
