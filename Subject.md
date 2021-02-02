# Cryptio Technical Interview

Hello! If you are reading this, you are most likely interested in taking a
technical position at [Cryptio](https://cryptio.co/). If that's not the case,
please take a look at our [open positions](https://cryptio.welcomekit.co/).

## What is it about?

Your objective is to program a web application that can compute and display
the historical balances of a Bitcoin address.

An account balance is the amount of money that is present in an account at a
given moment in time. For instance, a newly created Bitcoin wallet usually has
a balance of `0 BTC`. Then, if someone sends `100 BTC` to this wallet, its
balance will be `100 BTC`. Now, if the owner of the wallet sends 10 BTC to
another address, its balance would be `100 BTC - 10 BTC`. As explained by
Alicia Tuovila on [Investopedia](https://www.investopedia.com/terms/a/accountbalance.asp):

> The account balance is always the net amount after factoring in all debits and credits.

⚠️ You **don't** have to deal with the transaction fees.

We voluntary don't set a lot of constraints. You are free to design your
application the way you want. If you want to show the historical balances
as a table with each row corresponding to a transaction, it is fine. If you
want to plot a graph that shows historical balances on a monthly basis,
that is also fine. If you want to do a combination of the two, well that would
be awesome!

If you enjoy this project and want to develop additional features, we will
greatly value it. Here are a few ideas:

* Associate each transaction/balance with its USD counterpart
* Implement caching, either on the client or on server, to speed up the
  computation of addresses that has already been seen
* Integrate more blockchains (challenging ones include the Ethereum and the Tezos
  blockchains)
* Properly handle the transaction fees (can be very challenging, requires a deep
  understanding of Bitcoin transactions)

Here are a few addresses with not a lot of transactions that you can use
for testing purposes:

* [1GY9ci8L4EK2U3baXnuvNtpFEiL4CMsVob](https://www.blockchain.com/btc/address/1GY9ci8L4EK2U3baXnuvNtpFEiL4CMsVob)
* [38YaqTN8B3dbXVPV8jsoh7YG3kfX3iYK3J](https://www.blockchain.com/btc/address/38YaqTN8B3dbXVPV8jsoh7YG3kfX3iYK3J)
* [3F9L2XrrdLkWKayjrN6sWY86vkP4eDoe9b](https://www.blockchain.com/btc/address/3F9L2XrrdLkWKayjrN6sWY86vkP4eDoe9b)

## Technical considerations

We require that you ship both a front-end, and a little API for your
application. One could argue that the whole project could be implemented as a
front-end that only relies on third-party APIs and performs all the
computation on the client-side but we would like to read both front-end
**and** back-end code from you!

**If you are applying for an internship**, you are free to use any framework or
library you want.

**If you are applying for a full-time position**, you must use the following
technologies:

* [React](https://reactjs.org/) (with [TypeScript](https://www.typescriptlang.org/)) -
  other React flavored frameworks such as Next.js are also valid
* [Express](https://expressjs.com/) (with [TypeScript](https://www.typescriptlang.org/)) -
  Koa, Fastify, and NestJS are also fine

This repository is actually a monorepo that contains some boilerplate based
on React and Express. We recommend that you fork it and use it but feel free
to bootstrap your own project if that makes you more comfortable.

The `front/` directory is a React project that has been created using
[Create React App](https://create-react-app.dev/), with TypeScript support.
Here are a few scripts:

* `npm run start` - starts the application in development mode
  (with hot reloading, etc)
* `npm run build` - builds the application for production
* `npm run lint` - lints all `.ts` and `.tsx` files

The `back/` directory is an Express project, also with TypeScript. The related
scripts are:

* `npm run start` - starts the application in development mode (be careful,
  there is no hot reloading)
* `npm run prod` - starts the application in production mode
* `npm run lint` - lints all `.ts` files

You **don't** have to host a live version of your solution, although it will
be valuated if you do it. Some services that have a free tier and fits well
with the technologies we recommend are [Heroku](https://www.heroku.com/) for
the back and [Vercel](https://vercel.com/) for the front.

If, for some reasons, you don't want your code to be public, this not an
issue. Just let us know how we can access it.

*This repository has been bootstrapped on Node v14.15.3 (which is the LTS at
the time of writing) on a modern Linux distribution.*

## Third party APIs

You are welcome to use any third party API. Here are a few ones we recommend:

* [Blockchain.com](https://www.blockchain.com/api/blockchain_api) - open and
  free API for the Bitcoin blockchain
* [Etherscan](https://etherscan.io/apis) - free API for the Ethereum
  blockchain - requires that you create a free account in order to get an API
  key - has a few limitations but just ignore them
* [CoinGecko](https://www.coingecko.com/en/api) - open and free API for crypto
  pricing
* [Fixer](https://fixer.io/) - API for fiat pricing - has a free plan that
  requires you to create an account

## Hints

* A Bitcoin transaction is a collection of inputs, and outputs. If the address
  you are dealing with is listed under the inputs, your balance will decrease
  as you are spending money. On the contrary, if the address is listed under
  the outputs, your balance will increase.
* Your final balance should be equal to the `Final Balance`, as displayed
  on Blockchain.com.
* You can **not** have a negative balance.
* The Blockchain.com API has pagination (with a maximum page length of `100`).
  You **must** deal with the pagination if you want your application to be
  able to handle large wallets.

## Questions

Do not hesitate to ask for more hints or even some help!

Send an email to `lucas [at] cryptio [dot] co`.

Good luck!
