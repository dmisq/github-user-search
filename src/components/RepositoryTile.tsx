import { View, Text, StyleSheet } from 'react-native'
import { GitHubRepo } from '../services/githubApi/githubApi'

interface RepositoryTileProps {
  item: GitHubRepo
}

const RepositoryTile: React.FC<RepositoryTileProps> = ({ item }) => (
  <View style={styles.repoItem}>
    <View style={styles.repoHeader}>
      <Text style={styles.repoName}>{item.name}</Text>
      <Text style={styles.starCount}>{item.stargazers_count} ★</Text>
    </View>
    {item.description && (
      <Text style={styles.repoDescription}>{item.description}</Text>
    )}
  </View>
)

const styles = StyleSheet.create({
  repoItem: {
    marginBottom: 10,
  },
  repoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  repoName: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  starCount: {
    fontSize: 12,
  },
  repoDescription: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
})

export default RepositoryTile
