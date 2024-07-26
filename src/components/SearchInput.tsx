import React from 'react'
import {
  TextInput,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from 'react-native'

interface SearchInputProps {
  value: string
  onChangeText: (text: string) => void
  onSubmit: () => void
}

const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChangeText,
  onSubmit,
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder="Enter username"
        placeholderTextColor="#999"
      />
      <TouchableOpacity style={styles.button} onPress={onSubmit}>
        <Text style={styles.buttonText}>Search</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#3498db',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
})

export default SearchInput
