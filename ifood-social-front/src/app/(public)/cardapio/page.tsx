'use client'

import { BoxHeader } from "@/components/box/BoxHeader";
import { BoxHeaderItem } from "@/components/box/boxHeaderItem";
import { Box } from "@/components/box/Box";
import { BoxContent } from "@/components/box/BoxContent";
import { useState } from 'react'

export default function Cardapios() {
    const [isCardapio, setIsCardapio ] = useState(true);
    const [isProduto, setIsProduto ] = useState(false);

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
                {isCardapio && <h1>Cardápio</h1>}
                {isProduto && <h1>Produtos</h1>}
            </BoxContent>
        </Box>
    );
}
