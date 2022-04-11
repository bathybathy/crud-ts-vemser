import axios from "axios";
import { Formik, Form, Field, useFormik } from "formik";
import { useEffect, useState } from "react";
import api from "../../api";
import { EnderecoDTO } from "../../model/EnderecoDTO";
import { useRef } from "react";
import * as Yup from 'yup';
import Error from "../../components/Error";

import {
  ContainerForm,
  BsPencilStyled,
  ContainerAddressPage,
  AiOutlineDeleteStyled,
  StyledForm, 
  DivGrid, 
  DivInputs, 
  DivCenter,
  LabelCep, 
  StyledSelect,
  DivErro
} from "./Address.styles";
import {
  ContainerList,
  DivTitle,
  TdNome,
  Table,
  Tr,
  Td,
  Th,
  TitleUsers,
  ContainerUsers,
} from "../users/Users.styles";
import InputMask from "react-input-mask";
import Notiflix from "notiflix";
import { DivForm, ButtonForm, InputForm, LabelForm } from "../login/Login.styles";

export const Address: React.FC<{}> = () => {
  const [lista, setLista] = useState<any>([]);
  const [atualizar, setAtualizar] = useState<boolean>(false);
  const [idUpdate, setIdUpdate] = useState<number>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    listAddress();
    setLoading(false);
  }, []);

  // refreshes page
  const refresh = () => {
    window.location.reload();
  };

  // deletes address from list
  const deleteAddress = async (id: number) => {
    Notiflix.Confirm.show(
      "Confirmação",
      "Você deseja deletar esse endereço?",
      "Sim", 
      "Não",
      async () => {
        try {
          const { data } = await api.delete(`/endereco/${id}`);
          refresh();
        } catch (error) {
          console.log(error);
          <Error />
        }
      })
  };

  //gets one address from api to set it up on inputs
  const getAddressById = async (id: number) => {
    try {
      const { data } = await api.get(`endereco/${id}`);
      formikProps.setFieldValue("logradouro", data.logradouro);
      formikProps.setFieldValue("localidade", data.cidade);
      formikProps.setFieldValue("uf", data.estado);
      formikProps.setFieldValue("complemento", data.complemento);
      formikProps.setFieldValue("numero", data.numero);
      formikProps.setFieldValue("cep", data.cep);
      formikProps.setFieldValue("pais", data.pais);
    } catch (error) {
      console.log(error);
      <Error />
    }
  };

  // setups the update process
  const setupUpdateAddress = (id: number) => {
    getAddressById(id);
    setAtualizar(true);
    setIdUpdate(id);
  };
  // sends the updated address to api
  const updateAddress = async () => {
    const updatedAddress = {
      cep: formikProps.values.cep.replaceAll("-", ""),
      cidade: formikProps.values.localidade,
      complemento: formikProps.values.complemento,
      estado: formikProps.values.uf,
      logradouro: formikProps.values.logradouro,
      pais: formikProps.values.pais,
      tipo: formikProps.values.tipo,
      numero: parseInt(formikProps.values.numero),
      idEndereco: idUpdate,
    };
    try {
      const { data } = await api.put(`/endereco/${idUpdate}`, updatedAddress);
      Notiflix.Notify.success("Cadastro editado com sucesso");
      formikProps.resetForm();
      setAtualizar(false);
      refresh();
    } catch (error) {
      console.log(error);
      <Error />
    }
  };

  // lists all addresses
  const listAddress = async () => {
    try {
      const { data } = await api.get("/endereco");
      setLista(data);
      Notiflix.Loading.remove();
    } catch (error) {
      console.log(error);
      <Error />
    }
  };

  // gets address from cep api
  const getAddress = async (values: string) => {
    try {
      const { data } = await axios.get(
        `https://viacep.com.br/ws/${values}/json/`
      );
      formikProps.setFieldValue("logradouro", data.logradouro);
      formikProps.setFieldValue("bairro", data.bairro);
      formikProps.setFieldValue("localidade", data.localidade);
      formikProps.setFieldValue("uf", data.uf);
    } catch (error) {
      console.log(error);
      <Error />
    }
  };

  // posts a new address to the api
  const postAddress = async (values: EnderecoDTO) => {
    const newAddress = {
      cep: formikProps.values.cep.replaceAll("-",""),
      cidade: formikProps.values.localidade,
      complemento: formikProps.values.complemento,
      estado: formikProps.values.uf,
      logradouro: formikProps.values.logradouro,
      pais: formikProps.values.pais,
      tipo: formikProps.values.tipo,
      numero: parseInt(formikProps.values.numero),
    };
    try {
      const { data } = await api.put("/endereco/650", newAddress);
      Notiflix.Notify.success("cadastro realizado com sucesso");
      formikProps.resetForm();
      refresh();
    } catch (error) {
      console.log(error);
      <Error />
    }
  };

  // validação
  const SignupSchema = Yup.object().shape({
    logradouro: Yup.string()
      .min(3, 'Muito curto')
      .max(50, 'Muito longo')
      .required('Campo obrigatório'),
      cep: Yup.string()
      .min(9, 'muito curto')
      .max(9, 'muito longo')
      .required('Campo obrigatório'),
      bairro: Yup.string()
      .min(3, 'muito curto')
      .max(50, 'muito longo')
      .required('Campo obrigatório'),
      localidade: Yup.string()
      .min(3, 'muito curto')
      .max(30, 'muito longo')
      .required('Campo obrigatório'),
      numero: Yup.string()
      .min(1, 'muito curto')
      .max(10, 'muito longo')
      .required('Campo obrigatório'),
      complemento: Yup.string()
      .min(1, 'muito curto')
      .max(10, 'muito longo'),
      uf: Yup.string()
      .min(2, 'muito curto')
      .max(2, 'muito longo')
      .required('Campo obrigatório'),
      pais: Yup.string()
      .min(3, 'muito curto')
      .max(40, 'muito longo')
      .required('Campo obrigatório'),
      
  });

  const formikProps = useFormik({
    initialValues: {
      cep: "",
      logradouro: "",
      bairro: "",
      localidade: "",
      uf: "",
      pais: "",
      tipo: "RESIDENCIAL",
      complemento: "",
      numero: "",
    },
    onSubmit: async (values: any, actions: any) => {
      if (!atualizar) {
        await postAddress(values);
      }
      if (atualizar) {
        await updateAddress();
      }
      actions.setSubmitting(false);
    }, validationSchema: SignupSchema
  });

  if(loading){
    Notiflix.Loading.hourglass();
  }

  return (
    <ContainerAddressPage>
      <ContainerUsers>
        <DivTitle>
          <TitleUsers>Endereços</TitleUsers>
        </DivTitle>
        <ContainerForm>
          <StyledForm onSubmit={formikProps.handleSubmit}>
            <DivCenter>
              <LabelCep htmlFor="cep">CEP:</LabelCep>
              <InputForm
                as={InputMask}
                mask="99999-999"
                id="cep"
                name="cep"
                placeholder="Digite seu cep"
                value={formikProps.values.cep}
                onChange={formikProps.handleChange}
              />
              {formikProps.errors.cep && formikProps.touched.cep ? (
                <DivErro>{formikProps.errors.cep}</DivErro>
                ) : null}

              <ButtonForm
                type="button"
                onClick={() => getAddress(formikProps.values.cep)}
              >
                Buscar
              </ButtonForm>
            </DivCenter>

            <DivInputs>
            <DivGrid>
            <DivForm>
              <LabelForm htmlFor="logradouro">Logradouro:</LabelForm>
              <InputForm
                id="logradouro"
                name="logradouro"
                placeholder="Digite seu logradouro"
                value={formikProps.values.logradouro}
                onChange={formikProps.handleChange}
              />
              {formikProps.errors.logradouro && formikProps.touched.logradouro ? (
                <DivErro>{formikProps.errors.logradouro}</DivErro>
                ) : null}
            </DivForm>

            <DivForm>
              <LabelForm htmlFor="numero">Número:</LabelForm>
              <InputForm
                id="numero"
                name="numero"
                placeholder="Digite o número da sua residência"
                value={formikProps.values.numero}
                onChange={formikProps.handleChange}
              />
              {formikProps.errors.numero && formikProps.touched.numero ? (
                <DivErro>{formikProps.errors.numero}</DivErro>
                ) : null}
            </DivForm>

            <DivForm>
              <LabelForm htmlFor="complemento">Complemento:</LabelForm>
              <InputForm
                id="complemento"
                name="complemento"
                placeholder="Digite o seu complemento"
                value={formikProps.values.complemento}
                onChange={formikProps.handleChange}
              />
              {formikProps.errors.complemento && formikProps.touched.complemento ? (
                <DivErro>{formikProps.errors.complemento}</DivErro>
                ) : null}
            </DivForm>

            <DivForm>
              <LabelForm htmlFor="bairro">Bairro:</LabelForm>
              <InputForm
                id="bairro"
                name="bairro"
                placeholder="Digite seu bairro"
                value={formikProps.values.bairro}
                onChange={formikProps.handleChange}
              />
              {formikProps.errors.bairro && formikProps.touched.bairro ? (
                <DivErro>{formikProps.errors.bairro}</DivErro>
                ) : null}
            </DivForm>
            </DivGrid>

            <DivGrid>
            <DivForm>
              <LabelForm htmlFor="localidade">Cidade:</LabelForm>
              <InputForm
                id="localidade"
                name="localidade"
                placeholder="Digite sua localidade"
                value={formikProps.values.localidade}
                onChange={formikProps.handleChange}
              />
              {formikProps.errors.localidade && formikProps.touched.localidade ? (
                <DivErro>{formikProps.errors.localidade}</DivErro>
                ) : null}
            </DivForm>

            <DivForm>
              <LabelForm htmlFor="uf">Estado:</LabelForm>
              <InputForm
                id="uf"
                name="uf"
                placeholder="Digite a sigla do seu estado"
                value={formikProps.values.uf}
                onChange={formikProps.handleChange}
              />
              {formikProps.errors.uf && formikProps.touched.uf ? (
                <DivErro>{formikProps.errors.uf}</DivErro>
                ) : null}
            </DivForm>

            <DivForm>
              <LabelForm htmlFor="pais">País:</LabelForm>
              <InputForm
                id="pais"
                name="pais"
                placeholder="Digite o seu país"
                value={formikProps.values.pais}
                onChange={formikProps.handleChange}
              />
              {formikProps.errors.pais && formikProps.touched.pais ? (
                <DivErro>{formikProps.errors.pais}</DivErro>
                ) : null}
            </DivForm>

            <DivForm>
              <LabelForm htmlFor="tipo">Tipo de contato:</LabelForm>
              <StyledSelect
                name="tipo"
                value={formikProps.values.tipo}
                onChange={formikProps.handleChange}
              >
                <option value="RESIDENCIAL">Residencial</option>
                <option value="COMERCIAL">Comercial</option>
              </StyledSelect>
            </DivForm>
            </DivGrid>
            </DivInputs>

            <DivCenter>
            <ButtonForm type="submit">Enviar</ButtonForm>
            </DivCenter>
          </StyledForm>
        </ContainerForm>
        <ContainerUsers>
          <DivTitle>
            <TitleUsers>Lista de endereços</TitleUsers>
          </DivTitle>
          <ContainerList>
            <Table>
              <thead>
                <Tr>
                  <Th>Rua:</Th>
                  <Th>Número:</Th>
                  <Th>Cep:</Th>
                  <Th>Cidade:</Th>
                  <Th>Estado:</Th>
                  <Th>País:</Th>
                  <Th>Atualizar:</Th>
                  <Th>Deletar:</Th>
                </Tr>
              </thead>
              <tbody>
                {lista.map((e: any) => (
                  <Tr key={e.idEndereco}>
                    <TdNome>{e.logradouro}</TdNome>
                    <Td>{e.numero}</Td>
                    <Td>{e.cep}</Td>
                    <Td>{e.cidade}</Td>
                    <Td>{e.estado}</Td>
                    <Td>{e.pais}</Td>
                    <Td>
                      <BsPencilStyled
                        onClick={() => setupUpdateAddress(e.idEndereco)}
                      />
                      </Td>
                      <Td>
                      <AiOutlineDeleteStyled
                        onClick={() => deleteAddress(e.idEndereco)}
                      />
                    </Td>
                  </Tr>
                ))}
              </tbody>
            </Table>
          </ContainerList>
        </ContainerUsers>
      </ContainerUsers>
    </ContainerAddressPage>
  );
};

export default Address;
