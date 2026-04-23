import {
  Activity,
  CallbackRequest,
  Task,
  Engagement,
  EngagementBreak,
  Meeting,
  OperationalIssue,
  CompanyRepresentative,
  Client,
  ClientTransferRoleRequest,
  Job,
  Talent,
  SoftSkillRating,
  ActivationStepOperations,
  SpecializationApplication,
  Contract,
  HackerRankResult,
  CodilityResult,
  PortfolioFile,
  SpecialistAssignment,
  Note,
  RoleStep,
  RoleFlag,
  DraftJob,
  Feedback,
  Interview,
  SourcingRequest,
  JobApplication,
  SkillName,
  EmailMessagingEngagementClient,
  EmailMessagingEngagementTalent,
  SourcingRequestTalent,
  EmailMessagingRole,
  EmailMessagingClient,
  Negotiation,
  AvailabilityRequest,
  TalentQuizQuestion,
  EmailMessagingJobApplication,
  Opportunity,
  EmailMessagingAvailabilityRequestee,
  CommitmentChangeRequest,
  EmailMessagingJob,
  Role,
  RateChangeRequest,
  Staff,
  TopscreenClient,
  EmailTemplate,
  TopscreenPosition,
  PlaybookTemplate
} from '@staff-portal/graphql/staff'
import { NodeType } from '@staff-portal/graphql'

export type OperationType =
  | {
      nodeType: NodeType.ACTIVITY
      operationName: keyof NonNullable<Activity['operations']>
    }
  | {
      nodeType: NodeType.ACTIVATION_STEP
      operationName: keyof ActivationStepOperations
    }
  | {
      nodeType: NodeType.CALLBACK_REQUEST
      operationName: keyof CallbackRequest['operations']
    }
  | {
      nodeType: NodeType.TASK
      operationName: keyof Task['operations']
    }
  | {
      nodeType: NodeType.ENGAGEMENT
      operationName: keyof Engagement['operations']
    }
  | {
      nodeType: NodeType.ENGAGEMENT_BREAK
      operationName: keyof EngagementBreak['operations']
    }
  | {
      nodeType: NodeType.MEETING
      operationName: keyof Meeting['operations']
    }
  | {
      nodeType: NodeType.OPERATIONAL_ISSUE
      operationName: keyof OperationalIssue['operations']
    }
  | {
      nodeType: NodeType.COMPANY_REPRESENTATIVE
      operationName: keyof NonNullable<CompanyRepresentative['operations']>
    }
  | {
      nodeType: NodeType.COMMITMENT_CHANGE_REQUEST
      operationName: keyof CommitmentChangeRequest['operations']
    }
  | {
      nodeType: NodeType.CLIENT
      operationName: keyof Client['operations']
    }
  | {
      nodeType: NodeType.TOPSCREEN_CLIENT
      operationName: keyof TopscreenClient['operations']
    }
  | {
      nodeType: NodeType.TOPSCREEN_POSITION
      operationName: keyof TopscreenPosition['operations']
    }
  | {
      nodeType: NodeType.ROLE
      operationName: keyof Role['operations']
    }
  | {
      nodeType: NodeType.CLIENT_TRANSFER_ROLE_REQUEST
      operationName: keyof ClientTransferRoleRequest['operations']
    }
  | {
      nodeType: NodeType.JOB
      operationName: keyof NonNullable<Job['operations']>
    }
  | {
      nodeType: NodeType.DRAFT_JOB
      operationName: keyof DraftJob['operations']
    }
  | {
      nodeType: NodeType.TALENT
      operationName: keyof Talent['operations']
    }
  | {
      nodeType: NodeType.SOFT_SKILL_RATING
      operationName: keyof SoftSkillRating['operations']
    }
  | {
      nodeType: NodeType.SPECIALIZATION_APPLICATION
      operationName: keyof SpecializationApplication['operations']
    }
  | {
      nodeType: NodeType.CONTRACT
      operationName: keyof Contract['operations']
    }
  | {
      nodeType: NodeType.HACKER_RANK_RESULT
      operationName: keyof HackerRankResult['operations']
    }
  | {
      nodeType: NodeType.CODILITY_RESULT
      operationName: keyof CodilityResult['operations']
    }
  | {
      nodeType: NodeType.PORTFOLIO_FILE
      operationName: keyof PortfolioFile['operations']
    }
  | {
      nodeType: NodeType.SPECIALIST_ASSIGNMENT
      operationName: keyof SpecialistAssignment['operations']
    }
  | {
      nodeType: NodeType.NOTE
      operationName: keyof Note['operations']
    }
  | {
      nodeType: NodeType.ROLE_STEP
      operationName: keyof RoleStep['operations']
    }
  | {
      nodeType: 'RoleFlag'
      operationName: keyof RoleFlag['operations']
    }
  | {
      nodeType: NodeType.FEEDBACK
      operationName: keyof Feedback['operations']
    }
  | {
      nodeType: NodeType.INTERVIEW
      operationName: keyof Interview['operations']
    }
  | {
      nodeType: NodeType.SOURCING_REQUEST
      operationName: keyof SourcingRequest['operations']
    }
  | {
      nodeType: NodeType.SOURCING_REQUEST_TALENT
      operationName: keyof SourcingRequestTalent['operations']
    }
  | {
      nodeType: NodeType.JOB_APPLICATION
      operationName: keyof JobApplication['operations']
    }
  | {
      nodeType: NodeType.SKILL_NAME
      operationName: keyof SkillName['operations']
    }
  | {
      nodeType: NodeType.EMAIL_MESSAGING_ENGAGEMENT_CLIENT
      operationName: keyof EmailMessagingEngagementClient['operations']
    }
  | {
      nodeType: NodeType.EMAIL_MESSAGING_ENGAGEMENT_TALENT
      operationName: keyof EmailMessagingEngagementTalent['operations']
    }
  | {
      nodeType: NodeType.EMAIL_MESSAGING_ROLE
      operationName: keyof EmailMessagingRole['operations']
    }
  | {
      nodeType: NodeType.AVAILABILITY_REQUEST
      operationName: keyof AvailabilityRequest['operations']
    }
  | {
      nodeType: NodeType.TALENT_QUIZ_QUESTION
      operationName: keyof TalentQuizQuestion['operations']
    }
  | {
      nodeType: NodeType.EMAIL_MESSAGING_JOB_APPLICATION
      operationName: keyof EmailMessagingJobApplication['operations']
    }
  | {
      nodeType: NodeType.OPPORTUNITY
      operationName: keyof Opportunity['operations']
    }
  | {
      nodeType: NodeType.EMAIL_MESSAGING_AVAILABILITY_REQUESTEE
      operationName: keyof EmailMessagingAvailabilityRequestee['operations']
    }
  | {
      nodeType: NodeType.EMAIL_MESSAGING_CLIENT
      operationName: keyof EmailMessagingClient['operations']
    }
  | {
      nodeType: NodeType.NEGOTIATION
      operationName: keyof Negotiation['operations']
    }
  | {
      nodeType: NodeType.EMAIL_MESSAGING_JOB
      operationName: keyof EmailMessagingJob['operations']
    }
  | {
      nodeType: NodeType.RATE_CHANGE_REQUEST
      operationName: keyof RateChangeRequest['operations']
    }
  | {
      nodeType: NodeType.STAFF
      operationName: keyof Staff['operations']
    }
  | {
      nodeType: NodeType.EMAIL_TEMPLATE
      operationName: keyof EmailTemplate['operations']
    }
  | {
      nodeType: NodeType.PLAYBOOK_TEMPLATE
      operationName: keyof PlaybookTemplate['operations']
    }
