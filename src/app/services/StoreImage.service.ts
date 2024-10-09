import { Injectable } from '@angular/core';
import { Observable, take} from 'rxjs';
import * as S3  from 'aws-sdk/clients/s3';

@Injectable({
    providedIn: 'root'
})

export class StoreImageService {

    storageLoc: any;
    downloadURL: Observable<string>;

    constructor() { }

    async storeImageData(base64Data:any) {
            var promise: any = new Promise((resolve, reject) => {
              const today = new Date();
              let month = today.getMonth() + 1;
              let s = "000000000" + month;
              let fullMonth = s.substring(s.length-2)
        
              let year = today.getFullYear()
        
              const params = {
                Bucket: 'fishapppics',
                Key: year + '/' + fullMonth + '/' + Date.now() + '.jpeg',
                Body: base64Data,
              };

                const bucket = new S3({
                  accessKeyId: 'AKIAQMZJAHTIAT27CHWF',
                  secretAccessKey: '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',
                  region: 'us-east-1',
                  signatureVersion: 'v4',
                });
    
                // Upload file to specified bucket.
                bucket.upload(params, (err: any, data: any) => {
                  if (err) {
                    console.log('EROOR: ', JSON.stringify(err));
                  } else {
                    return resolve(data['Location']);
                  }
                });
              });

          await promise.then((data: any) => {
            this.storageLoc = data;
          });
    }

    getPic() {
      return this.storageLoc
    }
  }