// eslint-disable-next-line import/no-extraneous-dependencies
import { plugins } from '@toptal/davinci-ci'
import { schedule } from 'danger'

import conventionalEmptyAssignee from './ci/danger/plugins/empty-assignee'
import conventionalEmptyLabel from './ci/danger/plugins/empty-labels'

schedule(conventionalEmptyLabel)
schedule(conventionalEmptyAssignee)
schedule(plugins.conventionalCommit.commits)
schedule(plugins.conventionalCommit.PRTitle)
