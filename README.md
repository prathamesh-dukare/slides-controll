# Slide Control

> A remote on web to control to your presentations

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE) [![Open Source Love](https://badges.frapsoft.com/os/v2/open-source.svg?v=103)](https://github.com/Prathamesh-Dukare)

## 🚀 Overview

Slide controll is a tool with which you can controll your presentations from your phone, tablet or any other computer.

## 🛠️ Tech Stack

This uses websockets as a main communication channel between the web and the desktop application.

- Backend uses Node.js, TypeScript, and Docker for easier deployment.
- The Web client is built with React using Vite, styled with TailwindCSS and Shadcn UI components.
- The desktop client is powered by the ElectronJs framework.

## 🤔 Thought process

In the RnD, I experemented controlling the computer using a chrome extension, but I failed at it due to restrictions. One drawback was that we cant access anything outside the browser. I knew that I have to use a desktop app to have more freedom to do things and Electron was the obvious choice considering the timing and tech stack.

So, In the current implementation, I send commands from the web app via websocket to the desktop app (routed via server). According to the command, the NodeJS mimics the behaviour of keyboard arrow keys. I use a fork of nut-js for this purpose as nutjs is no longer free. The authors have given permission for creating and distributing forks [read more](https://nutjs.dev/blog/i-give-up)

## 🚧 Issues in current implementation

- Socket routing causing little bit of latency
- Not able to connect with local networks such as Bluetooth or Wifi
- Sessions are stored in-memory at server which is not a good idea if this scales or users have longer sessions. I will shift to something like Redis.

## 🔮 Future scope of this project

- Add support for local networks such as Bluetooth or Wifi
- Switch to Redis for storing sessions
- Explore more sophisticated technologies such as webRTC, local-networks to reduce the latency

> I see this project going in the direction of solving multiple small use cases, such as media control, etc. (My friends and I are already using this to control YouTube while having food, lol.) I will see how this goes and accordingly make it better. If you have any suggestions or feedback, please let me know.

## Contributing

I am open to any suggestions and contributions. Please feel free to open an issue or a PR and get started. You can find the [Installation guide](./INSTALLATION.md). I have already added a few [issues](https://github.com/prathamesh-dukare/slides-controll/issues) which you can pick up and get started.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
