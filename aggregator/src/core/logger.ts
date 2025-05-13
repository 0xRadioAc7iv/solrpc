import { LogEntry } from "../types";

export class LogBuffer {
  private buffer: LogEntry[];
  private capacity: number;
  private index: number;
  private size: number;

  constructor(capacity = 1000) {
    this.buffer = new Array(capacity);
    this.capacity = capacity;
    this.index = 0;
    this.size = 0;
  }

  add(entry: LogEntry) {
    this.buffer[this.index] = entry;
    this.index = (this.index + 1) % this.capacity;
    if (this.size < this.capacity) this.size++;
  }

  getLogs(): LogEntry[] {
    return [
      ...this.buffer.slice(this.index, this.size),
      ...this.buffer.slice(0, this.index),
    ].filter(Boolean);
  }

  clear() {
    this.buffer = new Array(this.capacity);
    this.index = 0;
    this.size = 0;
  }
}
