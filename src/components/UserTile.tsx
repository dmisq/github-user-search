import React, { useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from 'react-native'
import { useQuery } from 'react-query'
import { getUserRepos } from '../services/githubApi/githubApi'
import RepositoryTile from './RepositoryTile'
import { GitHubUser } from '../services/githubApi/types'

interface UserTileProps {
  user: GitHubUser
}

const UserTile: React.FC<UserTileProps> = ({ user }) => {
  const [expanded, setExpanded] = useState(false)

  const {
    data: repos,
    isLoading,
    isError,
  } = useQuery(['repos', user.login], () => getUserRepos(user.login), {
    enabled: expanded,
  })
  return (
    <View style={styles.userItem}>
      <TouchableOpacity
        style={styles.userHeader}
        onPress={() => setExpanded(!expanded)}
      >
        <Text style={styles.username}>{user.login}</Text>
        <Text>{expanded ? '▲' : '▼'}</Text>
      </TouchableOpacity>
      {expanded && (
        <View style={styles.repoList}>
          {isLoading ? (
            <ActivityIndicator
              testID="loading-indicator"
              size="small"
              color="#0000ff"
            />
          ) : isError ? (
            <Text>An error occurred while fetching</Text>
          ) : repos?.length ? (
            <FlatList
              data={repos}
              renderItem={({ item }) => <RepositoryTile item={item} />}
              keyExtractor={(repo) => repo.id.toString()}
            />
          ) : (
            <Text>No repositories found</Text>
          )}
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  userItem: {
    backgroundColor: '#f0f0f0',
    marginBottom: 10,
    borderRadius: 5,
    overflow: 'hidden',
  },
  userHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#e0e0e0',
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  repoList: {
    padding: 15,
  },
})

export default UserTile
