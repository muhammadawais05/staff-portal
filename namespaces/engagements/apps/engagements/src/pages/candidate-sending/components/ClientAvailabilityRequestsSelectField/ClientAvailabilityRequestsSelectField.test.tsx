import React, { ComponentProps } from 'react'
import { TestWrapper } from '@staff-portal/test-utils'
import { Form } from '@toptal/picasso-forms'
import { render, screen } from '@testing-library/react'
import { useGetNode } from '@staff-portal/data-layer-service'

import ClientAvailabilityRequestsSelectField from './ClientAvailabilityRequestsSelectField'

jest.mock('@staff-portal/data-layer-service')

const useGetNodeMock = useGetNode as jest.Mock

const arrangeTest = (
  props: Partial<ComponentProps<typeof ClientAvailabilityRequestsSelectField>>,
  {
    loading,
    data
  }: {
    loading?: boolean
    data?: { id: string; title: string }[]
  }
) => {
  useGetNodeMock.mockImplementation(() => () => ({
    data: data ? { jobs: { nodes: data } } : null,
    loading
  }))

  return render(
    <TestWrapper>
      <Form onSubmit={() => {}}>
        <ClientAvailabilityRequestsSelectField clientId='id' {...props} />
      </Form>
    </TestWrapper>
  )
}

describe('ClientAvailabilityRequestsSelectField', () => {
  describe('when `loading` is `true`', () => {
    it('renders skeleton', () => {
      arrangeTest({ clientId: 'id' }, { loading: true })

      expect(
        screen.getByTestId('client-availability-requests-select-field-skeleton')
      ).toBeInTheDocument()
      expect(
        screen.queryByTestId(
          'client-availability-requests-select-field-no-jobs-info'
        )
      ).not.toBeInTheDocument()
      expect(
        screen.queryByTestId('client-availability-requests-select-field-select')
      ).not.toBeInTheDocument()
    })
  })

  describe('when there is no `data`', () => {
    it('renders nothing', () => {
      arrangeTest({ clientId: 'id' }, { data: undefined })

      expect(screen.queryByTestId('field-skeleton')).not.toBeInTheDocument()
      expect(
        screen.queryByTestId(
          'client-availability-requests-select-field-no-jobs-info'
        )
      ).not.toBeInTheDocument()
      expect(
        screen.queryByTestId('client-availability-requests-select-field-select')
      ).not.toBeInTheDocument()
    })
  })

  describe('when there is `data`', () => {
    it('renders select', () => {
      arrangeTest(
        { clientId: 'id' },
        { data: [{ id: 'some-id', title: 'some title' }] }
      )

      expect(screen.queryByTestId('field-skeleton')).not.toBeInTheDocument()
      expect(
        screen.queryByTestId(
          'client-availability-requests-select-field-no-jobs-info'
        )
      ).not.toBeInTheDocument()
      expect(
        screen.getByTestId('client-availability-requests-select-field-select')
      ).toBeInTheDocument()
    })
  })
})
