import React from 'react'
import { Container } from '@toptal/picasso'
import { PageLoader } from '@staff-portal/ui'
import { Filters, Pagination } from '@staff-portal/filters'
import { ContentWrapper } from '@staff-portal/page-wrapper'

import { useGetTalentQuizQuestionsList } from '../../data/get-talent-quiz-questions-list'
import {
  AboutQuizzesButton,
  AddNewQuestionButton,
  CloneQuestionsButton,
  TalentQuizQuestionList,
  TalentQuizQuestionListSearchBar
} from '../../components'
import { useFiltersConfig, useHandleQuizzesFilters } from '../../hooks'
import { createGqlFilterVariables } from '../../utils'

const QuizzesPage = () => {
  const {
    page,
    pagination,
    limit,
    filterValues,
    resolvingFilters,
    handlePageChange,
    handleFilterChange
  } = useHandleQuizzesFilters()

  const { talentQuizQuestions, totalCount, loading } =
    useGetTalentQuizQuestionsList(
      createGqlFilterVariables(filterValues, pagination),
      resolvingFilters
    )

  const { filtersConfig } = useFiltersConfig()

  if (!talentQuizQuestions) {
    return <PageLoader />
  }

  return (
    <ContentWrapper
      title='Quizzes'
      itemsCount={totalCount}
      itemsCountLoading={loading}
      actions={[<AddNewQuestionButton />, <CloneQuestionsButton />]}
    >
      <Filters
        values={filterValues}
        config={filtersConfig}
        onChange={handleFilterChange}
      >
        {nestableControls => (
          <TalentQuizQuestionListSearchBar
            nestableControls={nestableControls}
          />
        )}
      </Filters>

      <Container top='large' bottom='large'>
        <TalentQuizQuestionList
          talentQuizQuestions={talentQuizQuestions}
          loading={loading}
        />
      </Container>

      <Pagination
        activePage={page}
        onPageChange={handlePageChange}
        limit={limit}
        itemCount={totalCount}
      />

      <AboutQuizzesButton />
    </ContentWrapper>
  )
}

export default QuizzesPage
