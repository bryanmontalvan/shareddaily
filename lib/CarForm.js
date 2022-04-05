import React from 'react';
import {
  TextInput,
  Title,
  Text,
  Container,
  Button,
  NumberInput,
  Group
} from '@mantine/core';

export default function CarForm() {
  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = new FormData(event.target);
    const formData = Object.fromEntries(form.entries());

    const res = await fetch('/api/cars', {
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });

    const result = await res.json();
  };

  return (
    <Container size={420} my={40}>
      <Title
        align="center"
        sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
      >
        SharedDaily
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Share your daily driver{' '}
      </Text>

      <form onSubmit={handleSubmit}>
        <TextInput name="user" label="User" placeholder="User" required/>
        <TextInput name="make" label="Make" placeholder="Honda" mt="sm"  required />
        <Group mt="sm" >
          <TextInput name="model" label="Model" placeholder="Civic LX" style={{width: 300}} required />
          <NumberInput
            name="year"
            label="Car Year"
            placeholder='2019'
            max={2025}
            min={2000}
            style={{width: 100}}
            required
          />
        </Group>
        <TextInput name="image" label="Vehicle Image" placeholder="my-honda-civic.jpg" mt="sm" required />

        <Button fullWidth mt="xl" type="submit">
          Submit
        </Button>
      </form>

    </Container >
  );
}
