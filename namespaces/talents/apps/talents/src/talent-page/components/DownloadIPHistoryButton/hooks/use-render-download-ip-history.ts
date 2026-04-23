import { useNotifications } from '@toptal/picasso/utils'
import { useMessageEmitter } from '@toptal/staff-portal-message-bus'
import { TALENT_UPDATED } from '@staff-portal/talents'
import { downloadByUrl } from '@staff-portal/utils'

import {
  useDownloadTalentIpHistory,
  DownloadTalentIpHistoryMutation
} from '../data'

export const useRenderDownloadIPHistory = ({
  talentId
}: {
  talentId: string
}) => {
  const { showError } = useNotifications()
  const emitMessage = useMessageEmitter()
  const [downloadIpHistory] = useDownloadTalentIpHistory({
    talentId,
    onError: () => showError('Unable to download IP history.'),
    onCompleted: (data: DownloadTalentIpHistoryMutation) => {
      const isSuccess = data.downloadTalentIpHistory?.success
      const downloadUrl = data.downloadTalentIpHistory?.downloadUrl

      if (isSuccess) {
        emitMessage(TALENT_UPDATED, { talentId })

        if (downloadUrl) {
          downloadByUrl(downloadUrl)
        }
      }
    }
  })

  return {
    downloadIpHistory
  }
}
