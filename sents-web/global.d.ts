// global.d.ts

export {};

declare global {
  interface Window {
    TradingView: any; // Use 'any' or define a more specific type if available
  }
}
