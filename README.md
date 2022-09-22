# Game Recommender

## Development Setup

Need to create a `.env` and a `.env.docker` file that contains three values:

```
POSTGRES_USER
POSTGRES_PASSWORD
DATABASE_URL
```

`DATABASE_URL` should contain `postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@127.0.0.1:5432/gamrec` in `.env` (pre fillout the user and password for the time being)

and

`DATABASE_URL` should contain `postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@db/gamrec` in `.env.docker`