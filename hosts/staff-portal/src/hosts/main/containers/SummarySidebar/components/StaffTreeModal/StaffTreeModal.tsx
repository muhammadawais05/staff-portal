import React, { useState, useEffect } from 'react'
import {
  Container,
  Typography,
  TreeView,
  TreeViewContainer,
  TreeNodeInterface
} from '@toptal/picasso'
import { Modal, useModal } from '@staff-portal/modals-service'
import { useNotifications } from '@toptal/picasso/utils'
import { HierarchyPointNode } from 'd3-hierarchy'
import { useClientRect } from '@staff-portal/utils'

import {
  TreeNodeWithInfo,
  StaffMemberTreeCoordinates,
  StaffTreeNode
} from './types'
import {
  createTree,
  isPerson,
  lockTree,
  unlockTree,
  centerOnRootWithOffset
} from './utils'
import {
  useGetOperationalIssuesStaffTree,
  OperationalIssuesStaffTreeCardNodeFragment
} from './data/get-operational-issues-staff-tree'
import StaffTreeSearchInput from '../StaffTreeSearchInput'
import StaffTreePersonNode from '../StaffTreePersonNode'
import StaffTreeTeamNode from '../StaffTreeTeamNode'
import StaffTreeZoom from '../StaffTreeZoom'
import * as S from './styles'
import { INITIAL_SCALE } from './config'
import OperationalIssuesModal from '../OperationalIssuesModal'

export interface Props {
  hideModal: () => void
  onModalLoaded: () => void
}

const getTreeData = (data?: StaffTreeNode[]) => {
  if (data && data.length > 0) {
    return createTree(data)
  }
}

const StaffTreeModal = ({ hideModal, onModalLoaded }: Props) => {
  const { showError } = useNotifications()
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const { rect, callbackRef: containerCallbackRef } = useClientRect()

  useGetOperationalIssuesStaffTree({
    onCompleted: data => {
      const treeData = getTreeData(data.operationalIssuesStaffTree.nodes)

      setModalIsOpen(true)
      setModifiedTreeData(treeData)
      setOriginalTreeData(treeData)
    },
    onError: () => {
      onModalLoaded()
      showError('Unable to load staff tree data.')
    }
  })

  const [modifiedTreeData, setModifiedTreeData] = useState<TreeNodeWithInfo>()
  const [originalTreeData, setOriginalTreeData] = useState<TreeNodeWithInfo>()
  const [modalStaffMember, setModalStaffMember] =
    useState<OperationalIssuesStaffTreeCardNodeFragment>()

  const modalPayload = modalStaffMember
    ? {
        staffMember: modalStaffMember,
        onOpen: () => {
          if (modifiedTreeData) {
            setModifiedTreeData(unlockTree({ node: modifiedTreeData }))
          }
        },
        onClose: () => setModalStaffMember(undefined)
      }
    : null

  const { showModal } = useModal(OperationalIssuesModal, modalPayload)

  useEffect(() => {
    if (modalStaffMember) {
      showModal()
    }
  }, [modalStaffMember, showModal])

  useEffect(() => {
    if (rect) {
      setModifiedTreeData(prevRenderedTreeData => {
        if (prevRenderedTreeData) {
          return centerOnRootWithOffset(prevRenderedTreeData, rect.height)
        }
      })
    }
  }, [rect])

  const openOperationalIssuesModal = (
    staffMember: OperationalIssuesStaffTreeCardNodeFragment,
    personCoordinates: StaffMemberTreeCoordinates
  ) => {
    const lockedTreeData = lockTree({
      node: modifiedTreeData as TreeNodeWithInfo,
      loadingNode: personCoordinates
    })

    setModifiedTreeData(lockedTreeData)
    setModalStaffMember(staffMember)
  }

  const renderNode = ({ data }: HierarchyPointNode<TreeNodeInterface>) => {
    const nodeData = data as TreeNodeWithInfo

    if (isPerson(nodeData.info)) {
      return (
        <StaffTreePersonNode
          data={nodeData}
          onClick={() => {
            if (isPerson(nodeData.info)) {
              openOperationalIssuesModal(nodeData.info, {
                index: nodeData.info.index
              })
            }
          }}
        />
      )
    }

    return (
      <StaffTreeTeamNode
        data={nodeData}
        onMemberClick={({ issuesCount, node }, edgeIndex) =>
          openOperationalIssuesModal(
            {
              issuesCount,
              positions: [],
              role: node
            },
            { index: nodeData.info.index, teamMemberIndex: edgeIndex }
          )
        }
      />
    )
  }

  const renderNoContentMessage = () => (
    <Modal.Content>
      <Container
        padded='large'
        flex
        alignItems='center'
        justifyContent='center'
        css={S.noContent}
      >
        <Typography align='center' variant='heading'>
          Your current role does not appear to hold any position related to the
          company hierarchy.
        </Typography>
      </Container>
    </Modal.Content>
  )

  const renderTreeContainer = () => (
    <TreeViewContainer>
      <Modal.Content css={S.controlsContainer}>
        <Container flex justifyContent='space-between' alignItems='center'>
          <Container flex>
            <StaffTreeZoom />
          </Container>
          <StaffTreeSearchInput
            treeData={originalTreeData}
            onChange={setModifiedTreeData}
          />
        </Container>
        {modifiedTreeData && (
          <Container css={S.treeViewContainer} ref={containerCallbackRef}>
            <TreeView
              data={modifiedTreeData}
              renderNode={renderNode}
              showZoom={false}
              initialScale={INITIAL_SCALE}
              scaleExtent={[0.3, 2]}
            />
            <div css={S.treeViewOverlay} />
          </Container>
        )}
      </Modal.Content>
    </TreeViewContainer>
  )

  return (
    <Modal
      open={modalIsOpen}
      onClose={hideModal}
      onOpen={() => {
        onModalLoaded()
      }}
      size='full-screen'
    >
      <Modal.Title>Operational Issues Tree View</Modal.Title>
      {(Boolean(modifiedTreeData) && renderTreeContainer()) ||
        renderNoContentMessage()}
    </Modal>
  )
}

export default StaffTreeModal
