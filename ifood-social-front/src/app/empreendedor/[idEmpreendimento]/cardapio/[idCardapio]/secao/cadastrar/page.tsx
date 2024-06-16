'use client'

import { IProduct } from '@/api/interfaces';
import { getProducts } from '@/api/products';
import { createSectionProduct } from '@/api/sectionProduct';
import { createSection, getSections } from '@/api/sections';
import { Box } from '@/app/components/box/Box';
import { BoxContent } from '@/app/components/box/BoxContent';
import { BoxHeader } from '@/app/components/box/BoxHeader';
import { BoxHeaderItem } from '@/app/components/box/BoxHeaderItem';
import { Button } from '@/app/components/button/Button';
import { IToast } from '@/helpers/interfaces';
import { useParams, useRouter } from 'next/navigation';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { Fragment, useEffect, useMemo, useRef, useState } from 'react';
import styles from './cadastrar.module.css';

export default function CadastrarSecao() {
    const [isSectionInfo, setIsSectionInfo ] = useState(true);
    const [isSectionProducts, setIsSectionProducts ] = useState(false);
    const [products, setProducts] = useState<IProduct[]>([]);
    const [productSearchValue, setProductSearchValue] = useState('');
    const [sectionProducts, setSectionProducts] = useState<IProduct[]>([]);
    const router = useRouter();
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [numOrdem, setNumOrdem] = useState<number | null>(0);
    const { idEmpreendimento, idCardapio } = useParams();
    const toast = useRef<Toast>(null);

    const filteredProducts = useMemo(() => {
        let tmpProducts = products.filter((product) =>
            product.descricao.toLowerCase().includes(productSearchValue.toLowerCase())
        );

        tmpProducts = tmpProducts.sort((a, b) => {
            if (sectionProducts.some((product) => product.id === a.id)) {
                return -1;
            }

            if (sectionProducts.some((product) => product.id === b.id)) {
                return 1;
            }

            return a.descricao.localeCompare(b.descricao);
        });

        return tmpProducts;
    }, [products, productSearchValue, sectionProducts]);

    async function handleSubmit() {
        const section = {
            titulo: titulo,
            descricao: descricao,
            numOrdem: numOrdem || 0,
            idCardapio: Number(idCardapio),
        };

        try {
            await createSection(section);
            const sections = await getSections();

            if (!sections.length) {
                return;
            }

            const idSecao = sections.find((section) => section.titulo === titulo)?.id;

            if (idSecao === undefined) {
                return;
            }

            for (let i = 0; i < sectionProducts.length; i++) {
                await createSectionProduct({
                    idSecao: idSecao,
                    idProduto: sectionProducts[i].id,
                    numOrdem: i,
                });
            }

            router.push(`/empreendedor/${idEmpreendimento}/cardapio/${idCardapio}`);
        } catch (error: any) {
            showToast({ severity: 'error', summary: 'Erro', detail: error?.response.data.error });
            console.error(error);
        }
    }

    function handleClickSectionInfo() {
        setIsSectionInfo(true);
        setIsSectionProducts(false);
    }

    function handleClickSectionProducts() {
        setIsSectionProducts(true);
        setIsSectionInfo(false);
    }

    useEffect(() => {
        async function fetchProducts() {
            try {
                const data = await getProducts();
                setProducts(data.filter((product) => product.idEmpreendimento === Number(idEmpreendimento)));
            } catch (error) {
                console.error(error);
            }
        }

        fetchProducts();
    }, [idEmpreendimento]);

    const showToast = (data: IToast) => {
        if (toast.current)
            toast.current.show(data);
    };

    return (
        <>
        <Toast ref={toast} position="top-right" />
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
                            router.push(`/empreendedor/${idEmpreendimento}/cardapio/${idCardapio}`);
                        }}>Voltar</Button>
                        <Button size='small' btnStyle='btnPrimary' type='submit'>Cadastrar</Button>
                    </div>
                    </>
                )}

                {isSectionProducts && (
                <>
                    <div className="flex w-100 justify-between mb-5">
                        <IconField iconPosition="left">
                            <InputIcon className="pi pi-search"> </InputIcon>
                            <InputText placeholder="Buscar por nome" className="p-inputtext-sm w-64"
                            value={productSearchValue} onChange={(e) => setProductSearchValue(e.target.value)}/>
                        </IconField>
                    </div>

                    <DataTable value={filteredProducts} columnResizeMode="expand" showGridlines
                    tableStyle={{ minWidth: '50rem' }} selection={sectionProducts}
                    onSelectionChange={(e) => setSectionProducts(e.value)} dataKey="id" selectionMode={'checkbox'}
                    size="small" scrollable scrollHeight="400px">

                        <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}
                        pt={{headerCell: {className: styles.tableStyle + " " + styles.tableHeader}}}></Column>

                        <Column field="descricao" header="Nome" style={{ width: '3rem' }}
                        pt={{headerCell: {className: styles.tableStyle + " " + styles.tableHeader},
                        bodyCell: {className: styles.tableStyle}}}/>

                        <Column field="categoria.descricao" header="Categoria" style={{ width: '5rem' }}
                        pt={{headerCell: {className: styles.tableStyle + " " + styles.tableHeader},
                        bodyCell: {className: styles.tableStyle}}}/>

                        <Column field="disponibilidade" header="Disponibilidade" style={{ width: '3rem' }}
                        body={(rowData) => (
                            <Fragment>{rowData.disponibilidade === 'S' ? 'Disponível' : 'Indisponível'}</Fragment>
                        )}
                        pt={{headerCell: {className: styles.tableStyle + " " + styles.tableHeader},
                        bodyCell: {className: styles.tableStyle}}}/>

                        <Column field="preco" header="Preço R$" style={{ width: '3rem' }}
                        pt={{headerCell: {className: styles.tableStyle + " " + styles.tableHeader},
                        bodyCell: {className: styles.tableStyle}}}/>

                    </DataTable>

                    <div className='flex gap-5 self-end mt-5'>
                        <Button size='small' btnStyle='btnSecondary' type='button' onClick={() => {
                            router.push(`/empreendedor/${idEmpreendimento}/cardapio/${idCardapio}`);
                        }}>Voltar</Button>
                        <Button size='small' btnStyle='btnPrimary' type='submit'>Cadastrar</Button>
                    </div>
                </>
                )}
                </form>

            </BoxContent>
        </Box>
        </>
    );
}
