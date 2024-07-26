import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'
import { useQuery } from 'react-query'
import UserTile from '../../src/components/UserTile'
import { GitHubUser } from '../../src/services/githubApi/types'

jest.mock('react-query', () => ({
  useQuery: jest.fn(),
}))

const mockUser: GitHubUser = {
  login: 'testuser',
  id: 1,
}
const mockProps = { user: mockUser }

describe('UserTile Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('handles expand and collapse correctly', () => {
    ;(useQuery as jest.Mock).mockReturnValue({ data: [], isLoading: false })
    const { getByText, queryByTestId } = render(<UserTile {...mockProps} />)
    const touchable = getByText('testuser').parent

    // Initially collapsed
    expect(queryByTestId('loading-indicator')).toBeNull()

    // Expand
    fireEvent.press(touchable)
    expect(useQuery).toHaveBeenCalledWith(
      ['repos', 'testuser'],
      expect.any(Function),
      { enabled: true }
    )

    // Simulate loading state
    ;(useQuery as jest.Mock).mockReturnValue({ data: [], isLoading: true })
    fireEvent.press(touchable)
    fireEvent.press(touchable)
    expect(queryByTestId('loading-indicator')).toBeTruthy()

    // Collapse
    fireEvent.press(touchable)
    expect(queryByTestId('loading-indicator')).toBeNull()
  })

  it('displays error message correctly', () => {
    ;(useQuery as jest.Mock).mockReturnValue({
      data: [],
      isLoading: false,
      isError: true,
    })
    const { getByText, queryByText } = render(<UserTile {...mockProps} />)
    const touchable = getByText('testuser').parent

    // Expand to trigger error state
    fireEvent.press(touchable)
    expect(useQuery).toHaveBeenCalledWith(
      ['repos', 'testuser'],
      expect.any(Function),
      { enabled: true }
    )

    // Check for error message
    expect(queryByText('An error occurred while fetching')).toBeTruthy()
  })
})
