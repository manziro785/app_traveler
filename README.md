# Trip AI (Instamat)

AI-powered travel planning app built with Expo Router. Create personalized routes, explore destinations on a map, and get contextual recommendations like weather-aware tips.

**Concept**
Trip AI helps travelers build smart, shareable itineraries by combining user preferences, location context, and AI recommendations into a clean mobile experience.

**Key Features**
- AI route creation with multi-step preferences flow
- Explore destinations and route details
- Map-based discovery
- Weather recommendations for a given location
- Auth flow with token-based API access
- Profile and stats

**Tech Stack**
- Expo + React Native + Expo Router
- TypeScript
- React Query for data fetching and caching
- Zustand for client state
- Axios for API communication
- Tamagui + NativeWind for UI

**Project Structure**
- `src/app` Expo Router screens and layouts
- `src/features` Feature modules (auth, home, route, map, chat, profile)
- `src/shared` Shared API, UI, and state utilities
- `assets` App icons and images

**Prerequisites**
- Node.js LTS
- Expo CLI (`npx expo`)

**Environment Variables**
Create `.env.development` with:
```env
EXPO_PUBLIC_API_URL=https://trip-ai-backend-xtnc.onrender.com/api
EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID="..."
EXPO_PUBLIC_GOOGLE_EXPO_CLIENT_ID="..."
```

Notes:
- `EXPO_PUBLIC_*` variables are bundled into the client app.
- The backend must have `OPENWEATHER_API_KEY` configured for weather recommendations.

**Install**
```bash
npm install
```

**Run**
```bash
npm run start
```

**Scripts**
- `npm run start` Start Expo dev server
- `npm run android` Open on Android
- `npm run ios` Open on iOS simulator
- `npm run web` Run web build
- `npm run lint` Lint project

**API**
The app expects a backend compatible with these routes:
- `GET /insights/random`
- `GET /weather/recommendations?lat={lat}&lng={lng}`
- `GET /users/stats`

**Status**
Active development.
