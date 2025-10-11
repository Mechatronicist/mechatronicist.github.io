import projects from '~/data/projects.json';
import awards from '~/data/awards.json';

export interface IProject {
    id: string;
    name: string;
    description: string;
    summary: string;
    image: string;
    tags: string[];
    link: string;
}

export interface IAward {
    name: string;
    description: string;
    grantor: string;
    link: string;
}

export function getProjects() : IProject[] {
    return projects as IProject[];
}

export function getAwards() : IAward[] {
    return awards as IAward[];
}