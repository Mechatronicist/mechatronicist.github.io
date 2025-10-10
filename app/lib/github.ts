interface Commit {
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
}

export async function getRecentEvents(username: string): Promise<UserEvent[] | null> {
    try {
        var url = `https://api.github.com/users/${username}/events`;
        var result = await fetch(url);

        var items = await result.json() as UserEvent[];
        return items;
    }
    catch(error) {
        console.error(error);
        return null;
    }
}