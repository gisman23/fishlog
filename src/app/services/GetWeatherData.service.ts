import { Injectable } from '@angular/core';
import { Weather } from '../models/conditions.model';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class GetWeatherDataService {

  constructor(private httpClient:HttpClient){}

  async getWeatherData (weather: Weather, photoDate:string, photoCoords:number[]) {

    let requestUrl: string;
    let astronomyUrl: string;

    const catchDate = photoDate.substring(0,10).replaceAll(':','-') + 'T' + photoDate.substring(11,16) + ':00'


    requestUrl = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/weatherdata/history?"
    requestUrl += "&unitGroup=us&locationMode=single&contentType=json"
    requestUrl += "&aggregateHours=1&dayStartTime=0:0:00&dayEndTime=0:0:00"
    requestUrl += "&include=hours&key=FKEXBSJDBMZ5LLDPY88HERZ9D&contentType=json"
    requestUrl += "startDateTime=" + catchDate + "&endDateTime=" + catchDate
    requestUrl += "&location=" + photoCoords[1].toString() + "," + photoCoords[0].toString();

    await this.httpClient.get(requestUrl).subscribe((response) => {

      weather.AirTemp = response['location']['values'][0]['temp']
      const windDir = response['location']['values'][0]['wdir']
      weather.WindSpeed = response['location']['values'][0]['wspd']
      weather.Pressure = response['location']['values'][0]['sealevelpressure']

      if (windDir > 11.25 && windDir <= 33.75)
        weather.WindDirection = "NNE"
      else if (windDir > 33.75 && windDir <= 56.25)
        weather.WindDirection = "NE"
      else if (windDir > 56.25 && windDir <= 78.75)
        weather.WindDirection = "ENE"
      else if (windDir > 78.75 && windDir <= 101.25)
        weather.WindDirection = "E"
      else if (windDir > 101.25 && windDir <= 123.75)
        weather.WindDirection = "ESE"
      else if (windDir > 123.75 && windDir <= 146.25)
        weather.WindDirection = "SE"
      else if (windDir > 146.25 && windDir <= 168.75)
        weather.WindDirection = "SSE"
      else if (windDir > 168.75 && windDir <= 191.25)
        weather.WindDirection = "S"
      else if (windDir > 191.25 && windDir <= 213.75)
        weather.WindDirection = "SSW"
      else if (windDir > 213.75 && windDir <= 236.25)
        weather.WindDirection = "SW"
      else if (windDir > 236.25 && windDir <= 258.75)
        weather.WindDirection = "WSW"
      else if (windDir > 258.75 && windDir <= 281.25)
        weather.WindDirection = "W"
      else if (windDir > 281.25 && windDir <= 303.75)
        weather.WindDirection = "WNW"
      else if (windDir > 303.75 && windDir <= 326.25)
        weather.WindDirection = "NW"
      else if (windDir > 326.25 && windDir <= 348.75)
        weather.WindDirection = "NNW"
      else if (windDir > 348.75 && windDir <= 360.00)
        weather.WindDirection = "N"
      else if (windDir >= 0 && windDir <= 11.25)
        weather.WindDirection = "N"
      else
        weather.WindDirection = ""
    })

    astronomyUrl = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/"
    astronomyUrl += photoCoords[1].toString() + "," + photoCoords[0].toString() + "/" + photoDate.substring(0,10).replaceAll(':','-') + "?"
    astronomyUrl += "&unitGroup=us&key=FKEXBSJDBMZ5LLDPY88HERZ9D"
    astronomyUrl += "&include=days&elements=moonphase,sunrise,sunset&contentType=json"

    await this.httpClient.get(astronomyUrl).subscribe((response) => {
      weather.Sunrise = response['days'][0]['sunrise'];
      weather.Sunset = response['days'][0]['sunset'];
      const moon = (response['days'][0]['moonphase'])

      if (moon == 0)
        weather.MoonPhase = "New Moon"
      else if (moon > 0 && moon < 0.25)
        weather.MoonPhase = "Waxing Cresent"
      else if (moon == 0.25)
      weather.MoonPhase = "First Quarter"
      else if (moon > 0.25 && moon < 0.50)
        weather.MoonPhase = "Waxing Gibbous"
      else if (moon == 0.50)
        weather.MoonPhase = "Full Moon"
      else if (moon > 0.50 && moon < 0.75)
        weather.MoonPhase = "Waning Gibbous"
      else if (moon == 0.75)
        weather.MoonPhase = "Last Quarter"
      else if (moon > 0.75 && moon < 1.0)
        weather.MoonPhase = "Waning Crescent"
      else
        weather.MoonPhase = ""
    }); 
    
    return weather
  } 
}