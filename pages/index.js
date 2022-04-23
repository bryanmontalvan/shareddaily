import CarForm from '../lib/CarForm.js'
import SearchForm from '../lib/SearchForm.js'

import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { Footer } from '../lib/Footer.js';


export default function Home() {
  return (
    <MantineProvider theme={{ fontFamily: 'Open Sans'}}>
      <NotificationsProvider >
        <CarForm />
        <SearchForm />
        <Footer/>
      </NotificationsProvider>
    </MantineProvider>
  )
}
