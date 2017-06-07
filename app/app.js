/* @flow */

import {ChatConnector, UniversalBot} from 'botbuilder';
import restify from 'restify';

import config from 'config';

const server = restify.createServer();

server.listen(
  process.env.port || process.env.PORT || config.DEFAULT_PORT,
  () => {
    console.log('%s listening to %s', server.name, server.url); // eslint-disable-line no-console
  },
);

const connector = new ChatConnector({
  appId: process.env.MICROSOFT_APP_ID,
  appPassword: process.env.MICROSOFT_APP_PASSWORD,
});

server.post('/api/messages', connector.listen());

// eslint-disable-next-line no-unused-vars
const bot = new UniversalBot(connector, session => {
  session.send('You said: %s', session.message.text);
});
