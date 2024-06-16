export interface ISection {
  id?: number;
  titulo: string;
  descricao: string;
  numOrdem: number;
  idCardapio: number;
}

export interface IProduct {
  id?: number,
  descricao: string,
  imagem: any,
  preco: number,
  disponibilidade: string,
  categoria: {
    id: number,
    descricao: string,
    imagem: any,
  },
  idEmpreendimento: number,
}

export interface IMenu {
  id?: number,
  descricao: string,
  titulo: string,
  idEmpreendimento: number,
}

export interface IEnterprise {
  id: number,
  descricao: string,
  nome: string,
  endereco: string,
  complemento: string,
  cep: string,
  cidade: {
    id: number,
    descricao: string,
  }
}

export interface ISectionProduct {
  id?: number,
  numOrdem: number,
  idSecao: number,
  idProduto?: number,
  produto?: {
    id: number,
    descricao: string,
    imagem: string,
    preco: number,
    disponibilidade: string,
    categoria: {
      id: number,
      descricao: string,
    }
  }
}
