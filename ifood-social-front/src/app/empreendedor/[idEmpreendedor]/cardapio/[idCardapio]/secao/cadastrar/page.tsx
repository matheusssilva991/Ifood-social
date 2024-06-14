'use client'

import { Box } from '@/app/components/box/Box';
import { BoxContent } from '@/app/components/box/BoxContent';
import { BoxHeader } from '@/app/components/box/BoxHeader';
import { BoxHeaderItem } from '@/app/components/box/BoxHeaderItem';
import { Button } from '@/app/components/button/Button';
import { useRouter, useParams } from 'next/navigation';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { useState } from 'react';
import { createSection } from '@/api/sections';

export default function CadastrarSecao() {
    const [isSectionInfo, setIsSectionInfo ] = useState(true);
    const [isSectionProducts, setIsSectionProducts ] = useState(false);
    const router = useRouter();
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [numOrdem, setNumOrdem] = useState<number | null>(0);
    const { idEmpreendedor, idCardapio } = useParams();

    async function handleSubmit() {
        const section = {
            titulo: titulo,
            descricao: descricao,
            numOrdem: numOrdem || 0,
            idCardapio: 1
        };

        await createSection(section);
        router.push('/cardapio');
    }

    function handleClickSectionInfo() {
        setIsSectionInfo(true);
        setIsSectionProducts(false);
    }

    function handleClickSectionProducts() {
        setIsSectionProducts(true);
        setIsSectionInfo(false);
    }

    return (
        <Box>
            <BoxHeader>
                <BoxHeaderItem isActive={isSectionInfo} onClick={handleClickSectionInfo}>
                    <h2>Informações da seção</h2>
                </BoxHeaderItem>
                <BoxHeaderItem isActive={isSectionProducts} onClick={handleClickSectionProducts}>
                    <h2>Produtos da seção</h2>
                </BoxHeaderItem>
            </BoxHeader>
            <BoxContent>
                <form className='flex flex-col' action={handleSubmit}>
                {isSectionInfo && (
                <>
                    <div className='flex justify-between mb-5'>
                        <div className="flex flex-col gap-2 w-96">
                            <label htmlFor="title">Titulo</label>
                            <InputText id="title" aria-describedby="title-help" size="small"
                            placeholder='Titulo da seção' maxLength={45} value={titulo}
                            onChange={(e) => setTitulo(e.target.value)}/>
                        </div>
                    </div>

                    <div className='flex justify-between mb-5'>
                        <div className="flex flex-col gap-2 w-96">
                            <label htmlFor="description">Descrição</label>
                            <InputText id="description" aria-describedby="description-help" size="small"
                            placeholder='Descrição da seção' maxLength={45} value={descricao}
                            onChange={(e) => setDescricao(e.target.value)}/>
                        </div>
                    </div>

                    <div className='flex justify-between mb-7'>
                        <div className="flex flex-col gap-2 w-96">
                            <label htmlFor="numOrdem">Ordem</label>
                            <InputNumber id="numOrdem" aria-describedby="numOrdem-help" value={numOrdem}
                            onChange={(e) => setNumOrdem(e.value)} min={0} mode='decimal'
                            placeholder='Selecione a ordem da seção'/>
                        </div>
                    </div>

                    <div className='flex gap-5 self-end'>
                        <Button size='small' btnStyle='btnSecondary' type='button' onClick={() => {
                            router.push(`/empreendedor/${idEmpreendedor}/cardapio/${idCardapio}`);
                        }}>Voltar</Button>
                        <Button size='small' btnStyle='btnPrimary' type='submit'>Cadastrar</Button>
                    </div>
                    </>
                )}

                {isSectionProducts && (
                <>
                    <div className='flex justify-between mb-5'>
                        <div className="flex flex-col gap-2 w-96">
                            <label htmlFor="title">Titulo</label>
                            <InputText id="title" aria-describedby="title-help" size="small"
                            placeholder='Titulo da seção' maxLength={45}/>
                        </div>
                    </div>

                    <div className='flex gap-5 self-end'>
                        <Button size='small' btnStyle='btnSecondary' type='button' onClick={() => {
                            router.push(`/empreendedor/${idEmpreendedor}/cardapio/${idCardapio}`);
                        }}>Voltar</Button>
                        <Button size='small' btnStyle='btnPrimary' type='submit'>Cadastrar</Button>
                    </div>
                    </>
                )}
                </form>

            </BoxContent>
        </Box>
    );
}
