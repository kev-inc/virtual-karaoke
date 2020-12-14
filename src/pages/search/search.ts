import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { YoutubeService } from '../../services/youtube.service';
import { FirebaseProvider } from '../../providers/firebase/firebase';

/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
  providers: [YoutubeService]
})
export class SearchPage {

  userRoomCode='';
  nickname = ''
  videos = {};
  search = {
    params: ''
  };

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public youtubeService: YoutubeService, 
    public loadingCtrl: LoadingController,
    public firebaseProvider: FirebaseProvider,
    public toastCtrl: ToastController) {
  }

  ionViewDidEnter(){
    this.userRoomCode = this.navParams.get('userRoomCode');
    this.nickname = this.navParams.get('nickname')
  }

  findVideos($event) {
    let loading = this.loadingCtrl.create({});
    loading.present();

    this.youtubeService.getVideos(this.search.params).subscribe(
      videos => {
        this.videos = videos;
        loading.dismiss();
      },
      err => {
        console.log(err);
      }
    );
  }

  queueSong(video){
    console.log(video);
    var videoId = video.id.videoId;
    var videoTitle = video.snippet.title;
    var thumbnail = video.snippet.thumbnails.default.url;
    var item = {
      videoId: videoId,
      videoTitle: videoTitle,
      videoThumbnail: thumbnail,
      userSelected: this.nickname
    }
    this.firebaseProvider.addToQueue(item, this.userRoomCode);
    let toast = this.toastCtrl.create({
      message: videoTitle + " was queued!",
      duration: 2000
    });
    toast.present();
  }


  closeModal(){
    this.navCtrl.pop();
  }

}
