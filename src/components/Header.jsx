import { HStack, Button } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import { FaCartPlus } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const Header = () => {
  const cart = useSelector(state => state.cart);
  return (
    <HStack spacing='auto'  p={'4'} bgColor={'blackAlpha.900'}>
    <HStack spacing='30px' p={'4'} shadow={'base'} bgColor={'blackAlpha.900'}>
      <Button variant={'unstyled'} color={'white'}>
        <Link to='/'>Home</Link>
      </Button>
      <Button variant={'unstyled'} color={'white'}>
        <Link to='/coins'>Coins</Link>
      </Button>
      <Button variant={'unstyled'} color={'white'}>
        <Link to='/exchanges'>Exchanges</Link>
      </Button>
    </HStack>
    <HStack>
      <Button variant={'unstyled'} color={'white'}>
        <Link to='/cart'>{cart.length}<FaCartPlus /></Link>
      </Button>
    </HStack>
    </HStack>
  )
}

export default Header