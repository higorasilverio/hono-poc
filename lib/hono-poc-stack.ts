import * as cdk from 'aws-cdk-lib'
import * as lambda from 'aws-cdk-lib/aws-lambda'
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs'
import { Construct } from 'constructs'
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';

export class HonoPocStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    const table = new dynamodb.Table(this, 'ItemsTable', {
      tableName: 'MyItemsTable',
      partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
    })

    const fn = new NodejsFunction(this, 'lambda', {
      entry: 'lambda/index.ts',
      handler: 'handler',
      runtime: lambda.Runtime.NODEJS_18_X,
      environment: {
        TABLE_NAME: table.tableName,
      },
    })

    table.grantReadWriteData(fn);

    const fnUrl = fn.addFunctionUrl({
      authType: lambda.FunctionUrlAuthType.NONE,
    })

    new cdk.CfnOutput(this, 'lambdaUrl', { value: fnUrl.url! })
    new cdk.CfnOutput(this, 'tableName', { value: table.tableName })
  }
}
