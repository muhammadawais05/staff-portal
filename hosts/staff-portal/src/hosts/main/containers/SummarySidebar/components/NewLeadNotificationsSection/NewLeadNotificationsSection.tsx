import React, { useEffect, useState, useContext } from 'react'
import { Container, Typography } from '@toptal/picasso'
import { useNotifications } from '@toptal/picasso/utils'
import { parseISO, differenceInMinutes } from '@staff-portal/date-time-utils'
import { RouteContext } from '@staff-portal/navigation'
import { useStateWithLocalStorage } from '@staff-portal/local-storage-service'
import { getCompanyApplicantsPath } from '@staff-portal/routes'
import { isOperationHidden } from '@staff-portal/operations'
import { Notifications } from '@staff-portal/notifications'

import SidebarWidget from '../SidebarWidget'
import CounterRow from '../CounterRow'
import SalesNotificationsToggle from '../SalesNotificationsToggle'
import SalesSoundToggle from '../SalesSoundToggle'
import {
  usePollClaimableClients,
  NewLeadFragment
} from './data/poll-claimable-clients'
import createNewLeadNotification from './create-new-lead-notification'
import createEscalationNotification from './create-escalation-notification'
import NewLeadNotificationsTooltip from '../NewLeadNotificationsTooltip'

const NOTIFICATIONS_ENABLED_STORAGE_KEY = 'sales-tools-notifications-enabled'
const SOUND_ENABLED_STORAGE_KEY = 'sales-tools-notifications-sound-enabled'
const NOTIFIED_NEW_LEADS_IDS_STORAGE_KEY = 'sales-tools-notified-new-leads-ids'
const NOTIFIED_ESCALATIONS_IDS_STORAGE_KEY =
  'sales-tools-notified-escalations-ids'
const INITIAL_NOTIFICATIONS_SETTING = false
const INITIAL_SOUND_SETTING = true
const MINUTES_FOR_ESCALATION = 7
const POLLING_PERIOD = 5000

interface Props {
  escalationsEnabled: boolean
}

const NewLeadNotificationsSection = ({ escalationsEnabled }: Props) => {
  const getRoute = useContext(RouteContext)
  const { showError } = useNotifications()
  const [notificationsEnabled, setNotificationsEnabled] =
    useStateWithLocalStorage(
      NOTIFICATIONS_ENABLED_STORAGE_KEY,
      INITIAL_NOTIFICATIONS_SETTING,
      true
    )
  const [notificationsAllowed, setNotificationsAllowed] = useState(
    !Notifications.isPermissionDenied()
  )
  const [soundEnabled, setSoundEnabled] = useStateWithLocalStorage(
    SOUND_ENABLED_STORAGE_KEY,
    INITIAL_SOUND_SETTING,
    true
  )
  const [notifiedNewLeadsIds, setNotifiedNewLeadsIds] =
    useStateWithLocalStorage<string[]>(
      NOTIFIED_NEW_LEADS_IDS_STORAGE_KEY,
      [],
      true
    )
  const [notifiedEscalationsIds, setNotifiedEscalationsIds] =
    useStateWithLocalStorage<string[]>(
      NOTIFIED_ESCALATIONS_IDS_STORAGE_KEY,
      [],
      true
    )

  const notifyNewEscalations = async (
    clients: NewLeadFragment[]
  ): Promise<string[] | undefined> => {
    const unnotifiedEscalations = clients.filter(
      ({ id, claimableSince }) =>
        claimableSince &&
        differenceInMinutes(new Date(), parseISO(claimableSince)) >=
          MINUTES_FOR_ESCALATION &&
        !notifiedEscalationsIds?.includes(id)
    )

    if (!unnotifiedEscalations.length) {
      return
    }

    const unnotifiedEscalationsIds = unnotifiedEscalations.map(({ id }) => id)

    const companyApplicationPath = getRoute(getCompanyApplicantsPath()).url

    unnotifiedEscalationsIds.forEach(id => {
      createEscalationNotification({
        tag: `escalation-${id}`,
        playSound: soundEnabled,
        companyApplicationPath
      })
    })

    const escalationsIds = [
      ...notifiedEscalationsIds,
      ...unnotifiedEscalationsIds
    ]

    setNotifiedEscalationsIds(escalationsIds)

    const uniqueNewLeadsIds = Array.from(
      new Set([...notifiedNewLeadsIds, ...unnotifiedEscalationsIds])
    )

    setNotifiedNewLeadsIds(uniqueNewLeadsIds)

    return escalationsIds
  }

  const resetNotifiedIds = () => {
    setNotifiedNewLeadsIds([])
    setNotifiedEscalationsIds([])
  }

  const notifyNewLeads = async ({
    clients,
    escalationsIds
  }: {
    clients: NewLeadFragment[]
    escalationsIds?: string[]
  }) => {
    const unnotifiedNewLeads = clients.filter(
      ({ id }) =>
        !notifiedNewLeadsIds?.includes(id) && !escalationsIds?.includes(id)
    )

    if (!unnotifiedNewLeads.length) {
      return
    }

    const unnotifiedNewLeadsIds = unnotifiedNewLeads.map(({ id }) => id)

    const companyApplicationPath = getRoute(getCompanyApplicantsPath()).url

    createNewLeadNotification({
      tag: 'new-leads-' + unnotifiedNewLeadsIds.join(':'),
      numberOfClients: unnotifiedNewLeadsIds.length,
      playSound: soundEnabled,
      companyApplicationPath
    })

    setNotifiedNewLeadsIds([...notifiedNewLeadsIds, ...unnotifiedNewLeadsIds])
  }

  const checkRequirements = async (clients: NewLeadFragment[]) => {
    if (!notificationsEnabled) {
      return false
    }

    if (!(await Notifications.requestPermission())) {
      setNotificationsAllowed(false)
      setNotificationsEnabled(false)

      return false
    }

    if (!clients.length) {
      // prevent overloading local storage
      resetNotifiedIds()

      return false
    }

    return true
  }

  const { startPolling, stopPolling } = usePollClaimableClients({
    onCompleted: async data => {
      const clients = data?.clientApplicants?.nodes || []

      const filteredClients = clients.filter(
        client => !isOperationHidden(client.operations.createClientClaimer)
      )
      const matchedRequirements = await checkRequirements(filteredClients)

      if (!matchedRequirements) {
        return
      }

      const escalationsIds = escalationsEnabled
        ? await notifyNewEscalations(filteredClients)
        : undefined

      notifyNewLeads({ clients: filteredClients, escalationsIds })
    },
    onError: () => showError('Unable to get claimable clients.')
  })

  useEffect(() => {
    if (notificationsEnabled) {
      return startPolling(POLLING_PERIOD)
    }

    stopPolling()
  }, [notificationsEnabled, startPolling, stopPolling])

  if (!Notifications.isSupported()) {
    return (
      <SidebarWidget.Section title='New Lead Notifications'>
        <Typography>Notifications are not supported by this browser</Typography>
      </SidebarWidget.Section>
    )
  }

  return (
    <SidebarWidget.Section
      title='New Lead Notifications'
      actions={<NewLeadNotificationsTooltip />}
    >
      <CounterRow
        name='Messages'
        counter={
          <Container flex>
            <Container>
              <SalesNotificationsToggle
                enabled={notificationsEnabled}
                allowed={notificationsAllowed}
                onPlay={async () => {
                  if (await Notifications.requestPermission()) {
                    setNotificationsEnabled(true)
                    setNotificationsAllowed(true)
                  }
                }}
                onStop={() => setNotificationsEnabled(false)}
              />
            </Container>
            <Container left='xsmall'>
              <SalesSoundToggle
                enabled={soundEnabled}
                onTurnOn={() => setSoundEnabled(true)}
                onTurnOff={() => setSoundEnabled(false)}
              />
            </Container>
          </Container>
        }
      />
    </SidebarWidget.Section>
  )
}

export default NewLeadNotificationsSection
