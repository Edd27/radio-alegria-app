# Next.js boilerplate

This GitHub project template is designed to help you get started quickly with Next.js.

## Technologies

[![next-js](https://img.shields.io/badge/next.js-000?style=for-the-badge&logo=next.js&logoColor=fff)](https://nextjs.org/)
[![typescript](https://img.shields.io/badge/typescript-2C6FBB?style=for-the-badge&logo=typescript&logoColor=FFF)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/prisma-4F60CE?style=for-the-badge&logo=prisma&logoColor=FFF)](https://www.prisma.io/)
[![eslint](https://img.shields.io/badge/eslint-4133B7?style=for-the-badge&logo=eslint&logoColor=FFF)](https://eslint.org/)
[![prettier](https://img.shields.io/badge/prettier-F6B249?style=for-the-badge&logo=prettier&logoColor=000)](https://prettier.io/)
[![next-auth](https://img.shields.io/badge/next%20auth-1687FB?style=for-the-badge&logo=next.js&logoColor=FF5C01)](https://next-auth.js.org/)
[![shadcn](https://img.shields.io/badge/shadcn%20ui-000?style=for-the-badge&logo=shadcnui&logoColor=fff)](https://ui.shadcn.com/docs/components/accordion)

## Getting started

1. Clone this repository to your local development environment.
   ```bash
   git clone https://github.com/Edd27/next14-boilerplate.git
   ```

   or directly create a new repository from this template:

   - Fork this project on your GitHub account.
   - Create new repository and select the template.
      ![image](https://github.com/Edd27/next14-boilerplate/assets/50682699/6d421b61-53e1-40ab-b8fc-0fccd9229467)

3. Create a docker container with PostgreSQL.
   ```bash
   docker compose up -d
   ```
4. Install the project dependencies:
   ```bash
   npm install
   ```
5. Create a `.env` file from `.env.example`, then edit with your values.
6. Push prisma schema to the database.
   ```bash
   npx prisma db push
   ```
7. Seed database:
   ```bash
   npx prisma db seed
   ```
8. Run server on dev mode:
   ```bash
   npm run dev
   ```
9. Test the app, with the following credentials:
   
   Username:
   ```
   jdoe
   ```

   Password:
   ```
   jdoe
   ```

## License

This project is open-source and released under the [MIT License](https://choosealicense.com/licenses/mit/).
