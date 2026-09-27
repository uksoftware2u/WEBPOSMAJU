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
  en: ["This browser", "Download clicks in this browser. Starts at 1,000; not a global total or completed downloads. Clearing site data resets the count."],
  zh: ["当前浏览器", "当前浏览器的下载点击次数，以 1,000 为初始值；不是全站总数或已完成下载数。清除网站数据后会重置。"],
  ms: ["Pelayar ini", "Klik muat turun dalam pelayar ini, bermula pada 1,000. Bukan jumlah global atau muat turun selesai. Memadam data laman menetapkan semula kiraan."],
  th: ["เบราว์เซอร์นี้", "จำนวนคลิกดาวน์โหลดในเบราว์เซอร์นี้ เริ่มที่ 1,000 ไม่ใช่ยอดรวมทุกคนหรือจำนวนดาวน์โหลดสำเร็จ ล้างข้อมูลเว็บไซต์จะรีเซ็ตจำนวน"],
  vi: ["Trình duyệt này", "Số lượt nhấp tải xuống trong trình duyệt này, bắt đầu từ 1.000. Không phải tổng toàn trang hay lượt tải hoàn tất. Xóa dữ liệu trang sẽ đặt lại số đếm."],
};
