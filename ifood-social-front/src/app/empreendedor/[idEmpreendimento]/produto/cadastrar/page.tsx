'use client'

import { Box } from '@/app/components/box/Box';
import { BoxContent } from '@/app/components/box/BoxContent';
import { BoxHeader } from '@/app/components/box/BoxHeader';
import { BoxHeaderItem } from '@/app/components/box/BoxHeaderItem';
import { Button } from '@/app/components/button/Button';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { InputTextarea } from 'primereact/inputtextarea';
import { FileUpload } from 'primereact/fileupload';
import { useRouter } from 'next/navigation';

export default function CadastrarProduto() {
    const router = useRouter();

    return (
        <Box>
            <BoxHeader>
                <BoxHeaderItem isActive={true} isDisabled={true}>
                    <h2>Cadastrar produto</h2>
                </BoxHeaderItem>
            </BoxHeader>
            <BoxContent>
                <form className='flex flex-col'>
                    <div className='flex justify-between mb-5'>
                        <div className="flex flex-col gap-2 w-3/5">
                            <label htmlFor="name">Nome</label>
                            <InputText id="name" aria-describedby="name-help" size="small"
                            placeholder='Nome do produto'/>
                        </div>

                        <div className="flex flex-col gap-2 w-2/6">
                            <label htmlFor="price">Preço</label>
                            <InputNumber id="price" aria-describedby="price-help"
                            placeholder='R$ 0,0' mode='currency' currency='BRL' locale='pt-BR'/>
                        </div>
                    </div>

                    <div className='flex justify-between mb-7'>
                        <div className="flex flex-col gap-2 w-3/5">
                            <label htmlFor="description">Descrição</label>
                            <InputTextarea id="description" aria-describedby="description-help"
                            placeholder='Descrição' rows={5}/>
                        </div>

                        <div className="flex flex-col gap-2 w-2/6">
                            <label htmlFor="image">Imagem</label>
                            <FileUpload id="image" mode="basic" chooseLabel="Escolher"
                            uploadLabel="Enviar" cancelLabel="Cancelar" customUpload={true}/>
                        </div>
                    </div>

                    <div className='flex gap-5 self-end'>
                        <Button size='small' btnStyle='btnSecondary' type='button' onClick={() => {
                            router.push('/cardapio');
                        }}>Voltar</Button>
                        <Button size='small' btnStyle='btnPrimary'>Cadastrar</Button>
                    </div>
                </form>
            </BoxContent>
        </Box>
    );
}
