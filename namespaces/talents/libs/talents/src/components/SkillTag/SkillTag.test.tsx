import React, { ComponentProps } from 'react'
import {
  Container,
  Indicator,
  Link16,
  Tag,
  Typography,
  TypographyOverflow
} from '@toptal/picasso'
import { render } from '@toptal/picasso/test-utils'
import { SkillRating } from '@staff-portal/graphql/staff'
import { Link } from '@staff-portal/navigation'
import { getTalentsSearchPathBySkill } from '@staff-portal/routes'

import SkillTag from './SkillTag'
import * as S from './styles'

jest.mock('@staff-portal/routes', () => ({
  getTalentsSearchPathBySkill: jest.fn()
}))
jest.mock('@toptal/picasso', () => ({
  Container: jest.fn(),
  Indicator: jest.fn(),
  Link16: jest.fn(),
  Tag: jest.fn(),
  Typography: jest.fn(),
  TypographyOverflow: jest.fn()
}))

const TagMock = Tag as unknown as jest.Mock
const IndicatorMock = Indicator as unknown as jest.Mock
const Link16Mock = Link16 as unknown as jest.Mock
const ContainerMock = Container as jest.Mock
const TypographyMock = Typography as unknown as jest.Mock
const TypographyOverflowMock = TypographyOverflow as unknown as jest.Mock
const getTalentsSearchPathBySkillMock =
  getTalentsSearchPathBySkill as unknown as jest.Mock

const renderComponent = (
  props?: Omit<ComponentProps<typeof SkillTag>, 'name'>
) => render(<SkillTag name='TAG NAME' {...props} />)

describe('SkillTag', () => {
  beforeEach(() => {
    ContainerMock.mockImplementation(({ children }) => children)
    TagMock.mockImplementationOnce(({ children }) => children)
    Link16Mock.mockReturnValueOnce(null)
    IndicatorMock.mockReturnValueOnce(null)
    TypographyMock.mockReturnValueOnce(null)
    TypographyOverflowMock.mockReturnValueOnce(null)
    getTalentsSearchPathBySkillMock.mockReturnValueOnce(
      'TalentsSearchPathBySkill'
    )
  })

  it('default render', () => {
    renderComponent()

    expect(TagMock).toHaveBeenCalledWith(
      expect.objectContaining({
        as: Link,
        _css: [S.skillTag, S.rank1],
        noUnderline: true,
        href: 'TalentsSearchPathBySkill'
      }),
      {}
    )

    expect(IndicatorMock).not.toHaveBeenCalled()
    expect(TypographyMock).not.toHaveBeenCalled()

    expect(TypographyOverflowMock).toHaveBeenCalledWith(
      expect.objectContaining({ children: 'TAG NAME' }),
      {}
    )
  })

  it('uses different styles when rating is set', () => {
    renderComponent({ rating: SkillRating.EXPERT })

    expect(TagMock).toHaveBeenCalledWith(
      expect.objectContaining({
        _css: [S.skillTag, S.rank3]
      }),
      {}
    )
  })

  it('renders an Indicator if highlighted', () => {
    renderComponent({ highlighted: true })

    expect(IndicatorMock).toHaveBeenCalled()
  })

  it('renders connectionsCount if its count is > 0', () => {
    renderComponent({ connectionsCount: 3 })

    expect(TypographyMock).toHaveBeenCalledWith(
      expect.objectContaining({ children: 3 }),
      {}
    )
  })

  it('renders as div if hasLink is false', () => {
    renderComponent({ hasLink: false })

    expect(TagMock).toHaveBeenCalledWith(
      expect.objectContaining({
        as: 'div',
        href: undefined
      }),
      {}
    )

    expect(TagMock).not.toHaveBeenCalledWith(
      expect.objectContaining({
        noUnderline: true
      }),
      {}
    )
  })
})
