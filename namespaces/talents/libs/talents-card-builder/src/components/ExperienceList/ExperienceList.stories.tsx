// import React from 'react'
// import { BaseDecorator } from '@toptal/talent-portal-storybook'
// import {
//   profileExperience,
//   profilePublication
// } from '@toptal/talent-portal-support/factory'
//
// import ExperienceList from '.'
//
// export default {
//   title: 'Application card/ExperienceList',
//   // decorators: [BaseDecorator]
// }
//
// export const Default = () => (
//   <ExperienceList
//     talentId='id'
//     title='Experience'
//     fullName='Talent Name'
//     value={[]}
//     experiences={profileExperience.buildList(2)}
//     approvedMentor={false}
//     publications={[]}
//     toggleItem={() => {}}
//   />
// )
//
// export const WithApprovedMentor = () => (
//   <ExperienceList
//     talentId='id'
//     title='Experience'
//     fullName='Talent Name'
//     value={[]}
//     experiences={[]}
//     approvedMentor
//     publications={[]}
//     toggleItem={() => {}}
//   />
// )
//
// export const WithPublications = () => (
//   <ExperienceList
//     talentId='id'
//     title='Experience'
//     fullName='Talent Name'
//     value={[]}
//     experiences={[]}
//     approvedMentor={false}
//     publications={profilePublication.buildList(2)}
//     toggleItem={() => {}}
//   />
// )
//
// export const WithValue = () => (
//   <ExperienceList
//     talentId='id'
//     title='Experience'
//     fullName='Talent Name'
//     value={[{ type: 'portfolio', id: 'ex1' }]}
//     experiences={[
//       profileExperience.build({ id: 'ex1' }),
//       profileExperience.build({ id: 'ex2' })
//     ]}
//     approvedMentor={false}
//     publications={[]}
//     toggleItem={() => {}}
//   />
// )
