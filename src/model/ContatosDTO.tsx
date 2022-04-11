export interface contatosDTO{
    contato:{
        tipoContato: string;
        numero?: number;
        idContato?: number;
        idPessoa?: number;
        descricao: string;
    }[]
}