import { Hono } from 'hono'
import { handle } from 'hono/aws-lambda'
import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import {
  DynamoDBDocumentClient,
  PutCommand,
  GetCommand,
  ScanCommand,
  DeleteCommand,
  UpdateCommand,
} from '@aws-sdk/lib-dynamodb'

const app = new Hono()

const tableName = process.env.TABLE_NAME!
const db = DynamoDBDocumentClient.from(new DynamoDBClient({}))

// POST /items
app.post('/items', async (c) => {
  const body = await c.req.json()
  const id = crypto.randomUUID()
  const item = { id, name: body.name }

  await db.send(new PutCommand({ TableName: tableName, Item: item }))
  return c.json(item, 201)
})

// GET /items
app.get('/items', async (c) => {
  const result = await db.send(new ScanCommand({ TableName: tableName }))
  return c.json(result.Items ?? [])
})

// GET /items/:id
app.get('/items/:id', async (c) => {
  const id = c.req.param('id')
  const result = await db.send(new GetCommand({ TableName: tableName, Key: { id } }))
  if (!result.Item) return c.text('Not Found', 404)
  return c.json(result.Item)
})

// PUT /items/:id
app.put('/items/:id', async (c) => {
  const id = c.req.param('id')
  const body = await c.req.json()

  await db.send(
    new UpdateCommand({
      TableName: tableName,
      Key: { id },
      UpdateExpression: 'set #name = :name',
      ExpressionAttributeNames: { '#name': 'name' },
      ExpressionAttributeValues: { ':name': body.name },
    })
  )

  return c.text('Updated')
})

// DELETE /items/:id
app.delete('/items/:id', async (c) => {
  const id = c.req.param('id')
  await db.send(new DeleteCommand({ TableName: tableName, Key: { id } }))
  return c.text('Deleted')
})

export const handler = handle(app)
