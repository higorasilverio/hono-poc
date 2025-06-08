# 🔥 Hono RESTful API on AWS Lambda with DynamoDB

A lightweight serverless CRUD API built with [Hono](https://hono.dev/), deployed using AWS Lambda and provisioned with AWS CDK. Data is stored persistently in DynamoDB.

## 🚀 Features

- ⚡️ Fast and minimal REST API using [Hono](https://hono.dev/)
- 🗃️ Persistent storage with DynamoDB
- ☁️ Serverless deployment via AWS Lambda
- 🛠️ Infrastructure as Code with AWS CDK (TypeScript)
- 🧪 Supports full CRUD: POST, GET, PUT, DELETE

## 📦 Tech Stack

- [Hono](https://hono.dev/) (framework)
- [AWS Lambda](https://aws.amazon.com/lambda/)
- [AWS DynamoDB](https://aws.amazon.com/dynamodb/)
- [AWS CDK](https://docs.aws.amazon.com/cdk/)
- [TypeScript](https://www.typescriptlang.org/)

## 📂 Endpoints

`POST` /items → create new item  
`GET` /items → list all items  
`GET` /items/:id → get item by ID  
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

You can now test the API using curl, Postman, or your browser.

## 🧹 Cleanup

To avoid AWS charges, destroy the stack when done:

```bash
npx cdk destroy
```

## 📄 License
MIT – Feel free to use and adapt.
