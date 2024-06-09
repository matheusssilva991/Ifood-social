'use client'

import { BoxHeader } from "@/app/components/box/BoxHeader";
import { BoxHeaderItem } from "@/app/components/box/BoxHeaderItem";
import { Box } from "@/app/components/box/Box";
import { BoxContent } from "@/app/components/box/BoxContent";
import { Fragment, useState, useMemo, useEffect, useRef } from 'react'
import { DataTable, DataTableRowReorderEvent } from 'primereact/datatable';
import { Column } from 'primereact/column';
import styles from './cardapio.module.css'
import { Button } from "@/app/components/button/Button";
import { InputText } from 'primereact/inputtext';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from "primereact/inputicon";
import { useRouter } from "next/navigation";
import { ISections } from '@/api/interfaces';
import { getSections, updateSection, deleteSection } from "../../../api/secoes";
import { Toast } from 'primereact/toast';
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";

export interface IToast {
    severity?: "success" | "info" | "warn" | "error" | undefined;
    summary: string;
    detail: string;
}

export default function Cardapios() {
    const [isMenu, setIsMenu ] = useState(true);
    const [isProduct, setIsProduct ] = useState(false);
    const [sections, setSections] = useState<ISections[]>([]);
    const [inputValue, setInputValue] = useState('');
    const router = useRouter();
    const toast = useRef<Toast>(null);

    const filteredSections = useMemo(() => {
        return sections.filter((section) => section.titulo.toLowerCase().includes(inputValue.toLowerCase()));
    }, [sections, inputValue]);

    function handleClickMenu() {
        setIsMenu(true);
        setIsProduct(false);
    }

    function handleClickProduct() {
        setIsProduct(true);
        setIsMenu(false);
    }

    async function reOrderSections(e: DataTableRowReorderEvent<ISections[]>) {
        setSections(e.value);

        e.value.forEach(async (section, index) => {
            section.numOrdem = index + 1;
            await updateSection(section);
        });
    }

    const confirmDialogSection = (id: number) => {
        confirmDialog({
            message: 'Tem certeza que deseja excluir esta seção?',
            header: 'Confirmação',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                try {
                    deleteSection(id);
                    setSections(sections.filter((section) => section.id !== 1));
                } catch (error) {
                    console.error(error);
                }
                showToast({
                    severity: 'success',
                    summary: 'Sucesso',
                    detail: 'Seção excluída com sucesso'
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
        async function fetchSections() {
            try {
                const data = await getSections();
                setSections(data);
            } catch (error) {
                console.error(error);
            }
        }

        fetchSections();
    }, []);

    return (
        <>
        <Toast ref={toast} position="top-right" />
        <ConfirmDialog></ConfirmDialog>
        <Box>
            <BoxHeader>
                <BoxHeaderItem isActive={isMenu} onClick={handleClickMenu}>
                    <h2>Cardápio</h2>
                </BoxHeaderItem>
                <BoxHeaderItem isActive={isProduct} onClick={handleClickProduct}>
                    <h2>Produtos</h2>
                </BoxHeaderItem>
            </BoxHeader>
            <BoxContent>
                {isMenu && (
                    <>
                    <div className="flex w-100 justify-between mb-5">
                        <IconField iconPosition="left">
                            <InputIcon className="pi pi-search"> </InputIcon>
                            <InputText placeholder="Buscar por titulo" className="p-inputtext-sm w-64"
                            value={inputValue} onChange={(e) => setInputValue(e.target.value)}/>
                        </IconField>
                        <Button icon="pi pi-plus" size="small" btnStyle="btnSecondary" onClick={() => {
                            router.push('/cardapio/secao/cadastrar');
                        }}>
                            Adicionar seção
                        </Button>
                    </div>

                    <DataTable value={filteredSections} columnResizeMode="expand" resizableColumns showGridlines
                    tableStyle={{ minWidth: '50rem' }} reorderableRows onRowReorder={(e) => reOrderSections(e)}
                    size="small" scrollable scrollHeight="400px">
                        <Column rowReorder style={{ width: '1rem' }}
                        pt={{headerCell: {className: styles.tableStyle + " " + styles.tableHeader},
                        bodyCell: {className: styles.tableStyle}}}/>

                        <Column field="titulo" header="Titulo" style={{ width: '3rem' }}
                        pt={{headerCell: {className: styles.tableStyle + " " + styles.tableHeader},
                        bodyCell: {className: styles.tableStyle}}}/>

                        <Column field="descricao" header="Descrição" style={{ width: '25rem' }}
                        pt={{headerCell: {className: styles.tableStyle + " " + styles.tableHeader},
                        bodyCell: {className: styles.tableStyle}}}/>

                        <Column header="Ações" style={{ width: '3rem' }} body={(rowData) => (
                            <div className="flex gap-2">
                                <Button icon="pi pi-pencil" size="small" btnStyle="btnSecondary" onClick={() => {
                                    router.push(`/cardapio/secao/editar/${rowData.id}`);
                                }}></Button>
                                <Button icon="pi pi-trash" size="small" btnStyle="btnSecondary"
                                onClick={() => confirmDialogSection(rowData.id)}></Button>
                            </div>
                        )}
                        pt={{headerCell: {className: styles.tableStyle + " " + styles.tableHeader},
                        bodyCell: {className: styles.tableStyle}}}/>
                    </DataTable>
                    </>
                )}
                {isProduct && (
                    <>
                    <div className="flex w-100 justify-between mb-5">
                        <IconField iconPosition="left">
                            <InputIcon className="pi pi-search"> </InputIcon>
                            <InputText placeholder="Buscar por titulo" className="p-inputtext-sm w-64"
                            value={inputValue} onChange={(e) => setInputValue(e.target.value)}/>
                        </IconField>
                        <Button icon="pi pi-plus" size="small" btnStyle="btnSecondary" onClick={() => {
                            router.push('/cardapio/produto/cadastrar');
                        }}>
                            Adicionar Produto
                        </Button>
                    </div>

                    <DataTable value={filteredSections} columnResizeMode="expand" resizableColumns showGridlines
                    tableStyle={{ minWidth: '50rem' }} reorderableRows onRowReorder={(e) => setSections(e.value)}
                    size="small" scrollable scrollHeight="400px">
                        <Column rowReorder style={{ width: '1rem' }}
                        pt={{headerCell: {className: styles.tableStyle + " " + styles.tableHeader},
                        bodyCell: {className: styles.tableStyle}}}/>

                        <Column field="titulo" header="Titulo" style={{ width: '3rem' }}
                        pt={{headerCell: {className: styles.tableStyle + " " + styles.tableHeader},
                        bodyCell: {className: styles.tableStyle}}}/>

                        <Column field="descricao" header="Descrição" style={{ width: '20rem' }}
                        pt={{headerCell: {className: styles.tableStyle + " " + styles.tableHeader},
                        bodyCell: {className: styles.tableStyle}}}/>

                        <Column field="isActive" header="Ativo" style={{ width: '5rem' }} body={(rowData) => (
                            <Fragment>{rowData.isActive ? 'Ativo' : 'Inativo'}</Fragment>
                        )}
                        pt={{headerCell: {className: styles.tableStyle + " " + styles.tableHeader},
                        bodyCell: {className: styles.tableStyle}}}/>
                    </DataTable>
                    </>
                )}
            </BoxContent>
        </Box>
        </>
    );
}
