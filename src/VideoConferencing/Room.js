import React from 'react'
import * as Utils from './utils'
import { connect, createLocalVideoTrack } from 'twilio-video'

//
const JoinRoom = (token) => {
    connect(token, { name:'room1' }).then(room => {

        console.log('Connected to Room "%s"', room.name);

        room.participants.forEach(participantConnected);
        room.on('participantConnected', participantConnected);
      
        room.on('participantDisconnected', participantDisconnected);
        room.once('disconnected', error => room.participants.forEach(participantDisconnected));

      }, error => {
        console.error(`Unable to connect to Room: ${error.message}`);
      });
}
function participantConnected(participant) {
    console.log('Participant "%s" join', participant.identity);
  
    const div = document.createElement('div');
    div.id = participant.sid;
  
    participant.on('trackSubscribed', track => trackSubscribed(div, track));
    participant.on('trackUnsubscribed', trackUnsubscribed);
  
    participant.tracks.forEach(publication => {
      if (publication.isSubscribed) {
        trackSubscribed(div, publication.track);
      }
    });
  
    document.getElementById("room").appendChild(div);
  }
  
  function participantDisconnected(participant) {
    console.log('Participant "%s" disconnected', participant.identity);
    document.getElementById(participant.sid).remove();
  }
  
  function trackSubscribed(div, track) {
    div.appendChild(track.attach());
  }
  
  function trackUnsubscribed(track) {
    track.detach().forEach(element => element.remove());
  }
  //

export default class Room extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div id="room">
              <div id="local-media">

              </div>
            </div>
        )
    }
    componentDidMount() {
        this.token = Utils.getAccessToken(Math.random().toString(36).substring(7), "room1")
        createLocalVideoTrack().then(track => {
          const localMediaContainer = document.getElementById('local-media');
          localMediaContainer.appendChild(track.attach());
        });
        JoinRoom(this.token)
    }
}