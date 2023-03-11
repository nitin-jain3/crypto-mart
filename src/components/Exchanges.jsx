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
} from '@chakra-ui/react';
import Loader from './Loader';
import Error from './Error';


const Exchanges = () => {
	const [exchanges, setExchanges] = useState([]);
	const [loader, setLoader] = useState(true);
	const [error, setError] = useState(false);

	useEffect(() => {
		const exchangesUrl = `${COIN_GECKO_URL}/exchanges?per_page=20`;
		const fetchExchanges = async () => {
			try {
        const { data = [] } = await axios.get(exchangesUrl);
        setExchanges(data);
        setLoader(false);
			} catch (error) {
				setError(true);
				setLoader(false);
			}
      };
      fetchExchanges();
	}, []);

  if (error) {
    return <Error message={'Error while fetching exchanges!!'}/>
  }

	return (
		<Container maxW={'container.xl'}>
			{loader ? (
				<Loader />
			) : (
				<>
					<HStack wrap={'wrap'} justifyContent={'space-evenly'}>
						{exchanges.map((exchange) => (
							<ExchangeCard exchange={exchange} key={exchange.name} />
						))}
					</HStack>
				</>
			)}
		</Container>
	);
};

const ExchangeCard = (props) => {
	const {
		exchange: { url = '', name = '', image = '', trust_score_rank = '' } = {},
	} = props;
	return (
		<a href={url} target={'blank'}>
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
					{trust_score_rank}
				</Heading>
				<Text noOfLines={1}>{name}</Text>
			</VStack>
		</a>
	);
};

export default Exchanges;
