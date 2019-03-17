import { Component } from '@angular/core';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private qrScanner: QRScanner) { }

  ngOnInit(): void {
    console.log("Home Page Initialized");
  }

  ngAfterViewInit(): void {
    console.log("After Home Page Initialized");
  }

  startScanning() {
    console.log("Preparing QR Scranner");
    this.qrScanner.prepare()
      .then((status: QRScannerStatus) => {
        if (status.authorized) {
          console.log("Camera permision authorized");
          let scanSub = this.qrScanner.scan().subscribe((text: string) => {
            console.log('Scanned something', text);
            this.qrScanner.hide();
            scanSub.unsubscribe();
          });
        } else if (status.denied) {
          console.log("Camera permission permanently denied");
        } else {
          console.log("Camera permision temporarily denied");
        }
      })
      .catch((e: any) => console.log('Error is', e));
  }

}
