# Monorepo project (expo app + nextjs)

This project is based on this documentation: https://docs.expo.dev/guides/monorepos/

GITHUB: https://github.com/baciey/dbz-memory-monorepo/

## How to run project

1. yarn
2. yarn start-mobile
3. yarn start-web

## WEB DEPLOYMENT

- NEXT JS
  build is hosted here: https://app.netlify.com/sites/dbz-monorepo/overview
  1. https://dev--dbz-memory.netlify.app/ - dev
  2. https://dbz-memory.netlify.app/ - main

## MOBILE DEPLOYMENT

We only generate apk for android. If you already have an account and eas-cli you can skip 1,2,3.

1. create an account on https://expo.dev/
2. npm install -g eas-cli
3. eas login
4. cd apps/expo-app & eas build:configure
5. eas build --platform android --profile preview (development build)
6. eas build --platform android --profile production (production build)

## TROUBLESHOOTING

```bash
Expo SDK 50 and higher has improved support for more complete node_modules patterns, such as isolated modules. Unfortunately, React Native can still cause issues when installing multiple versions inside a single monorepo. Because of that, it's recommended to only use a single version of React Native.
```

Expo icons:
`https://ionic.io/ionicons`

UI icons (material design icons)
`https://pictogrammers.com/library/mdi/`
