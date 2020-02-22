
const Local = {
  set(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify({data: value}))
  },
  get(key: string): any {
    let storage: any = localStorage.getItem(key);
    if (storage) {
      try {
        storage = JSON.parse(storage)
        return storage.data;
      } catch(e) {
        return null
      }
    }
    return null
  },
  remove(key: string): void {
    localStorage.removeItem(key);
  },
  clear(): void {
    localStorage.clear();
  }
}

export default Local;
