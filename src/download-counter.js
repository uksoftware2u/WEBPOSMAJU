export const DOWNLOAD_COUNT_KEY = "pos-maju-download-clicks-v1";
export const DOWNLOAD_COUNT_START = 1000;

export function createDownloadCounter(getStorage) {
  let memory = DOWNLOAD_COUNT_START;
  return {
    read() {
      try {
        const raw = getStorage().getItem(DOWNLOAD_COUNT_KEY);
        const value = raw === null ? DOWNLOAD_COUNT_START : Number(raw);
        memory = Number.isSafeInteger(value) && value >= DOWNLOAD_COUNT_START ? value : DOWNLOAD_COUNT_START;
      } catch { /* Storage blocked: keep the in-memory session count. */ }
      return memory;
    },
    increment() {
      memory = Math.min(this.read() + 1, Number.MAX_SAFE_INTEGER);
      try { getStorage().setItem(DOWNLOAD_COUNT_KEY, String(memory)); } catch { /* Downloads must still work. */ }
      return memory;
    },
  };
}

export const downloadCountCopy = {
  en: "This browser",
  zh: "当前浏览器",
  ms: "Pelayar ini",
  th: "เบราว์เซอร์นี้",
  vi: "Trình duyệt này",
};
