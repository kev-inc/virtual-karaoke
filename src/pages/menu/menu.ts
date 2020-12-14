import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { ScreenPage } from '../screen/screen';
import { ControlPage } from '../control/control';

/**
 * Generated class for the MenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
  entryComponents: [ControlPage, ScreenPage]
})
export class MenuPage {

  userRoomCode:number;
  listOfRoomCodes:number[] = [];
  nickname:string = "";

  constructor(public navCtrl: NavController, public navParams: NavParams,
        public firebaseProvider: FirebaseProvider,
        public toastCtrl: ToastController) {
  }

  createNewRoom(){
    this.navCtrl.push(ScreenPage);
  }

  joinRoom(){
    this.firebaseProvider.afd.database.ref('/rooms/' + this.userRoomCode).once('value', snapshot => {
      console.log(snapshot.exists());
      // returns true if room code is in the database, false if not

      if (snapshot.exists()){
        // Valid room code
        this.navCtrl.push(ControlPage, {
          roomCode: this.userRoomCode.toString(),
          nickname: this.nickname
        });
      } else {
        // Invalid room code
        this.toastCtrl.create({
          message: "Invalid room code",
          duration: 2000
        }).present();
      }
    })
  }


  snapshotToArr(snapshot){
    var returnArr = [];
    snapshot.forEach((snap) => {
      returnArr.push(snap.key);
    })
    return returnArr;
  }
}
