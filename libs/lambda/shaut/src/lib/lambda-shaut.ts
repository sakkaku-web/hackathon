import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import { ShautMessage } from '@sakkaku-web/core';

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
