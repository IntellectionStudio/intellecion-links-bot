/* @flow */

import {ChatConnector, UniversalBot} from 'botbuilder';
import restify from 'restify';

import CloudinaryService from 'services/CloudinaryService';

CloudinaryService.setup();
const server = restify.createServer();

server.listen(
  process.env.port || process.env.PORT || process.env.DEFAULT_PORT,
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

  if (session.message.attachments && session.message.attachments.length > 0) {
    const attachment = session.message.attachments[0];

    CloudinaryService.uploadImage(attachment.contentUrl);
  }
});
