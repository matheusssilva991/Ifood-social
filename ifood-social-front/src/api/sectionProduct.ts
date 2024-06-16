import axios from 'axios';
import { ISectionProduct } from '@/api/interfaces';
import { apiUrl } from '@/api/url';

export async function getSectionsProducts() {
    const { data } = await axios.get<ISectionProduct[]>(`${apiUrl}/secoes-produtos`);
    return data;
}

export async function getSectionProduct(id: number) {
    const { data } = await axios.get<ISectionProduct>(`${apiUrl}/secao-produto/${id}`);
    return data;
}

export async function createSectionProduct(section: ISectionProduct) {
    const { data } = await axios.post<ISectionProduct>(`${apiUrl}/secao-produto`, section);
    return data;
}

export async function updateSectionProduct(section: ISectionProduct) {
    const { data } = await axios.put<ISectionProduct>(`${apiUrl}/secao-produto/${section.id}`, section);
    return data;
}

export async function deleteSectionProduct(id: number) {
    const { data } = await axios.delete<ISectionProduct>(`${apiUrl}/secao-produto/${id}`);
    return data;
}
