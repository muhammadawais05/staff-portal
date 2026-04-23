import {
  Activity,
  Task,
  Client,
  Contact,
  PlaybookTemplate,
  Subject
} from '@staff-portal/graphql/staff'

import { tasksPageStubs } from '~integration/mocks/request-stubs'
import {
  getTaskMetaDataResponse,
  getSearchChroniclesResponse,
  getChroniclesTokenResponse,
  getTaskCardCompanyResponse,
  getModelDescriptionsResponse
} from '~integration/mocks/responses'
import { OperationValue } from '~integration/types'

type Props = {
  activity?: Partial<Activity>
  task?: Partial<Task>
  company?: Partial<Client>
  companyContacts?: Partial<Contact[]>
  playbookTemplate?: Partial<PlaybookTemplate>
  subjects?: Partial<Subject[]>
}

const sharedCardTaskStubs = ({
  activity,
  task,
  company,
  companyContacts,
  playbookTemplate,
  subjects
}: Props = {}): {
  [key: string]: OperationValue
} => ({
  ...tasksPageStubs({ activity, task, playbookTemplate, subjects }),
  GetTaskCardCompany: getTaskCardCompanyResponse({
    company,
    companyContacts
  }),
  GetChroniclesToken: getChroniclesTokenResponse(),
  GetTaskMetadata: getTaskMetaDataResponse(),
  ModelDescriptions: getModelDescriptionsResponse(),
  SearchChronicles: getSearchChroniclesResponse()
})

export default sharedCardTaskStubs
