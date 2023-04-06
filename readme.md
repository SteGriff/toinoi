# tôi nói 

Speaks Vietnamese

## Install and Run

Requires Node 16.x+ for ESM support.

```
npm i
npm run start
```

## Azure Config

Set up an [Azure Cognitive Services Speech Service][az].

Create a .env file and enter your KEY and REGION:

```
SPEECH_KEY=
SPEECH_REGION=
```

Don't put spaces around = sign!

## Troubleshooting

If it doesn't work on your hosting infrastructure, try setting the `env.PORT` using shell commands, or else tweak the `mjs` file to use a port other than 60400 (i.e. 443 for https)

Check your Node version.

[az]: https://learn.microsoft.com/en-us/azure/cognitive-services/speech-service/get-started-text-to-speech