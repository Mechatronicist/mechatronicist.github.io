import commitData from '~/data/commits.json';

interface CommitAuthor {
    name: string;
    email: string;
    date: string;
}

interface RootAuthor {
    login: string;
    avatar_url: string;
    html_url: string;
}

interface CommitDetail {
    author: CommitAuthor;
    message: string;
}

interface Repository {
    name: string;
    url: string;
}

export interface UserEvent {
    type: string;
    actor: RootAuthor;
    repo: Repository;
    payload: object;
    created_at: Date;
}

export interface Commit {
    sha: string;
    commit: CommitDetail;
    html_url: string;
    author: RootAuthor;
}

export function getRecentCommits(): Commit[] {
    const data = commitData as Commit[];
    return data;
}

export async function getTodayEvents(username: string): Promise<UserEvent[] | null> {
    try {
        var url = `https://api.github.com/users/${username}/events`;
        var result = await fetch(url);
        if (!result.ok) {
            console.error(`GitHub API returned status ${result.status}`);
            return null;
        }
        var data = await result.json();
        const items = (data as any[]).map(event => ({
            ...event,
            created_at: new Date(event.created_at)
        })) as UserEvent[];

        return items;
    }
    catch(error) {
        console.error(error);
        return null;
    }
}