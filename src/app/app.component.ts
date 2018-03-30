import { Component } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database-deprecated';
import { AngularFireAuthModule } from 'angularfire2/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AngularFireDatabase]
})
export class AppComponent {
  title = 'app';
  description = 'Angular4-Firebase Demo';
  itemValue = '';
  items: FirebaseListObservable<any[]>;
 
  constructor(db: AngularFireDatabase) {
    this.items = db.list('/items');
  }
 
  onSubmit() {
    this.items.push({content: this.itemValue});
    this.itemValue = '';
  }
}
