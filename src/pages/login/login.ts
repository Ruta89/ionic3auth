import { User } from './../../models/user';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user = {} as User;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private afAuth: AngularFireAuth
              ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  async login(user: User){
    console.log('click login');
    try{
      const result = await this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
      console.log(result);
      if(result){
        this.navCtrl.push('ProfilePage');
      }
    }
    catch(e){
      console.error(e);
    }
  }

  register(){
    console.log('click register');
    this.navCtrl.push('RegisterPage');
  }

}
