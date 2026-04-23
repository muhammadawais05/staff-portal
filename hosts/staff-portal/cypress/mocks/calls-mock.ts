import {
  CallDirection,
  CallCounterpartyType,
  Call
} from '@staff-portal/graphql/staff'

const singleCallMocked = (node?: {}): Call => ({
  id: 'VjEtQ2FsbC00NTkzNzM=',
  isDismissed: false,
  initiatorCallSid: 'wDXFCGHJBdfsg',
  createdAt: '2021-07-28',
  duration: 77,
  purpose: null,
  customPurpose: 'test',
  isMissed: false,
  isUnfilled: false,
  voicemail: null,
  recordings: [],
  direction: CallDirection.OUTBOUND,
  counterparty: {
    fullName: 'First Last',
    phoneNumber: '+1 803 302 3140',
    roleId: 'VjEtVGFsZW50LTI0NzQwMzY=',
    roleType: 'Talent'
  },
  ...node
})

const callsMock = () => ({
  totalCount: 50,
  nodes: [singleCallMocked()]
})

const callPurposes = () => ({
  nodes: [
    {
      counterpartyType: CallCounterpartyType.CLIENT,
      id: 'VjEtQ2FsbFB1cnBvc2UtMjM=',
      name: 'Sales Discovery Call',
      viewOrder: 100
    },
    {
      counterpartyType: CallCounterpartyType.TALENT,
      id: 'VjEtQ2FsbFB1cnBvc2UtMTg=',
      name: 'Confirm Talent Availability',
      viewOrder: 400
    }
  ]
})

export { callsMock, singleCallMocked, callPurposes }
