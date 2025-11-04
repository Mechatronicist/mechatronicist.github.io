import commitData from '~/data/commits.json';

interface Commit {
    sha: string;
    message: string;
    url: string;
}

interface PullRequest {
    title: string;
    url: string;
}

export interface PushPayload {
    commits: Commit[];
}

export interface PullRequestPayload {
    action: string;
    pull_request: PullRequest;
}

interface User {
    display_login: string;
    url: string;
    avatar_url: string;
}

interface Repository {
    name: string;
    url: string;
}

export interface UserEvent {
    type: string;
    actor: User;
    repo: Repository;
    payload: object;
    created_at: Date;
}

export function getRecentEvents(username: string): UserEvent[] {
    const data = commitData.map(c => ({
        ...c,
        created_at: new Date(c.created_at)
    })) as UserEvent[];

    console.log(data);

    return data;
}