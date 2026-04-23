import React from 'react'
import { render, screen, within } from '@testing-library/react'
import {
  TalentCumulativeStatus,
  SkillRating
} from '@staff-portal/graphql/staff'
import {
  TalentListPortfolioItemFragment,
  Vertical
} from '@staff-portal/talents'
import { TestWrapperWithMocks } from '@staff-portal/test-utils'
import { createUserVerticalsMock } from '@staff-portal/verticals/src/mocks'
import { useGetUserVerticals } from '@staff-portal/verticals'
import { NO_VALUE } from '@staff-portal/config'

import { createTalentsListItemFragmentMock } from '../../mocks'
import GeneralSection from './GeneralSection'
import { createGetTalentPortfolioItemsMock } from './components/PortfolioItems/data/get-talent-item-portfolio-items/mocks'
import { TalentListSkillSetFragment, TalentsListItemFragment } from '../../data'
import { useGetTalentItemPortfolioItems } from './components/PortfolioItems/data/get-talent-item-portfolio-items/get-talent-item-portfolio-items.staff.gql'

jest.mock('@staff-portal/query-params-state', () => ({
  __esModule: true,
  ...jest.requireActual('@staff-portal/query-params-state')
}))

jest.mock('@staff-portal/verticals', () => ({
  ...jest.requireActual('@staff-portal/verticals'),
  useGetUserVerticals: jest.fn()
}))

jest.mock('@staff-portal/talents/src/components/SkillTag/SkillTag.tsx', () => ({
  __esModule: true,
  default: ({ name }: { name: string }) => <>{name}</>
}))

jest.mock(
  './components/PortfolioItems/data/get-talent-item-portfolio-items/get-talent-item-portfolio-items.staff.gql',
  () => ({
    useGetTalentItemPortfolioItems: jest.fn()
  })
)

const mockUseGetUserVerticals = useGetUserVerticals as jest.Mock
const mockUseGetTalentItemPortfolioItems =
  useGetTalentItemPortfolioItems as jest.Mock

// Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#Escaping
const escapeRegExp = (string: string) =>
  string.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&')

const arrangeTest = ({
  talentFragment,
  portfolioItems
}: {
  talentFragment: TalentsListItemFragment
  portfolioItems?: TalentListPortfolioItemFragment[]
  skillSets?: TalentListSkillSetFragment
}) => {
  mockUseGetTalentItemPortfolioItems.mockReturnValue({
    data: portfolioItems ?? []
  })
  render(
    <TestWrapperWithMocks>
      <GeneralSection talent={talentFragment} isBestMatchQueryEnabled={false} />
    </TestWrapperWithMocks>
  )
}

describe('Talent List Item General Section', () => {
  beforeEach(() => {
    mockUseGetUserVerticals.mockReturnValue(createUserVerticalsMock())
  })

  afterEach(() => {
    mockUseGetTalentItemPortfolioItems.mockReset()
  })

  it('always show certain fields', async () => {
    const talentFragment = createTalentsListItemFragmentMock({
      cumulativeStatus: TalentCumulativeStatus.ACTIVE
    })

    arrangeTest({ talentFragment })

    expect(screen.getByTestId(/item-field: Status/i)).toHaveTextContent(
      /active/i
    )

    expect(screen.getByTestId(/item-field: Working Status/i)).toHaveTextContent(
      talentFragment.engagements.counters.workingNumber
        ? /working/i
        : /not working/i
    )

    expect(screen.getByTestId(/item-field: Availability$/i)).toBeInTheDocument() // Has unit tests

    expect(screen.getByTestId(/item-field: Location/i)).toHaveTextContent(
      `${talentFragment.cityDescription}, ${talentFragment.locationV2?.countryName}`
    )

    expect(screen.getByTestId(/item-field: Time Zone/i)).toHaveTextContent(
      new RegExp(`${escapeRegExp(talentFragment.timeZone?.name!)}`)
    )

    expect(
      screen.getByTestId(/item-field: Last Visit Date/i)
    ).toBeInTheDocument() // Has unit tests

    expect(screen.getByTestId(/item-field: Leadership/i)).toBeInTheDocument() // Has unit tests

    expect(
      screen.getByTestId(/item-field: Enterprise experience/i)
    ).toBeInTheDocument() // Has unit tests
  })

  it('show certain fields when talent is active', async () => {
    const talentFragment = createTalentsListItemFragmentMock({
      cumulativeStatus: TalentCumulativeStatus.ACTIVE
    })

    arrangeTest({ talentFragment })

    expect(screen.getByTestId(/item-field: Status/i)).toHaveTextContent(
      /active/i
    )

    expect(screen.getByTestId(/item-field: Approved/i)).toHaveTextContent(
      'Approved2021-03-23T20:43:27+03:00'
    )

    expect(
      screen.getByTestId(/item-field: Engagement Rate/i)
    ).toBeInTheDocument() // Has unit tests

    expect(
      screen.getByTestId(/item-field: Client Will Hire Again/i)
    ).toBeInTheDocument() // Has unit tests

    expect(
      screen.getByTestId(/item-field: Repeated Clients/i)
    ).toBeInTheDocument() // Has unit tests

    expect(
      screen.getByTestId(/item-field: Delta Waiting Time/i)
    ).toBeInTheDocument() // Has unit tests
  })

  it('show certain fields when talent is NOT active', async () => {
    const talentFragment = createTalentsListItemFragmentMock({
      cumulativeStatus: TalentCumulativeStatus.REJECTED
    })

    arrangeTest({ talentFragment })

    expect(screen.getByTestId(/item-field: Status/i)).toHaveTextContent(
      /rejected/i
    )

    expect(
      screen.getAllByTestId(/item-field: Last Edited/i)[0]
    ).toHaveTextContent('Last Edited2021-03-24T09:00:32+03:00')

    expect(
      screen.queryByTestId(/item-field: Approved/i)
    ).not.toBeInTheDocument()

    expect(
      screen.queryByTestId(/item-field: Engagement Rate/i)
    ).not.toBeInTheDocument() // Has unit tests

    expect(
      screen.queryByTestId(/item-field: Client Will Hire Again/i)
    ).not.toBeInTheDocument() // Has unit tests

    expect(
      screen.queryByTestId(/item-field: Repeated Clients/i)
    ).not.toBeInTheDocument() // Has unit tests

    expect(
      screen.queryByTestId(/item-field: Delta Waiting Time/i)
    ).not.toBeInTheDocument() // Has unit tests
  })

  it('show "Talent Partner" link when talent source is Talent Partner', async () => {
    const talentPartner: TalentsListItemFragment['talentPartner'] = {
      id: '123',
      webResource: { text: 'TEST_TEXT', url: 'TEST_URL' }
    }
    const talentFragment = createTalentsListItemFragmentMock({
      talentPartner
    })

    arrangeTest({ talentFragment })

    const talentPartnerLink = within(
      screen.getByTestId(/item-field: Talent Partner/i)
    ).getByRole('link')

    expect(talentPartnerLink).toHaveTextContent(talentPartner.webResource.text)
    expect(talentPartnerLink).toHaveAttribute(
      'href',
      talentPartner.webResource.url
    )
  })

  it('NOT show "Talent Partner" field  when talent source is NOT Talent Partner', async () => {
    const talentFragment = createTalentsListItemFragmentMock({
      talentPartner: null
    })

    arrangeTest({ talentFragment })

    expect(
      screen.queryByTestId(/item-field: Talent Partner/i)
    ).not.toBeInTheDocument()
  })

  it('Shows "Last Visit Date" field with NO_VALUE  when talent `ipLocation` field is not set', async () => {
    const talentFragment = createTalentsListItemFragmentMock({
      ipLocation: null
    })

    arrangeTest({ talentFragment })

    expect(
      screen.getByTestId(/item-field: Last Visit Date/i)
    ).toHaveTextContent(NO_VALUE)
  })

  it('renders the skillSets list', async () => {
    const SKILL_NAME = 'Financial Analysis'
    const talentFragment = createTalentsListItemFragmentMock({
      skillSets: {
        nodes: [
          {
            id: 'xyz',
            rating: SkillRating.EXPERT,
            connections: {
              totalCount: 4
            },
            skill: {
              id: 'VjEtU2tpbGwtNTk1MzI',
              name: SKILL_NAME
            }
          }
        ]
      }
    })

    arrangeTest({ talentFragment })

    expect(
      screen.getByTestId('skill-sets-list-general-section')
    ).toBeInTheDocument()
    expect(await screen.findByText(SKILL_NAME)).toBeInTheDocument()
  })

  it('does not render the skillSets list if skills are not provided', () => {
    const talentFragment = createTalentsListItemFragmentMock({
      skillSets: {
        nodes: []
      }
    })

    arrangeTest({ talentFragment })

    expect(
      screen.queryByTestId('skill-sets-list-general-section')
    ).not.toBeInTheDocument()
  })

  it('renders portfolio items list', () => {
    const talentType = Vertical.DESIGNER

    const talentFragment = createTalentsListItemFragmentMock({
      type: talentType
    })
    const {
      data: { node }
    } = createGetTalentPortfolioItemsMock({
      talentId: talentFragment.id
    })
    const portfolioItems = node.profile.portfolioItems.nodes

    arrangeTest({ talentFragment, portfolioItems })

    expect(
      screen.getByTestId('portfolio-items-general-section')
    ).toBeInTheDocument()
    expect(
      screen.getByTestId('portfolio-image-general-section')
    ).toBeInTheDocument()
  })

  it('does not render portfolio items list', () => {
    const talentFragment = createTalentsListItemFragmentMock({
      type: Vertical.DEVELOPER
    })

    arrangeTest({ talentFragment })

    expect(
      screen.queryByTestId('portfolio-items-general-section')
    ).not.toBeInTheDocument()
  })
})
