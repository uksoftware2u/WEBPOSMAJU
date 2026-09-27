import { useSyncExternalStore } from "react";
import { createDownloadCounter, DOWNLOAD_COUNT_KEY } from "./download-counter.js";

const counter = createDownloadCounter(() => window.localStorage);
const listeners = new Set();
const notify = () => listeners.forEach(listener => listener());
const storageChanged = event => {
  if (event.key === DOWNLOAD_COUNT_KEY || event.key === null) notify();
};
const subscribe = listener => {
  if (listeners.size === 0) window.addEventListener("storage", storageChanged);
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) window.removeEventListener("storage", storageChanged);
  };
};
const increment = () => { counter.increment(); notify(); };
export function useDownloadCounter() {
  return [useSyncExternalStore(subscribe, () => counter.read(), () => 1000), increment];
}
