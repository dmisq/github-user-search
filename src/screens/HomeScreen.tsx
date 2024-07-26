import React, { useState } from 'react'
import {
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
  FlatList,
} from 'react-native'
import SearchInput from '../components/SearchInput'
import { useQuery } from 'react-query'
import { searchUsers } from '../services/githubApi/githubApi'
import useSearchStore from '../store/searchStore'
import UserTile from '../components/UserTile'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'

export default function HomeScreen() {
  const { bottom: bottomInset } = useSafeAreaInsets()
  const {
    searchInput,
    setSearchInput,
    currentSearchQuery,
    setCurrentSearchQuery,
  } = useSearchStore()

  const {
    data: users = [],
    isError,
    isLoading,
    refetch,
  } = useQuery(
    ['users', currentSearchQuery],
    () => searchUsers(currentSearchQuery),
    {
      enabled: currentSearchQuery.length > 0,
    }
  )

  const handleSearch = () => {
    setCurrentSearchQuery(searchInput)
  }

  return (
    <View style={styles.container}>
      <SafeAreaView
        style={styles.searchContainer}
        edges={['top', 'right', 'left']}
      >
        <SearchInput
          value={searchInput}
          onChangeText={setSearchInput}
          onSubmit={handleSearch}
        />
      </SafeAreaView>
      {isError && (
        <Text style={styles.error}>An error occurred while fetching</Text>
      )}
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator
            testID="loading-indicator"
            size="large"
            color="#0000ff"
          />
        </View>
      )}
      {!isLoading && users.length > 0 && (
        <>
          <Text style={styles.resultText}>
            Showing users for "{currentSearchQuery}"
          </Text>
          <FlatList
            style={styles.list}
            data={users}
            renderItem={({ item }) => <UserTile user={item} />}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{ paddingBottom: bottomInset }}
          />
        </>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  error: {
    color: 'red',
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  resultText: {
    marginBottom: 10,
    fontSize: 16,
    paddingHorizontal: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    paddingHorizontal: 20,
  },
})
