// ---- React
import React from 'react';
import { useState, useCallback } from 'react';
import { Heart } from 'tabler-icons-react';
// ---- Mantine Hooks and Core 
import {
  Grid,
  Container,
  Input,
  Card,
  Image,
  Text,
  Badge,
  Button,
  Group,
  useMantineTheme
} from '@mantine/core';

export default function CarForm() {
  const [carObj, setCarObj] = useState([]);
  const [liked, setLiked] = useState(null);

  const debounce = (func) => {
    let timer;
    return function (...args) {
      const context = this;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        func.apply(context, args);
      }, 500);
    };
  };

  const search = async (event) => {
    const q = event.target.value;

    if (q.length > 2) {
      const params = new URLSearchParams({ q });
      const res = await fetch('/api/search?' + params);

      const result = await res.json();
      setCarObj(result['cars']);
    }
  };

  // Mantine
  const theme = useMantineTheme();

  const secondaryColor = theme.colorScheme === 'dark'
    ? theme.colors.dark[1]
    : theme.colors.gray[7];

  // Debounce
  const debouncedSearch = useCallback(debounce(search), []);

  // Handle like
  const handleLike = (carObj, selectedCarID) => {
    // console.log(carObj)
    // Iterate through and find matching carID
    for (let i = 0; i < carObj.length; i++) {
      console.log(carObj[i])
      if (carObj[i].entityId == selectedCarID) {
        // handleUpdateLike(carObj[i]);
        carObj[i].likes += 1;
        console.log(carObj[i])
      }
    }
    // console.log(selectedCarID);
  }

  const handleUpdateLike = async (obj) => {
    event.preventDefault();


    fetch('/api/updatelike', {
      body: JSON.stringify(obj),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'PATCH',
    }).then(result => {
      console.log('Sucess', result)
    }).catch(error => {
      console.error('Error: Vehicle entry unsuccessful', error)
    })
    // const result = await res.json(); // This is to print the json object
  };

  return (
    <>
      <Container my="md" size={400}>
        <Text size="lg" align="center" my="md">
          Search for a car
        </Text>
        <Input
          onChange={debouncedSearch}
          type="text"
          radius="md"
          mx="xs"
          placeholder='Search here'
        />
      </Container>
      <Grid my="sm" px="xs">
        {carObj.map((hit) => (
          <Grid.Col xs={2} key={hit.entityId} >
            <Card shadow="sm" p="lg">
              <Card.Section>
                <Image src={hit.image} height={160} alt="Car Image" />
              </Card.Section>

              <Group position="apart" style={{ marginBottom: 5, marginTop: theme.spacing.sm }}>
                <Text weight={600}>{hit.user}</Text>
                <Badge color="blue" variant="light" style={{ fontSize: "15px" }}>
                  {hit.year}
                </Badge>
              </Group>

              <Group position="apart" style={{ marginBottom: 5, marginTop: theme.spacing.sm }}>
              <Text size="sm" style={{ color: secondaryColor, lineHeight: 1.5 }}>
                <b>Make:</b> {hit.make} <br />
                <b>Model:</b> {hit.model}
              </Text>
              <Button 
                size="sm"
                radius="lg"
                color="pink"
                leftIcon={<Heart size={12}/>}
                onClick={ () => handleLike(carObj, hit.entityId)}
                >
                {hit.likes}
              </Button>
              </Group>
            </Card>
          </Grid.Col>
        ))}
      </Grid>
    </>
  );
}