import axios from 'axios';
import { IProduct } from './interfaces';
import { apiUrl } from '@/api/url';

export async function getProducts() {
    const { data } = await axios.get<IProduct[]>(`${apiUrl}/produtos`);
    return data;
}

export async function getProduct(id: number) {
    const { data } = await axios.get<IProduct>(`${apiUrl}/produto/${id}`);
    return data;
}
