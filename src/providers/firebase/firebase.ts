import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class FirebaseProvider {

  constructor(public afd: AngularFireDatabase) {}

  getQueue(roomCode){
    return this.afd.database.ref('/rooms/'+roomCode+'/queue/');
  }

  getCurrent(roomCode){
    return this.afd.database.ref('/rooms/'+roomCode+'/current/');
  }

  addToQueue(item, roomCode){
    this.afd.database.ref('/rooms/' + roomCode + '/queue/').push(item);
  }

  next(item, roomCode){
    this.afd.database.ref('/rooms/'+ roomCode + '/current/').set(item[1]);
    this.afd.database.ref('/rooms/'+ roomCode +'/queue/' + item[0]).remove();
  }

  generateRoomCode(){
    return this.afd.database.ref('/lastRoomCode/').once('value', result => {
      var lastRoomCode = result.val();
      if(lastRoomCode >= 8999){
        lastRoomCode = 1000;
      }
      this.afd.database.ref('/lastRoomCode/').set(++lastRoomCode);
      return lastRoomCode.toString();
    });
  }

  createNewRoom(roomCode){
    this.afd.database.ref('/rooms/' + roomCode).push(Date.now());
  }


}
