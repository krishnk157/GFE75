// Implement an analytics SDK that exposes log events, it takes in events and queues them, and then starts sending the events. The SDK should adhere the following properties.

// Send each event after a delay of 1 second and this logging fails every n % 5 times.
// Send the next event only after the previous one resolves.
// When the failure occurs attempt a retry.

// Example
// Input:
// const sdk = new SDK();

// sdk.logEvent("event 1");
// sdk.logEvent("event 2");
// sdk.logEvent("event 3");
// sdk.logEvent("event 4");
// sdk.logEvent("event 5");
// sdk.logEvent("event 6");
// sdk.logEvent("event 7");
// sdk.logEvent("event 8");
// sdk.logEvent("event 9");
// sdk.logEvent("event 10");

// sdk.send();

// Output:
// "Analytics sent event 1"
// "Analytics sent event 2"
// "Analytics sent event 3"
// "Analytics sent event 4"
// "-----------------------"
// "Failed to send event 5"
// "Retrying sending event 5"
// "-----------------------"
// "Analytics sent event 5"
// "Analytics sent event 6"
// "Analytics sent event 7"
// "Analytics sent event 8"
// "-----------------------"
// "Failed to send event 9"
// "Retrying sending event 9"
// "-----------------------"
// "Analytics sent event 9"
// "Analytics sent event 10"

class AnalyticsSDK {
  constructor() {
    this.eventsQueue = [];
    this.eventIndex = 1;
  }

  logEvent(val) {
    this.eventsQueue.push(val);
  }

  async processSend(event) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (this.eventIndex % 5 === 0) {
          console.log("-----------------------");
          console.log(`Failed to send ${event}`);
          reject();
        } else {
          console.log(`Analytics sent ${event}`);
          resolve();
        }
        this.eventIndex++;
      }, 1000);
    });
  }

  async send() {
    while (this.eventsQueue.length) {
      const event = this.eventsQueue.shift();
      try {
        await this.processSend(event);
      } catch (error) {
        console.log(`Retrying sending ${event}`);
        console.log("-----------------------");
        this.eventsQueue.unshift(event);
      }
    }
  }
}

export const analytics = new AnalyticsSDK();
