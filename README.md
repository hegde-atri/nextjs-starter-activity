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

## Setting up Prisma and NextAuth

### Prisma

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

