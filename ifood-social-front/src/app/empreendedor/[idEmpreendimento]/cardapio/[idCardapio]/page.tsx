'use client'

import { ISection } from '@/api/interfaces';
import { deleteSection, getSections, updateSection } from "@/api/sections";
import { Box } from "@/app/components/box/Box";
import { BoxContent } from "@/app/components/box/BoxContent";
import { BoxHeader } from "@/app/components/box/BoxHeader";
import { BoxHeaderItem } from "@/app/components/box/BoxHeaderItem";
import { Button } from "@/app/components/button/Button";
import { IToast } from '@/helpers/interfaces';
import { useRouter, useParams } from "next/navigation";
import { Column } from 'primereact/column';
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { DataTable, DataTableRowReorderEvent } from 'primereact/datatable';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from "primereact/inputicon";
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { useEffect, useMemo, useRef, useState } from 'react';
import styles from './secao.module.css';

export default function Cardapio() {
    const [sections, setSections] = useState<ISection[]>([]);
    const [sectionSearchValue, setSectionSearchValue] = useState('');
    const router = useRouter();
    const toast = useRef<Toast>(null);
    const { idEmpreendimento, idCardapio } = useParams();

    const filteredSections = useMemo(() => {
        return sections.filter((section) =>
            section.titulo.toLowerCase().includes(sectionSearchValue.toLowerCase())
        );
    }, [sections, sectionSearchValue]);


    async function reOrderSections(e: DataTableRowReorderEvent<ISection[]>) {
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
                    setSections(sections.filter((section) => section.id !== id));
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
                <BoxHeaderItem isActive={true} isDisabled={true}>
                    <h2>Cardápio</h2>
                </BoxHeaderItem>
            </BoxHeader>
            <BoxContent>
                <div className="flex w-100 justify-between mb-5">
                    <IconField iconPosition="left">
                        <InputIcon className="pi pi-search"> </InputIcon>
                        <InputText placeholder="Buscar por titulo" className="p-inputtext-sm w-64"
                        value={sectionSearchValue} onChange={(e) => setSectionSearchValue(e.target.value)}/>
                    </IconField>
                    <Button icon="pi pi-plus" size="small" btnStyle="btnSecondary" onClick={() => {
                        router.push(
                            `/empreendedor/${idEmpreendimento}/cardapio/${idCardapio}/secao/cadastrar`
                        );
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
                                router.push(`/empreendedor/${idEmpreendimento}/cardapio/${idCardapio}/secao/${rowData.id}/editar`);
                            }}></Button>
                            <Button icon="pi pi-trash" size="small" btnStyle="btnSecondary"
                            onClick={() => confirmDialogSection(rowData.id)}></Button>
                        </div>
                    )}
                    pt={{headerCell: {className: styles.tableStyle + " " + styles.tableHeader},
                    bodyCell: {className: styles.tableStyle}}}/>
                </DataTable>
            </BoxContent>
        </Box>
        </>
    );
}
