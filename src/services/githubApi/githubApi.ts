import axios from 'axios'
import { GitHubRepo, GitHubUser } from './types'

const BASE_URL = 'https://api.github.com'

export const searchUsers = async (query: string): Promise<GitHubUser[]> => {
  const response = await axios.get(
    `${BASE_URL}/search/users?q=${query}&per_page=5`
  )
  return response.data.items
}

export const getUserRepos = async (username: string): Promise<GitHubRepo[]> => {
  const response = await axios.get(`${BASE_URL}/users/${username}/repos`)
  return response.data
}
export { GitHubRepo }
