import projects from '~/data/projects.json';
import awards from '~/data/awards.json';
import experience from "~/data/experience.json";
import educations from "~/data/education.json";
import profile from "~/data/profile.json";

export interface IResource {
    type: string;
    href: string;
    description: string;
}

export interface IProject {
    id: string;
    name: string;
    subtext: string;
    description: string;
    summary: string;
    image: string;
    tags: string[];
    link: string;
    resources: IResource[];
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

interface IProfile {
    name: string;
    description: string;
    socials: ISocial[];
    github: string;
}

interface ISocial {
    name: string;
    link: string;
    icon: string;
}

export function getProfile() : IProfile {
    return profile as IProfile;
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