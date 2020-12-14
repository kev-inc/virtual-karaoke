import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, ModalController } from 'ionic-angular';
import { YoutubeService } from '../../services/youtube.service';
import { FirebaseProvider } from '../../providers/firebase/firebase';

@IonicPage()
@Component({
  selector: 'page-control',
  templateUrl: 'control.html',
  providers: [YoutubeService]
})
export class ControlPage {

  userRoomCode = '';

  nickname = ""

  showShortened = true;

  queue:{}[] = [];

  nowPlaying:{} = {
    videoId:"",
    videoTitle:"",
    videoThumbnail:""
  };

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public youtubeService: YoutubeService, 
    public loadingCtrl: LoadingController,
    public firebaseProvider: FirebaseProvider,
    public toastCtrl: ToastController,
    public modalCtrl: ModalController) {
      this.userRoomCode = this.navParams.get('roomCode');
      this.nickname = this.navParams.get('nickname')
      this.firebaseProvider.getQueue(this.userRoomCode).on('value', result => {
        if(result.val() != null){
          this.queue = Object.keys(result.val()).map(key => {
            return [String(key), result.val()[key]];
          })
        } else {
          this.queue = [];
        }
      })
      this.firebaseProvider.getCurrent(this.userRoomCode).on('value', result => {
        if(result.val() != null) {
          this.nowPlaying = result.val();
        } else return {};
      });
  }

  baseUrl: string = 'https://www.youtube.com/embed/';

  nextSong(){
    var nextSong = this.queue[0];
    if(nextSong != null) {
      this.firebaseProvider.next(nextSong, this.userRoomCode);
    } else {
      this.toastCtrl.create({
        message: "There are no more songs in the queue.",
        duration: 2000
      }).present();
    }
  }

  limitList(){
    if(this.queue.length>3) {
      if(this.showShortened) {
        var shortenedQueue = [];
        for(var i = 0; i < 3; i++){
          shortenedQueue.push(this.queue[i]);
        }
        return shortenedQueue;
      } else {
        return this.queue;
      }
    } else {
      return this.queue;
    }
  }

  openSearchModal(){
    let searchModal = this.modalCtrl.create('SearchPage',{
      userRoomCode: this.userRoomCode,
      nickname: this.nickname
    });
    searchModal.present();
  }

  whenCurrentIsEmpty(thumbnail){
    if(thumbnail == "") {
      return false
    } else {
      return true;
    }
  }

}
