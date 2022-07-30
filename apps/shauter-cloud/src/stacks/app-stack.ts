import * as cdk from '@aws-cdk/core';

import { RetentionDays } from '@aws-cdk/aws-logs';
import { Runtime, Code, Function } from '@aws-cdk/aws-lambda';
import { Table, AttributeType } from '@aws-cdk/aws-dynamodb';
import { HttpApi, HttpMethod } from '@aws-cdk/aws-apigatewayv2';
import { HttpLambdaIntegration } from '@aws-cdk/aws-apigatewayv2-integrations';
import {
  ShautColumn,
  SHAUT_TABLE,
} from '../../../../libs/cloud-shared/src';
import { join } from 'path';
import { RemovalPolicy } from '@aws-cdk/core';

export class AppStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const api = new HttpApi(this, 'shautApi', {
      corsPreflight: {
        allowOrigins: [
          'http://localhost:4200',
          'https://sakkaku-web.github.io',
        ],
      },
    });

    const table = new Table(this, 'shauter-demo', {
      tableName: SHAUT_TABLE,
      partitionKey: {
        name: ShautColumn.USER_ID,
        type: AttributeType.STRING,
      },
      sortKey: {
        name: ShautColumn.DATA_TYPE,
        type: AttributeType.STRING,
      },
      timeToLiveAttribute: ShautColumn.EXPIRES,
      removalPolicy: RemovalPolicy.DESTROY,
    });

    const libsPath = '../../dist/libs/lambda';

    const shautFn = new Function(this, 'shaut', {
      runtime: Runtime.NODEJS_14_X,
      code: Code.fromAsset(join(libsPath, 'shaut')),
      handler: 'lambda-shaut.handler',
      logRetention: RetentionDays.ONE_MONTH,
    });
    table.grantReadData(shautFn);

    api.addRoutes({
      path: '/shaut',
      methods: [HttpMethod.POST],
      integration: new HttpLambdaIntegration('postShaut', shautFn),
    });
  }
}
