import {
  Box,
  Flex,
  Heading,
  Grid,
  Spacer,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";

import pixelArtImage from "./assets/pixel_art_bg.png";
import { useEffect, useState, useRef } from "react";

import PokeCard from "./components/PokeCard";

import { v4 as uuidv4 } from "uuid";

function App() {
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);

  function createSeen() {
    let newObj = {};
    for (let i = 1; i < 152; i++) {
      newObj[i] = false;
    }

    return newObj;
  }

  const [seen, setSeen] = useState(createSeen);
  let pokemonData = useRef({});

  const [cards, setCards] = useState([]);

  let cardClick = (index) => () => {
    if (seen[index] == true) {
      onOpen();
    } else {
      seen[index] = true;
      setScore(prev => prev + 1);
    }

    createCards(8);
  };

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20")
      .then((res) => res.json())
      .then((data) => {
        let newCards = [];
        for (let i = 0; i < 8; i++) {
          let newIndex = getRandomInt(1, 20);
          newCards.push({
            index: newIndex,
            handleClick: cardClick,
            id: uuidv4(),
            name: data["results"][newIndex - 1]["name"],
          });
        }

        pokemonData.current = data;
        setCards(newCards);
      })
      .catch((e) => console.log(e.message));
  }, []);

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function createCards(n) {
    let newCards = [];
    for (let i = 0; i < n; i++) {
      let newIndex = getRandomInt(1, 20);
      newCards.push({
        index: newIndex,
        handleClick: cardClick,
        id: uuidv4(),
        name: pokemonData.current["results"][newIndex - 1]["name"],
      });
    }

    setCards(newCards);
  }

  function resetGame() {
    createCards(8);
    setScore(0);
    setSeen(createSeen());
    onClose();
  }

  useEffect(() => {
    if (score > best) {
      setBest(score);
    }
    return () => {};
  }, [score, best]);

  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box
      backgroundImage={pixelArtImage}
      backgroundPosition={"center"}
      bgSize={"cover"}
      width={"100vw"}
      height={"100vh"}
      padding={12}
    >
      <Flex flexDir="column" align={"center"} gap={32}>
        <Flex
          justifyContent={"center"}
          width={"100%"}
          alignContent={"center"}
          color={"gray.700"}
          wrap={"wrap"}
        >
          <Heading as={"h1"} size={"2xl"} whiteSpace={"nowrap"}>
            {" "}
            Pokemon Memory Game{" "}
          </Heading>
          <Spacer />
          <Flex gap={16}>
            <Heading>Score: {score}</Heading>
            <Heading>Best: {best}</Heading>
          </Flex>
        </Flex>
        <Grid
          templateColumns={{
            base: "1fr",
            sm: "repeat(2, 1fr)",
            xl: "repeat(4, 1fr)",
          }}
          gap={{ base: 6, lg: 16 }}
        >
          {cards.map((card) => (
            <PokeCard
              key={card.id}
              index={card.index}
              handleClick={card.handleClick}
              name={card.name}
            />
          ))}
        </Grid>
      </Flex>

      <Modal isOpen={isOpen} onClose={resetGame} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize={32}>Game Over!</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={2} align={"left"} fontSize={24}>
              <p>
                <b>Final Score: </b> {score}
              </p>
              <p>
                <b>Best Score: </b> {best}
              </p>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="teal" onClick={resetGame}>
              Play Again
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default App;
