const KEY = 'notes_app_data_v1';

export function load() {
  try {
    const data = localStorage.getItem(KEY);
    return data ? JSON.parse(data) : { notes: [] };
  } catch {
    return { notes: [] };
  }
}

export function save(data) {
  localStorage.setItem(KEY, JSON.stringify(data));
}

export function uid() {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 7);
}
