import projects from '~/data/projects.json';

export interface Project {
    id: string;
    name: string;
    description: string;
    summary: string;
    image: string;
    tags: string[];
    link: string;
}

export function getProjects() : Project[] {
    return projects as Project[];
}