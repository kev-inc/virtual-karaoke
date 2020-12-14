import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { PlayerService } from '../../services/player.service';
import { YoutubeService } from '../../services/youtube.service';
import { FirebaseProvider } from '../../providers/firebase/firebase';


@IonicPage()
@Component({
  selector: 'page-screen',
  templateUrl: 'screen.html',
  providers: [YoutubeService, PlayerService]
})
export class ScreenPage {

  roomCode:string = '';
  baseUrl: string = 'https://www.youtube.com/embed/';

  current:{
    key:string,
    videoId:string,
    videoTitle:string
  };

  vPlayer = true;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public player: PlayerService, 
    public youtubeService: YoutubeService, 
    public loadingCtrl: LoadingController,
    public firebaseProvider: FirebaseProvider) {

  }

  ionViewDidEnter(){
    this.player.setupPlayer();
    this.firebaseProvider.generateRoomCode().then(result => {
      if(result != -1) {
        this.roomCode = result.val().toString();
      }
      this.firebaseProvider.createNewRoom(this.roomCode);
      this.firebaseProvider.getCurrent(this.roomCode).on('value', (snapshot) => {
        this.current = snapshot.val();
        console.log(this.current);
        this.playVideo(this.current);
      });
    })
  }

  assignRoomCode(){
    this.firebaseProvider.generateRoomCode().then(result => {
      if(result != -1) {
        this.roomCode = result.val().toString();
      }
      this.firebaseProvider.createNewRoom(this.roomCode);
    })
  }

  playVideo(current) {
    console.log("play video executed");
    console.log(current);
    if(current != null){
      this.player.launchPlayer(current.videoId)
    }
    this.vPlayer = true;
  }



}
