import axios from 'axios';
import { ISecaoProduto } from '@/api/interfaces';
import { apiUrl } from '@/api/url';

export async function getSectionsProducts() {
    const { data } = await axios.get<ISecaoProduto[]>(`${apiUrl}/secoes-produtos`);
    return data;
}

export async function getSectionProduct(id: number) {
    const { data } = await axios.get<ISecaoProduto>(`${apiUrl}/secao-produto/${id}`);
    return data;
}

export async function createSectionProduct(section: ISecaoProduto) {
    const { data } = await axios.post<ISecaoProduto>(`${apiUrl}/secao-produto`, section);
    return data;
}

export async function updateSectionProduct(section: ISecaoProduto) {
    const { data } = await axios.put<ISecaoProduto>(`${apiUrl}/secao-produto/${section.id}`, section);
    return data;
}

export async function deleteSectionProduct(id: number) {
    const { data } = await axios.delete<ISecaoProduto>(`${apiUrl}/secao-produto/${id}`);
    return data;
}
