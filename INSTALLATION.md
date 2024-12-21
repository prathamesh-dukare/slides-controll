# Installation Guide

This guide will help you set up the Slide Control project locally. The project consists of three main components:

- Web Client (React + Vite)
- Desktop Client (Electron)
- Server (Node.js + TypeScript)

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v20 or higher)
- npm or yarn
- Git
- Docker (optional, for server deployment)

## Quick Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Prathamesh-Dukare/slide-control.git
```

### 2. Setup Server

```bash
cd slide-control/server
npm install
```

### 3. Setup Web Client

```bash
cd slide-control/web-client
npm install
```

### 4. Setup Desktop Client

```bash
cd slide-control/desktop-client
npm install
```

### 5. Run the Server

```bash
cd slide-control/server
npm run dev
```

### 6. Run the Web Client

```bash
cd slide-control/web-client
npm run dev
```

### 7. Run the Desktop Client

```bash
cd slide-control/desktop-client
npm run start
```

### 8. Initialize the .env file and make necessary changes

```bash
cd slide-control
cp .env.example .env
```

## 9. Packaging the Desktop Apps

```bash
cd slide-control/desktop-client
npm run make
```

You need to install Wine and Mono to make the desktop apps on macOs. You can get those via brew.

## 🎉 Congratulations!

You have successfully set up the Slide Control project. You can now use the web client to control your slides.
