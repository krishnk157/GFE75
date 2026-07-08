// Create a simple Observable class that implements the observer pattern. The class should:

// Allow subscribing to data changes via a subscribe method
// Notify all subscribers when data changes via a notify method
// Allow unsubscribing from updates
// Maintain a list of subscriber callbacks

class Observable {
  constructor() {
    this.observers = [];
  }

  subscribe(fn) {
    this.observers.push(fn);

    const unsubscribe = () => {
      this.observers = this.observers.filter((obs) => obs !== fn);
    };

    return {
      unsubscribe,
    };
  }

  notify(data) {
    this.observers.forEach((fn) => fn(data));
  }
}

const observable = new Observable();

// Subscribe to changes
const subscription = observable.subscribe((data) => {
  console.log("Received:", data);
});

// Notify subscribers
observable.notify("Hello!"); // logs: "Received: Hello!"

// Unsubscribe
subscription.unsubscribe();

// No longer logs anything
observable.notify("Hello again!");
