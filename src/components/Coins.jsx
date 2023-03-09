import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { COIN_GECKO_URL } from '../assets/constants';
import {
	Container,
	HStack,
	VStack,
	Img,
	Heading,
	Text,
	Button,
  RadioGroup,
  Radio,
} from '@chakra-ui/react';
import Loader from './Loader';
import Error from './Error';
import { Link } from 'react-router-dom';

const getCurrencySymbol = ({ currency }) => {
	if (currency === 'inr') {
		return '₹';
	}
	if (currency === 'eur') {
		return '€';
	}
	if (currency === 'usd') {
		return '$';
	}
};


const Coins = () => {
  const [coins, setCoins] = useState([]);
  // const [totalCoins, setTotalCoins] = useState([]);
	const [loader, setLoader] = useState(true);
	const [error, setError] = useState(false);
	const [page, setPage] = useState(1);
	const [currency, setCurrency] = useState('inr');

	const currencySymbol = getCurrencySymbol({ currency });
	// API not working
  // const getAllCoins = async() => {
  //   try {
  //     const coinsListUrl = `${COIN_GECKO_URL}/coins/list`;
  //     const { data = [] } = await axios.get(coinsListUrl);
  //     setTotalCoins(data);
  //     return data;
  //   } catch (error) {
  //     setError(true);
  //   }
  // }
	const changePage = (page) => {
		setPage(page);
		setLoader(true);
	};
  const btns = new Array(132).fill(1);
  // getAllCoins();
	useEffect(() => {
		const coinsUrl = `${COIN_GECKO_URL}/coins/markets?vs_currency=${currency}&page=${page}`;
		const fetchCoins = async () => {
			try {
				const { data = [] } = await axios.get(coinsUrl);
				setCoins(data);
				setLoader(false);
			} catch (error) {
				setError(true);
				setLoader(false);
			}
		};
		fetchCoins();
	}, [currency, page]);

  if (error) {
    return <Error message={'Error while fetching coins!!'}/>
  }
	return (
		<Container maxW={'container.xl'}>
			{loader ? (
				<Loader />
			) : (
				<>
          <RadioGroup value={currency} onChange={setCurrency} p={'8'}>
            <HStack spacing={'4'}>
              <Radio value={'inr'}>INR</Radio>
              <Radio value={'eur'}>EUR</Radio>
              <Radio value={'usd'}>USD</Radio>
            </HStack>
          </RadioGroup>
					<HStack wrap={'wrap'} justifyContent={'space-evenly'}>
						{coins.map((coin) => (
							<CoinCard
								coin={coin}
								key={coin.name}
								currencySymbol={currencySymbol}
							/>
						))}
					</HStack>

					<HStack w={'full'} overflowX={'auto'} p={'8'}>
						{btns.map((item, index) => (
							<Button
								key={index}
								bgColor={'blackAlpha.900'}
								color={'white'}
								onClick={() => changePage(index + 1)}
							>
								{index + 1}
							</Button>
						))}
					</HStack>
				</>
			)}
		</Container>
	);
};

const CoinCard = (props) => {
	const {
		coin: {
			id: coinId = '',
			name = '',
			image = '',
			symbol = '',
			current_price: price = '',
		} = {},
		currencySymbol = '₹',
	} = props;
	return (
		<Link to={`/coin/${coinId}`} href={image}>
			<VStack
				w={'52'}
				shadow={'lg'}
				p={'8'}
				borderRadius={'lg'}
				transition={'all 0.5s'}
				m={'4'}
				css={{
					'&:hover': {
						transform: 'scale(1.1)',
					},
				}}
			>
				<Img src={image} w={'10'} h={'10'} objectFit={'contain'} />
				<Heading size={'md'} noOfLines={1}>
					{symbol}
				</Heading>
				<Text noOfLines={1}>{name}</Text>
				<Text noOfLines={1}>{price ? `${currencySymbol}${price}` : 'NA'}</Text>
			</VStack>
		</Link>
	);
};

export default Coins;
