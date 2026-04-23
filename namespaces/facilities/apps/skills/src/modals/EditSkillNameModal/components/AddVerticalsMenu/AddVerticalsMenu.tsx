import React from 'react'
import { Menu } from '@toptal/picasso'
import { titleize } from '@staff-portal/string'

import { VerticalWithSkillCategoriesFragment } from '../../../../data/get-verticals-with-categories'

interface Props {
  availableVerticals: VerticalWithSkillCategoriesFragment[]
  onAddVertical: (verticalId: string, categoryId: string) => void
}

const AddVerticalsMenu = ({ availableVerticals, onAddVertical }: Props) => {
  return (
    <Menu>
      {availableVerticals.map(({ id, talentType, skillCategories }) => (
        <Menu.Item
          key={id}
          onClick={() => onAddVertical(id, skillCategories.nodes[0].id)}
        >
          {titleize(talentType)}
        </Menu.Item>
      ))}
    </Menu>
  )
}

export default AddVerticalsMenu
