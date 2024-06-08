'use client'

import { Box } from '@/app/components/box/Box';
import { BoxContent } from '@/app/components/box/BoxContent';
import { BoxHeader } from '@/app/components/box/BoxHeader';
import { BoxHeaderItem } from '@/app/components/box/BoxHeaderItem';
import { Button } from '@/app/components/button/Button';
import { useRouter } from 'next/navigation';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { useState } from 'react';

const options = [
    { label: 'Opção 1', value: 1 },
    { label: 'Opção 2', value: 2 },
    { label: 'Opção 3', value: 3 },
    { label: 'Opção 4', value: 4 },
    { label: 'Opção 5', value: 5 }
];

export default function CadastrarSecao() {
    const [selectedOption, setSelectedOption] = useState(options[0]);
    const router = useRouter();

    return (
        <Box>
            <BoxHeader>
                <BoxHeaderItem isActive={true} isDisabled={true}>
                    <h2>Registrar seção</h2>
                </BoxHeaderItem>
            </BoxHeader>
            <BoxContent>
                <form className='flex flex-col'>
                    <div className='flex justify-between mb-5'>
                        <div className="flex flex-col gap-2 w-96">
                            <label htmlFor="title">Titulo</label>
                            <InputText id="title" aria-describedby="title-help" size="small"
                            placeholder='Titulo da seção' maxLength={45}/>
                        </div>
                    </div>

                    <div className='flex justify-between mb-5'>
                        <div className="flex flex-col gap-2 w-96">
                            <label htmlFor="description">Descrição</label>
                            <InputText id="description" aria-describedby="description-help" size="small"
                            placeholder='Descrição da seção' maxLength={45}/>
                        </div>
                    </div>

                    <div className='flex justify-between mb-7'>
                        <div className="flex flex-col gap-2 w-96">
                            <label htmlFor="description">Descrição</label>
                            <Dropdown id="option" aria-describedby="option-help" value={selectedOption}
                             options={options} onChange={(e) => setSelectedOption(e.value)}
                             placeholder='Selecione uma opção'/>
                        </div>
                    </div>

                    <div className='flex gap-5 self-end'>
                        <Button size='small' btnStyle='btnSecondary' type='button' onClick={() => {
                            router.push('/cardapio');
                        }}>Voltar</Button>
                        <Button size='small' btnStyle='btnPrimary'>Próximo</Button>
                    </div>
                </form>
            </BoxContent>
        </Box>
    );
}
