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
  VStack
} from "@chakra-ui/react";

import pixelArtImage from "./assets/pixel_art_bg.png";
import { useEffect, useState } from "react";

import PokeCard from "./components/PokeCard";

function App() {
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const [badChoice, setBadChoice] = useState(false);

  function createSeen() {
    let newObj = {};
    for (let i = 1; i < 152; i++) {
      newObj[i] = false;
    }

    return newObj;
  }
  const [seen, setSeen] = useState(createSeen);

  function updateBestScore() {
    if (score > best) {
      setBest(score);
    }
  }
  let cardClick = (index) => () => {
    if (seen.index == true) {
      setBadChoice(true);
    } else {
      seen.index = true;
      setScore(score + 1);
      updateBestScore();
    }
  };

  useEffect(() => {
    return () => {
      console.log("cean");
    };
  }, [badChoice]);

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
          onClick={onOpen}
        >
          <PokeCard index={"3"} handleClick={cardClick} />
          <PokeCard index={"3"} handleClick={cardClick} />
          <PokeCard index={"3"} handleClick={cardClick} />
          <PokeCard index={"3"} handleClick={cardClick} />
          <PokeCard index={"3"} handleClick={cardClick} />
          <PokeCard index={"3"} handleClick={cardClick} />
        </Grid>
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize={32}>Game Over!</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={2} align={"left"} fontSize={24}>
              <p><b>Final Score: </b> {score}</p>
              <p><b>Best Score: </b> {best}</p>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="teal" onClick={onClose}>
              Play Again
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default App;
