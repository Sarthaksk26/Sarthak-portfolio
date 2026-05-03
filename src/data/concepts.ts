import { Zap, Eye, Code2, RotateCw } from 'lucide-react';

export const concepts = [
  {
    id: 'debounce-throttle',
    title: 'Debounce & Throttle',
    icon: Zap,
    description: 'Techniques to limit the rate at which a function fires. Crucial for performance in search bars, scroll handlers, and window resizing.',
    analogy: 'Think of Debounce as an elevator: it waits until people stop getting in before moving. Throttle is a train: it leaves every 5 minutes, no matter how many people are waiting.',
    githubUrl: 'https://github.com/Sarthaksk26/debounce_and_throttling',
  },
  {
    id: 'intersection-observer',
    title: 'Intersection Observer',
    icon: Eye,
    description: 'A performant API to detect when an element enters or leaves the viewport, replacing expensive scroll event listeners.',
    analogy: 'Instead of constantly asking "Are we there yet?" (scroll events), the Intersection Observer is a GPS that notifies you exactly when you arrive.',
    githubUrl: 'https://github.com/Sarthaksk26/Intersection-Observer',
  },
  {
    id: 'custom-hooks',
    title: 'Custom React Hooks',
    icon: Code2,
    description: 'Extracting stateful logic into reusable functions. A clean way to share behavior across multiple components.',
    analogy: 'If components are the ingredients in a kitchen, Custom Hooks are the standardized recipes you write down so you do not have to reinvent how to bake a cake every time.',
  },
  {
    id: 'event-loop',
    title: 'The Event Loop',
    icon: RotateCw,
    description: 'The secret behind JavaScripts asynchronous, non-blocking concurrency model despite being single-threaded.',
    analogy: 'A restaurant with one waiter (Call Stack). When an order takes time (Web API), they pass it to the kitchen and keep taking new orders instead of freezing.',
  }
];
