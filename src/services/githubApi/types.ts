export interface GitHubUser {
  id: number
  login: string
}

export interface GitHubRepo {
  id: number
  name: string
  description: string | null
  stargazers_count: number
}
