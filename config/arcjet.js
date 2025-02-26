import arcjet, { shield, detectBot, tokenBucket } from "@arcjet/node";
import { ARCJET_KEY } from './env.js';

const aj = arcjet({
  key: ARCJET_KEY,
  characteristics: ['ip.src', 'user-agent'],
  rules: [
    shield({ mode: "LIVE" }),
    detectBot({
      mode: "LIVE",
      allow: ["CATEGORY:SEARCH_ENGINE"],
    }),
    tokenBucket({
      mode: "LIVE",
      refillRate: 2,
      interval: 5,
      capacity: 5,
    }),
  ],
});

export default aj;