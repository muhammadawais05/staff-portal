# Communication library

This library contains features related to communication (emails, calls) that are
reused across other packages.

## TopCall

The [TopCall](https://github.com/toptal/topcall) is a browser extension
(currently supporting Google Chrome) that allows users of the Platform and Staff
Portal to make and receive calls to clients and talents, and initiate video
conferences via the external BlueJeans service. Data such as call/meeting
duration is then tracked and made available to the Analytics team.

### Where does the widget get the data to display client or talent data?

#### Platform

The Platform sends the required data for the TopCall to the `window.gon` via
Ruby gem `gon`. And then the TopCall uses this data to render phone number,
talent/client name, etc.

#### Staff Portal

In Staff Portal we don't have Ruby gem `gon`. We can use
[CustomEvent](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent)
to communicate between two scripts (Staff Portal and TopCall). We don't know
what script will be fired first: in Staff Portal or in TopCall. That's why we
need to make a handshake between them to be able to send events to each other.
Basic schema how it works looks like this:

```js
// TopCall.js:
on('staff_portal_send_data', data => setData(data))
emit('topcall_init')

// StaffPortal.js:
on('topcall_init', () => emit('staff_portal_send_data', data))
emit('staff_portal_send_data', data)
```

You can see it in
[useCommunicateWithTopCall](./src/hooks/use-communicate-with-top-call/use-communicate-with-top-call.tsx)

#### Event names

Event names `EXTERNAL_DATA_SEND` and `TOPCALL_INIT` should be the same as
[here](https://github.com/toptal/topcall/blob/master/extension/inject/external-communication.js)
