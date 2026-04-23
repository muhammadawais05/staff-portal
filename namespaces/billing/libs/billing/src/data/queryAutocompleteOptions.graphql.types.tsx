/* eslint-disable */
// ⚠️⚠️⚠️⚠️⚠️
// This file was automatically generated and should not be edited.
// ⚠️⚠️⚠️⚠️⚠️

import { disableFragmentWarnings } from 'graphql-tag';
disableFragmentWarnings();

import * as Types from '@staff-portal/graphql/staff';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
import * as ApolloReactHooks from '@staff-portal/data-layer-service/src/hooks';
const defaultOptions =  {"throwOnError":true}
export type QueryAutocompleteQueryVariables = Types.Exact<{
  term: Types.Scalars['String'];
  ids?: Types.Maybe<Array<Types.Scalars['ID']> | Types.Scalars['ID']>;
  model: Types.AutocompleteModels;
  excludedIds?: Types.Maybe<Array<Types.Scalars['ID']> | Types.Scalars['ID']>;
  offset: Types.Scalars['Int'];
  limit: Types.Scalars['Int'];
}>;


export type QueryAutocompleteQuery = { autocomplete: { edges: Array<QueryAutocompleteEdgeFragment> } };

export type QueryAutocompleteEdgeFragment = { key: string, entityType: string, label?: Types.Maybe<string>, labelHighlight?: Types.Maybe<string>, nodeTypes: Array<string>, node?: Types.Maybe<QueryAutocompleteNode_Activation_Fragment | QueryAutocompleteNode_ActivationStep_Fragment | QueryAutocompleteNode_Activity_Fragment | QueryAutocompleteNode_AllocatedHoursChangeRequest_Fragment | QueryAutocompleteNode_AvailabilityRequest_Fragment | QueryAutocompleteNode_Badge_Fragment | QueryAutocompleteNode_BillingCycle_Fragment | QueryAutocompleteNode_BlogPost_Fragment | QueryAutocompleteNode_BlogVertical_Fragment | QueryAutocompleteNode_BookingPage_Fragment | QueryAutocompleteNode_CallbackRequest_Fragment | QueryAutocompleteNode_CareerPage_Fragment | QueryAutocompleteNode_Certification_Fragment | QueryAutocompleteNode_Client_Fragment | QueryAutocompleteNode_ClientCreditApplication_Fragment | QueryAutocompleteNode_ClientMatcher_Fragment | QueryAutocompleteNode_ClientTransferRoleRequest_Fragment | QueryAutocompleteNode_CodilityResult_Fragment | QueryAutocompleteNode_CodilityTest_Fragment | QueryAutocompleteNode_CommitmentChangeRequest_Fragment | QueryAutocompleteNode_CommunityEvent_Fragment | QueryAutocompleteNode_CommunityEventHost_Fragment | QueryAutocompleteNode_CommunityLeaderAccount_Fragment | QueryAutocompleteNode_CompanyRepresentative_Fragment | QueryAutocompleteNode_ConsolidationDefault_Fragment | QueryAutocompleteNode_Contract_Fragment | QueryAutocompleteNode_Country_Fragment | QueryAutocompleteNode_DraftJob_Fragment | QueryAutocompleteNode_Education_Fragment | QueryAutocompleteNode_EmailMessagingAvailabilityRequestee_Fragment | QueryAutocompleteNode_EmailMessagingClient_Fragment | QueryAutocompleteNode_EmailMessagingClientClaim_Fragment | QueryAutocompleteNode_EmailMessagingEngagementClient_Fragment | QueryAutocompleteNode_EmailMessagingEngagementTalent_Fragment | QueryAutocompleteNode_EmailMessagingIntroductionActivationStep_Fragment | QueryAutocompleteNode_EmailMessagingJob_Fragment | QueryAutocompleteNode_EmailMessagingJobApplication_Fragment | QueryAutocompleteNode_EmailMessagingMeeting_Fragment | QueryAutocompleteNode_EmailMessagingRescheduleActivationStep_Fragment | QueryAutocompleteNode_EmailMessagingRestorationActivationStep_Fragment | QueryAutocompleteNode_EmailMessagingRole_Fragment | QueryAutocompleteNode_EmailMessagingRoleStep_Fragment | QueryAutocompleteNode_EmailMessagingSpecializationApplication_Fragment | QueryAutocompleteNode_EmailMessagingTalentBookingIntroduce_Fragment | QueryAutocompleteNode_EmailMessagingTalentBookingReschedule_Fragment | QueryAutocompleteNode_EmailMessagingTalentBookingRestore_Fragment | QueryAutocompleteNode_EmailTemplate_Fragment | QueryAutocompleteNode_Employment_Fragment | QueryAutocompleteNode_Engagement_Fragment | QueryAutocompleteNode_EngagementBreak_Fragment | QueryAutocompleteNode_EngagementSurveyAnswer_Fragment | QueryAutocompleteNode_ExpectedCommission_Fragment | QueryAutocompleteNode_Feedback_Fragment | QueryAutocompleteNode_FeedbackAction_Fragment | QueryAutocompleteNode_FeedbackAnswer_Fragment | QueryAutocompleteNode_FeedbackQuestion_Fragment | QueryAutocompleteNode_FeedbackQuestionOption_Fragment | QueryAutocompleteNode_FeedbackReason_Fragment | QueryAutocompleteNode_HackerRankResult_Fragment | QueryAutocompleteNode_HackerRankTest_Fragment | QueryAutocompleteNode_InactivityRejectionDeadline_Fragment | QueryAutocompleteNode_Industry_Fragment | QueryAutocompleteNode_Interview_Fragment | QueryAutocompleteNode_InterviewLock_Fragment | QueryAutocompleteNode_Investigation_Fragment | QueryAutocompleteNode_Invoice_Fragment | QueryAutocompleteNode_Job_Fragment | QueryAutocompleteNode_JobApplication_Fragment | QueryAutocompleteNode_JobPositionAnswer_Fragment | QueryAutocompleteNode_JobPositionQuestion_Fragment | QueryAutocompleteNode_JobTemplate_Fragment | QueryAutocompleteNode_Language_Fragment | QueryAutocompleteNode_Leader_Fragment | QueryAutocompleteNode_MasterBookingPageConfiguration_Fragment | QueryAutocompleteNode_Meeting_Fragment | QueryAutocompleteNode_MeetingScheduler_Fragment | QueryAutocompleteNode_Memorandum_Fragment | QueryAutocompleteNode_MentorApplication_Fragment | QueryAutocompleteNode_Negotiation_Fragment | QueryAutocompleteNode_Note_Fragment | QueryAutocompleteNode_NoteQuestion_Fragment | QueryAutocompleteNode_OperationalIssue_Fragment | QueryAutocompleteNode_OperationalIssueCauseTemplate_Fragment | QueryAutocompleteNode_OperationalIssueTemplate_Fragment | QueryAutocompleteNode_Opportunity_Fragment | QueryAutocompleteNode_OpportunityIndustry_Fragment | QueryAutocompleteNode_OpportunitySkill_Fragment | QueryAutocompleteNode_OpportunityVertical_Fragment | QueryAutocompleteNode_Payment_Fragment | QueryAutocompleteNode_PaymentGroup_Fragment | QueryAutocompleteNode_PlaybookTemplate_Fragment | QueryAutocompleteNode_PortfolioFile_Fragment | QueryAutocompleteNode_PortfolioItem_Fragment | QueryAutocompleteNode_Profile_Fragment | QueryAutocompleteNode_ProfileSkillSet_Fragment | QueryAutocompleteNode_PublicationGig_Fragment | QueryAutocompleteNode_PurchaseOrder_Fragment | QueryAutocompleteNode_PurchaseOrderLine_Fragment | QueryAutocompleteNode_RateChangeRequest_Fragment | QueryAutocompleteNode_RateChangeRequestAnswer_Fragment | QueryAutocompleteNode_ReferralPartner_Fragment | QueryAutocompleteNode_Region_Fragment | QueryAutocompleteNode_ReviewAttempt_Fragment | QueryAutocompleteNode_RoleFlag_Fragment | QueryAutocompleteNode_RoleStep_Fragment | QueryAutocompleteNode_Skill_Fragment | QueryAutocompleteNode_SkillCategory_Fragment | QueryAutocompleteNode_SkillName_Fragment | QueryAutocompleteNode_SkillSet_Fragment | QueryAutocompleteNode_SoftSkillRating_Fragment | QueryAutocompleteNode_SourcingRequest_Fragment | QueryAutocompleteNode_SourcingRequestTalent_Fragment | QueryAutocompleteNode_SpecialistAssignment_Fragment | QueryAutocompleteNode_Specialization_Fragment | QueryAutocompleteNode_SpecializationApplication_Fragment | QueryAutocompleteNode_SpecializationApplicationRejectionReason_Fragment | QueryAutocompleteNode_Staff_Fragment | QueryAutocompleteNode_StaffAbility_Fragment | QueryAutocompleteNode_StaffDeputy_Fragment | QueryAutocompleteNode_StaffExecutive_Fragment | QueryAutocompleteNode_StaffManager_Fragment | QueryAutocompleteNode_Talent_Fragment | QueryAutocompleteNode_TalentCoachingEngagement_Fragment | QueryAutocompleteNode_TalentCoachingEngagementState_Fragment | QueryAutocompleteNode_TalentPartner_Fragment | QueryAutocompleteNode_TalentQuizQuestion_Fragment | QueryAutocompleteNode_Task_Fragment | QueryAutocompleteNode_TaskTag_Fragment | QueryAutocompleteNode_Team_Fragment | QueryAutocompleteNode_TopShieldApplicationQuarter_Fragment | QueryAutocompleteNode_TopscreenClient_Fragment | QueryAutocompleteNode_TopscreenPosition_Fragment | QueryAutocompleteNode_Transfer_Fragment | QueryAutocompleteNode_TravelVisa_Fragment | QueryAutocompleteNode_Vertical_Fragment> };

export type QueryAutocompleteNode_Activation_Fragment = { __typename: 'Activation', id: string };

export type QueryAutocompleteNode_ActivationStep_Fragment = { __typename: 'ActivationStep', id: string };

export type QueryAutocompleteNode_Activity_Fragment = { __typename: 'Activity', id: string };

export type QueryAutocompleteNode_AllocatedHoursChangeRequest_Fragment = { __typename: 'AllocatedHoursChangeRequest', id: string };

export type QueryAutocompleteNode_AvailabilityRequest_Fragment = { __typename: 'AvailabilityRequest', id: string };

export type QueryAutocompleteNode_Badge_Fragment = { __typename: 'Badge', id: string };

export type QueryAutocompleteNode_BillingCycle_Fragment = { __typename: 'BillingCycle', id: string };

export type QueryAutocompleteNode_BlogPost_Fragment = { __typename: 'BlogPost', id: string };

export type QueryAutocompleteNode_BlogVertical_Fragment = { __typename: 'BlogVertical', id: string };

export type QueryAutocompleteNode_BookingPage_Fragment = { __typename: 'BookingPage', id: string };

export type QueryAutocompleteNode_CallbackRequest_Fragment = { __typename: 'CallbackRequest', id: string };

export type QueryAutocompleteNode_CareerPage_Fragment = { __typename: 'CareerPage', id: string };

export type QueryAutocompleteNode_Certification_Fragment = { __typename: 'Certification', id: string };

export type QueryAutocompleteNode_Client_Fragment = (
  { __typename: 'Client', id: string }
  & QueryAutocompleteClientFragment
);

export type QueryAutocompleteNode_ClientCreditApplication_Fragment = { __typename: 'ClientCreditApplication', id: string };

export type QueryAutocompleteNode_ClientMatcher_Fragment = { __typename: 'ClientMatcher', id: string };

export type QueryAutocompleteNode_ClientTransferRoleRequest_Fragment = { __typename: 'ClientTransferRoleRequest', id: string };

export type QueryAutocompleteNode_CodilityResult_Fragment = { __typename: 'CodilityResult', id: string };

export type QueryAutocompleteNode_CodilityTest_Fragment = { __typename: 'CodilityTest', id: string };

export type QueryAutocompleteNode_CommitmentChangeRequest_Fragment = { __typename: 'CommitmentChangeRequest', id: string };

export type QueryAutocompleteNode_CommunityEvent_Fragment = { __typename: 'CommunityEvent', id: string };

export type QueryAutocompleteNode_CommunityEventHost_Fragment = { __typename: 'CommunityEventHost', id: string };

export type QueryAutocompleteNode_CommunityLeaderAccount_Fragment = { __typename: 'CommunityLeaderAccount', id: string };

export type QueryAutocompleteNode_CompanyRepresentative_Fragment = (
  { __typename: 'CompanyRepresentative', id: string }
  & QueryAutocompleteRoleType_CompanyRepresentative_Fragment
);

export type QueryAutocompleteNode_ConsolidationDefault_Fragment = { __typename: 'ConsolidationDefault', id: string };

export type QueryAutocompleteNode_Contract_Fragment = { __typename: 'Contract', id: string };

export type QueryAutocompleteNode_Country_Fragment = { __typename: 'Country', id: string };

export type QueryAutocompleteNode_DraftJob_Fragment = { __typename: 'DraftJob', id: string };

export type QueryAutocompleteNode_Education_Fragment = { __typename: 'Education', id: string };

export type QueryAutocompleteNode_EmailMessagingAvailabilityRequestee_Fragment = { __typename: 'EmailMessagingAvailabilityRequestee', id: string };

export type QueryAutocompleteNode_EmailMessagingClient_Fragment = { __typename: 'EmailMessagingClient', id: string };

export type QueryAutocompleteNode_EmailMessagingClientClaim_Fragment = { __typename: 'EmailMessagingClientClaim', id: string };

export type QueryAutocompleteNode_EmailMessagingEngagementClient_Fragment = { __typename: 'EmailMessagingEngagementClient', id: string };

export type QueryAutocompleteNode_EmailMessagingEngagementTalent_Fragment = { __typename: 'EmailMessagingEngagementTalent', id: string };

export type QueryAutocompleteNode_EmailMessagingIntroductionActivationStep_Fragment = { __typename: 'EmailMessagingIntroductionActivationStep', id: string };

export type QueryAutocompleteNode_EmailMessagingJob_Fragment = { __typename: 'EmailMessagingJob', id: string };

export type QueryAutocompleteNode_EmailMessagingJobApplication_Fragment = { __typename: 'EmailMessagingJobApplication', id: string };

export type QueryAutocompleteNode_EmailMessagingMeeting_Fragment = { __typename: 'EmailMessagingMeeting', id: string };

export type QueryAutocompleteNode_EmailMessagingRescheduleActivationStep_Fragment = { __typename: 'EmailMessagingRescheduleActivationStep', id: string };

export type QueryAutocompleteNode_EmailMessagingRestorationActivationStep_Fragment = { __typename: 'EmailMessagingRestorationActivationStep', id: string };

export type QueryAutocompleteNode_EmailMessagingRole_Fragment = { __typename: 'EmailMessagingRole', id: string };

export type QueryAutocompleteNode_EmailMessagingRoleStep_Fragment = { __typename: 'EmailMessagingRoleStep', id: string };

export type QueryAutocompleteNode_EmailMessagingSpecializationApplication_Fragment = { __typename: 'EmailMessagingSpecializationApplication', id: string };

export type QueryAutocompleteNode_EmailMessagingTalentBookingIntroduce_Fragment = { __typename: 'EmailMessagingTalentBookingIntroduce', id: string };

export type QueryAutocompleteNode_EmailMessagingTalentBookingReschedule_Fragment = { __typename: 'EmailMessagingTalentBookingReschedule', id: string };

export type QueryAutocompleteNode_EmailMessagingTalentBookingRestore_Fragment = { __typename: 'EmailMessagingTalentBookingRestore', id: string };

export type QueryAutocompleteNode_EmailTemplate_Fragment = { __typename: 'EmailTemplate', id: string };

export type QueryAutocompleteNode_Employment_Fragment = { __typename: 'Employment', id: string };

export type QueryAutocompleteNode_Engagement_Fragment = { __typename: 'Engagement', id: string };

export type QueryAutocompleteNode_EngagementBreak_Fragment = { __typename: 'EngagementBreak', id: string };

export type QueryAutocompleteNode_EngagementSurveyAnswer_Fragment = { __typename: 'EngagementSurveyAnswer', id: string };

export type QueryAutocompleteNode_ExpectedCommission_Fragment = { __typename: 'ExpectedCommission', id: string };

export type QueryAutocompleteNode_Feedback_Fragment = { __typename: 'Feedback', id: string };

export type QueryAutocompleteNode_FeedbackAction_Fragment = { __typename: 'FeedbackAction', id: string };

export type QueryAutocompleteNode_FeedbackAnswer_Fragment = { __typename: 'FeedbackAnswer', id: string };

export type QueryAutocompleteNode_FeedbackQuestion_Fragment = { __typename: 'FeedbackQuestion', id: string };

export type QueryAutocompleteNode_FeedbackQuestionOption_Fragment = { __typename: 'FeedbackQuestionOption', id: string };

export type QueryAutocompleteNode_FeedbackReason_Fragment = { __typename: 'FeedbackReason', id: string };

export type QueryAutocompleteNode_HackerRankResult_Fragment = { __typename: 'HackerRankResult', id: string };

export type QueryAutocompleteNode_HackerRankTest_Fragment = { __typename: 'HackerRankTest', id: string };

export type QueryAutocompleteNode_InactivityRejectionDeadline_Fragment = { __typename: 'InactivityRejectionDeadline', id: string };

export type QueryAutocompleteNode_Industry_Fragment = { __typename: 'Industry', id: string };

export type QueryAutocompleteNode_Interview_Fragment = { __typename: 'Interview', id: string };

export type QueryAutocompleteNode_InterviewLock_Fragment = { __typename: 'InterviewLock', id: string };

export type QueryAutocompleteNode_Investigation_Fragment = { __typename: 'Investigation', id: string };

export type QueryAutocompleteNode_Invoice_Fragment = { __typename: 'Invoice', id: string };

export type QueryAutocompleteNode_Job_Fragment = { __typename: 'Job', id: string };

export type QueryAutocompleteNode_JobApplication_Fragment = { __typename: 'JobApplication', id: string };

export type QueryAutocompleteNode_JobPositionAnswer_Fragment = { __typename: 'JobPositionAnswer', id: string };

export type QueryAutocompleteNode_JobPositionQuestion_Fragment = { __typename: 'JobPositionQuestion', id: string };

export type QueryAutocompleteNode_JobTemplate_Fragment = { __typename: 'JobTemplate', id: string };

export type QueryAutocompleteNode_Language_Fragment = { __typename: 'Language', id: string };

export type QueryAutocompleteNode_Leader_Fragment = (
  { __typename: 'Leader', id: string }
  & QueryAutocompleteRoleType_Leader_Fragment
);

export type QueryAutocompleteNode_MasterBookingPageConfiguration_Fragment = { __typename: 'MasterBookingPageConfiguration', id: string };

export type QueryAutocompleteNode_Meeting_Fragment = { __typename: 'Meeting', id: string };

export type QueryAutocompleteNode_MeetingScheduler_Fragment = { __typename: 'MeetingScheduler', id: string };

export type QueryAutocompleteNode_Memorandum_Fragment = { __typename: 'Memorandum', id: string };

export type QueryAutocompleteNode_MentorApplication_Fragment = { __typename: 'MentorApplication', id: string };

export type QueryAutocompleteNode_Negotiation_Fragment = { __typename: 'Negotiation', id: string };

export type QueryAutocompleteNode_Note_Fragment = { __typename: 'Note', id: string };

export type QueryAutocompleteNode_NoteQuestion_Fragment = { __typename: 'NoteQuestion', id: string };

export type QueryAutocompleteNode_OperationalIssue_Fragment = { __typename: 'OperationalIssue', id: string };

export type QueryAutocompleteNode_OperationalIssueCauseTemplate_Fragment = { __typename: 'OperationalIssueCauseTemplate', id: string };

export type QueryAutocompleteNode_OperationalIssueTemplate_Fragment = { __typename: 'OperationalIssueTemplate', id: string };

export type QueryAutocompleteNode_Opportunity_Fragment = { __typename: 'Opportunity', id: string };

export type QueryAutocompleteNode_OpportunityIndustry_Fragment = { __typename: 'OpportunityIndustry', id: string };

export type QueryAutocompleteNode_OpportunitySkill_Fragment = { __typename: 'OpportunitySkill', id: string };

export type QueryAutocompleteNode_OpportunityVertical_Fragment = { __typename: 'OpportunityVertical', id: string };

export type QueryAutocompleteNode_Payment_Fragment = { __typename: 'Payment', id: string };

export type QueryAutocompleteNode_PaymentGroup_Fragment = { __typename: 'PaymentGroup', id: string };

export type QueryAutocompleteNode_PlaybookTemplate_Fragment = { __typename: 'PlaybookTemplate', id: string };

export type QueryAutocompleteNode_PortfolioFile_Fragment = { __typename: 'PortfolioFile', id: string };

export type QueryAutocompleteNode_PortfolioItem_Fragment = { __typename: 'PortfolioItem', id: string };

export type QueryAutocompleteNode_Profile_Fragment = { __typename: 'Profile', id: string };

export type QueryAutocompleteNode_ProfileSkillSet_Fragment = { __typename: 'ProfileSkillSet', id: string };

export type QueryAutocompleteNode_PublicationGig_Fragment = { __typename: 'PublicationGig', id: string };

export type QueryAutocompleteNode_PurchaseOrder_Fragment = { __typename: 'PurchaseOrder', id: string };

export type QueryAutocompleteNode_PurchaseOrderLine_Fragment = { __typename: 'PurchaseOrderLine', id: string };

export type QueryAutocompleteNode_RateChangeRequest_Fragment = { __typename: 'RateChangeRequest', id: string };

export type QueryAutocompleteNode_RateChangeRequestAnswer_Fragment = { __typename: 'RateChangeRequestAnswer', id: string };

export type QueryAutocompleteNode_ReferralPartner_Fragment = (
  { __typename: 'ReferralPartner', id: string }
  & QueryAutocompleteRoleType_ReferralPartner_Fragment
);

export type QueryAutocompleteNode_Region_Fragment = { __typename: 'Region', id: string };

export type QueryAutocompleteNode_ReviewAttempt_Fragment = { __typename: 'ReviewAttempt', id: string };

export type QueryAutocompleteNode_RoleFlag_Fragment = { __typename: 'RoleFlag', id: string };

export type QueryAutocompleteNode_RoleStep_Fragment = { __typename: 'RoleStep', id: string };

export type QueryAutocompleteNode_Skill_Fragment = { __typename: 'Skill', id: string };

export type QueryAutocompleteNode_SkillCategory_Fragment = { __typename: 'SkillCategory', id: string };

export type QueryAutocompleteNode_SkillName_Fragment = { __typename: 'SkillName', id: string };

export type QueryAutocompleteNode_SkillSet_Fragment = { __typename: 'SkillSet', id: string };

export type QueryAutocompleteNode_SoftSkillRating_Fragment = { __typename: 'SoftSkillRating', id: string };

export type QueryAutocompleteNode_SourcingRequest_Fragment = { __typename: 'SourcingRequest', id: string };

export type QueryAutocompleteNode_SourcingRequestTalent_Fragment = { __typename: 'SourcingRequestTalent', id: string };

export type QueryAutocompleteNode_SpecialistAssignment_Fragment = { __typename: 'SpecialistAssignment', id: string };

export type QueryAutocompleteNode_Specialization_Fragment = { __typename: 'Specialization', id: string };

export type QueryAutocompleteNode_SpecializationApplication_Fragment = { __typename: 'SpecializationApplication', id: string };

export type QueryAutocompleteNode_SpecializationApplicationRejectionReason_Fragment = { __typename: 'SpecializationApplicationRejectionReason', id: string };

export type QueryAutocompleteNode_Staff_Fragment = (
  { __typename: 'Staff', id: string }
  & QueryAutocompleteRoleType_Staff_Fragment
);

export type QueryAutocompleteNode_StaffAbility_Fragment = { __typename: 'StaffAbility', id: string };

export type QueryAutocompleteNode_StaffDeputy_Fragment = { __typename: 'StaffDeputy', id: string };

export type QueryAutocompleteNode_StaffExecutive_Fragment = { __typename: 'StaffExecutive', id: string };

export type QueryAutocompleteNode_StaffManager_Fragment = { __typename: 'StaffManager', id: string };

export type QueryAutocompleteNode_Talent_Fragment = (
  { __typename: 'Talent', id: string }
  & QueryAutocompleteRoleType_Talent_Fragment
);

export type QueryAutocompleteNode_TalentCoachingEngagement_Fragment = { __typename: 'TalentCoachingEngagement', id: string };

export type QueryAutocompleteNode_TalentCoachingEngagementState_Fragment = { __typename: 'TalentCoachingEngagementState', id: string };

export type QueryAutocompleteNode_TalentPartner_Fragment = (
  { __typename: 'TalentPartner', id: string }
  & QueryAutocompleteRoleType_TalentPartner_Fragment
);

export type QueryAutocompleteNode_TalentQuizQuestion_Fragment = { __typename: 'TalentQuizQuestion', id: string };

export type QueryAutocompleteNode_Task_Fragment = { __typename: 'Task', id: string };

export type QueryAutocompleteNode_TaskTag_Fragment = { __typename: 'TaskTag', id: string };

export type QueryAutocompleteNode_Team_Fragment = { __typename: 'Team', id: string };

export type QueryAutocompleteNode_TopShieldApplicationQuarter_Fragment = { __typename: 'TopShieldApplicationQuarter', id: string };

export type QueryAutocompleteNode_TopscreenClient_Fragment = { __typename: 'TopscreenClient', id: string };

export type QueryAutocompleteNode_TopscreenPosition_Fragment = { __typename: 'TopscreenPosition', id: string };

export type QueryAutocompleteNode_Transfer_Fragment = { __typename: 'Transfer', id: string };

export type QueryAutocompleteNode_TravelVisa_Fragment = { __typename: 'TravelVisa', id: string };

export type QueryAutocompleteNode_Vertical_Fragment = { __typename: 'Vertical', id: string };

export type QueryAutocompleteNodeFragment = QueryAutocompleteNode_Activation_Fragment | QueryAutocompleteNode_ActivationStep_Fragment | QueryAutocompleteNode_Activity_Fragment | QueryAutocompleteNode_AllocatedHoursChangeRequest_Fragment | QueryAutocompleteNode_AvailabilityRequest_Fragment | QueryAutocompleteNode_Badge_Fragment | QueryAutocompleteNode_BillingCycle_Fragment | QueryAutocompleteNode_BlogPost_Fragment | QueryAutocompleteNode_BlogVertical_Fragment | QueryAutocompleteNode_BookingPage_Fragment | QueryAutocompleteNode_CallbackRequest_Fragment | QueryAutocompleteNode_CareerPage_Fragment | QueryAutocompleteNode_Certification_Fragment | QueryAutocompleteNode_Client_Fragment | QueryAutocompleteNode_ClientCreditApplication_Fragment | QueryAutocompleteNode_ClientMatcher_Fragment | QueryAutocompleteNode_ClientTransferRoleRequest_Fragment | QueryAutocompleteNode_CodilityResult_Fragment | QueryAutocompleteNode_CodilityTest_Fragment | QueryAutocompleteNode_CommitmentChangeRequest_Fragment | QueryAutocompleteNode_CommunityEvent_Fragment | QueryAutocompleteNode_CommunityEventHost_Fragment | QueryAutocompleteNode_CommunityLeaderAccount_Fragment | QueryAutocompleteNode_CompanyRepresentative_Fragment | QueryAutocompleteNode_ConsolidationDefault_Fragment | QueryAutocompleteNode_Contract_Fragment | QueryAutocompleteNode_Country_Fragment | QueryAutocompleteNode_DraftJob_Fragment | QueryAutocompleteNode_Education_Fragment | QueryAutocompleteNode_EmailMessagingAvailabilityRequestee_Fragment | QueryAutocompleteNode_EmailMessagingClient_Fragment | QueryAutocompleteNode_EmailMessagingClientClaim_Fragment | QueryAutocompleteNode_EmailMessagingEngagementClient_Fragment | QueryAutocompleteNode_EmailMessagingEngagementTalent_Fragment | QueryAutocompleteNode_EmailMessagingIntroductionActivationStep_Fragment | QueryAutocompleteNode_EmailMessagingJob_Fragment | QueryAutocompleteNode_EmailMessagingJobApplication_Fragment | QueryAutocompleteNode_EmailMessagingMeeting_Fragment | QueryAutocompleteNode_EmailMessagingRescheduleActivationStep_Fragment | QueryAutocompleteNode_EmailMessagingRestorationActivationStep_Fragment | QueryAutocompleteNode_EmailMessagingRole_Fragment | QueryAutocompleteNode_EmailMessagingRoleStep_Fragment | QueryAutocompleteNode_EmailMessagingSpecializationApplication_Fragment | QueryAutocompleteNode_EmailMessagingTalentBookingIntroduce_Fragment | QueryAutocompleteNode_EmailMessagingTalentBookingReschedule_Fragment | QueryAutocompleteNode_EmailMessagingTalentBookingRestore_Fragment | QueryAutocompleteNode_EmailTemplate_Fragment | QueryAutocompleteNode_Employment_Fragment | QueryAutocompleteNode_Engagement_Fragment | QueryAutocompleteNode_EngagementBreak_Fragment | QueryAutocompleteNode_EngagementSurveyAnswer_Fragment | QueryAutocompleteNode_ExpectedCommission_Fragment | QueryAutocompleteNode_Feedback_Fragment | QueryAutocompleteNode_FeedbackAction_Fragment | QueryAutocompleteNode_FeedbackAnswer_Fragment | QueryAutocompleteNode_FeedbackQuestion_Fragment | QueryAutocompleteNode_FeedbackQuestionOption_Fragment | QueryAutocompleteNode_FeedbackReason_Fragment | QueryAutocompleteNode_HackerRankResult_Fragment | QueryAutocompleteNode_HackerRankTest_Fragment | QueryAutocompleteNode_InactivityRejectionDeadline_Fragment | QueryAutocompleteNode_Industry_Fragment | QueryAutocompleteNode_Interview_Fragment | QueryAutocompleteNode_InterviewLock_Fragment | QueryAutocompleteNode_Investigation_Fragment | QueryAutocompleteNode_Invoice_Fragment | QueryAutocompleteNode_Job_Fragment | QueryAutocompleteNode_JobApplication_Fragment | QueryAutocompleteNode_JobPositionAnswer_Fragment | QueryAutocompleteNode_JobPositionQuestion_Fragment | QueryAutocompleteNode_JobTemplate_Fragment | QueryAutocompleteNode_Language_Fragment | QueryAutocompleteNode_Leader_Fragment | QueryAutocompleteNode_MasterBookingPageConfiguration_Fragment | QueryAutocompleteNode_Meeting_Fragment | QueryAutocompleteNode_MeetingScheduler_Fragment | QueryAutocompleteNode_Memorandum_Fragment | QueryAutocompleteNode_MentorApplication_Fragment | QueryAutocompleteNode_Negotiation_Fragment | QueryAutocompleteNode_Note_Fragment | QueryAutocompleteNode_NoteQuestion_Fragment | QueryAutocompleteNode_OperationalIssue_Fragment | QueryAutocompleteNode_OperationalIssueCauseTemplate_Fragment | QueryAutocompleteNode_OperationalIssueTemplate_Fragment | QueryAutocompleteNode_Opportunity_Fragment | QueryAutocompleteNode_OpportunityIndustry_Fragment | QueryAutocompleteNode_OpportunitySkill_Fragment | QueryAutocompleteNode_OpportunityVertical_Fragment | QueryAutocompleteNode_Payment_Fragment | QueryAutocompleteNode_PaymentGroup_Fragment | QueryAutocompleteNode_PlaybookTemplate_Fragment | QueryAutocompleteNode_PortfolioFile_Fragment | QueryAutocompleteNode_PortfolioItem_Fragment | QueryAutocompleteNode_Profile_Fragment | QueryAutocompleteNode_ProfileSkillSet_Fragment | QueryAutocompleteNode_PublicationGig_Fragment | QueryAutocompleteNode_PurchaseOrder_Fragment | QueryAutocompleteNode_PurchaseOrderLine_Fragment | QueryAutocompleteNode_RateChangeRequest_Fragment | QueryAutocompleteNode_RateChangeRequestAnswer_Fragment | QueryAutocompleteNode_ReferralPartner_Fragment | QueryAutocompleteNode_Region_Fragment | QueryAutocompleteNode_ReviewAttempt_Fragment | QueryAutocompleteNode_RoleFlag_Fragment | QueryAutocompleteNode_RoleStep_Fragment | QueryAutocompleteNode_Skill_Fragment | QueryAutocompleteNode_SkillCategory_Fragment | QueryAutocompleteNode_SkillName_Fragment | QueryAutocompleteNode_SkillSet_Fragment | QueryAutocompleteNode_SoftSkillRating_Fragment | QueryAutocompleteNode_SourcingRequest_Fragment | QueryAutocompleteNode_SourcingRequestTalent_Fragment | QueryAutocompleteNode_SpecialistAssignment_Fragment | QueryAutocompleteNode_Specialization_Fragment | QueryAutocompleteNode_SpecializationApplication_Fragment | QueryAutocompleteNode_SpecializationApplicationRejectionReason_Fragment | QueryAutocompleteNode_Staff_Fragment | QueryAutocompleteNode_StaffAbility_Fragment | QueryAutocompleteNode_StaffDeputy_Fragment | QueryAutocompleteNode_StaffExecutive_Fragment | QueryAutocompleteNode_StaffManager_Fragment | QueryAutocompleteNode_Talent_Fragment | QueryAutocompleteNode_TalentCoachingEngagement_Fragment | QueryAutocompleteNode_TalentCoachingEngagementState_Fragment | QueryAutocompleteNode_TalentPartner_Fragment | QueryAutocompleteNode_TalentQuizQuestion_Fragment | QueryAutocompleteNode_Task_Fragment | QueryAutocompleteNode_TaskTag_Fragment | QueryAutocompleteNode_Team_Fragment | QueryAutocompleteNode_TopShieldApplicationQuarter_Fragment | QueryAutocompleteNode_TopscreenClient_Fragment | QueryAutocompleteNode_TopscreenPosition_Fragment | QueryAutocompleteNode_Transfer_Fragment | QueryAutocompleteNode_TravelVisa_Fragment | QueryAutocompleteNode_Vertical_Fragment;

export type QueryAutocompleteClientFragment = { companyLegacyId: number, roleType: string };

export type QueryAutocompleteRoleType_CompanyRepresentative_Fragment = { roleType: string };

export type QueryAutocompleteRoleType_Leader_Fragment = { roleType: string };

export type QueryAutocompleteRoleType_ReferralPartner_Fragment = { roleType: string };

export type QueryAutocompleteRoleType_Staff_Fragment = { roleType: string };

export type QueryAutocompleteRoleType_Talent_Fragment = { roleType: string };

export type QueryAutocompleteRoleType_TalentPartner_Fragment = { roleType: string };

export type QueryAutocompleteRoleTypeFragment = QueryAutocompleteRoleType_CompanyRepresentative_Fragment | QueryAutocompleteRoleType_Leader_Fragment | QueryAutocompleteRoleType_ReferralPartner_Fragment | QueryAutocompleteRoleType_Staff_Fragment | QueryAutocompleteRoleType_Talent_Fragment | QueryAutocompleteRoleType_TalentPartner_Fragment;

export const QueryAutocompleteClientFragmentDoc = gql`
    fragment QueryAutocompleteClient on Client {
  companyLegacyId
  roleType: type
}
    `;
export const QueryAutocompleteRoleTypeFragmentDoc = gql`
    fragment QueryAutocompleteRoleType on Role {
  roleType: type
}
    `;
export const QueryAutocompleteNodeFragmentDoc = gql`
    fragment QueryAutocompleteNode on Node {
  __typename
  id
  ... on Client {
    ...QueryAutocompleteClient
  }
  ... on Talent {
    ...QueryAutocompleteRoleType
  }
  ... on TalentPartner {
    ...QueryAutocompleteRoleType
  }
  ... on Staff {
    ...QueryAutocompleteRoleType
  }
  ... on ReferralPartner {
    ...QueryAutocompleteRoleType
  }
  ... on Leader {
    ...QueryAutocompleteRoleType
  }
  ... on CompanyRepresentative {
    ...QueryAutocompleteRoleType
  }
}
    ${QueryAutocompleteClientFragmentDoc}
${QueryAutocompleteRoleTypeFragmentDoc}`;
export const QueryAutocompleteEdgeFragmentDoc = gql`
    fragment QueryAutocompleteEdge on AutocompleteEdge {
  key
  entityType
  label
  labelHighlight
  node {
    ...QueryAutocompleteNode
  }
  nodeTypes
}
    ${QueryAutocompleteNodeFragmentDoc}`;
export const QueryAutocompleteDocument = gql`
    query QueryAutocomplete($term: String!, $ids: [ID!], $model: AutocompleteModels!, $excludedIds: [ID!], $offset: Int!, $limit: Int!) {
  autocomplete(
    filter: {term: $term, ids: $ids, model: $model, excludedIds: $excludedIds}
    pagination: {offset: $offset, limit: $limit}
  ) {
    edges {
      ...QueryAutocompleteEdge
    }
  }
}
    ${QueryAutocompleteEdgeFragmentDoc}`;

/**
 * __useQueryAutocomplete__
 *
 * To run a query within a React component, call `useQueryAutocomplete` and pass it any options that fit your needs.
 * When your component renders, `useQueryAutocomplete` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useQueryAutocomplete({
 *   variables: {
 *      term: // value for 'term'
 *      ids: // value for 'ids'
 *      model: // value for 'model'
 *      excludedIds: // value for 'excludedIds'
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useQueryAutocomplete(baseOptions: ApolloReactHooks.QueryHookOptions<QueryAutocompleteQuery, QueryAutocompleteQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<QueryAutocompleteQuery, QueryAutocompleteQueryVariables>(QueryAutocompleteDocument, options);
      }
export function useQueryAutocompleteLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<QueryAutocompleteQuery, QueryAutocompleteQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<QueryAutocompleteQuery, QueryAutocompleteQueryVariables>(QueryAutocompleteDocument, options);
        }
export type QueryAutocompleteHookResult = ReturnType<typeof useQueryAutocomplete>;
export type QueryAutocompleteLazyQueryHookResult = ReturnType<typeof useQueryAutocompleteLazyQuery>;
export type QueryAutocompleteQueryResult = Apollo.QueryResult<QueryAutocompleteQuery, QueryAutocompleteQueryVariables>;