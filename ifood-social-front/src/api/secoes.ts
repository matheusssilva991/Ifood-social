import axios from 'axios';
import { ISections } from '@/api/interfaces';
import { apiUrl } from '@/api/url';

export async function getSections() {
    const { data } = await axios.get<ISections[]>(`${apiUrl}/secoes`);
    return data;
}

export async function getSection(id: number) {
    const { data } = await axios.get<ISections>(`${apiUrl}/secao/${id}`);
    return data;
}

export async function createSection(section: ISections) {
    const { data } = await axios.post<ISections>(`${apiUrl}/secao`, section);
    return data;
}

export async function updateSection(section: ISections) {
    const { data } = await axios.put<ISections>(`${apiUrl}/secao/${section.id}`, section);
    return data;
}

export async function deleteSection(id: number) {
    const { data } = await axios.delete<ISections>(`${apiUrl}/secao/${id}`);
    return data;
}
