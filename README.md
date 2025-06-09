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

2. **Bootstrap your AWS environment (first time only)**

```bash
npx cdk bootstrap
```

3. **Deploy the app**

```bash
npx cdk deploy
```

4. **Get the API URL**

Look for the output:

```bash
HonoPocStack.lambdaUrl = https://xyz.lambda-url.region.on.aws/
```

5. **Access you AWS account**

Access the Secrets Manager console inside AWS to get the database password, name, port, username, and host.  
You may also need to access the VPC security group of your RDS instance to allow your IP to access the resource:

- On RDS console, click the link to the VPC security groups;
- On EC2 console, you will see the security groups table. Click on the `Security group ID` of your application;
- Inside the Inbound rules table, click `Edit inbound rules`;
- Click `Add rule`. Fullfil the filds with the following data: `MYSQL/Aurora`, `Anywhere-IPv4`, `0.0.0.0/0`, and the description is optional. Click `Save rules`.

> **Important**: The configuration made to enable Anywhere-IPv4 is for test purposes only.  
> You can also use you IP selecting My IP and typing your IP address.

6. **Set up environment variables**

```bash
DB_HOST=your-db-hostname
DB_PORT=your-db-port
DB_USER=your-db-user
DB_PASSWORD=your-db-password
DB_NAME=your-db-name
```
> **Important**: Do not commit .env to GitHub. It's ignored via .gitignore.

7. **Push the database schema**

Run the following to sync your schema to the RDS instance:

```bash
npx drizzle-kit push
```

You can now test the API using curl, Postman, or your browser.

## 🧹 Cleanup

To avoid AWS charges, destroy the stack when done:

```bash
npx cdk destroy
```

## 📄 License
MIT – Feel free to use and adapt.
