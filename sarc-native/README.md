# SARC native app

Expo SDK 58 / React Native implementation of the SARC homepage. The existing `centralised-frontend` remains the production website; this app provides an equivalent responsive home experience on Android, iOS and web. It links to the official SARC programs and event listings rather than duplicating their services.

## Run locally

```bash
npm ci
npm start
```

Use `npm run android`, `npm run ios` or `npm run web` for the corresponding platform. A physical-device development build may be needed for SDK 58 during the Expo Go transition.

## Verify

```bash
npx tsc --noEmit
npm run lint
npx expo-doctor
npx expo export --platform all
```

Web static output is written to `dist/` and is ignored by Git. Store builds require an Expo/EAS account, app-signing credentials, platform review and real-device QA; the exported bundles alone are not store releases.

The app uses photographs and the original SARC mark from this repository. `npm ci` downloads original Cabinet Grotesk and Switzer files from Fontshare's official API into the ignored `assets/fonts/` directory for app embedding.
