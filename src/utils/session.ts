
const Session = {
  set(key: string, value: any): void  {
    sessionStorage.setItem(key, JSON.stringify({data: value}))
  },
  get(key: string): any {
    let storage: any = sessionStorage.getItem(key);
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
    sessionStorage.removeItem(key);
  },
  clear(): void {
    sessionStorage.clear();
  }
}

export default Session;
