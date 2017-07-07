import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { Profile } from './../../models/profile';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  profileData: FirebaseObjectObservable<Profile>

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private afAuth: AngularFireAuth,
              private toastCtrl: ToastController,
              private afDB: AngularFireDatabase
              ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

    ionViewWillLoad() {
    this.afAuth.authState.take(1).subscribe(auth => {
      if (auth && auth.email && auth.uid) {
        this.toastCtrl.create({
          message: `Witaj ${auth.email}`,
          duration: 3000
        }).present();

        this.profileData = this.afDB.object(`profile/${auth.uid}`)
        
      } else {
        this.toastCtrl.create({
          message: `Nie znaleziono szczegolow autoryzacji`,
          duration: 3000
        }).present();
      }
    });

  }

}
