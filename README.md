# 🔥 Hono RESTful API on AWS Lambda with RDS (MySQL)

A lightweight serverless CRUD API built with [Hono](https://hono.dev/), deployed using AWS Lambda and provisioned with AWS CDK. Data is stored persistently in a MySQL-compatible RDS instance.

## 🚀 Features

- ⚡️ Fast and minimal REST API using [Hono](https://hono.dev/)
- 🗄️ Persistent storage with Amazon RDS (MySQL engine)
- ☁️ Serverless deployment via AWS Lambda
- 🛠️ Infrastructure as Code with AWS CDK (TypeScript)
- 🧪 Supports full CRUD: POST, GET, PUT, DELETE

## 📦 Tech Stack

- [Hono](https://hono.dev/) (framework)
- [AWS Lambda](https://aws.amazon.com/lambda/)
- [Amazon RDS – MySQL](https://aws.amazon.com/rds/mysql/)
- [AWS CDK](https://docs.aws.amazon.com/cdk/)
- [Drizzle ORM](https://orm.drizzle.team/)
- [TypeScript](https://www.typescriptlang.org/)

## 📂 Endpoints

`POST` /items → create new item  
`GET` /items → list all items  
`PUT` /items/:id → update item  
`DELETE` /items/:id → delete item

## ✅ Example

```bash
curl -X POST https://your-url/items -H "Content-Type: application/json" -d '{"name": "My first item"}'

```

## 🛠 Setup & Deploy

1. **Install dependencies**

```bash
npm install
```

2. **Set up environment variables**

```bash
DB_HOST=your-db-hostname
DB_PORT=your-db-port
DB_USER=your-db-user
DB_PASSWORD=your-db-password
DB_NAME=your-db-name
```
> **Important**: Do not commit .env to GitHub. It's ignored via .gitignore.

3. **Push the database schema**

Run the following to sync your schema to the RDS instance:

```bash
npx drizzle-kit push
```

4. **Bootstrap your AWS environment (first time only)**

```bash
npx cdk bootstrap
```

5. **Deploy the app**

```bash
npx cdk deploy
```

6. **Get the API URL**

Look for the output:

```bash
HonoPocStack.lambdaUrl = https://xyz.lambda-url.region.on.aws/
```

You can now test the API using curl, Postman, or your browser.

## 🧹 Cleanup

To avoid AWS charges, destroy the stack when done:

```bash
npx cdk destroy
```

## 📄 License
MIT – Feel free to use and adapt.
