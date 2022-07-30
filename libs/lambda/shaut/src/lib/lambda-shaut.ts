import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import { ShautMessageRequest, ShautService } from '@sakkaku-web/core';
import { BatchWriteItemCommand, DynamoDBClient, WriteRequest } from '@aws-sdk/client-dynamodb';
import { ShautColumn, SHAUT_TABLE } from '@sakkaku-web/cloud-shared';
import { addSeconds } from 'date-fns';

const client = new DynamoDBClient({ region: 'eu-central-1' });
const shautService = new ShautService();

export const handler = async ({ body }: APIGatewayEvent,): Promise<APIGatewayProxyResult> => {
  if (!body) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Body required' }),
    };
  }

  try {
    console.log(body);
    const message: ShautMessageRequest = JSON.parse(body);
    const user = await shautService.getUserData(message.userId);
    const nearbyUsers = await shautService.getNearbyUser(
      message.userId,
      message.radius
    );

    if (nearbyUsers.length > 0) {
      const now = new Date();
      const expires = addSeconds(now, 30);

      const requests: WriteRequest[] = nearbyUsers.map(userId => {
        return {
          PutRequest: {
            Item: {
              [ShautColumn.USER_ID]: { S: userId },
              [ShautColumn.DATA_TYPE]: { S: `MESSAGES#${now.toISOString()}` },
              [ShautColumn.EXPIRES]: { N: `${expires.getTime()}` },
              [ShautColumn.MESSAGE]: { S: message.text },
              [ShautColumn.FROM_USER]: { S: user.name },
              [ShautColumn.LAT]: { N: `${user.coordinate.lat}` },
              [ShautColumn.LONG]: { N: `${user.coordinate.long}` },
            }
          }
        };
      });

      await client.send(new BatchWriteItemCommand({ RequestItems: { [SHAUT_TABLE]: requests, } }));
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'successfully shauted' }),
    };
  } catch (err) {
    console.log(err);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: `unexpected error occurred`,
      }),
    };
  }
};
