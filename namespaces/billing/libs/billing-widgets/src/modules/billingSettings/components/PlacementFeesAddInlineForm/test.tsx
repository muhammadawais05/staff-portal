import MockDate from 'mockdate'
import React, { ComponentProps } from 'react'
import fixtures from '@staff-portal/billing/src/_fixtures'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import PlacementFeesAddInlineForm from '.'

jest.mock(
  '@staff-portal/billing/src/_lib/customHooks/useFormSubmission',
  () => () => ({
    handleOnRootLevelError: jest.fn(),
    handleOnSuccess: jest.fn()
  })
)

jest.mock('../../../engagement/data/getEngagement.graphql.types', () => ({
  useGetEngagementQuery: jest.fn(() => ({
    data: null,
    loading: false,
    initialLoading: false
  }))
}))
jest.mock(
  '@staff-portal/billing/src/data/getExperiments.graphql.types',
  () => ({
    useGetExperimentsQuery: () => [jest.fn()]
  })
)

jest.mock(
  '../../../placementFees/modals/data/setCreateEngagementPlacementFee.graphql.types',
  () => ({
    useSetCreateEngagementPlacementFeeMutation: jest.fn(() => [
      'useSetCreateEngagementPlacementFeeMutation'
    ])
  })
)

const render = (props: ComponentProps<typeof PlacementFeesAddInlineForm>) =>
  renderComponent(<PlacementFeesAddInlineForm {...props} />)

const onCloseForm = jest.fn()

describe('PlacementFeesAddInlineForm', () => {
  beforeEach(() => MockDate.set('2019/12/04'))

  afterEach(() => MockDate.reset())

  it('default render', () => {
    const isOpenForm = false

    const { getByTestId } = render({
      isOpenInlineForm: isOpenForm,
      onCloseForm: onCloseForm,
      engagementId: fixtures.MockEngagement.id
    })

    expect(getByTestId('LoaderOverlayWrapper')).toBeInTheDocument()
  })

  it('should open component', () => {
    const isOpenForm = true

    const { getByTestId } = render({
      isOpenInlineForm: isOpenForm,
      onCloseForm: onCloseForm,
      engagementId: fixtures.MockEngagement.id
    })

    expect(getByTestId('AddModalForm')).toBeInTheDocument()
  })

  it('should call onCloseForm', () => {
    const isOpenForm = true

    const { getByTestId } = render({
      isOpenInlineForm: isOpenForm,
      onCloseForm: onCloseForm,
      engagementId: fixtures.MockEngagement.id
    })

    getByTestId('cancel').click()
    expect(onCloseForm).toHaveBeenCalled()
  })
})
