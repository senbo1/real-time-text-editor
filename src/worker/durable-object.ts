import { DurableObject } from 'cloudflare:workers';

export class DocumentDurableObject extends DurableObject {
  content = '';

  constructor(ctx: DurableObjectState, env: Env) {
    super(ctx, env);
    ctx.blockConcurrencyWhile(async () => {
      this.content = (await ctx.storage.get('content')) || '';
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async fetch(_request: Request): Promise<Response> {
    const webSocketPair = new WebSocketPair();
    const [client, server] = Object.values(webSocketPair);

    this.ctx.acceptWebSocket(server);
    server.send(JSON.stringify({ type: 'init', content: this.content }));

    return new Response(null, {
      status: 101,
      webSocket: client,
    });
  }

  async webSocketMessage(ws: WebSocket, message: ArrayBuffer | string) {
    const data = JSON.parse(message as string);
    if (data.type === 'update') {
      this.content = data.content;
      await this.ctx.storage.put('content', this.content);

      this.broadcastToOthers(
        ws,
        JSON.stringify({ type: 'update', content: this.content })
      );
    }
  }

  broadcastToOthers(ws: WebSocket, message: string) {
    for (const client of this.ctx.getWebSockets()) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    }
  }
}
