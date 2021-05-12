# Focusmate (unofficial)

Community-maintained app for Focusmate. This is just meant to bridge a feature gap until the official team has time to roll out a solution of their own.

## Features
- __Upcoming session notifications.__ Notifies you 10 minutes before a session.

## Limitations
- __Android only.__ For now. iOS device testers needed.
- __Email sign-in only.__ Federated sign-in hopefully coming soon, but might require cooperation with the official Focusmate team.
- __No remote push notifications.__ The app pings the Focusmate /session API as frequently as it can, which is limited to once every 15 minutes by the OS. This means that sessions scheduled less than 15 minutes into the future might not get a notification. The ideal solution to this requires cooperation with the Focusmate backend.

## Upcoming
- __Configurable notification period.__ Allow the user to change how long before a session the notification gets posted.
