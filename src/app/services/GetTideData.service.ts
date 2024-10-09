import { Injectable } from '@angular/core';
import { Tides} from '../models/conditions.model';
import { HttpClient} from '@angular/common/http'
import axios from 'axios';
import * as dayjs from 'dayjs'
import * as utc from 'dayjs/plugin/utc';
import * as timezone from 'dayjs/plugin/timezone';
import * as customParseFormat from 'dayjs/plugin/customParseFormat'

@Injectable({
  providedIn:  'root'

})
export class GetTideDataService {

  FishDate: string;
  EventDate: string;

  //customParseFormat = require('dayjs/plugin/customParseFormat');

  constructor(private httpClient:HttpClient){}

  getTideData = async ( bodyOfWater: any, tides: Tides, photoDate:string) => {

    dayjs.extend(customParseFormat);
    dayjs.extend(utc)
    dayjs.extend(timezone);
    dayjs.tz.setDefault('America/New_York');

    this.EventDate = dayjs(photoDate, 'YYYY:MM:DD HH:mm:ss').format('YYYYMMDD HH:mm');
    this.FishDate = dayjs(photoDate, 'YYYY:MM:DD').format('YYYYMMDD');


    const queryString1 = new URLSearchParams({
      end_date:  this.EventDate,
      range: '1',
      product: 'water_temperature',
      format: 'json',
      units: 'english',
      time_zone: 'lst_ldt',
      station: bodyOfWater.wtempStationID,
    });
    const waterURL =
      'https://api.tidesandcurrents.noaa.gov/api/prod/datagetter?' + queryString1;

    const queryString2 = new URLSearchParams({
      begin_date:  this.FishDate,
      end_date: this.FishDate,
      product: 'predictions',
      interval: 'hilo',
      datum: 'mllw',
      format: 'json',
      units: 'english',
      time_zone: 'lst_ldt',
      station: bodyOfWater.stationID,
    });
    const tideURL =
      'https://api.tidesandcurrents.noaa.gov/api/prod/datagetter?' + queryString2;

    let endpoints = [waterURL, tideURL];
    await axios.all(endpoints.map((endpoint) => axios.get(endpoint))).then(
      axios.spread(({ data: waterData }, { data: tideData }) => {
        tides.TideInfo = tideData['predictions']
        for (let step = 0; step < tideData['predictions'].length; step++) {
          const tidedate = dayjs(tideData['predictions'][step]['t']);

          if (dayjs( this.EventDate).isAfter(tidedate)) {
            if (tideData['predictions'][step]['type'] == 'H') {
              tides.HighTideOffset = tidedate.diff( this.EventDate, 'minutes') * -1;
            } else {
              tides.LowTideOffset = tidedate.diff( this.EventDate, 'minutes') * -1;
            }
          } else {
            if (tideData['predictions'][step]['type'] == 'H') {
              tides.HighTideOffset = tidedate.diff( this.EventDate, 'minutes') * -1;
            } else {
              tides.LowTideOffset = tidedate.diff( this.EventDate, 'minutes') * -1;
            }
            if (tides.HighTideOffset > Math.abs(tides.LowTideOffset))
              tides.TideDirection = "High to Low"
            else
              tides.TideDirection = "Low to High"
            break;
          }
        }
        console.log("water", waterData)
        if (waterData['data'] ) {
          const length = waterData['data'].length - 1;
          tides.WaterTemp = waterData['data'][length]['v'];
        }
        else
          tides.WaterTemp = 0;
      })
    ); 
    return {tides};
  };
}