import React, { useState, useRef, useEffect } from 'react'

import { TalentPortfolioItemFragment } from '../../../../data/talent-portfolio-item-fragment'
import PortfolioProject from '../PortfolioProject'

type Props = {
  projects: TalentPortfolioItemFragment[]
  startProjectId?: string
}

const PortfolioProjects = ({ projects, startProjectId }: Props) => {
  const startProjectIndex = projects.findIndex(
    project => project.id === startProjectId
  )
  const initialIndex = startProjectIndex > -1 ? startProjectIndex : 0
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [expanded, setExpanded] = useState(true)
  const currentProject = projects[currentIndex]

  useEffect(() => setCurrentIndex(initialIndex), [initialIndex])

  if (!currentProject) {
    return null
  }

  const scrollToTop = () => {
    const scrollContainerElement = scrollContainerRef.current

    if (scrollContainerElement) {
      scrollContainerElement.scrollTop = 0
    }
  }

  const toggleSummary = () => {
    setExpanded(!expanded)
  }

  const closeSummary = () => {
    setExpanded(false)
  }

  const handleMediaChange = () => {
    closeSummary()
  }

  const handleNextProject = () => {
    const nextIndex = currentIndex + 1

    if (nextIndex < projects.length) {
      setCurrentIndex(nextIndex)
      setExpanded(true)
      scrollToTop()
    }
  }

  const handlePreviousProject = () => {
    const nextIndex = currentIndex - 1

    if (nextIndex >= 0) {
      setCurrentIndex(nextIndex)
      setExpanded(true)
      scrollToTop()
    }
  }

  return (
    <PortfolioProject
      project={currentProject}
      projectIndex={currentIndex}
      handlePreviousProject={handlePreviousProject}
      handleNextProject={handleNextProject}
      totalProjectsCount={projects.length}
      handleSummaryClick={toggleSummary}
      onMediaChange={handleMediaChange}
      scrollContainerRef={scrollContainerRef}
      expanded={expanded}
    />
  )
}

export default PortfolioProjects
