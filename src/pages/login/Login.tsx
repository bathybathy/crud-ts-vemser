import { useContext, useEffect, useState } from 'react'
import { Formik, Field, Form, FormikHelpers } from 'formik'
import { useNavigate } from 'react-router-dom'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

import { 
    ContainerBackground, 
    ContainerForm,
    InputForm, 
    ButtonForm,
    DivForm, 
    LabelForm, 
    TitleLogin,
    LogoImg,
    LinkEye,
     } from './Login.styles'
import { LoginDTO } from '../../model/LoginDTO'
import { AuthContext } from '../../context/AuthContext'

function Login() {
    const {handleLogin} = useContext<any>(AuthContext);
    const navigate = useNavigate()
    const [invisivel, setInvisivel] = useState(true)
    const [type, setType] = useState('password')
    
    useEffect(() =>{
        const token = localStorage.getItem('token')
        if(token){
            navigate('/');
        }
    }) 

    const changeType = () =>{
        if(invisivel){
            setType('text');
            setInvisivel(false);
        }
        if(!invisivel){
            setType('password');
            setInvisivel(true);
        }
    }

  return (
    <ContainerBackground>
        <ContainerForm>
            <LogoImg />
            <TitleLogin>Login Vemser</TitleLogin>
            <Formik
                initialValues={{
                    usuario:'',
                    senha:''
                }}
                onSubmit={( 
                    values: LoginDTO,
                    { setSubmitting }: FormikHelpers<LoginDTO>
                ) => {
                    handleLogin(values);
                    setSubmitting(false);
                }
                }>
            
                <Form>
                    <DivForm>
                        <LabelForm htmlFor='usuario'>Usuário</LabelForm>
                        <Field name='usuario' id='usuario' placeholder='Digite seu nome de usuário' as={InputForm} />
                    </DivForm>
                    <DivForm>
                        <LabelForm htmlFor='senha'>Senha: </LabelForm>
                        <Field name='senha' id='senha' type={type} placeholder='Digite sua senha' as={InputForm} />
                        <LinkEye href='#' onClick={() => (changeType())}>
                            {invisivel && (<AiOutlineEye />)}
                            {!invisivel && (<AiOutlineEyeInvisible />)}
                            </LinkEye>
                    </DivForm>
                    <ButtonForm type='submit'>Entrar</ButtonForm>
                </Form>
            </Formik>
        </ContainerForm>
    </ContainerBackground>
  )
}

export default Login