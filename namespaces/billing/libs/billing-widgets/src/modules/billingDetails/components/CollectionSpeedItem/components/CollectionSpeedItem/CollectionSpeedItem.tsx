import React, { memo, useCallback, useState } from 'react'
import { Pencil16 } from '@toptal/picasso/Icon'
import { Operation, ClientCollectionSpeed } from '@staff-portal/graphql/staff'
import ComponentTogglerWithForm from '@staff-portal/billing/src/components/ComponentTogglerWithForm'
import {
  handleSubmit,
  handleOnSubmissionError
} from '@staff-portal/billing/src/_lib/form/handlers'
import useFormSubmission from '@staff-portal/billing/src/_lib/customHooks/useFormSubmission'

import { useSetUpdateClientCollectionSpeedMutation } from '../../../../data'
import CollectionSpeedLabel from '../CollectionSpeedLabel'
import CollectionSpeedForm from '../CollectionSpeedForm'

const displayName = 'CollectionSpeedItem'
const responseKey = 'updateClientCollectionSpeed'

type Props = {
  initialValues: {
    collectionSpeed?: ClientCollectionSpeed
    clientId: string
  }
  operation: Operation
}

const CollectionSpeedItem = ({
  initialValues: { collectionSpeed, clientId },
  operation
}: Props) => {
  const [toggled, setToggled] = useState(false)
  const toggleEditor = useCallback(
    () => setToggled(prevToggled => !prevToggled),
    [setToggled]
  )
  const { handleOnRootLevelError } = useFormSubmission()
  const [updateClientCollectionSpeed] =
    useSetUpdateClientCollectionSpeedMutation({
      onRootLevelError: handleOnRootLevelError
    })

  const label = useCallback(
    () => <CollectionSpeedLabel collectionSpeed={collectionSpeed} />,
    [collectionSpeed]
  )

  const form = useCallback(
    ({ submitting }) => (
      <CollectionSpeedForm
        submitting={submitting}
        initialValue={collectionSpeed}
      />
    ),
    [collectionSpeed]
  )

  return (
    <ComponentTogglerWithForm
      data-testid={displayName}
      alignItems='center'
      flex
      isToggled={toggled}
      initialFormValues={{
        collectionSpeed,
        clientId
      }}
      onToggle={toggleEditor}
      handleOnSubmit={handleSubmit({
        handleError: handleOnSubmissionError(responseKey),
        handleSuccess: toggleEditor,
        responseKey,
        submit: updateClientCollectionSpeed
      })}
      ComponentA={label}
      ComponentB={form}
      icon={<Pencil16 />}
      operation={operation}
    />
  )
}

CollectionSpeedItem.displayName = displayName

export default memo(CollectionSpeedItem)
