const qrcode = require('qrcode-terminal');
const { Client } = require('whatsapp-web.js');
const express = require('express');
const morgan = require('morgan');
const compression = require('compression');
const helmet = require('helmet');

const RECEIVER = '923137449415@c.us';

(async function () {
  const client = new Client({
    puppeteer: {
      headless: true,
      defaultViewport: null,
      args: [
        '--incognito',
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--single-process',
        '--no-zygote',
      ],
    },
  });

  client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
  });

  await client.initialize();

  const homeHandler = (req, res) => {
    res.json({
      message: 'Hello World!',
    });
  };

  const sendMessageHandler = async (req, res) => {
    if (req.body === null || req.body.message === null) {
      res.json({ success: false });
      return;
    }

    const message = req.body.message.trim();
    if (message === '') {
      res.json({ success: false });
      return;
    }

    const messageObject = await client.sendMessage(RECEIVER, message);
    res.json({ success: messageObject.ack.toString() !== '-1' });
  };

  const notFoundHandler = (req, res, next) => {
    const error = new Error(`Not found - ${req.originalUrl}`);
    res.status(404);
    next(error);
  };

  const errorHandler = (error, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
      status: statusCode,
      message: 'Internal Server Error!',
      stack: process.env.NODE_ENV === 'production' ? '🥞' : error.stack,
      errors: error.errors || undefined,
    });
  };

  app = express();
  app.use(morgan('tiny'));
  app.use(compression());
  app.use(helmet());
  app.use(express.json());
  app.get('/', homeHandler);
  app.post('/send', sendMessageHandler);
  app.use(notFoundHandler);
  app.use(errorHandler);

  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
  });
})();
