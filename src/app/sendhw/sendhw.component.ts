import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-sendhw',
  templateUrl: './sendhw.component.html',
  styleUrls: ['./sendhw.component.css']
})
export class SendhwComponent implements OnInit {
  hm = [];
  constructor(
    public db: AngularFireDatabase,
    private spinner: NgxSpinnerService,
  ) {
    let uid = localStorage.getItem('uid');
    db.database.ref(`Users/`).once('value').then(data => {
      // tslint:disable-next-line:forin
      for (var key in data.val()) {
        // console.log(data.val()[key]['courses']);
        // tslint:disable-next-line:forin
        for (let key2 in data.val()[key]['courses']) {
            console.log(data.val()[key]['courses']);
          if (key2 != 'new') {
            this.hm.push({
              uid: key,
              value: key2,
              name: data.val()[key]['courses'][key2]['name'],
              detail: data.val()[key]['courses'][key2]['detail'],
              list: data.val()[key]['courses'][key2]['list']||undefined
            });
          }
          // console.log(key2);
        }
      }
      this.spinner.hide();
      // console.log(this.hm)
    });
  }

  ngOnInit() {
    this.spinner.show()
  }

}
