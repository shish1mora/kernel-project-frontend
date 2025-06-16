// indexedDB.js
import { openDB } from 'idb';

const dbPromise = openDB('FetchCacheDB', 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains('fetchCache')) {
      db.createObjectStore('fetchCache', { keyPath: 'url' });
    }
  },
});

export const getCachedData = async (url) => {
  const db = await dbPromise;
  return db.get('fetchCache', url);
};

export const saveCachedData = async (url, data) => {
  const db = await dbPromise;
  return db.put('fetchCache', { url, data, timestamp: Date.now() });
};

export const clearOldCache = async (maxAge = 3600000) => { // Default max age is 1 hour
  const db = await dbPromise;
  const tx = db.transaction('fetchCache', 'readwrite');
  const store = tx.objectStore('fetchCache');
  const allKeys = await store.getAllKeys();
  const now = Date.now();
  allKeys.forEach(async (key) => {
    const cachedItem = await store.get(key);
    if (now - cachedItem.timestamp > maxAge) {
      await store.delete(key);
    }
  });
  await tx.done;
};

// Очистка кеша при обновлении страницы
window.addEventListener('beforeunload', async () => {
  const db = await dbPromise;
  const tx = db.transaction('fetchCache', 'readwrite');
  const store = tx.objectStore('fetchCache');
  const allKeys = await store.getAllKeys();
  allKeys.forEach(async (key) => {
    await store.delete(key);
  });
  await tx.done;
});