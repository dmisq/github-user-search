import React from 'react'
import { render } from '@testing-library/react-native'
import RepositoryTile from '../../src/components/RepositoryTile'
import { GitHubRepo } from '../../src/services/githubApi/types'

describe('RepositoryTile', () => {
  const mockRepo: GitHubRepo = {
    id: 1,
    name: 'Test Repo',
    description: 'This is a test repository',
    stargazers_count: 42,
  }

  it('renders repository name correctly', () => {
    const { getByText } = render(<RepositoryTile item={mockRepo} />)
    expect(getByText('Test Repo')).toBeTruthy()
  })

  it('renders star count correctly', () => {
    const { getByText } = render(<RepositoryTile item={mockRepo} />)
    expect(getByText('42 ★')).toBeTruthy()
  })

  it('renders description when provided', () => {
    const { getByText } = render(<RepositoryTile item={mockRepo} />)
    expect(getByText('This is a test repository')).toBeTruthy()
  })

  it('does not render description when not provided', () => {
    const repoWithoutDescription = { ...mockRepo, description: null }
    const { queryByText } = render(
      <RepositoryTile item={repoWithoutDescription} />
    )
    expect(queryByText('This is a test repository')).toBeNull()
  })
})
