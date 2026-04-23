type SectionTitleConfig = { [key: string]: string }

interface SectionTitles {
  experience: SectionTitleConfig
  portfolio: SectionTitleConfig
}

const sectionTitles: SectionTitles = {
  experience: {
    default: 'Experience',
    ProjectManager: 'Project History',
    ProductManager: 'Project History'
  },
  portfolio: {
    default: 'Portfolio',
    FinanceExpert: 'Case Studies'
  }
}

export const getSectionTitle = (
  section: keyof typeof sectionTitles,
  roleType: string | null
) => {
  const sectionConfig = sectionTitles[section]

  if (!roleType) {
    return sectionConfig.default
  }

  return sectionConfig[roleType] ?? sectionConfig.default
}
