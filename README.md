# Delicious

Delicious is a responsive food storefront with a public menu, account registration, sign-in, a cart, and a checkout price summary.

## Run locally

Use Node.js 24 or later.

```sh
npm install
npm run dev
```

Open the URL Vite prints. Choose **Create account**, enter your name, email and a password with at least eight characters, then start ordering. You can sign out and sign back in with the same email and password. Accounts and sessions are saved in `.data/auth.sqlite`.

## Run the built app

```sh
npm run build
npm start
```

Open http://127.0.0.1:4173. The Node server serves the site and authentication API from the same origin. For hosting, set `HOST` and `PORT` as needed, configure an HTTPS reverse proxy that preserves the original Host header, and set `COOKIE_SECURE=true`. Set `AUTH_DB_PATH` to a SQLite file on a persistent volume when deploying to a container. The existing Firebase static hosting configuration serves frontend files only and needs a Node backend to support accounts.

The cart lasts for the current page session. The checkout shows prices, delivery fees, and the `NEW2026` coupon. A payment provider and order fulfillment are still pending.
