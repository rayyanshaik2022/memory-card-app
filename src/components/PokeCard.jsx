import { Card, CardBody, Image, Center, Heading } from "@chakra-ui/react";

function PokeCard(props) {
    return (
        <Card
            width={"240px"}
            height={"300px"}
            shadow={"md"}
            bgColor={"teal.50"}
            _hover={{cursor:"pointer", transform: "scale(1.05)", transition: "transform 0.15s ease-in-out"}}
            transform={"scale(1.0)"}
            transition={"transform 0.1s ease-in-out"}
            onClick={props.handleClick(props.index)}
          >
            <CardBody>
              <Image
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${props.index}.png`}
                alt="Pokemon Image"
                mb={6}
                draggable="false"
              ></Image>
              <Center>
                <Heading size={"lg"} color={"teal.800"}>Pokemon</Heading>
              </Center>
            </CardBody>
          </Card>
    );
}

export default PokeCard;