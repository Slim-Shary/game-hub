import {
  Card,
  CardBody,
  HStack,
  Heading,
  Image,
  Stack,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import Game from '../entities/Game';
import getCroppedImageUrl from '../services/image-url';
import CriticScore from './CriticScore';
import Emoji from './Emoji';
import PlatfromIconList from './PlatfromIconList';

interface Props {
  game: Game;
}

const GameCard = ({ game }: Props) => {
  return (
    <Card overflow='hidden'>
      <Image src={getCroppedImageUrl(game.background_image)} />
      <CardBody>
        <HStack justifyContent='space-between' marginBottom={3}>
          <PlatfromIconList
            platforms={game.parent_platforms?.map((p) => p.platform)}
          />
          <CriticScore score={game.metacritic} />
        </HStack>
        <Stack>
          <Heading
            _hover={{
              color: 'gray.500',
            }}
            fontSize='2xl'
          >
            <Link to={'/games/' + game.slug}>{game.name}</Link>
          </Heading>
          <Emoji rating={game.rating_top} />
        </Stack>
      </CardBody>
    </Card>
  );
};

export default GameCard;
