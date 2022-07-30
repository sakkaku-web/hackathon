import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import { ShautMessage, ShautService } from '@sakkaku-web/core';
import { BatchWriteItemCommand, DynamoDBClient, PutItemCommand, WriteRequest } from '@aws-sdk/client-dynamodb';
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

    const requests: WriteRequest[] = nearbyUsers.map(userId => {
      return {
        PutRequest: {
          Item: {
            [ShautColumn.USER_ID]: { S: userId },
            [ShautColumn.DATA_TYPE]: { S: `MESSAGES#${now.toISOString()}` },
            [ShautColumn.EXPIRES]: { N: `${expires.getUTCMilliseconds()}` },
            [ShautColumn.MESSAGE]: { S: message.text },
          }
        }
      };
    });

    await client.send(new BatchWriteItemCommand({ RequestItems: { [SHAUT_TABLE]: requests, } }));

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'successfully shauted' }),
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
