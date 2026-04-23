export {}

declare global {
  interface FetchMonitor {
    active: boolean
    count: number
  }

  interface Window {
    fetchMonitor?: FetchMonitor
    pendo?: pendo.Pendo
  }

  interface FetchMonitor {
    active: boolean
    count: number
  }
}
