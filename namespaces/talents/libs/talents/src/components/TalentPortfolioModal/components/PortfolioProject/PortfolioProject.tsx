import React, { RefObject, useState, useEffect } from 'react'
import { Container } from '@toptal/picasso'
import { PortfolioItemFileImage } from '@staff-portal/graphql/staff'

import { TalentPortfolioItemFragment } from '../../../../data/talent-portfolio-item-fragment'
import ProjectSummary from '../ProjectSummary'
import ProjectNavigation from '../ProjectNavigation'
import * as S from './styles'
import MediaGalleryItemInfo from '../MediaGalleryItemInfo'
import MediaGallery from '../MediaGallery'
import { File } from '../PortfolioThumbnail/PortfolioThumbnail'

type Props = {
  project: TalentPortfolioItemFragment
  projectIndex: number
  handleNextProject: () => void
  handlePreviousProject: () => void
  handleSummaryClick: () => void
  onMediaChange: () => void
  totalProjectsCount: number
  scrollContainerRef: RefObject<HTMLDivElement>
  expanded: boolean
}

const getInitialFileFromProject = (project: TalentPortfolioItemFragment) =>
  project.files?.nodes[0] as File

const PortfolioProject = ({
  project,
  handlePreviousProject,
  handleNextProject,
  handleSummaryClick,
  projectIndex,
  totalProjectsCount,
  expanded,
  scrollContainerRef,
  onMediaChange
}: Props) => {
  const initialFile = getInitialFileFromProject(project)
  const [currentFile, setCurrFile] = useState<File>(initialFile)

  useEffect(() => {
    const nextFile = getInitialFileFromProject(project)

    setCurrFile(nextFile)
  }, [project, setCurrFile])

  const handleChange = (file: File) => {
    setCurrFile(file)
    onMediaChange()
  }

  return (
    <Container flex css={S.sections}>
      <Container
        flex
        css={S.gallerySection}
        alignItems='center'
        justifyContent='center'
      >
        <MediaGallery
          files={project.files?.nodes as PortfolioItemFileImage[]}
          onSelectMedia={handleChange}
          currentMedia={currentFile}
        />
      </Container>
      <Container css={S.contentSection}>
        <ProjectSummary
          portfolioItem={project}
          expanded={expanded}
          handleSummaryClick={handleSummaryClick}
          scrollContainerRef={scrollContainerRef}
        >
          <MediaGalleryItemInfo
            description={currentFile?.description}
            title={currentFile?.title}
          />
        </ProjectSummary>
        <ProjectNavigation
          navigationIndex={projectIndex}
          totalCount={totalProjectsCount}
          onPreviousClick={handlePreviousProject}
          onNextClick={handleNextProject}
        />
      </Container>
    </Container>
  )
}

export default PortfolioProject
