import CarForm from '../lib/CarForm.js'
import SearchForm from '../lib/SearchForm.js'

import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { Footer } from '../lib/Footer.js';

// Links for footer
const footerlinks = [
  {
    "link": 'https://github.com/bryanmontalvan/shareddaily',
    "label": 'GitHub'
  },
  {
    "link": 'https://mantine.dev/',
    "label": 'Created using Mantine'
  }
]

export default function Home() {
  return (
    <MantineProvider theme={{ fontFamily: 'Open Sans'}}>
      <NotificationsProvider style={{height: '100vh'}}>
        <CarForm />
        <SearchForm />
        <Footer links={footerlinks} />
      </NotificationsProvider>
    </MantineProvider>
  )
}
