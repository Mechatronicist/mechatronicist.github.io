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

export interface Commit {
    sha: string;
    commit: CommitDetail;
    html_url: string;
    author: RootAuthor;
}

export function getRecentEvents(): Commit[] {
    const data = commitData as Commit[];

    return data;
}