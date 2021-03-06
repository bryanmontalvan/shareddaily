import React, { useState } from 'react';
import {
  Title,
  Text,
  Container,
  Button,
  NumberInput,
  TextInput,
  Select,
  Group,
  Center,
} from '@mantine/core';

import { showNotification } from '@mantine/notifications';

export default function CarForm() {
  const [submitted, setSubmitted] = useState(false);

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
    }).then(result => {
      setSubmitted(true);
      showNotification({
        title: 'Submitted',
        message: 'Your Vehicle entry has been submitted',
      })
      console.log('Sucess', result)
    }).catch(error => {
      console.error('Error: Vehicle entry unsuccessful', error)
    })
    // const result = await res.json(); // This is to print the json object
  };


  const carList = ['Acura', 'Alfa Romeo', 'Audi', 'BMW', 'Buick', 'Cadillac', 'Chevrolet', 'Chrysler', 'Dodge', 'Fiat', 'Ford', 'GMC', 'Genesis', 'Honda', 'Hyundai', 'Infiniti', 'Jaguar', 'Jeep', 'Kia', 'Land Rover', 'Lexus', 'Lincoln', 'Mazda', 'Mercedes-Benz', 'Mini', 'Mitsubishi', 'Nissan', 'Porsche', 'Ram', 'Subaru', 'Tesla', 'Toyota', 'Volkswagen', 'Volvo'];

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

      {!(submitted) && <form onSubmit={handleSubmit}>
        <TextInput name="user" label="User" placeholder="User" required />
        <Select
          data={carList}
          name="make"
          label="Make"
          placeholder="Honda"
          searchable
          nothingFound="Nothing found"
          required
        />
        <Group mt="sm" >
          <TextInput name="model" label="Model" placeholder="Civic LX" style={{ width: 300 }} required />
          <NumberInput
            name="year"
            label="Car Year"
            placeholder='2019'
            style={{ width: 100 }}
            required
          />
        </Group>
        <TextInput name="image" label="Vehicle Image" placeholder="my-honda-civic.jpg" mt="sm" required />
        <Button
          fullWidth mt="sm"
          type="submit"
        >
          Submit
        </Button>
      </form>}
      {submitted &&
        <Center>
          <Text color="blue" >Thank you submitting! </Text>
        </Center>
      }
    </Container >
  );
}
