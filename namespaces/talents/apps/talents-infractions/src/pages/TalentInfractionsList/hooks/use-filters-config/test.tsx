import { renderHook } from '@testing-library/react-hooks'
import React, { ReactNode } from 'react'
import { MockedResponse } from '@staff-portal/data-layer-service'
import { TestWrapperWithMocks } from '@staff-portal/test-utils'

import { createGetTalentInfractionAssigneesMock } from '../../data/get-infraction-assignees/mocks'
import useFiltersConfig from './use-filters-config'

const buildWrapper =
  (mocks: MockedResponse[] = []) =>
  ({ children }: { children: ReactNode }) =>
    <TestWrapperWithMocks mocks={mocks}>{children}</TestWrapperWithMocks>

describe('useFiltersConfig', () => {
  it('shows the available options', async () => {
    const wrapper = buildWrapper([createGetTalentInfractionAssigneesMock()])
    const hook = renderHook(() => useFiltersConfig(), { wrapper })
    const filterLabels = hook.result.current.filtersConfig
      .flat()
      .map(({ label }) => label)

    expect(filterLabels).toEqual(
      expect.arrayContaining([
        'Occur date',
        'Submission date',
        'Submitted by',
        'Reason',
        'Assignee',
        'Statuses',
        'Client'
      ])
    )
  })
})
