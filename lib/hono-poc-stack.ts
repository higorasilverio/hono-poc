import * as cdk from 'aws-cdk-lib'
import { Construct } from 'constructs'
import * as lambda from 'aws-cdk-lib/aws-lambda'
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs'
import * as rds from 'aws-cdk-lib/aws-rds'
import * as ec2 from 'aws-cdk-lib/aws-ec2'
import path from 'path'
export class HonoPocStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    const vpc = new ec2.Vpc(this, 'MyVpc', { maxAzs: 2 })

    const dbInstance = new rds.DatabaseInstance(this, 'MyRDSInstance', {
      engine: rds.DatabaseInstanceEngine.mysql({
        version: rds.MysqlEngineVersion.VER_8_4_5,
      }),
      instanceType: ec2.InstanceType.of(ec2.InstanceClass.T3, ec2.InstanceSize.MICRO),
      vpc,
      vpcSubnets: { subnetType: ec2.SubnetType.PUBLIC },
      publiclyAccessible: true,
      credentials: rds.Credentials.fromGeneratedSecret('admin'),
      databaseName: 'MyRDBDatabase',
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      deletionProtection: false,
    })

    const fn = new NodejsFunction(this, 'LambdaHandler', {
      entry: path.join(__dirname, '../lambda/index.ts'),
      handler: 'handler',
      runtime: lambda.Runtime.NODEJS_18_X,
      vpc,
      environment: {
        DB_NAME: 'MyRDBDatabase',
        DB_SECRET_NAME: dbInstance.secret!.secretName,
      },
    })

    dbInstance.connections.allowDefaultPortFrom(fn)
    dbInstance.secret!.grantRead(fn)

    const fnUrl = fn.addFunctionUrl({ authType: lambda.FunctionUrlAuthType.NONE })

    new cdk.CfnOutput(this, 'lambdaUrl', {
      value: fnUrl.url!,
    })
  }
}
