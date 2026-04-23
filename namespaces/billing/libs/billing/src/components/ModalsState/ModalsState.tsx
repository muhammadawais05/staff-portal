/* eslint-disable max-lines */
import React, {
  Suspense,
  FC,
  ReactNode,
  useMemo,
  LazyExoticComponent
} from 'react'
import { Container } from '@toptal/picasso'
import { camelCase } from 'lodash-es'
import { useDependency } from '@staff-portal/dependency-injector'
import { ModalSkeleton } from '@staff-portal/ui'

import { BILLING_MODALS_PATH_MAP } from '../../dependencies'
import * as S from './styles'
import * as Smc from '../ModalContainer/styles'
import { ModalKey } from '../../@types/types'
import { useStore } from '../../store'
import { ModalData } from '../../store/modalActions'

const displayName = 'ModalsState'

type ImportPath =
  | null
  | FC<{ options: Required<ModalData> }>
  | LazyExoticComponent<FC<{ options: Required<ModalData> }>>

export type ModalPathsMap = {
  [key: string]: ImportPath
}

const getContent = (
  modalName: ModalKey | null | undefined,
  options: ModalData,
  modalPathsMap?: ModalPathsMap
) => {
  const modalOrPath =
    modalName && modalPathsMap ? modalPathsMap[modalName] : null

  if (!modalOrPath) {
    console.warn(`ModalsState: unknown modal: ${modalName}`)

    return
  }

  const Content = modalOrPath

  return <Content options={options as Required<ModalData>} />
}

export const ModalsState = () => {
  const {
    state: {
      modal: { modalName, options },
      confirmation
    }
  } = useStore()

  const modalPathsMap = useDependency(BILLING_MODALS_PATH_MAP)

  const content: ReactNode = useMemo(
    () => getContent(modalName, options, modalPathsMap),
    [modalName, modalPathsMap, options]
  )
  const hasConfirmation = !!confirmation?.actionTitle
  const testId = hasConfirmation
    ? `${displayName}-${camelCase(modalName)}-confirmation`
    : `${displayName}-${camelCase(modalName)}`
  const containerStyle = [
    Smc.modalContainer,
    S.confirmationContainer(hasConfirmation)
  ]

  return content ? (
    <Container css={containerStyle} data-testid={testId}>
      <Suspense fallback={<ModalSkeleton title='' />}>{content}</Suspense>
    </Container>
  ) : null
}

ModalsState.displayName = displayName

export default ModalsState
