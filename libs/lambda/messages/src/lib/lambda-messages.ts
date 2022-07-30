import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import { ShautMessage } from '@sakkaku-web/core';
import { DynamoDBClient, QueryCommand } from '@aws-sdk/client-dynamodb';
import { ShautColumn, SHAUT_TABLE } from '@sakkaku-web/cloud-shared';

const client = new DynamoDBClient({ region: 'eu-central-1' });

export const handler = async ({ pathParameters }: APIGatewayEvent,): Promise<APIGatewayProxyResult> => {
  if (!pathParameters || !pathParameters.userId) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'missing user id in path parameters' }),
    };
  }

  try {
    const query = new QueryCommand({
      TableName: SHAUT_TABLE,
      KeyConditionExpression: `${ShautColumn.USER_ID} = :userId and begins_with(${ShautColumn.DATA_TYPE}, :type)`,
      ExpressionAttributeValues: {
        ':userId': { S: pathParameters.userId },
        ':type': { S: 'MESSAGES#' },
      },
      ScanIndexForward: false,
    })
    const res = await client.send(query);

    const messages: ShautMessage[] = res.Items?.map(item => ({
      text: item[ShautColumn.MESSAGE].S || '',
      user: item[ShautColumn.FROM_USER].S || '',
      coordinate: {
        long: parseFloat(item[ShautColumn.LONG].N || '0'),
        lat: parseFloat(item[ShautColumn.LAT].N || '0'),
      },
      time: item[ShautColumn.DATA_TYPE].S?.split('#')[1] || '',
    })) || [];

    return {
      statusCode: 200,
      body: JSON.stringify(messages),
    };
  } catch (err) {
    console.log(err);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: `unexpected error occurred`,
        error: err,
      }),
    };
  }
};
