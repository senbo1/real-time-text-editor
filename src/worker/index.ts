import { Hono } from 'hono';
export { DocumentDurableObject } from './durable-object';

const app = new Hono<{ Bindings: Env }>();

app.get('/ws/document/:id', async (c) => {
  if (c.req.header('upgrade') !== 'websocket') {
    return c.text('Expected Upgrade: websocket', 426);
  }
  const documentId = c.req.param('id');

  const durableObjectId = c.env.DOCUMENT_DURABLE_OBJECT.idFromName(documentId);
  const stub = c.env.DOCUMENT_DURABLE_OBJECT.get(durableObjectId);

  return stub.fetch(c.req.raw);
});

export default app;
