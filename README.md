# Delicious

Delicious is a responsive food storefront with a public menu, account registration, sign-in, a cart, and a checkout price summary.

## Run locally

Use Node.js 24 or later and a running MongoDB server. The app defaults to MongoDB at `127.0.0.1:27017`. To use Atlas, copy `.env.example` to `.env` and set `MONGODB_URI` to the Atlas connection string. `MONGODB_DB` defaults to `delicious`.

```sh
npm install
npm run dev
```

In Windows PowerShell, use `npm.cmd install` and `npm.cmd run dev` if scripts are disabled.

Open the URL Vite prints. Choose **Create account** and enter your name, email,
and a password with at least eight characters. Express saves the account in
MongoDB with a password hash. On sign-in, Express looks up your email and
checks your password against that hash. The browser saves your name and email in
localStorage so you can refresh the page and stay signed in. Sign out clears them.

The backend starts in `server/app.js` and connects to MongoDB through
`server/config/db.js`. The routes in `server/routes/userRoutes.js`
send requests to `server/controller/userController.js`. The controller uses
`server/models/userModels.js` to save and find accounts. React renders the
sign-in and registration forms.

## Run the built app

```sh
npm run build
npm start
```

Open http://127.0.0.1:4173. Express serves the storefront and account API from the same origin.

## Deploy to Render with MongoDB Atlas

The `render.yaml` Blueprint configures a free Node web service. On the first
setup, enter the Atlas connection string in Render's `MONGODB_URI` field.

1. Create an Atlas database user with the `readWrite` role on the app database and add your Render service's outbound IP ranges to the Atlas IP access list.
2. Connect your GitHub branch to a Render **Web Service** with Node.js 24. Set the build command to `npm ci && npm run build` and the start command to `npm start`.
3. In Render's environment settings, set `MONGODB_URI` to the Atlas connection
   string, `MONGODB_DB` to your app database, and `HOST` to `0.0.0.0`.
   Render provides `PORT`.
4. Open the Render URL and test registration, sign-in, and sign-out.

The cart lasts for the current page session. The checkout shows prices, delivery fees, and the `NEW2026` coupon. A payment provider and order fulfillment are still pending.
