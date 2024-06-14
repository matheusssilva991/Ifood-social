import axios from 'axios';
import { IMenu } from '@/api/interfaces';
import { apiUrl } from '@/api/url';

export async function getMenus() {
    const { data } = await axios.get<IMenu[]>(`${apiUrl}/cardapios`);
    return data;
}

export async function getMenu(id: number) {
    const { data } = await axios.get<IMenu>(`${apiUrl}/cardapio/${id}`);
    return data;
}

export async function createMenu(menu: IMenu) {
    const { data } = await axios.post<IMenu>(`${apiUrl}/cardapio`, menu);
    return data;
}

export async function updateMenu(menu: IMenu) {
    const { data } = await axios.put<IMenu>(`${apiUrl}/cardapio/${menu.id}`, menu);
    return data;
}

export async function deleteMenu(id: number) {
    const { data } = await axios.delete<IMenu>(`${apiUrl}/cardapio/${id}`);
    return data;
}
