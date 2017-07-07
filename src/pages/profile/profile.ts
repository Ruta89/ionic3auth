import { Profile } from './../../models/profile';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  profile = {} as Profile;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private afAuth: AngularFireAuth,
    private toastCtrl: ToastController,
    private afDB: AngularFireDatabase
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }
  ionViewWillLoad() {
    this.afAuth.authState.subscribe(data => {
      if (data && data.email && data.uid) {
        this.toastCtrl.create({
          message: `Witaj ${data.email}`,
          duration: 3000
        }).present();
      } else {
        this.toastCtrl.create({
          message: `Nie znaleziono szczegolow autoryzacji`,
          duration: 3000
        }).present();
      }
    });

  }

  createProfile(profile){
    this.afAuth.authState.take(1).subscribe(auth => {
      this.afDB.object(`profile/${auth.uid}`).set(this.profile)
        .then(() => {
          this.navCtrl.setRoot('HomePage');
        })
    })
  }

}
