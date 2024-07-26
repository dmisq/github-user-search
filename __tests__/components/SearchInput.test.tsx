import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'
import SearchInput from '../../src/components/SearchInput'

const mockProps = {
  value: 'testuser',
  onChangeText: jest.fn(),
  onSubmit: jest.fn(),
}

describe('SearchInput Component', () => {
  it('renders input value', () => {
    const { getByDisplayValue } = render(<SearchInput {...mockProps} />)
    expect(getByDisplayValue('testuser')).toBeTruthy()
  })

  it('calls onChangeText when text changes', () => {
    const { getByPlaceholderText } = render(<SearchInput {...mockProps} />)
    fireEvent.changeText(getByPlaceholderText('Enter username'), 'newuser')
    expect(mockProps.onChangeText).toHaveBeenCalledWith('newuser')
  })

  it('calls onSubmit when button is pressed', () => {
    const { getByText } = render(<SearchInput {...mockProps} />)
    fireEvent.press(getByText('Search'))
    expect(mockProps.onSubmit).toHaveBeenCalled()
  })

  it('renders placeholder text', () => {
    const { getByPlaceholderText } = render(<SearchInput {...mockProps} />)
    expect(getByPlaceholderText('Enter username')).toBeTruthy()
  })
})
