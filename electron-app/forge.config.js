const { FusesPlugin } = require("@electron-forge/plugin-fuses");
const { FuseV1Options, FuseVersion } = require("@electron/fuses");

module.exports = {
  packagerConfig: {
    asar: true,
    arch: ["x64"],
    platforms: ["win32", "darwin", "linux"],
    executableName: "SlideControl",
  },
  rebuildConfig: {},
  makers: [
    // todo: fix win-stable secure installation and rebuild with squirrel config
    // {
    //   name: "@electron-forge/maker-squirrel",
    //   config: {
    //     name: "slide-control",
    //     authors: "Prathamesh Dukare",
    //     exe: "slide-control.exe",
    //   },
    // },
    {
      name: "@electron-forge/maker-zip",
      platforms: ["win32"],
      config: {
        name: "SlideControl",
      },
    },
    {
      name: "@electron-forge/maker-zip",
      platforms: ["darwin"],
      config: {
        name: "SlideControl",
      },
    },
    {
      name: "@electron-forge/maker-dmg",
      config: {
        format: "ULFO",
        name: "SlideControl",
        icon: "./public/logo.svg",
      },
    },
    {
      name: "@electron-forge/maker-deb",
      config: {
        options: {
          maintainer: "Prathamesh Dukare",
          homepage: "https://github.com/prathamesh-dukare/slide-control",
          icon: "./public/logo.svg",
        },
      },
    },
    {
      name: "@electron-forge/maker-rpm",
      config: {
        options: {
          maintainer: "Prathamesh Dukare",
          homepage: "https://github.com/prathamesh-dukare/slide-control",
          icon: "./public/logo.svg",
        },
      },
    },
  ],
  plugins: [
    {
      name: "@electron-forge/plugin-auto-unpack-natives",
      config: {},
    },
    new FusesPlugin({
      version: FuseVersion.V1,
      [FuseV1Options.RunAsNode]: false,
      [FuseV1Options.EnableCookieEncryption]: true,
      [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
      [FuseV1Options.EnableNodeCliInspectArguments]: false,
      [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
      [FuseV1Options.OnlyLoadAppFromAsar]: true,
    }),
  ],
};
