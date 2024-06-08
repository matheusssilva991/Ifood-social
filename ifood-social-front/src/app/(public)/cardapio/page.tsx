'use client'

import { BoxHeader } from "@/app/components/box/BoxHeader";
import { BoxHeaderItem } from "@/app/components/box/BoxHeaderItem";
import { Box } from "@/app/components/box/Box";
import { BoxContent } from "@/app/components/box/BoxContent";
import { Fragment, useState, useMemo } from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import styles from './cardapio.module.css'
import { Button } from "@/app/components/button/Button";
import { InputText } from 'primereact/inputtext';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from "primereact/inputicon";
import { useRouter } from "next/navigation";

const sectionsInit = [
    { name: "Sucos", isActive: true, description: "Sucos do restaurante" },
    { name: "Saladas", isActive: false, description: "Saladas do restaurante" },
    { name: "Pratos", isActive: false, description: "Pratos do restaurante" },
    { name: "Bebidas", isActive: false, description: "Bebidas do restaurante" },
    { name: "Sobremesas", isActive: false, description: "Sobremesas do restaurante" },
    { name: "Combos", isActive: false, description: "Combos do restaurante" },
    { name: "Promoções", isActive: false, description: "Promoções do restaurante" },
    { name: "Outros", isActive: false, description: "Outros produtos do restaurante" },
    { name: "Sucos", isActive: true, description: "Sucos do restaurante" },
    { name: "Saladas", isActive: false, description: "Saladas do restaurante" },
    { name: "Pratos", isActive: false, description: "Pratos do restaurante" },
    { name: "Bebidas", isActive: false, description: "Bebidas do restaurante" },
    { name: "Sobremesas", isActive: false, description: "Sobremesas do restaurante" },
    { name: "Combos", isActive: false, description: "Combos do restaurante" },
    { name: "Promoções", isActive: false, description: "Promoções do restaurante" },
    { name: "Outros", isActive: false, description: "Outros produtos do restaurante" },
    { name: "Sucos", isActive: true, description: "Sucos do restaurante" },
    { name: "Saladas", isActive: false, description: "Saladas do restaurante" },
    { name: "Pratos", isActive: false, description: "Pratos do restaurante" },
    { name: "Bebidas", isActive: false, description: "Bebidas do restaurante" },
    { name: "Sobremesas", isActive: false, description: "Sobremesas do restaurante" },
    { name: "Combos", isActive: false, description: "Combos do restaurante" },
    { name: "Promoções", isActive: false, description: "Promoções do restaurante" },
    { name: "Outros", isActive: false, description: "Outros produtos do restaurante" },
];

export default function Cardapios() {
    const [isCardapio, setIsCardapio ] = useState(true);
    const [isProduto, setIsProduto ] = useState(false);
    const [sections, setSections] = useState(sectionsInit);
    const [inputValue, setInputValue] = useState('');
    const router = useRouter();

    const filteredSections = useMemo(() => {
        return sections.filter((section) => section.name.toLowerCase().includes(inputValue.toLowerCase()));
    }, [sections, inputValue]);

    function handleClickCardapio() {
        setIsCardapio(true);
        setIsProduto(false);
    }

    function handleClickProduto() {
        setIsProduto(true);
        setIsCardapio(false);
    }

    return (
        <Box>
            <BoxHeader>
                <BoxHeaderItem isActive={isCardapio} onClick={handleClickCardapio}>
                    <h2>Cardápio</h2>
                </BoxHeaderItem>
                <BoxHeaderItem isActive={isProduto} onClick={handleClickProduto}>
                    <h2>Produtos</h2>
                </BoxHeaderItem>
            </BoxHeader>
            <BoxContent>
                {isCardapio && (
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
                    tableStyle={{ minWidth: '50rem' }} reorderableRows onRowReorder={(e) => setSections(e.value)}
                    size="small" scrollable scrollHeight="400px">
                        <Column rowReorder style={{ width: '1rem' }}
                        pt={{headerCell: {className: styles.tableStyle + " " + styles.tableHeader},
                        bodyCell: {className: styles.tableStyle}}}/>

                        <Column field="name" header="Titulo" style={{ width: '3rem' }}
                        pt={{headerCell: {className: styles.tableStyle + " " + styles.tableHeader},
                        bodyCell: {className: styles.tableStyle}}}/>

                        <Column field="description" header="Descrição" style={{ width: '20rem' }}
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
                {isProduto && (
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

                        <Column field="name" header="Titulo" style={{ width: '3rem' }}
                        pt={{headerCell: {className: styles.tableStyle + " " + styles.tableHeader},
                        bodyCell: {className: styles.tableStyle}}}/>

                        <Column field="description" header="Descrição" style={{ width: '20rem' }}
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
    );
}
