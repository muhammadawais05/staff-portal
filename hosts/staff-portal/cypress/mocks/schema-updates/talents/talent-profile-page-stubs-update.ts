/* eslint-disable complexity, max-lines, max-lines-per-function */
import {
  ContractKind,
  ContractOrTalentAgreementEdge,
  ContractStatus,
  FeedbackStatisticEntryConnection,
  RoleStepAdditionalActionName,
  RoleStepStatus,
  SpecializationApplicationConnection,
  TalentScreeningRoleStepConnection,
  Activation,
  ActivationTemplate,
  SpecializationApplicationStatus,
  QuizItem,
  TalentSkillSets,
  SkillRating
} from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

import { talentProfileStubs } from '~integration/mocks/request-stubs/talents/tabs/talent-profile'
import { hiddenOperationMock } from '~integration/mocks'

const updateTalentProfilePageStubs = () =>
  cy.stubGraphQLRequests({
    ...talentProfileStubs({
      skillSets: {
        nodes: [
          {
            id: encodeEntityId('456', 'SkillSet'),
            rating: SkillRating.EXPERT,
            connections: {
              totalCount: 1,
              __typename: 'SkillConnectionSkillableConnection'
            },
            skill: {
              id: encodeEntityId('567', 'Skill'),
              name: 'Programming',
              __typename: 'Skill'
            },
            vettedResult: null,
            __typename: 'SkillSet'
          }
        ],
        __typename: 'TalentSkillSets'
      } as unknown as TalentSkillSets,
      feedbackStatistics: {
        nodes: [
          {
            roleTitle: 'Client',
            answers: {
              nodes: [
                {
                  label: 'Hire again',
                  tooltip: '',
                  score: 100,
                  __typename: 'FeedbackStatisticAnswerEntry'
                }
              ],
              totalCount: 1,
              __typename: 'FeedbackStatisticAnswerEntryConnection'
            },
            __typename: 'FeedbackStatisticEntry'
          }
        ],
        __typename: 'FeedbackStatisticEntryConnection'
      } as unknown as FeedbackStatisticEntryConnection,
      contractsAndAgreements: {
        edges: [
          {
            legacy: false,
            node: {
              id: encodeEntityId('123', 'Contract'),
              kind: ContractKind.TAX_FORM,
              contractSender: {
                id: encodeEntityId('234', 'Staff'),
                fullName: 'João Mileo',
                __typename: 'Staff'
              },
              sentAt: '2021-11-01T19:34:10+03:00',
              contractStatus: ContractStatus.SIGNED,
              signatureReceivedAt: '2021-11-01T19:35:49+03:00',
              webResource: {
                text: 'ABDCD1234',
                url: 'https://staging.toptal.net/platform/staff/contracts/123',
                __typename: 'Link'
              },
              operations: {
                resendContract: hiddenOperationMock(),
                verifyContract: hiddenOperationMock(),
                destroyContract: hiddenOperationMock(),
                __typename: 'ContractOperations'
              },
              __typename: 'Contract'
            },
            __typename: 'ContractOrTalentAgreementEdge'
          } as unknown as ContractOrTalentAgreementEdge
        ]
      },
      screeningRoleSteps: {
        nodes: [
          {
            id: encodeEntityId('345', 'RoleStep'),
            status: RoleStepStatus.APPROVED,
            stepInvolvesMeeting: false,
            interviewInvitationMissing: false,
            talent: {
              id: encodeEntityId('123', 'Talent'),
              __typename: 'Talent'
            },
            step: {
              id: encodeEntityId('9', 'Step'),
              stepType: 'online_test',
              title: 'Online Test Core',
              short: 'Online Test Core',
              __typename: 'Step'
            },
            claimer: {
              id: encodeEntityId('234', 'Staff'),
              __typename: 'Staff'
            },
            mainAction: {
              actionName: null,
              status: 'HIDDEN',
              tooltip: 'Approved by Dusty Abernathy',
              __typename: 'RoleStepMainAction'
            },
            operations: {
              reassignRoleStep: hiddenOperationMock(),
              unclaimRoleStep: hiddenOperationMock(),
              unapproveRoleStep: hiddenOperationMock(),
              __typename: 'RoleStepOperations'
            },
            additionalActions: {
              nodes: [
                {
                  actionName: RoleStepAdditionalActionName.UNCLAIM_ROLE_STEP,
                  emailTemplate: null,
                  __typename: 'RoleStepAdditionalAction'
                }
              ],
              __typename: 'RoleStepAdditionalConnection'
            },
            __typename: 'RoleStep'
          }
        ],
        __typename: 'TalentScreeningRoleStepConnection'
      } as unknown as TalentScreeningRoleStepConnection,
      activation: {
        id: 'VjEtQWN0aXZhdGlvbi04MzQ4',
        status: 'in_progress',
        steps: {
          nodes: [
            {
              id: encodeEntityId('123', 'ActivationStep'),
              type: 'PAYMENT',
              status: 'NEW',
              staff: null,
              deadlineAt: null,
              operations: {
                assign: hiddenOperationMock(),
                approve: hiddenOperationMock(),
                reset: hiddenOperationMock(),
                reassign: hiddenOperationMock(),
                unassign: hiddenOperationMock(),
                sendIntroductionEmail: hiddenOperationMock(),
                sendRestorationEmail: hiddenOperationMock(),
                sendRescheduleEmail: hiddenOperationMock(),
                __typename: 'ActivationStepOperations'
              },
              __typename: 'ActivationStep'
            }
          ],
          __typename: 'ActivationStepConnection'
        },
        __typename: 'Activation'
      } as unknown as Activation,
      activationSectionInProgress: true,
      activationSectionVisible: true,
      activationTemplate: {
        id: 'VjEtQWN0aXZhdGlvblRlbXBsYXRlLTE',
        steps: {
          nodes: [
            {
              id: 'VjEtQWN0aXZhdGlvblRlbXBsYXRlU3RlcC0x',
              type: 'TALENT_AGREEMENT',
              __typename: 'ActivationTemplateStep'
            }
          ],
          __typename: 'ActivationTemplateStepsConnection'
        },
        __typename: 'ActivationTemplate'
      } as unknown as ActivationTemplate,
      specializationApplications: {
        nodes: [
          {
            id: 'VjEtU3BlY2lhbGl6YXRpb25BcHBsaWNhdGlvbi03OTI4ODU',
            status: SpecializationApplicationStatus.REJECTED,
            startedAt: '2021-08-13T20:45:17+03:00',
            completedAt: '2021-10-12T13:43:46+03:00',
            operations: {
              id: 'VjEtU3BlY2lhbGl6YXRpb25BcHBsaWNhdGlvbk9wZXJhdGlvbnMtNzkyODg1',
              convertSpecializationApplication: hiddenOperationMock(),
              rejectSpecializationApplication: hiddenOperationMock(),
              restoreSpecializationApplication: hiddenOperationMock(),
              __typename: 'SpecializationApplicationOperations'
            },
            specialization: {
              id: 'VjEtU3BlY2lhbGl6YXRpb24tMQ',
              title: 'Core',
              __typename: 'Specialization'
            },
            rejectionReason: null,
            rejectNoteTasks: {
              totalCount: 0,
              __typename: 'RejectNoteTaskConnection'
            },
            performer: null,
            __typename: 'SpecializationApplication'
          }
        ],
        __typename: 'SpecializationApplicationConnection'
      } as unknown as SpecializationApplicationConnection,
      quizItems: {
        nodes: [
          {
            questionLabel: 'What did the wasp say to the ant?',
            readableValue: ['I must fly now, but I`ll give you a buzz later!'],
            __typename: 'QuizItem'
          } as unknown as QuizItem
        ]
      }
    })
  })

export default updateTalentProfilePageStubs
