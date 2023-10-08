# README

## Creating the app

```bash 
yarn create next-app
```

![Creating the app](./init.png)

- We want to use typescript - typescript > javascript.
- ESLINT - consistent linting for all of us.
- Tailwind CSS - easier atomic styling.
- Don't use src dir - we'll use the app dir.
- Let's use the app router.
- No need to customize the default import alias. (I chose yes by accident)

### Prettier

Let's add prettier as a dev dependency.

``` bash
yarn add -D prettier@2.8.8 eslint-config-prettier prettier-plugin-tailwindcss@3.3.2
```

Modify the `.eslintrc.json` so it contains this instead.

```json
{
  "extends": ["next/core-web-vitals", "prettier"]
}
```

Now create `.prettierrc.json` with following content.

``` json
{
  "trailingComma": "es5",
  "semi": true,
  "tabWidth": 2,
  "singleQuote": true,
  "jsxSingleQuote": true,
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

Now to package.json also add this snippet in scripts. This allows us to run `yarn format` and format the project.

``` json
"scripts": {
  ...
  "format": "prettier --check --ignore-path .gitignore .",
  "format:fix": "prettier --write --ignore-path .gitignore ."
}
```

#### VSCode

Install `Prettier - Code formatter` extension.

Now setup for automatic code formatting.

Add this to your settings.json...?

```json-with-comments
// Set the default
"editor.formatOnSave": false,
```

You will also want to install `Prisma` for `.prisma` files.

#### Neovim

Follow the guide on [prettier.nvim](https://github.com/MunifTanjim/prettier.nvim).

Follow the guide on [vim-prisma](https://github.com/prisma/vim-prisma) or
You can also install prisma through `Mason` and then list `prismals` as your language server 😉. 

# Prisma

## Initialising prisma

Add prisma as a dev dependency.

``` bash
yarn add -D prisma
```

Initialise prisma.

``` bash
npx prisma init --datasource-provider sqlite
```

Add these models to `prisma/schema.prisma`. We will also modify the database url from `env(DATABASE_URL)` to `file:./dev.db`.

``` prisma
model User {
  id    Int     @id @default(autoincrement())
  email String  @unique
  name  String?
  posts Post[]
}

model Post {
  id        Int     @id @default(autoincrement())
  title     String
  content   String?
  published Boolean @default(false)
  author    User    @relation(fields: [authorId], references: [id])
  authorId  Int
}
```


Now to sync your changes to models you made in the file to the database, you'll need to run a migration.

``` prisma
npx prisma migrate dev --name init
```

You can check if your models have been created through the GUI

``` bash 
npx prisma studio
```

We will now install prisma client to access our database from Next.js

``` bash
yarn add @prisma/client
```

By default a new prisma client is created on every migration but we can manually generate it to keep up to date.

``` bash
npx prisma generate
```

## Creating a PrismaClient

We want only a single instance of `PrismaClient` that you can import to any file where its needed. Let's create a file `lib/prisma.ts`.

``` bash
mkdir lib && touch lib/prisma.ts
```

``` typescript
import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export default prisma;
```

We have only one prisma instance if running locally, but many instances when running in production.

Now you can import it in your files using

``` typescript
import prisma from '@/lib/prisma';
```

# NextAuth

Lets now install and integrate NextAuth. Docs are using nextjs 12 so you'll need to follow below.

``` bash
yarn add next-auth @auth/prisma-adapter
```

We need to create to variables in your `.env` file
- NEXTAUTH_SECRET
Create it using `openssl rand -base64 32`. It'll be used for encoding.
- NEXTAUTH_URL

So your `.env` file should have

```
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="LFSdf9HOftNtxyhJseKqVQcuFQNzErF+ReIl8+exFjw="
```

## Google secrets

I'll walk you through this in-person.

- [https://console.cloud.google.com](https://console.cloud.google.com)
- APIs and Services -> Credentials
- Create Project (create project)
- OAuth consent screen (external users) -> add yourself as a test user.

Now create OAuth Client ID

Create Credentials -> OAuth client ID -> Web application 

then

Add URI to Authorised JavaScript origins. `https://localhost:3000`

Add `http://localhost:3000/api/auth/callback/google` as one of the Authorised redirect URI's

Then copy your Client ID and Client secret into the `.env` file.

```
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET=".."
```


We need to add this adapter to `app/api/auth/[...nextauth]/route.ts`

``` javascript
import { PrismaAdapter } from '@auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

const prisma = new PrismaClient();

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
});

export { handler as GET, handler as POST };
```


Let's update our Prisma schema for NextAuth

``` prisma
model Account {
  id                 String  @id @default(cuid())
  userId             String
  type               String
  provider           String
  providerAccountId  String
  refresh_token      String?
  access_token       String?
  expires_at         Int?
  token_type         String?
  scope              String?
  id_token           String?
  session_state      String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model User {
  id            String    @id @default(cuid())
  name          String?
  email         String?   @unique
  emailVerified DateTime?
  image         String?
  accounts      Account[]
  sessions      Session[]
}

model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime

  @@unique([identifier, token])
}
```

Now we run the command

``` bash
npx prisma migrate dev --name nextauth-models
npx prisma generate
```

### Test next-auth

Let's test it by visiting the automatically generated endpoint at [http://localhost:3000/api/auth/signin](http://localhost:3000/api/auth/signin).

After logging in. Lets have a look at the updated database using `npx prisma studio` and visiting
[http://localhost:5555](http://localhost:5555).
