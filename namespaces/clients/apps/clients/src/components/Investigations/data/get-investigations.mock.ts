import {
  CumulativeJobStatus,
  InvestigationReason,
  JobStatus,
  OperationCallableTypes
} from '@staff-portal/graphql/staff'

export const investigationsDataMock = {
  id: 'VjEtQ2xpZW50LTg0NTUz',
  fullName: 'test',
  investigations: {
    totalCount: 5,
    nodes: [
      {
        id: 'VjEtSW52ZXN0aWdhdGlvbi0zNjgx',
        clientSpecialistTeamAssignee: null,
        comment: 'This part was obfuscated, some content was here.',
        reason: InvestigationReason.REPORTED_ISSUES,
        resolvedAt: '2021-05-11T21:04:14+03:00' as const,
        startedAt: '2021-04-22T17:37:33+03:00' as const,
        jobs: {
          totalCount: 1,
          nodes: [
            {
              id: 'VjEtUmV2aWV3QXR0ZW1wdC02MDM3OQ',
              talentCount: 2,
              status: JobStatus.ACTIVE,
              hiredCount: 2,
              matcherCallScheduled: false,
              cumulativeStatus: CumulativeJobStatus.ACTIVE,
              title: 'Principal Security Designer (251407)',
              webResource: {
                text: '123',
                url: 'https://staging.toptal.net/platform/staff/jobs/251407',
                __typename: 'Link'
              },
              currentTalents: {
                nodes: [
                  {
                    id: 'VjEtVGFsZW50LTEyMDQwNzE',
                    fullName: 'Rusty Predovic',
                    webResource: {
                      text: '123',
                      url: 'https://staging.toptal.net/platform/staff/talents/1204071',
                      __typename: 'Link'
                    },
                    __typename: 'Talent'
                  },
                  {
                    id: 'VjEtVGFsZW50LTE2NDkwNjk',
                    fullName: 'Bridgette Cormier',
                    webResource: {
                      text: '123',
                      url: 'https://staging.toptal.net/platform/staff/talents/1649069',
                      __typename: 'Link'
                    },
                    __typename: 'Talent'
                  }
                ],
                totalCount: 2,
                __typename: 'TalentConnection'
              },
              claimer: {
                id: 'VjEtU3RhZmYtNjg1NzI2',
                fullName: 'Lowell Ortiz',
                webResource: {
                  text: '123',
                  url: 'https://staging.toptal.net/platform/staff/staff/685726',
                  __typename: 'Link'
                },
                __typename: 'Staff'
              },
              currentInvestigation: null,
              __typename: 'Job'
            }
          ],
          __typename: 'InvestigationJobsConnection'
        },
        resolution: null,
        __typename: 'Investigation'
      },
      {
        id: 'VjEtSW52ZXN0aWdhdGlvbi0yNTc4',
        clientSpecialistTeamAssignee: {
          id: 'VjEtU3RhZmYtMzMyOTI3',
          webResource: {
            text: 'Marisha Conn',
            url: 'https://staging.toptal.net/platform/staff/staff/705001',
            __typename: 'Link'
          },
          __typename: 'Staff'
        },
        comment: 'This part was obfuscated, some content was here.',
        reason: InvestigationReason.PAYMENT_PROBLEM,
        resolvedAt: '2020-03-23T12:01:11+03:00' as const,
        startedAt: '2020-03-18T13:21:59+03:00' as const,
        jobs: {
          totalCount: 0,
          nodes: [],
          __typename: 'InvestigationJobsConnection'
        },
        resolution: {
          comment:
            "Engagement: https://www.toptal.com/platform/staff/jobs/233848\r\nTalent Profile: https://www.toptal.com/platform/staff/talents/2187476\r\n \r\nOverview of the reported issue: \r\nThe client reached out to share that he has been extremely disappointed with the talent's productivity as well as the quality of his work. He'd like to end the engagement asap and come to an \"amicable resolution\".\r\n\r\nBreakdown of the client’s primary complaints:\r\nLow productivity and quality of work from the talent.\r\n\r\nActions taken:\r\n21/4/22\r\n- Mackenzie shared correspondence with the client and his (very detailed) feedback. She is thinking of crediting 20 hours or about $1.5k to the client.\r\n-Luis looked at client's email and enclosed document. He says the document does not look too bad but it is very difficult for him to tell what was done like this and it can depend on the purpose of the document, which was not explained. Luis feels that since the engagement has been active since Feb if the client had issues he should have reported them sooner.\r\n21/4/23\r\n- Mackenzie shared email from client where it seems he does not want a replacement right away since he does not want to rock the boat - confirming if this is the case.\r\n21/4/26\r\n- This is the case and Mac thinks we may want to table the investigation for the time being.\r\n21/4/27\r\n-We decide to make sure to push back and let the client know we strongly recommend replacing the talent/allowing us to investigate, otherwise we will not be able to assist them with an onboarding credit for a replacement later.\r\n21/4/28\r\n- Mackenzie replied to the client as agreed. The client replied they cannot afford a delay now but they asked us to look into the talent's hours since they feel they should not be paying for his research time, etc, as they initially complained.\r\n- Mackenzie pushed back we have no way of looking into the talent's hours now without alerting them and offered 1k credit.\r\n21/4/30\r\n- No reply from the client, sending ticket to A/R to apply credit.\r\n21/5/3\r\n- Credit applied but client replied that they want to replace talent and do not think $1k credit is enough\r\n- Mackenzie has a call scheduled with the client today.\r\n21/5/4\r\n-Mackenzie was not able to connect with the client, we followed up to see how they want to proceed and if engagement should be paused/invoices&payments put on hold.\r\n- The client replied he does want an investigation, we are pending additional information from him regarding the exact number of hours he wishes to dispute and any supporting evidence.\r\n- Client-side invoices disputed.\r\n- CX reached out to talent to let him know about the investigation and that we will be disputing his payments, and requested a breakdown of hours.\r\n-Ticket sent to dispute talent payments.\r\n21/5/5\r\n- Talent payments placed on hold.\r\n-Talent shared breakdown of hours.\r\n- Per Alexandre, task descriptions are high level, but nothing jumps out or raises concerns. It makes sense to him that the talent would spend time researching/testing solutions.\r\n21/5/6\r\n- Still no evidence submitted by the client, we reached out with an EOW deadline.\r\n- Client replied he is behind schedule and over budget, that having to do certain tasks himself instead of Punnary wasted time and money and that he will review his entire billing record against what what he believes to be reasonable amounts of time to complete the tasks and hopefully get back to us today \r\n21/5/7\r\n- Pending updates from the client.\r\n\r\n2021.05.10\r\n-The team has agreed to offer a $3k credit to attempt to resolve the issue. \r\n-Mackenzie to communicate this to the client. \r\n\r\n2021.05.11\r\n-The client responded accepting the proposed resolution. \r\n-AR has applied the credit to the client's outstanding balance. \r\n-Good to close. ",
          netLoss: '4000.0',
          resolution: 'Talent not replaced',
          issueSource: 'Client/Talent mismatch',
          talentNotes:
            "Support ticket: https://toptalaccounting.freshdesk.com/a/tickets/315067\r\nClient Profile: https://www.toptal.com/platform/staff/companies/410847\r\nTalent at fault Y/N: No, the client expressed that they were not satisfied with the work produced by the talent. They did not however provide any evidence to support this claim. The client was given a credit and the talent's payments were not adjusted. \r\nToptal Investigation & Review Form submitted Y/N: No. \r\n",
          initialRefund: '4000.0',
          refundProvided: '4000.0',
          talentAtFault: false,
          invoicesAdjusted: true,
          slackChannelLink: 'https://toptal-core.slack.com/archives/CAU0T4CQL',
          supportTicketLink:
            'https://toptalaccounting.freshdesk.com/a/tickets/315067',
          talentPaymentsImpacted: false,
          settlementAgreementSent: false,
          lowValue: false,
          paymentResolutionType: 'Credit',
          __typename: 'InvestigationResolution'
        },
        __typename: 'Investigation'
      }
    ]
  },
  operations: {
    createClientInvestigation: {
      callable: OperationCallableTypes.ENABLED,
      messages: [],
      __typename: 'Operation'
    },
    updateClientInvestigation: {
      callable: OperationCallableTypes.HIDDEN,
      messages: ['Company is not under any investigation'],
      __typename: 'Operation'
    },
    resolveClientLegalInvestigation: {
      callable: OperationCallableTypes.HIDDEN,
      messages: ['This investigation has already been resolved.'],
      __typename: 'Operation'
    },
    resolveClientOtherInvestigation: {
      callable: OperationCallableTypes.HIDDEN,
      messages: ['This investigation has already been resolved.'],
      __typename: 'Operation'
    },
    resolveClientPaymentProblemInvestigation: {
      callable: OperationCallableTypes.HIDDEN,
      messages: ['This investigation has already been resolved.'],
      __typename: 'Operation'
    },
    resolveClientClientFeedbackInvestigation: {
      callable: OperationCallableTypes.HIDDEN,
      messages: ['This investigation has already been resolved.'],
      __typename: 'Operation'
    },
    resolveClientChallengesWithEngagementInvestigation: {
      callable: OperationCallableTypes.HIDDEN,
      messages: ['This investigation has already been resolved.'],
      __typename: 'Operation'
    },
    resolveClientReportedIssuesInvestigation: {
      callable: OperationCallableTypes.HIDDEN,
      messages: ['This investigation has already been resolved.'],
      __typename: 'Operation'
    },
    resolveClientAccountingErrorInvestigation: {
      callable: OperationCallableTypes.HIDDEN,
      messages: ['This investigation has already been resolved.'],
      __typename: 'Operation'
    },
    resolveClientCcAchDisputeInvestigation: {
      callable: OperationCallableTypes.HIDDEN,
      messages: ['This investigation has already been resolved.'],
      __typename: 'Operation'
    },
    resolveClientMatchingInvestigation: {
      callable: OperationCallableTypes.HIDDEN,
      messages: ['This investigation has already been resolved.'],
      __typename: 'Operation'
    },
    __typename: 'ClientOperations'
  },
  __typename: 'Client'
}
