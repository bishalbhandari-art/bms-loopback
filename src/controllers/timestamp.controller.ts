import {inject} from '@loopback/core';
import {get, response} from '@loopback/rest';

export class TimestampController {
  constructor(
    @inject('providers.timestamp')
    private getTimestamp: () => string,
  ) {}

  @get('/timestamp')
  @response(200, {
    description: 'Current timestamp provided by TimestampProvider',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            timestamp: {
              type: 'string',
            },
          },
        },
      },
    },
  })
  getTimestampValue() {
    return {
      timestamp: this.getTimestamp(),
    };
  }
}
