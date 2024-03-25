const { FusesPlugin } = require('@electron-forge/plugin-fuses');
const { FuseV1Options, FuseVersion } = require('@electron/fuses');

module.exports = {
  packagerConfig: {
    asar: true,
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {},
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
    },
    {
      name: '@electron-forge/maker-deb',
      config: {},
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {},
    },
  ],
  plugins: [
    {
      name: '@electron-forge/plugin-auto-unpack-natives',
      config: {},
    },
    new FusesPlugin({
      version: FuseVersion.V1,
      [FuseV1Options.RunAsNode]: false, // Disables ELECTRON_RUN_AS_NODE
      [FuseV1Options.EnableCookieEncryption]: true, // Enables cookie encryption
      [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false, // Disables the NODE_OPTIONS environment variable
      [FuseV1Options.EnableNodeCliInspectArguments]: false, // Disables the --inspect and --inspect-brk family of CLI options
      [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true, // Enables validation of the app.asar archive on macOS
      [FuseV1Options.OnlyLoadAppFromAsar]: true, // Enforces that Electron will only load your app from "app.asar" instead of its normal search paths
      [FuseV1Options.LoadBrowserProcessSpecificV8Snapshot]: true, // Loads V8 Snapshot from `browser_v8_context_snapshot.bin` for the browser process
      [FuseV1Options.GrantFileProtocolExtraPrivileges]: false, // Grants the file protocol extra privileges
    }),
  ],
};
