import { Button, Typography } from '@toptal/picasso'
import React, { useMemo } from 'react'
import { titleize } from '@staff-portal/string'
import { DetailedList, DetailedListItems } from '@staff-portal/ui'
import { Modal } from '@staff-portal/modals-service'
import { isNotNullish } from '@staff-portal/utils'

import { useGetApplicationInfo } from './data'

export interface Props {
  entityId: string
  hideModal: () => void
  onModalOpen: () => void
}

// Falsy values for items are wrapped in the string, like "false", "null".
// It could be fixed it future, so below are check for both cases
// https://toptal-core.slack.com/archives/CTKM5T31V/p1613124152168000
const isDisplayedValue = (value: string | undefined | null): boolean =>
  isNotNullish(value) && !['false', 'null', ''].includes(value)

const ApplicationInfoModal = ({ entityId, hideModal, onModalOpen }: Props) => {
  const { applicationInfo, loading } = useGetApplicationInfo(entityId)

  const applicationInfoItems = useMemo(
    () =>
      applicationInfo?.reduce<DetailedListItems>((acc, { key, value }) => {
        if (isDisplayedValue(value)) {
          acc.push({
            label: titleize(key),
            value
          })
        }

        return acc
      }, []) ?? [],
    [applicationInfo]
  )

  return (
    <Modal
      onClose={hideModal}
      onOpen={onModalOpen}
      open={!loading}
      size='small'
    >
      <Modal.Title>Application Info</Modal.Title>

      <Modal.Content>
        {!applicationInfo?.length ? (
          <Typography size='medium'>The data is unavailable</Typography>
        ) : (
          // eslint-disable-next-line @toptal/davinci/no-deprecated-props
          <DetailedList labelColumnWidth={10} items={applicationInfoItems} />
        )}
      </Modal.Content>

      <Modal.Actions>
        <Button
          variant='secondary'
          data-testid='application-info-modal-close-button'
          onClick={hideModal}
        >
          Close
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

export default ApplicationInfoModal
