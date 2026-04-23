import { MemorandumBalance } from '@staff-portal/graphql/staff'
import { MemorandumCategoryCommonFragment } from '@staff-portal/billing-widgets/src/modules/__fragments__/memorandumCategoryCommon.graphql.types'

import { MemorandumTemplates } from './types'

export const getMemorandumCommentTemplates = (
  nodes?: MemorandumCategoryCommonFragment[]
): MemorandumTemplates => {
  return (nodes || []).reduce((templates, { id, credit, debit }) => {
    templates[id] = {
      [MemorandumBalance.CREDIT]: credit,
      [MemorandumBalance.DEBIT]: debit
    }

    return templates
  }, {} as MemorandumTemplates)
}
