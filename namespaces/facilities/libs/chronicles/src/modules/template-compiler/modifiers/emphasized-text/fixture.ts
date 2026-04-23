/* eslint-disable no-useless-escape */

export const EMPHASIZED_TEXT_TEMPLATE = {
  id: '000595e5-58e2-e4d7-0000-0000020e7dd6',
  occurredAt: '2019-10-27T10:39:14-04:00',
  action: 'resolved',
  subjectGID: 'gid://platform/OperationalIssueAssignment/21191',
  subjectName: null,
  performerGID: 'gid://platform/Staff/667924',
  comment: 'This part was obfuscated, some content was here.',
  payload:
    '{"owner":{"gid":"gid://platform/Staff/667924"},"causes":[{"gid":"gid://platform/OperationalIssueAssignmentCause/22667"}],"resolution":"I will be completing all the necessary tasks over the next couple of days.","observation":"I have been out of the office on vacation.","operational_issue":{"gid":"gid://platform/OperationalIssue/138084"},"operational_issue_assignment":{"gid":"gid://platform/OperationalIssueAssignment/21191","reference":"Overdue tasks"}}',
  template:
    'Escalation %{subject} %{action|emphasized_text(closed,good)} by %{performer}'
}

export const MODEL_DESCRIPTIONS = [
  {
    gid: 'gid://platform/OperationalIssueAssignment/21191',
    associationReferences: [],
    designation: 'operational issue assignment',
    reference: {
      text: 'level 0',
      accessible: false,
      options: [],
      path: null
    }
  },
  {
    gid: 'gid://platform/Staff/667924',
    associationReferences: [],
    designation: 'staff member',
    reference: {
      text: 'Lucas Strick',
      accessible: false,
      options: [],
      path: null
    }
  },
  {
    gid: 'gid://platform/OperationalIssueAssignmentCause/22667',
    associationReferences: [],
    designation: 'operational issue assignment cause',
    reference: {
      text: '',
      accessible: false,
      options: [],
      path: null
    }
  },
  {
    gid: 'gid://platform/OperationalIssue/138084',
    associationReferences: [],
    designation: 'operational issue',
    reference: {
      text: 'Overdue tasks',
      accessible: false,
      options: [],
      path: null
    }
  }
]
