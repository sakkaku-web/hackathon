import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import { ShautMessage, ShautService } from '@sakkaku-web/core';
import { BatchWriteItemCommand, DynamoDBClient, PutItemCommand } from '@aws-sdk/client-dynamodb';
import { ShautColumn, SHAUT_TABLE } from '@sakkaku-web/cloud-shared';
import { addSeconds } from 'date-fns';

const client = new DynamoDBClient({ endpoint: 'localhost:8000' });
const shautService = new ShautService();

export const handler = async (
  { body }: APIGatewayEvent,
  context: any
): Promise<APIGatewayProxyResult> => {
  if (!body) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Body required' }),
    };
  }

  try {
    const message: ShautMessage = JSON.parse(body);
    const nearbyUsers = await shautService.getNearbyUser(
      message.userId,
      message.radius
    );
    const now = new Date();
    const expires = addSeconds(now, 30);

    new BatchWriteItemCommand({
      RequestItems: {
        [SHAUT_TABLE]: [
          {
            PutRequest: {
              Item: {
                [ShautColumn.USER_ID]: { S: '' },
                [ShautColumn.DATA_TYPE]: { S: `MESSAGES#${now.toISOString()}` },
                [ShautColumn.EXPIRES]: { N: }
              }
            }
          }
        ],
      }
    })
    client.send(
      new PutItemCommand({
        TableName: SHAUT_TABLE,
        Item: {
          [ShautColumn.USER_ID]:
        }
      })
    );

    return {
      statusCode: 200,
      body: JSON.stringify(message),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: `unexpected error occurred`,
        error: err,
      }),
    };
  }
};
