import React, { ReactNode } from 'react'
import { RepresentativeFragment } from '@staff-portal/client-representatives'
import { Section, SkeletonLoader } from '@toptal/picasso'
import { ContainerLoader } from '@staff-portal/ui'
import { render } from '@testing-library/react'

import OpportunitiesContent from '../OpportunitiesContent/OpportunitiesContent'
import { OpportunitiesSection } from './OpportunitiesSection'
import { LinkOpportunityButton } from '../LinkOpportunityButton'

jest.mock('../OpportunitiesContent/OpportunitiesContent', () => ({
  __esModule: true,
  default: jest.fn()
}))
jest.mock('../LinkOpportunityButton', () => ({
  LinkOpportunityButton: jest.fn()
}))
jest.mock('@toptal/picasso', () => ({
  ...jest.requireActual('@toptal/picasso'),
  Section: jest.fn()
}))
jest.mock('@staff-portal/ui', () => ({ ContainerLoader: jest.fn() }))

const SectionMock = Section as unknown as jest.Mock
const OpportunitiesContentMock = OpportunitiesContent as jest.Mock
const ContainerLoaderMock = ContainerLoader as jest.Mock

const LOADING = Symbol() as unknown as boolean
const INITIAL_LOADING = Symbol() as unknown as boolean
const REPRESENTATIVE = {
  id: Symbol(),
  operations: { linkOpportunityCompanyRepresentative: Symbol() }
} as unknown as RepresentativeFragment

describe('OpportunitiesSection', () => {
  it('renders section and opportunities content', () => {
    OpportunitiesContentMock.mockReturnValue(null)
    ContainerLoaderMock.mockImplementationOnce(
      ({ children }: { children: ReactNode }) => children
    )
    SectionMock.mockImplementationOnce(
      ({ children }: { children: ReactNode }) => children
    )

    render(
      <OpportunitiesSection
        loading={LOADING}
        initialLoading={INITIAL_LOADING}
        representative={REPRESENTATIVE}
      />
    )

    expect(OpportunitiesContentMock).toHaveBeenCalledWith(
      { representative: REPRESENTATIVE },
      {}
    )
    expect(SectionMock).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'Opportunities',
        actions: expect.objectContaining({
          type: LinkOpportunityButton,
          props: {
            representativeId: REPRESENTATIVE.id,
            operation:
              REPRESENTATIVE.operations.linkOpportunityCompanyRepresentative
          }
        })
      }),
      {}
    )
    expect(ContainerLoaderMock).toHaveBeenCalledWith(
      expect.objectContaining({
        loading: LOADING,
        showSkeleton: INITIAL_LOADING,
        skeletonComponent: expect.objectContaining({
          type: SkeletonLoader.Typography
        })
      }),
      {}
    )
  })
})
