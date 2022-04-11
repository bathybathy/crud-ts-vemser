import styled from "styled-components";
import { AiOutlineDelete } from 'react-icons/ai';
import { BsPencil } from 'react-icons/bs';

export const ContainerAddress = styled.div`
    width: 1000px;
`
export const ContainerListAddress = styled.div`
    width: 1000px;
`

export const ContainerAddressPage = styled.div`
    display: flex;
    width: 1000px;
    margin-left: 50px;
    
`
export const AiOutlineDeleteStyled = styled(AiOutlineDelete)`
    font-size: 20px;
    :hover{
        color: red;
        cursor: pointer;
    }
`
export const BsPencilStyled = styled(BsPencil)`
font-size: 20px;
    :hover{
        color: green;
        cursor: pointer;
    }
`
export const ContainerForm = styled.div`
    display: flex;
    flex-direction: column;
    width: 1000px;
    border: 1px solid rgba(223, 224, 235, 1); 
    border-radius: 8px;
    justify-content: center;
    align-items: center;
    margin-bottom: 30px;
    padding: 30px 0;
    * >{
    color: rgba(54, 55, 64, 1);
    }
`
export const StyledForm = styled.form`
    width:auto;
`
export const DivGrid = styled.div`
    display: flex;
    flex-direction: column;
    > * {
        margin: 15px;
    }
    justify-content: space-between;
    margin-right: 20px;
    
`
export const DivInputs = styled.div`
    display: flex;
`
export const DivCenter = styled.div`
    display: flex;
    flex-direction: column;
    text-align: left;
    margin: 0 auto; 
    width: 300px;
    > *{
        margin-bottom: 10px;
    }
`
export const LabelCep = styled.label`
    display: flex;
    align-items: left;
    justify-content: left;
    color: rgba(159, 162, 180, 1);
`
export const StyledSelect = styled.select`
    color: #4B506D;
    background: #FCFDFE;
    border: 1px solid #F0F1F7;
    border-radius: 8px;
    padding: 3px;
    height: 30px;
    outline-color: #c6c6ca;
    height: 40px;

    > *{
        color: rgba(159, 162, 180, 1);
        padding: 10px;
        font-size: 16px;
    }
`
export const DivErro = styled.div`
    color: red;
    font-weight: bold;
`

