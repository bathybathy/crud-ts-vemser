import { FaHomeStyled, FaUsersStyled,  FaMapMarkedAltStyled, LiHeader, LinkHeader, UlNav } from './Header.styles'

function Menu() {

  return (
    <nav>
        <UlNav>
            <LiHeader><LinkHeader to='/'><FaHomeStyled />Home</LinkHeader></LiHeader>
            <LiHeader><LinkHeader to='/users'><FaUsersStyled />Usuários</LinkHeader></LiHeader>
            <LiHeader><LinkHeader to='/address'><FaMapMarkedAltStyled />Endereços</LinkHeader></LiHeader>
        </UlNav>
    </nav>
  )
}

export default Menu