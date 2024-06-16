'use client'

import { IMenu, IProduct } from '@/api/interfaces';
import { deleteMenu, getMenus } from "@/api/menus";
import { getProducts } from "@/api/products";
import { Box } from "@/app/components/box/Box";
import { BoxContent } from "@/app/components/box/BoxContent";
import { BoxHeader } from "@/app/components/box/BoxHeader";
import { BoxHeaderItem } from "@/app/components/box/BoxHeaderItem";
import { Button } from "@/app/components/button/Button";
import { IToast } from '@/helpers/interfaces';
import { useParams, useRouter } from "next/navigation";
import { Column } from 'primereact/column';
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { DataTable } from 'primereact/datatable';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from "primereact/inputicon";
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { Fragment, useEffect, useMemo, useRef, useState } from 'react';
import styles from './empreendedor.module.css';

export default function Empreendedor() {
    const [isMenus, setIsMenus ] = useState(true);
    const [isProducts, setIsProducts ] = useState(false);
    const [products, setProducts] = useState<IProduct[]>([]);
    const [productSearchValue, setProductSearchValue] = useState('');
    const [menuSearchValue, setSectionSearchValue] = useState('');
    const [menus, setMenus] = useState<IMenu[]>([]);
    const router = useRouter();
    const toast = useRef<Toast>(null);
    const { idEmpreendimento } = useParams();

    function handleClickMenus() {
        setIsMenus(true);
        setIsProducts(false);
    }

    function handleClickProducts() {
        setIsProducts(true);
        setIsMenus(false);
    }

    const filteredMenus = useMemo(() => {
        return menus.filter((menu) =>
            menu.titulo.toLowerCase().includes(menuSearchValue.toLowerCase())
        );
    }, [menus, menuSearchValue]);

    const filteredProducts = useMemo(() => {
        return products.filter((product) =>
            product.descricao.toLowerCase().includes(productSearchValue.toLowerCase())
        );
    }, [products, productSearchValue]);

    const confirmDialogSection = (id: number) => {
        confirmDialog({
            message: 'Tem certeza que deseja excluir este cardapio?',
            header: 'Confirmação',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                try {
                    deleteMenu(id);
                    setMenus(menus.filter((menu) => menu.id !== id));
                } catch (error) {
                    console.error(error);
                }
                showToast({
                    severity: 'success',
                    summary: 'Sucesso',
                    detail: 'Cardápio excluído com sucesso'
                });
            },
            reject: () => {
                showToast({
                    severity: 'info',
                    summary: 'Info',
                    detail: 'Operação cancelada'
                });
            }
        });
    }

    const showToast = (data: IToast) => {
        if (toast.current)
            toast.current.show(data);
    };

    useEffect(() => {
        async function fetchProducts() {
            try {
                const data = await getProducts();
                setProducts(data.filter((product) =>
                     product.idEmpreendimento === Number(idEmpreendimento)));
            } catch (error) {
                console.error(error);
            }
        }

        fetchProducts();
    }, [idEmpreendimento]);

    useEffect(() => {
        async function fetchMenus() {
            try {
                const data = await getMenus();
                setMenus(data.filter((menu) => menu.idEmpreendimento === Number(idEmpreendimento)));
            } catch (error) {
                console.error(error);
            }
        }

        fetchMenus();
    }, [idEmpreendimento]);

    return (
        <>
        <Toast ref={toast} position="top-right" />
        <ConfirmDialog></ConfirmDialog>
        <Box>
            <BoxHeader>
            <BoxHeaderItem isActive={isMenus} onClick={handleClickMenus}>
                    <h2>Cardápios</h2>
                </BoxHeaderItem>
                <BoxHeaderItem isActive={isProducts} onClick={handleClickProducts}>
                    <h2>Produtos</h2>
                </BoxHeaderItem>
            </BoxHeader>
            <BoxContent>
                {isMenus && (
                <>
                    <div className="flex w-100 justify-between mb-5">
                        <IconField iconPosition="left">
                            <InputIcon className="pi pi-search"> </InputIcon>
                            <InputText placeholder="Buscar por titulo" className="p-inputtext-sm w-64"
                            value={menuSearchValue} onChange={(e) => setSectionSearchValue(e.target.value)}/>
                        </IconField>
                        <Button icon="pi pi-plus" size="small" btnStyle="btnSecondary" onClick={() => {
                            router.push(`/empreendedor/${idEmpreendimento}/cardapio/cadastrar`);
                        }}>
                            Adicionar cardápio
                        </Button>
                    </div>

                    <DataTable value={filteredMenus} columnResizeMode="expand" resizableColumns showGridlines
                    tableStyle={{ minWidth: '50rem' }}
                    size="small" scrollable scrollHeight="400px">
                        <Column field="titulo" header="Titulo" style={{ width: '3rem' }}
                        pt={{headerCell: {className: styles.tableStyle + " " + styles.tableHeader},
                        bodyCell: {className: styles.tableStyle}}}/>

                        <Column field="descricao" header="Descrição" style={{ width: '25rem' }}
                        pt={{headerCell: {className: styles.tableStyle + " " + styles.tableHeader},
                        bodyCell: {className: styles.tableStyle}}}/>

                        <Column header="Ações" style={{ width: '3rem' }} body={(rowData) => (
                            <div className="flex gap-2">
                                <Button icon="pi pi-eye" size="small" btnStyle="btnSecondary" onClick={() => {
                                    router.push(`/empreendedor/${idEmpreendimento}/cardapio/${rowData.id}`);
                                }}></Button>
                                <Button icon="pi pi-pencil" size="small" btnStyle="btnSecondary" onClick={() => {
                                    router.push(`/empreendedor/${idEmpreendimento}/cardapio/${rowData.id}/editar`);
                                }}></Button>
                                <Button icon="pi pi-trash" size="small" btnStyle="btnSecondary"
                                onClick={() => confirmDialogSection(rowData.id)}></Button>
                            </div>
                        )}
                        pt={{headerCell: {className: styles.tableStyle + " " + styles.tableHeader},
                        bodyCell: {className: styles.tableStyle}}}/>
                    </DataTable>
            </>)}
            {isProducts && (
            <>
                <div className="flex w-100 justify-between mb-5">
                        <IconField iconPosition="left">
                            <InputIcon className="pi pi-search"> </InputIcon>
                            <InputText placeholder="Buscar por nome" className="p-inputtext-sm w-64"
                            value={productSearchValue} onChange={(e) => setProductSearchValue(e.target.value)}/>
                        </IconField>
                        <Button icon="pi pi-plus" size="small" btnStyle="btnSecondary" onClick={() => {
                            router.push(`/empreendedor/${idEmpreendimento}/produto/cadastrar`);
                        }}>
                            Adicionar Produto
                        </Button>
                    </div>

                    <DataTable value={filteredProducts} columnResizeMode="expand" resizableColumns showGridlines
                    tableStyle={{ minWidth: '50rem' }}
                    size="small" scrollable scrollHeight="400px">

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
            </>)}
            </BoxContent>
        </Box>
        </>
    );
}
