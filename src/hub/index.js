import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr'

const backendURL = process.env.VUE_APP_BACKEND_URL;
export default {
  
  install (Vue) {
    const connection = new HubConnectionBuilder()
      .withUrl(backendURL + 'message-hub')
      .configureLogging(LogLevel.Information)
      .build()
 
    connection.start()

  
    Vue.config.globalProperties.$messageHub = connection;
  }
}