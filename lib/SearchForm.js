// ---- React
import React from 'react';
import { useState, useCallback } from 'react';
// ---- Mantine Hooks and Core 
import {
  Grid,
  Container,
  Input,
  Card,
  Image,
  Text,
  Badge,
  Group,
  useMantineTheme,
  Select
} from '@mantine/core';

export default function CarForm() {
  const [carObj, setCarObj] = useState([]);
  const [value, setValue] = useState([]);

  const search = async (event) => {
    const q = event.target.value;

    if (q.length > 2) {
      const params = new URLSearchParams({ q });
      const res = await fetch('/api/search?' + params);

      const result = await res.json();
      setCarObj(result['cars']);
    }
  };

  // ---- Debounce
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

  const debouncedSearch = useCallback(debounce(search), []);

  // ---- Mantine
  const theme = useMantineTheme();

  const secondaryColor = theme.colorScheme === 'dark'
    ? theme.colors.dark[1]
    : theme.colors.gray[7];

  return (
    <>
      <Container my="md" size={500}>
        <Text size="lg" align="center" my="md">
          Search for a car
        </Text>
        <Group position='center'>
          <Input
            style={{ width: 300 }}
            placeholder='Search here'
            type="text"
            radius="md"
            onChange={debouncedSearch}
          />
          <Select
            style={{ width: 150 }}
            placeholder="Sort By"
            value={value}
            onChange={setValue}
            data={[
              { value: 'datenewtoold', label: 'Date added - Newest to Oldest' },
              { value: 'dateoldtonew', label: 'Date added - Oldest to Newest' },
              { value: 'yearnewtoold', label: 'Year - New to Old' },
              { value: 'yearoldtonew', label: 'Year - Old to New' },
            ]}
          />
        </Group>
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

              <Text size="sm" style={{ color: secondaryColor, lineHeight: 1.5 }}>
                <b>Make:</b> {hit.make} <br />
                <b>Model:</b> {hit.model}
              </Text>
            </Card>
          </Grid.Col>
        ))}
      </Grid>
    </>
  );
}