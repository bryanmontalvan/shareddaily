import CarForm from '../lib/CarForm.js'
import SearchForm from '../lib/SearchForm.js'

import { MantineProvider } from '@mantine/core';

export default function Home() {
  return (
    <MantineProvider theme={{ fontFamily: 'Open Sans'}}>
        <CarForm />
        <SearchForm />
    </MantineProvider>
  )
}
