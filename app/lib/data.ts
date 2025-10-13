import projects from '~/data/projects.json';
import awards from '~/data/awards.json';
import experience from "~/data/experience.json";
import educations from "~/data/education.json";

export interface IProject {
    id: string;
    name: string;
    subtext: string;
    description: string;
    summary: string;
    image: string;
    tags: string[];
    link: string;
    images: string[];
}

export interface IAward {
    name: string;
    description: string;
    grantor: string;
    link: string;
}

interface IExperience {
    title: string;
    subtitle: string;
    description: string;
    image: string;
}

interface IEducation {
    title: string;
    subtitle: string;
    description: string;
    image: string;
}

export function getProjects() : IProject[] {
    return projects as IProject[];
}

export function getAwards() : IAward[] {
    return awards as IAward[];
}

export function getExperience() : IExperience[] {
    return experience as IExperience[];
}

export function getEducation() : IEducation[] {
    return educations as IEducation[];
}