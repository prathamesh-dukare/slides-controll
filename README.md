# Slide Control

> A remote on web to control your presentations

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE) [![Open Source Love](https://badges.frapsoft.com/os/v2/open-source.svg?v=103)](https://github.com/Prathamesh-Dukare)

## Overview

Slide controll is a tool with which you can controll your presentations from your phone, tablet or any other computer.

How to use Guide/Demo is available [here](https://peerlist.io/prathamesh/articles/peerlist-hackathon-project-demo).

## Tech Stack

This uses websockets as a main communication channel between the web and the desktop application.

- Backend uses Node.js, TypeScript, and Docker for easier deployment.
- The Web client is built with React using Vite, styled with TailwindCSS and Shadcn UI components.
- The desktop client is powered by the ElectronJs framework.

## Thought process

In the RnD, I experemented controlling the computer using a chrome extension, but I failed at it due to sandbox restrictions. One drawback was that we cant access anything outside the browser. I got to know that I have to use a desktop app to have more freedom to do things and Electron was the obvious choice considering the timing and tech stack.

So, In the current implementation, I send commands from the web app via websocket to the desktop app (routed via server). According to the command, the NodeJS mimics the behaviour of keyboard arrow keys. I use a fork of nut-js for this purpose as nutjs is no longer free. The authors have given permission for creating and distributing forks [read more](https://nutjs.dev/blog/i-give-up).

## Issues / limitations in current implementation

- Socket routing causing little bit of latency
- Sessions are stored in-memory at server which is not a good idea if this scales or users have longer sessions. Need to shift to something like Redis.
- The window needs to be an active window.

> ⚠️ Current versions of desktop apps is not code signed and hence might create some issue while installing them on your computers. (I will create a detailed guide on why this happens and how to deal with this)

## Future scope of this project

- Add support for local networks such as Bluetooth or Wifi
- Control with the volume buttons of a mobile phone and add a slider for improved UX
- Switch to Redis for storing sessions
- Explore more sophisticated technologies such as webRTC to reduce the latency

> I see this project going in the direction of solving multiple small use cases, such as **media control**, **presentation control**, etc. I will see how this goes and make it better accordingly. If you have any suggestions or feedback, please let me know.

## Contributing

I am open to any suggestions and contributions. Please feel free to open an issue or a PR and get started. You can find the [Installation guide](./INSTALLATION.md). I have already added a few [issues](https://github.com/prathamesh-dukare/slides-controll/issues) which you can pick up and get started.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
