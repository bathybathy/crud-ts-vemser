import { useEffect, useState, useContext } from "react";
import { useFormik } from "formik";
import api from "../../api";
import { AuthContext } from "../../context/AuthContext";
import { PessoaDTO } from "../../model/PessoaDTO";
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
} from "./Users.styles";
import {
  ContainerForm,
  BsPencilStyled,
  ContainerAddressPage,
  AiOutlineDeleteStyled,
  DivErro
} from "../address/Address.styles";
import {
  InputForm,
  LabelForm, 
  ButtonForm
} from '../login/Login.styles'
import { DivForm } from "../login/Login.styles";
import * as Yup from 'yup';
import InputMask from 'react-input-mask'
import moment from "moment";
import Notiflix from "notiflix";
import Error from "../../components/Error";

function Users() {
  const [users, setUsers] = useState<PessoaDTO["pessoa"]>([]);
  const [loading, setLoading] = useState(true);
  const [atualizar, setAtualizar] = useState<boolean>(false);
  const [idUpdate, setIdUpdate] = useState<number>();

  useEffect(() => {
    getUsers();
    
  }, []);

  // lists all users
  const getUsers = async () => {
    try {
      const { data } = await api.get<PessoaDTO["pessoa"]>("/pessoa");
      setUsers(data);
      setLoading(false);
      Notiflix.Loading.remove();
    } catch (error) {
      console.log(error);
      <Error />
    }
  };

  // refreshes page
  const refresh = () => {
    window.location.reload();
  };

  // creates new user
  const postNewUser = async (values:any) => {
    let nascimentoEnviar = moment(values.dataNascimento, 'DD-MM-YYYY').format('YYYY-MM-DD');
    let cpfEnviar = formikProps.values.cpf.replaceAll(".", "").replaceAll('-', '');
    const newUser = {
      nome: values.nome,
      dataNascimento: nascimentoEnviar,
      cpf: cpfEnviar,
      email: values.email,
    };
    try {
      const { data } = await api.post("/pessoa", newUser);
      Notiflix.Notify.success("Cadastro realizado com sucesso");
      formikProps.resetForm();
      refresh();
    } catch (error) {
      console.log(error);
      <Error />
    }
  };

  // deletes user
  const deleteUser = async (id: number) => {
    Notiflix.Confirm.show(
      "Confirmação",
      "Você deseja deletar esse usuário?",
      "Sim", 
      "Não",
      async () => {
        try {
          const { data } = await api.delete(`/pessoa/${id}`);
          refresh();
        } catch (error) {
          console.log(error);
          <Error />
        }
      },
    )
    
  };

  // gets one user by their id
  const getUserById = async (id: number) => {
    try {
      const { data } = await api.get(`pessoa/{idPessoa}?idPessoa=${id}`);
      formikProps.setFieldValue("nome", data.nome);
      let nascimentoEnviar = moment(data.dataNascimento, 'YYYY-MM-DD').format('DD-MM-YYYY')
      formikProps.setFieldValue("dataNascimento", nascimentoEnviar);
      formikProps.setFieldValue("cpf", data.cpf);
      formikProps.setFieldValue("complemento", data.complemento);
      formikProps.setFieldValue("email", data.email);
    } catch (error) {
      console.log(error);
      <Error />
    }
  };

  // posts update to api
  const updateUser = async () => {
    let nascimentoEnviar = moment(formikProps.values.dataNascimento, 'DD-MM-YYYY').format('YYYY-MM-DD')
    let cpfEnviar = formikProps.values.cpf.replaceAll(".", "");
    cpfEnviar= cpfEnviar.replaceAll('-', '');
    const updatedUser = {
      nome: formikProps.values.nome,
      cpf: cpfEnviar,
      email: formikProps.values.email,
      dataNascimento: nascimentoEnviar,
      idPessoa: idUpdate,
    };
    try {
      const { data } = await api.put(`/pessoa/${idUpdate}`, updatedUser);
      Notiflix.Notify.success("Cadastro editado com sucesso");
      formikProps.resetForm();
      setAtualizar(false);
      refresh();
    } catch (error) {
      console.log(error);
      <Error />
    }
  };

  // setups the update process
  const setupUpdateUser = (id: number) => {
    getUserById(id);
    setAtualizar(true);
    setIdUpdate(id);
  };

  // validação
  const SignupSchema = Yup.object().shape({
    nome: Yup.string()
      .min(3, 'Muito curto')
      .max(50, 'Muito longo')
      .required('Campo obrigatório'),
      dataNascimento: Yup.string()
      .min(10, 'Data de nascimento inválida')
      .max(10, 'Data de nascimento inválida')
      .required('Campo obrigatório'),
      cpf: Yup.string().required('Campo obrigatório'),
      email: Yup.string()
      .email('E-mail inválido')
      .required('Campo obrigatório'),
  });

  // formik 
  const formikProps = useFormik({
    initialValues: {
      nome: "",
      dataNascimento: "",
      cpf: "",
      email: "",
    },
    onSubmit: async (values: any, actions: any) => {
      if (!atualizar) {
        await postNewUser(values);
      }
      if (atualizar) {
        await updateUser();
      }
      actions.setSubmitting(false);
    },
    validationSchema: SignupSchema
  });

  if (loading) {
    Notiflix.Loading.hourglass();
  }

  return (
    <ContainerAddressPage>
      <ContainerUsers>
        <DivTitle>
          <TitleUsers>Cadastrar Usuário</TitleUsers>
        </DivTitle>
        <ContainerForm>
          <form onSubmit={formikProps.handleSubmit}>
            <DivForm>
              <LabelForm htmlFor="nome">Nome:</LabelForm>
              <InputForm
                id="nome"
                name="nome"
                placeholder="Digite seu nome"
                value={formikProps.values.nome}
                onChange={formikProps.handleChange}
              />
              {formikProps.errors.nome && formikProps.touched.nome ? (
                <DivErro>{formikProps.errors.nome}</DivErro>
                ) : null}
            </DivForm>

            <DivForm>
              <LabelForm htmlFor="dataNascimento">Data de nascimento:</LabelForm>
              <InputForm
                as={InputMask}
                mask="99/99/9999"
                id="dataNascimento"
                name="dataNascimento"
                placeholder="Digite sua data de nascimento"
                value={formikProps.values.dataNascimento}
                onChange={formikProps.handleChange}
              />
              {formikProps.errors.dataNascimento && formikProps.touched.dataNascimento ? (
                <DivErro>{formikProps.errors.dataNascimento}</DivErro>
                ) : null}
            </DivForm>

            <DivForm>
              <LabelForm htmlFor="cpf">CPF:</LabelForm>
              <InputForm
                id="cpf"
                as={InputMask}
                mask="999.999.999-99"
                name="cpf"
                placeholder="Digite o número do seu CPF"
                value={formikProps.values.cpf}
                onChange={formikProps.handleChange}
              />
              {formikProps.errors.cpf && formikProps.touched.cpf ? (
                <DivErro>{formikProps.errors.cpf}</DivErro>
                ) : null}
            </DivForm>

            <DivForm>
              <LabelForm htmlFor="email">E-mail:</LabelForm>
              <InputForm
                id="email"
                name="email"
                placeholder="Digite o seu email"
                value={formikProps.values.email}
                onChange={formikProps.handleChange}
              />
              {formikProps.errors.email && formikProps.touched.email ? (
                <DivErro>{formikProps.errors.email}</DivErro>
                ) : null}
            </DivForm>
            <ButtonForm type="submit">Salvar</ButtonForm>
          </form>
        </ContainerForm>
        <DivTitle>
          <TitleUsers>Lista de usuários</TitleUsers>
        </DivTitle>
        <ContainerList>
          <Table>
            <thead>
              <Tr>
                <Th>Usuário:</Th>
                <Th>Data de Nascimento:</Th>
                <Th>CPF:</Th>
                <Th>Email:</Th>
                <Th>Editar:</Th>
                <Th>Deletar:</Th>
              </Tr>
            </thead>
            <tbody>
              {users.map((pessoa) => (
                <Tr key={pessoa.idPessoa}>
                  <TdNome>{pessoa.nome}</TdNome>
                  <Td>{pessoa.dataNascimento}</Td>
                  <Td>{pessoa.cpf}</Td>
                  <Td>{pessoa.email}</Td>
                  <Td>
                    <BsPencilStyled
                      onClick={() => setupUpdateUser(pessoa.idPessoa)}
                    />
                  </Td>
                  <Td>
                    <AiOutlineDeleteStyled
                      onClick={() => deleteUser(pessoa.idPessoa)}
                    />
                  </Td>
                </Tr>
              ))}
            </tbody>
          </Table>
        </ContainerList>
      </ContainerUsers>
    </ContainerAddressPage>
  );
}

export default Users;
