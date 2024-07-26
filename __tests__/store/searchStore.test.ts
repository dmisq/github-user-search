import useSearchStore from '../../src/store/searchStore'

describe('useSearchStore', () => {
  beforeEach(() => {
    // Reset the store state before each test
    useSearchStore.setState({
      searchInput: '',
      currentSearchQuery: '',
    })
  })

  it('should initialize with default values', () => {
    const { searchInput, currentSearchQuery } = useSearchStore.getState()
    expect(searchInput).toBe('')
    expect(currentSearchQuery).toBe('')
  })

  it('should update searchInput', () => {
    const { setSearchInput } = useSearchStore.getState()
    setSearchInput('test input')
    const { searchInput } = useSearchStore.getState()
    expect(searchInput).toBe('test input')
  })

  it('should update currentSearchQuery', () => {
    const { setCurrentSearchQuery } = useSearchStore.getState()
    setCurrentSearchQuery('test query')
    const { currentSearchQuery } = useSearchStore.getState()
    expect(currentSearchQuery).toBe('test query')
  })
})
