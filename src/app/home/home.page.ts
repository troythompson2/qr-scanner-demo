import { Component } from '@angular/core';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  readyToScan: boolean = false;
  scanning: boolean = false;

  constructor(private qrScanner: QRScanner) { }

  ngOnInit(): void {
    console.log("Home Page Initialized");
  }

  prepareScanner(): void {
    this.qrScanner.prepare()
      .then((status: QRScannerStatus) => {
        if (status.authorized) {
          console.log("Camera permision authorized");
          this.readyToScan = true;
          this.scanning = true;
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

  toggleScanner(): void {
    this.scanning = !this.scanning;
    console.log("Toggled Scanner", this.scanning);
    if (this.scanning) { this.startScanning(); }
    else { this.stopScanning(); }
  }

  startScanning(): void {
    console.log("Started Scanning");
    (window.document.querySelector('html') as HTMLElement).classList.add('cameraView');
  }

  stopScanning(): void {
    console.log("Stopped Scanning");
    (window.document.querySelector('html') as HTMLElement).classList.remove('cameraView');
  }

}
