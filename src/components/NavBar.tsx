import { HStack, Image } from '@chakra-ui/react';
import logo from '../assets/logo.webp';
import ColorModeSwitch from './ColorModeSwitch';
import SearchInput from './SearchInput';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <HStack padding='10px'>
      <Link to='/'>
        <Image
          src={logo}
          boxSize={{ base: '40px', md: '60px' }}
          objectFit={{ base: 'contain', md: 'cover' }}
        />
      </Link>
      <SearchInput />
      <ColorModeSwitch />
    </HStack>
  );
};

export default NavBar;
