'use client'

import { getMenu, updateMenu } from '@/api/menus';
import { Box } from '@/app/components/box/Box';
import { BoxContent } from '@/app/components/box/BoxContent';
import { BoxHeader } from '@/app/components/box/BoxHeader';
import { BoxHeaderItem } from '@/app/components/box/BoxHeaderItem';
import { Button } from '@/app/components/button/Button';
import { IToast } from '@/helpers/interfaces';
import { useParams, useRouter } from 'next/navigation';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { useEffect, useRef, useState } from 'react';

export default function AtualizarCardapio() {
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const router = useRouter();
    const { idCardapio } = useParams();
    const toast = useRef<Toast>(null);
    const { idEmpreendedor } = useParams();

    async function handleSubmit() {
        const menu = {
            id: Number(idCardapio),
            titulo: title,
            descricao: description,
            idEmpreendimento: Number(idEmpreendedor)
        };

        try {
            await updateMenu(menu);
            router.push(`/empreendedor/${idEmpreendedor}`);
        } catch (error: any) {
            showToast({
                severity: 'error',
                summary: 'Erro',
                detail: error?.response.data.error
            });
        }
    }

    useEffect(() => {
        async function fetchMenu() {
            try {
                const data = await getMenu(Number(idCardapio));
                setTitle(data.titulo);
                setDescription(data.descricao);
            } catch (error) {
                console.error(error);
            }
        }

        fetchMenu();
    }, [idCardapio]);

    const showToast = (data: IToast) => {
        if (toast.current)
            toast.current.show(data);
    };

    return (
        <>
        <Toast ref={toast} position="top-right" />
        <Box>
            <BoxHeader>
                <BoxHeaderItem isActive={true} isDisabled={true}>
                    <h2>Atualizar cardápio </h2>
                </BoxHeaderItem>
            </BoxHeader>
            <BoxContent>
                <form className='flex flex-col' action={handleSubmit}>
                    <div className='flex justify-between mb-5'>
                        <div className="flex flex-col gap-2 w-96">
                            <label htmlFor="title">Titulo</label>
                            <InputText id="title" aria-describedby="title-help" size="small"
                            placeholder='Titulo do cardápio' value={title}
                            onChange={(e) => setTitle(e.target.value)}/>
                        </div>
                    </div>

                    <div className='flex justify-between mb-7'>
                        <div className="flex flex-col gap-2 w-96">
                            <label htmlFor="description">Descrição</label>
                            <InputText id="description" aria-describedby="description-help" size="small"
                            placeholder='Descrição do cardápio' value={description}
                            onChange={(e) => setDescription(e.target.value)}/>
                        </div>
                    </div>

                    <div className='flex gap-5 self-end'>
                        <Button size='small' btnStyle='btnSecondary' type='button' onClick={() => {
                            router.push(`/empreendedor/${idEmpreendedor}`);
                        }}>Voltar</Button>
                        <Button size='small' type='submit' btnStyle='btnPrimary'>Atualizar</Button>
                    </div>
                </form>
            </BoxContent>
        </Box>
        </>
    );
}
