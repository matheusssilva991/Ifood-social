import axios from 'axios';
import { ISection } from '@/api/interfaces';
import { apiUrl } from '@/api/url';

export async function getSections() {
    const { data } = await axios.get<ISection[]>(`${apiUrl}/secoes`);
    return data;
}

export async function getSection(id: number) {
    const { data } = await axios.get<ISection>(`${apiUrl}/secao/${id}`);
    return data;
}

export async function createSection(section: ISection) {
    const { data } = await axios.post<ISection>(`${apiUrl}/secao`, section);
    return data;
}

export async function updateSection(section: ISection) {
    const { data } = await axios.put<ISection>(`${apiUrl}/secao/${section.id}`, section);
    return data;
}

export async function deleteSection(id: number) {
    const { data } = await axios.delete<ISection>(`${apiUrl}/secao/${id}`);
    return data;
}
