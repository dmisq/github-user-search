import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react-native'
import { useQuery } from 'react-query'
import HomeScreen from '../../src/screens/HomeScreen'
import useSearchStore from '../../src/store/searchStore'
import { GitHubUser } from '../../src/services/githubApi/types'

jest.mock('react-query', () => ({
  useQuery: jest.fn(),
}))

jest.mock('../../src/store/searchStore', () => ({
  __esModule: true,
  default: jest.fn(),
}))

jest.mock('react-native-safe-area-context', () => ({
  SafeAreaView: ({ children }: any) => children,
  useSafeAreaInsets: () => ({ bottom: 0 }),
}))

const mockSetSearchInput = jest.fn()
const mockSetCurrentSearchQuery = jest.fn()

;(useSearchStore as unknown as jest.Mock).mockImplementation(() => ({
  searchInput: '',
  setSearchInput: mockSetSearchInput,
  currentSearchQuery: '',
  setCurrentSearchQuery: mockSetCurrentSearchQuery,
}))

describe('HomeScreen Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders correctly', () => {
    ;(useQuery as jest.Mock).mockReturnValue({ data: [], isLoading: false })
    const { getByPlaceholderText } = render(<HomeScreen />)
    expect(getByPlaceholderText('Enter username')).toBeTruthy()
  })

  it('updates search input state on user input', () => {
    ;(useQuery as jest.Mock).mockReturnValue({ data: [], isLoading: false })
    const { getByPlaceholderText } = render(<HomeScreen />)
    const searchInput = getByPlaceholderText('Enter username')
    fireEvent.changeText(searchInput, 'testuser')
    expect(mockSetSearchInput).toHaveBeenCalledWith('testuser')
  })

  it('displays loading state correctly', () => {
    ;(useQuery as jest.Mock).mockReturnValue({ data: [], isLoading: true })
    const { getByTestId } = render(<HomeScreen />)
    expect(getByTestId('loading-indicator')).toBeTruthy()
  })

  it('displays error state correctly', () => {
    ;(useQuery as jest.Mock).mockReturnValue({
      isError: true,
      isLoading: false,
    })
    const { getByText } = render(<HomeScreen />)
    expect(getByText('An error occurred while fetching')).toBeTruthy()
  })

  it('displays user tiles based on search results', async () => {
    const mockData: GitHubUser[] = [
      { login: 'testuser1', id: 1 },
      { login: 'testuser2', id: 2 },
    ]
    ;(useQuery as jest.Mock).mockReturnValue({
      data: mockData,
      isLoading: false,
    })
    const { getByText } = render(<HomeScreen />)
    await waitFor(() => {
      expect(getByText('testuser1')).toBeTruthy()
      expect(getByText('testuser2')).toBeTruthy()
    })
  })
})
