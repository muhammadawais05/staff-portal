import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { MockedResponse } from '@staff-portal/data-layer-service'
import { TestWrapperWithMocks } from '@staff-portal/test-utils'

import TalentAboutSection from './'
import {
  createGetTalentAboutDataFailedMock,
  createGetTalentAboutDataMock
} from './data/mocks'

const arrangeTest = (talentId: string, mocks: MockedResponse[]) => {
  return render(
    <TestWrapperWithMocks mocks={mocks}>
      <TalentAboutSection talentId={talentId} />
    </TestWrapperWithMocks>
  )
}

describe('TalentAboutSection', () => {
  it('shows the about section', async () => {
    const talentId = '123'
    const ABOUT = 'TEST_TITLE'

    const profile = {
      id: 'test-id',
      about: ABOUT,
      __typename: 'TalentProfile'
    }

    arrangeTest(talentId, [createGetTalentAboutDataMock({ talentId, profile })])

    expect(await screen.findByText(/About/i)).toBeInTheDocument()
    expect(screen.getByText(ABOUT)).toBeInTheDocument()
  })

  it('hides the section when there is no info to display', async () => {
    const talentId = '123'
    const ABOUT = null
    const profile = {
      id: 'test-id',
      about: ABOUT,
      __typename: 'TalentProfile'
    }
    const mock = createGetTalentAboutDataMock({ talentId, profile })

    arrangeTest(talentId, [mock])

    // wait for query
    await waitFor(() => {})

    expect(screen.queryByText(/About/i)).not.toBeInTheDocument()
  })

  // TODO: failing test
  // eslint-disable-next-line jest/no-disabled-tests
  it.skip('shows notification error when the query fails', async () => {
    const talentId = '123'
    const NOTIFICATION_MESSAGE = 'Unable to fetch talent about dat.'

    arrangeTest(talentId, [createGetTalentAboutDataFailedMock({ talentId })])

    expect(await screen.findByText(NOTIFICATION_MESSAGE)).toBeInTheDocument()
  })
})
