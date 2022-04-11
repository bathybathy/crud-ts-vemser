import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"
import Menu from "./Menu"
import { HeaderContainer, HeaderSide, ButtonLogout, LogoImg, LogoDiv } from './Header.styles'

function Header() {
  const {handleLogout, isToken} = useContext<any>(AuthContext)


  return (
    <>
    {isToken && 
      <HeaderSide>
        <HeaderContainer>
          <LogoDiv>
          <LogoImg />
          </LogoDiv>
          <Menu />
          <ButtonLogout onClick={handleLogout}>Logout</ButtonLogout>
        </HeaderContainer>
      </HeaderSide>
    }
    </>
  )
  
}

export default Header