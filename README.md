
# Saarang Event Hub 

Welcome to the **Saarang Event Hub**, a premium, high-fidelity mobile event explorer and management application built using **React Native**, **Expo SDK 54**, **Expo Router**, and **Zustand**. 

This application is custom-tailored for **Saarang**, the annual cultural festival of IIT Madras, featuring an immersive, state-of-the-art UI/UX design with vibrant gradients, sleek light modes, and a dedicated **JWT Authentication Node.js Backend Server**!



##  Features & Visual Highlights

###  Fully-Integrated Node.js + JWT Backend (`server/`)
* **Real API Connections**: Signup, Login, Event Loading, and Ticket Registrations are fully connected to a secure Express API server.
* **Persistent Sessions**: Employs `@react-native-async-storage/async-storage` on the mobile client to save JWT sessions, letting users stay logged in securely across app launches.
* **Universal IP Auto-Resolution**: The client automatically resolves your development machine's local IP address dynamically on launch. This allows physical phones (on local Wi-Fi) and emulators to communicate with your backend instantly with zero config.
* **File-Based Database**: Uses a clean, self-contained JSON-file persistent database (`server/db.json`), requiring **zero database installation** for reviewers!

<img width="30%" alt="Explore Hub" src="https://github.com/user-attachments/assets/7a9e5a17-f90a-4236-985b-01c00dcef9d8" /><img width="30%" alt="Auth Flow" src="https://github.com/user-attachments/assets/87d56fd6-ad75-4280-a7c8-245db9ff574d" /><img width="30%" alt="Event Details" src="https://github.com/user-attachments/assets/85410404-ee5f-4cbb-84bd-63000b01e19c" /><img width="30%" alt="Ticket Management" src="https://github.com/user-attachments/assets/ab7d8a98-9e6d-41fd-a505-2c810bc95a85" /><img width="30%" alt="User Profile" src="https://github.com/user-attachments/assets/35ed7f54-10bd-454c-9cea-d0de9134fa96" /><img width="30%" alt="App Screen 6" src="https://github.com/user-attachments/assets/10c62b91-103b-4820-9c08-81b7fc486eaf" /><img width="30%" alt="App Screen 7" src="https://github.com/user-attachments/assets/5f7b292f-b0f8-47af-b9ad-cea0390772fd" /><img width="30%" alt="App Screen 8" src="https://github.com/user-attachments/assets/667847e3-8f17-4d52-aed5-921110f1b6f1" />



##  Project Organization



```text
saarang-event-hub/
├── assets/              # Original design resources & icon assets
├── server/              # Real Node.js Express + JWT persistent backend API
│   ├── db.json          # Persistent file-based SQLite-like database
│   ├── package.json     # Backend server dependencies
│   └── server.js        # Auth, JWT, event list, & registration endpoints
├── src/
│   ├── app/             # Expo file-system based routing layers
│   │   ├── (auth)/      # Onboarding flows (login.jsx, signup.jsx)
│   │   ├── (tabs)/      # Main capsule tab bar layout & core views
│   │   │   ├── _layout.jsx    # Floating pill-bar navigation config
│   │   │   ├── index.jsx      # Explore feed (Events)
│   │   │   ├── my-events.jsx  # Registrations & Tickets tracker
│   │   │   └── profile.jsx    # about user screen
│   │   ├── event/       # Event detail modal directory
│   │   │   └── [id].jsx       # Immersive event layout
│   │   └── _layout.jsx  # Global layout provider & router stack options
│   └── store/           # Global State Management
│       └── index.js     # Zustand state-store (events data, registration logic, auth actions)
└── README.md            # Project guide, documentation, and screenshots
```

---

## 🚀 Running the Project Locally

### 1. Launch the Backend API Server
Navigate to the `server` directory, install packages, and boot up the server:
```bash
cd server
npm install
npm start
```
*The backend API will run natively on `http://localhost:5000` (and binds globally to allow mobile connection over local Wi-Fi).*

### 2. Launch the Mobile Client
Open a new terminal window inside the root directory (`saarang-event-hub`), install client packages, and boot up the app:
```bash
npm install
npx expo start
```



## 🛠️ Tech Stack & Libraries
* **Client Framework**: [Expo SDK 54](https://expo.dev) (React Native)
* **Backend Framework**: [Node.js Express](https://expressjs.com/)
* **Routing**: [Expo Router v3](https://docs.expo.dev/router/introduction/) (File-based)
* **Session Persistence**: `@react-native-async-storage/async-storage`
* **Gradients**: `expo-linear-gradient`
* **Icons**: `@expo/vector-icons` (Feather, Ionicons)
* **State Management**: [Zustand](https://github.com/pmndrs/zustand)

