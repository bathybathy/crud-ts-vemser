export interface EnderecoDTO {
  cep: string;
  logradouro: string;
  bairro: string;
  localidade?: string;
  uf?: string;
  tipo: string;
  pais?: string;
  complemento?: string;
  numero?: any;
  cidade?: string;
  estado?: string;
}
