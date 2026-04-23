import { encodeEntityId } from '@staff-portal/data-layer-service'

export const getJobApplicationTalentCardResponse = () => ({
  data: {
    node: {
      id: encodeEntityId('123', 'JobApplication'),
      applicationComment: 'This part was obfuscated, some content was here.',
      createdAt: '2022-03-23T19:14:31+03:00',
      talent: {
        id: encodeEntityId('123', 'Talent'),
        photo: null,
        fullName: 'Dane Hilpert',
        locationV2: {
          country: {
            id: encodeEntityId('123', 'Country'),
            name: 'Nepal',
            __typename: 'Country'
          },
          stateName: 'Central Development Region',
          cityName: 'Kathmandu',
          __typename: 'Location'
        },
        topSkillTitle: 'DevOps Developer',
        webResource: {
          url: 'https://staging.toptal.net/platform/staff/talents/3153509',
          __typename: 'Link'
        },
        __typename: 'Talent'
      },
      talentPitch: {
        skillItems: {
          nodes: [
            {
              title: 'Google Cloud Platform (GCP)',
              skillSet: {
                id: encodeEntityId('123', 'SkillSet'),
                experience: 3,
                __typename: 'SkillSet'
              },
              __typename: 'TalentPitchSkillItem'
            },
            {
              title: 'Amazon Web Services (AWS)',
              skillSet: {
                id: encodeEntityId('123', 'SkillSet'),
                experience: 3,
                __typename: 'SkillSet'
              },
              __typename: 'TalentPitchSkillItem'
            },
            {
              title: 'Linux',
              skillSet: {
                id: encodeEntityId('123', 'SkillSet'),
                experience: 6,
                __typename: 'SkillSet'
              },
              __typename: 'TalentPitchSkillItem'
            },
            {
              title: 'Kubernetes',
              skillSet: {
                id: encodeEntityId('123', 'SkillSet'),
                experience: 3,
                __typename: 'SkillSet'
              },
              __typename: 'TalentPitchSkillItem'
            },
            {
              title: 'Docker',
              skillSet: {
                id: encodeEntityId('123', 'SkillSet'),
                experience: 4,
                __typename: 'SkillSet'
              },
              __typename: 'TalentPitchSkillItem'
            }
          ],
          __typename: 'TalentPitchSkillItemConnection'
        },
        __typename: 'TalentPitch',
        industryItems: {
          nodes: [],
          __typename: 'TalentPitchIndustryItemConnection'
        },
        highlights: {
          nodes: [
            {
              title: 'Senior DevOps Consultant | Freelance at CloudHero',
              years: ['2020', 'PRESENT'],
              additionalText: [
                "Migrated various clients' monolithic applications to microservices using Kubernetes and an on-premise application to cloud platforms."
              ],
              companyName: 'CloudHero',
              roleName: 'Senior DevOps Consultant | Freelance',
              __typename: 'TalentPitchEmploymentHighlightItem'
            },
            {
              title: 'System Engineer at F1Soft International Pvt',
              years: ['2018', '2020'],
              additionalText: [
                'Focused on clusters, high availability, and load balancing technologies.'
              ],
              companyName: 'F1Soft International Pvt',
              roleName: 'System Engineer',
              __typename: 'TalentPitchEmploymentHighlightItem'
            },
            {
              title:
                "Bachelor's Degree in Computer Engineering at Kathmandu University",
              years: ['2014', '2018'],
              additionalText: [],
              companyName: 'Kathmandu University',
              roleName: "Bachelor's Degree in Computer Engineering",
              __typename: 'TalentPitchEducationHighlightItem'
            },
            {
              title:
                'AWS Certified Solutions Architect – Associate at Amazon Web Services Training and Certification',
              years: ['December 2021', 'December 2024'],
              additionalText: [],
              companyName: 'Amazon Web Services Training and Certification',
              roleName: 'AWS Certified Solutions Architect – Associate',
              __typename: 'TalentPitchCertificationHighlightItem'
            },
            {
              title:
                'Certified Kubernetes Administrator (CKA)  at The Linux Foundation',
              years: ['June 2021', 'June 2024'],
              additionalText: [],
              companyName: 'The Linux Foundation',
              roleName: 'Certified Kubernetes Administrator (CKA) ',
              __typename: 'TalentPitchCertificationHighlightItem'
            },
            {
              title:
                'Worked on Demo Architecture Applications in AWS, Kubernetes, and Terraform (Development)',
              years: [],
              additionalText: [
                'This is the demo architecture in AWS with fully automated CI/CD using Gitlab-CI. Demo application stacks:\n'
              ],
              companyName: null,
              roleName:
                'Worked on Demo Architecture Applications in AWS, Kubernetes, and Terraform (Development)',
              __typename: 'TalentPitchPortfolioHighlightItem'
            }
          ],
          __typename: 'TalentPitchHighlightItemConnection'
        },
        designPortfolioItems: {
          nodes: [],
          __typename: 'TalentPitchDesignPortfolioItemConnection'
        }
      },
      __typename: 'JobApplication'
    }
  }
})
