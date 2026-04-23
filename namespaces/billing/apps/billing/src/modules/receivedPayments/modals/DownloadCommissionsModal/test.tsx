import React from 'react'
import MockDate from 'mockdate'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import DownloadCommissionsModal from '.'
import adjustValues from './adjustValues'

jest.mock('../../data')
jest.mock('../DownloadCommissionsModalForm')
jest.mock(
  '@staff-portal/billing/src/_lib/customHooks/useFormSubmission',
  () => () => ({
    handleOnRootLevelError: jest.fn(),
    handleOnSuccess: jest.fn()
  })
)

const render = () => renderComponent(<DownloadCommissionsModal />)

describe('DownloadCommissionsModal', () => {
  it('invoice render', () => {
    const { getByTestId } = render()

    expect(getByTestId('DownloadCommissionsModalForm')).toBeInTheDocument()
  })
})

describe('#adjustValues', () => {
  beforeAll(() => MockDate.set('2020-06-11T00:00:00.000+00:00'))

  it('returns values with normalized date', () => {
    const actual = adjustValues({
      foo: 'bar',
      filter: {
        startDate: new Date('2020-11-06T00:00:00.000Z'),
        endDate: new Date('2020-12-06T00:00:00.000Z')
      }
    })

    const expected = {
      foo: 'bar',
      filter: {
        startDate: '2020-11-06',
        endDate: '2020-12-06'
      }
    }

    expect(actual).toEqual(expected)
  })
})
