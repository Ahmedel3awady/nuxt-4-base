class Observable {
  private static instance: Observable;
  private handlers: { [key: string]: Function } = {};

  constructor() {
    if (Observable.instance) {
      return Observable.instance;
    }
    Observable.instance = this;
  }

  subscribe(fnName: string, callback: Function): void {
    this.handlers[fnName] = callback;
  }

  unsubscribe(fnName: string): void {
    delete this.handlers[fnName];
  }

  async fire<T = any>(fnName: string, data?: any): Promise<T | undefined> {
    try {
      if (this.handlers[fnName]) {
        const result = await Promise.resolve(this.handlers[fnName](data));
        return result as T;
      }
      return undefined;
    } catch (error) {
      console.error(`Error in observer handler ${fnName}:`, error);
      throw error;
    }
  }

  isExist(handlerKey: string): boolean {
    return Boolean(this.handlers[handlerKey]);
  }
}

export const observer = new Observable();