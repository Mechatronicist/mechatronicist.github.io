import projects from '~/data/projects.json';

export interface IProject {
    id: string;
    name: string;
    description: string;
    summary: string;
    image: string;
    tags: string[];
    link: string;
}

export function getProjects() : IProject[] {
    return projects as IProject[];
}