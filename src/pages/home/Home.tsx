import { useEffect, useState } from 'react';
import { 
    Card,
    Container,
    CardTitle,
    StyledP,
    StyledSpan,
    DivText
 } from './Home.styles'
 import api from '../../api';
 import { PessoaDTO } from '../../model/PessoaDTO';
 import Notiflix from 'notiflix';
 import Error from '../../components/Error';


function Home() {

  const [users, setUsers] = useState<PessoaDTO["pessoa"]>([]);
  const [lista, setLista] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(()=>{
    getUsers();
    listAddress();
    setLoading(false);
  },[])

  const getUsers = async () => {
    try {
      const { data } = await api.get<PessoaDTO["pessoa"]>("/pessoa");
      setUsers(data);
      Notiflix.Loading.remove();
    } catch (error) {
      console.log(error);
      <Error />
    }
  };
  const listAddress = async () => {
    try {
      const { data } = await api.get("/endereco");
      setLista(data);
    } catch (error) {
      console.log(error);
      <Error />
    }
  };
  
  if(loading){
    Notiflix.Loading.hourglass();
  }

  return (
    <Container>
        <Card>
            <CardTitle>Usuários</CardTitle>
            <DivText><StyledP>Numéro de usuários cadastrados:</StyledP><StyledSpan>{users.length}</StyledSpan></DivText>
        </Card>
        <Card>
            <CardTitle>Endereço</CardTitle>
            <DivText><StyledP>Número de endereços cadastrados:</StyledP><StyledSpan>{lista.length}</StyledSpan></DivText>
        </Card>
    </Container>
  )
}

export default Home