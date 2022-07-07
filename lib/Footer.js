import React from 'react';
import { createStyles, Container, Group, Anchor } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  footer: {
    marginTop: 120,
    borderTop: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
      }`,
  },

  inner: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,

    [theme.fn.smallerThan('xs')]: {
      flexDirection: 'column',
    },
  },

  links: {
    color: "white",

    [theme.fn.smallerThan('xs')]: {
      marginTop: theme.spacing.md,
    },
  },
}));

export function Footer() {
  const { classes } = useStyles();

  return (
    <div className={classes.footer}>
      <Container className={classes.inner}>
        <Group className={classes.links} style={{ color: 'white' }}>
          <Anchor
            color="dimmed"
            key='GitHub'
            href='https://github.com/bryanmontalvan/shareddaily'
            size="sm"
            target="_blank"
          >
            GitHub
          </Anchor>
          <Anchor
            color="dimmed"
            key='Mantine'
            href='https://mantine.dev/'
            size="sm"
            target="_blank"
          >
            Created using <b>Mantine</b>
          </Anchor>

        </Group>
      </Container>
    </div>
  );
}