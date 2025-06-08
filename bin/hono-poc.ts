#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib'
import { HonoPocStack } from '../lib/hono-poc-stack'

const app = new cdk.App()
new HonoPocStack(app, 'HonoPocStack')
