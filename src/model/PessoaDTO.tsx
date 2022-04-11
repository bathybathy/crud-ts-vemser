import { contatosDTO } from "./ContatosDTO";

export interface PessoaDTO{
    pessoa:{
        idPessoa: number;
        nome: string;
        dataNascimento: string;
        cpf: string;
        email: string;
        contatosList?: contatosDTO;
    }[]
}

