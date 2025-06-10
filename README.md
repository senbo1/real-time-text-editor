# Real-Time Text Editor

A collaborative real-time text editor built with React and Durable Objects. Multiple users can edit the same document simultaneously with real-time synchronization.

## 🎥 Demo

[![Watch the Demo](https://img.youtube.com/vi/53e1DkrSiHs/0.jpg)](https://www.youtube.com/watch?v=53e1DkrSiHs)

## 🚀 Features

- **Real-time Collaboration**: Multiple users can edit documents simultaneously with last write wins strategy.
- **Persistent Storage**: Documents are automatically saved using Cloudflare Durable Objects
- **Cost-Efficient WebSockets**: Uses Cloudflare Durable Objects WebSocket hibernation to reduce costs during periods of inactivity
- **Clean UI**: Simple, Google Docs-like interface built with React and Tailwind CSS

The application consists of two main components:

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS, Vite
- **Backend**: Cloudflare Workers, Durable Objects, Hono
- **Build Tools**: Vite, wrangler
- **Package Manager**: pnpm
- **Deployment**: Cloudflare Workers

## 📦 Installation

1. Clone the repository:

```bash
git clone https://github.com/senbo1/real-time-text-editor.git
cd real-time-text-editor
```

2. Install dependencies:

```bash
pnpm install
```

3. Start the development server:

```bash
pnpm dev
```

## 📝 Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm deploy` - Deploy to Cloudflare Workers
- `pnpm check` - Type check and dry-run deployment
- `pnpm lint` - Run ESLint
- `pnpm cf-typegen` - Generate Cloudflare types
