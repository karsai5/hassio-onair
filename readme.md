# HASSIO OnAir

A script to trigger a sensor in you homeassistant when your webcam becomes in use.

## Installation instructions

1. You have to buy a third party app in order to identify if your webcam is in use. There is other free applications that do a similar thing, but I've had the most consistent luck with https://obdev.at/microsnitch
2. Install hassio-onair `npm install hassio-onair -g`
3. Make sure you're using a version of node that's 12 or greater, check with `node --version`. There's a problem with earlier versions of node where it won't pick up on file changes correctly.

## Testing it works
1. Create a long lived access token from the profile settings in home assistant.
2. Run the script with `onair -h <HOME_ASSISTANT_URL> -k <LONG_LIVED_ACCESS_TOKEN>`
3. Have micro snitch running
3. Open photobooth
4. Check that the `sensor.on_air` entity is updated in home assistant

## Creating a shortcut to make it easier to start
1. Create an automater script to make it easier to start up
   1. Open Automator
   2. File -> New
   3. Type: Application
   4. Add action: Run Shell Script
   5. Use the following command
      ```
      onair -h <HOME_ASSISTANT_URL> -k <LONG_LIVED_ACCESS_TOKEN> >/dev/null 2>&1 &
      ```
   6. Save
2. Start from applications folder (the app icon will immediately disappear, this is because the script runs in the brackground)
