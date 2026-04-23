import React from 'react'
import { render, screen } from '@testing-library/react'
import { decodeEntityId } from '@staff-portal/data-layer-service'
import { TestWrapperWithMocks } from '@staff-portal/test-utils'

import PossibleDuplicatesTalentsSection from './PossibleDuplicatesTalentsSection'
import { createGetPossibleDuplicatesMock } from './data/get-possible-duplicates/mocks'

describe('PossibleDuplicatesTalentsSection', () => {
  it('links to possible duplicates', async () => {
    const TALENT_ID = 'VjEtVGFsZW50LTEzNDA4NDU'
    const possibleDuplicate = { id: TALENT_ID, fullName: 'Talent Full Name' }

    render(
      <TestWrapperWithMocks
        mocks={[
          createGetPossibleDuplicatesMock({
            talentId: TALENT_ID,
            possibleDuplicate
          })
        ]}
      >
        <PossibleDuplicatesTalentsSection talentId={TALENT_ID} />
      </TestWrapperWithMocks>
    )

    expect(
      await screen.findByText('Possible Duplicates Found')
    ).toBeInTheDocument()

    expect(screen.getByText(possibleDuplicate.fullName)).toHaveAttribute(
      'href',
      `/talents/${decodeEntityId(possibleDuplicate.id).id}`
    )
  })
})
