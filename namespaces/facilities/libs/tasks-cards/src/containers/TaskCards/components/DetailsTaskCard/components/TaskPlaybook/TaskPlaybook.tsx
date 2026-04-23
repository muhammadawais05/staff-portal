import { Helpbox } from '@toptal/picasso'
import React from 'react'
import { Link } from '@staff-portal/navigation'
import { WebResourceFragment } from '@staff-portal/facilities'

import * as S from './styles'

export interface Props {
  playbookTemplate: WebResourceFragment
}

const TaskPlaybook = ({
  playbookTemplate: {
    webResource: { text: playbookName, url }
  }
}: Props) => {
  const title = `This is a system-generated task. Playbook: ${playbookName}`

  return (
    <Helpbox css={S.playbook} variant='blue'>
      <Helpbox.Title>{title}</Helpbox.Title>
      {url && (
        <Helpbox.Content>
          You can find a detailed description of the playbook guidelines{' '}
          <Link href={url} target='_blank'>
            here
          </Link>
          .
        </Helpbox.Content>
      )}
    </Helpbox>
  )
}

export default TaskPlaybook
