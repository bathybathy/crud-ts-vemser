import styled from "styled-components";
import logovemser from '../../images/logovemser.png'

export const ContainerBackground = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    background-color: rgba(54, 55, 64, 1);
    min-width: 100%;
    
`;

export const TitleLogin = styled.h1`
    font-size: 24px;
    color: rgba(37, 39, 51, 1);
;
`;
export const DivForm = styled.div`
    display:flex;
    flex-direction: column;
    width: 300px;
    margin: 20px 0;
    gap: 10px;
    position: relative;
`;

export const ContainerForm = styled.div`
    display: flex;
    flex-direction: column;
    height: 480px;
    width: 300px;
    background-color: #FFF;
    padding: 30px;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
`

export const LabelForm = styled.label`
    color: rgba(159, 162, 180, 1);
`

export const InputForm = styled.input`
    color: #4B506D;
    background: #FCFDFE;
    border: 1px solid #F0F1F7;
    border-radius: 8px;
    padding: 3px;
    height: 30px;
    outline-color: #c6c6ca;

    ::placeholder{
        color: rgba(159, 162, 180, 1);
        padding: 10px;
        font-size: 16px;
    }
`

export const ButtonForm = styled.button`
    background-color: #3751FF;
    border-radius: 8px;
    box-shadow: 0px 4px 12px rgba(55, 81, 255, 0.24);
    color: #FFF;
    height: 50px;
    width: 300px;
    border: 1px #3751FF solid;
    :hover{
        cursor: pointer;
    }
`

export const LogoImg = styled.img.attrs({
    src: `${logovemser}`
  })`
    width: 80px;
  `;

export const LinkEye = styled.a`
    color: rgba(159, 162, 180, 1);
    position: absolute;
    top: 40px;
    right: 20px;
    z-index: 0;
    font-size: 20px;
`
  