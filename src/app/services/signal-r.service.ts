import { Injectable } from '@angular/core';
import {ChartModel} from '../chart-model';
import * as signalR from '@aspnet/signalr';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  public data: ChartModel[];

  private hubConnection: signalR.HubConnection;

  public startConnection = () => {

    this.hubConnection = new signalR.HubConnectionBuilder()
      .configureLogging(signalR.LogLevel.Debug)
      .withUrl('https://localhost:5001/chart', {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets
      })
      .build();

    this.hubConnection.start()
      .then(() => console.log('Connection started'))
      .catch(err => console.error('Error while starting connection: ' + err))
  }

  public addTransferChartDataListener = () => {
    this.hubConnection.on('transferchartdata', (data) => {
      this.data = data;
      console.log(data);
    });
  }

  constructor() { }
}
