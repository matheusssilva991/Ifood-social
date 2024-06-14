import axios from 'axios';
import { IEnterprise } from './interfaces';
import { apiUrl } from '@/api/url';

export async function getEnterprises() {
    const { data } = await axios.get<IEnterprise[]>(`${apiUrl}/empreendimentos`);
    return data;
}

export async function getEnterprise(id: number) {
    const { data } = await axios.get<IEnterprise>(`${apiUrl}/empreendimento/${id}`);
    return data;
}
