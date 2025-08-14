export function IdGenerator(): string {
  return Math.floor(Math.random() * 1000).toString();
}
