import React, { FC, memo, ReactNode } from 'react'
import { SkeletonLoader, Container, Modal } from '@toptal/picasso'

interface Props {
  title?: ReactNode
}

const ModalSkeleton: FC<Props> = memo<Props>(({ title }) => {
  return (
    <Container data-testid='ModalSkeleton'>
      <Modal.Title data-testid='ModalSkeleton-title'>{title ?? ''}</Modal.Title>
      <Modal.Content>
        <SkeletonLoader.Typography />
        <SkeletonLoader.Header />
        <SkeletonLoader.Typography />
        <SkeletonLoader.Typography />
        <SkeletonLoader.Header />
        <SkeletonLoader.Typography rows={3} />
      </Modal.Content>
      <Modal.Actions>
        <Container bottom='small' flex justifyContent='flex-end'>
          <SkeletonLoader.Button />
          <Container inline left={1}>
            <SkeletonLoader.Button />
          </Container>
        </Container>
      </Modal.Actions>
    </Container>
  )
})

export default ModalSkeleton
