import prioritizeHighlightedSkillsInsideGroups from './prioritize-highlighted-skills-inside-groups'
import type { SkillSets } from '../types'

const NODE_SKILL = {
  id: 'VjEtU2tpbGxTZXQtMjk5OTc3Mg',
  rating: 'EXPERT',
  main: false,
  skill: {
    id: 'VjEtU2tpbGwtMzY5MjM',
    name: 'Node.js',
    category: {
      title: 'Libraries/APIs',
      position: 8
    }
  }
}

const JAVASCRIPT_SKILL = {
  id: 'VjEtU2tpbGxTZXQtMzAwMTA1OA',
  rating: 'EXPERT',
  main: false,
  skill: {
    id: 'VjEtU2tpbGwtMzY5MTQ',
    name: 'JavaScript',
    category: {
      title: 'Languages',
      position: 6
    }
  }
}

const GRAPHQL_SKILL = {
  id: 'VjEtU2tpbGxTZXQtMzAwMzUyMg',
  rating: 'STRONG',
  main: false,
  skill: {
    id: 'VjEtU2tpbGwtMzcwNTI',
    name: 'GraphQL',
    category: {
      title: 'Languages',
      position: 6
    }
  }
}

const REACT_SKILL = {
  id: 'VjEtU2tpbGxTZXQtMzAwMTA2MQ',
  rating: 'COMPETENT',
  main: false,
  skill: {
    id: 'VjEtU2tpbGwtNzkwNDU',
    name: 'React',
    category: {
      title: 'Libraries/APIs',
      position: 8
    }
  }
}

const SOFTWARE_DESIGN_SKILL = {
  id: 'VjEtU2tpbGxTZXQtMjk5OTc4MA',
  rating: 'EXPERT',
  main: false,
  skill: {
    id: 'VjEtU2tpbGwtMzc1Nzg',
    name: 'Software Design',
    category: {
      title: 'Other',
      position: 13
    }
  }
}

const MACOS_SKILL = {
  id: 'VjEtU2tpbGxTZXQtMjk5OTc2OA',
  rating: 'EXPERT',
  main: false,
  skill: {
    id: 'VjEtU2tpbGwtMzczNzY',
    name: 'MacOS',
    category: {
      title: 'Platforms',
      position: 11
    }
  }
}

const FULL_STACK_SKILL = {
  id: 'VjEtU2tpbGxTZXQtMzAwNjE0Mw',
  rating: 'EXPERT',
  main: false,
  skill: {
    id: 'VjEtU2tpbGwtMzcwMTE',
    name: 'Full-stack',
    category: {
      title: 'Other',
      position: 13
    }
  }
}

const VSCODE_SKILL = {
  id: 'VjEtU2tpbGxTZXQtMjk5OTc2OQ',
  rating: 'STRONG',
  main: false,
  skill: {
    id: 'VjEtU2tpbGwtMzc5Nzc',
    name: 'VS Code',
    category: {
      title: 'Tools',
      position: 9
    }
  }
}

const GIT_SKILL = {
  id: 'VjEtU2tpbGxTZXQtMjk5OTc3MA',
  rating: 'STRONG',
  main: false,
  skill: {
    id: 'VjEtU2tpbGwtMzY5Mjc',
    name: 'Git',
    category: {
      title: 'Tools',
      position: 9
    }
  }
}

const MICROSERVICES_SKILL = {
  id: 'VjEtU2tpbGxTZXQtMzAwNjE0Mg',
  rating: 'STRONG',
  main: false,
  skill: {
    id: 'VjEtU2tpbGwtMzcxMjQ',
    name: 'Microservices',
    category: {
      title: 'Paradigms',
      position: 10
    }
  }
}

const C_SKILL = {
  id: 'VjEtU2tpbGxTZXQtMjk5OTc3NQ',
  rating: 'COMPETENT',
  main: false,
  skill: {
    id: 'VjEtU2tpbGwtMzY5NjA',
    name: 'C',
    category: {
      title: 'Languages',
      position: 6
    }
  }
}

const EXPERT_SKILLS = [
  MACOS_SKILL,
  NODE_SKILL,
  SOFTWARE_DESIGN_SKILL,
  JAVASCRIPT_SKILL,
  FULL_STACK_SKILL
]

const STRONG_SKILLS = [
  VSCODE_SKILL,
  GIT_SKILL,
  GRAPHQL_SKILL,
  MICROSERVICES_SKILL
]

const COMPETENT_SKILLS = [C_SKILL, REACT_SKILL]

const SKILLS = [
  ...EXPERT_SKILLS,
  ...STRONG_SKILLS,
  ...COMPETENT_SKILLS
] as SkillSets

const HIGHLIGHTED_SKILLS = [
  NODE_SKILL,
  JAVASCRIPT_SKILL,
  GRAPHQL_SKILL,
  REACT_SKILL
]

describe('prioritizeHighlightedSkillsInsideGroups', () => {
  describe('no highlighted skill passed', () => {
    it('returns provided skills', () => {
      const prioritized = prioritizeHighlightedSkillsInsideGroups(SKILLS, [])

      expect(prioritized).toBe(SKILLS)
    })
  })

  describe('highlighted skill ids are passed', () => {
    it('prioritizes highlighted skills inside their respective rating groups', () => {
      const highlightedIds = HIGHLIGHTED_SKILLS.map(
        skillSet => skillSet.skill.id
      )
      const prioritized = prioritizeHighlightedSkillsInsideGroups(
        SKILLS,
        highlightedIds
      )

      expect(prioritized).toEqual([
        NODE_SKILL,
        JAVASCRIPT_SKILL,
        MACOS_SKILL,
        SOFTWARE_DESIGN_SKILL,
        FULL_STACK_SKILL,
        GRAPHQL_SKILL,
        VSCODE_SKILL,
        GIT_SKILL,
        MICROSERVICES_SKILL,
        REACT_SKILL,
        C_SKILL
      ])
    })
  })
})
