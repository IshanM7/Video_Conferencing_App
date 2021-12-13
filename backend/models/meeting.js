const db = require('../util/database');

module.exports = class Meeting{
    constructor(meetingID, meetingName, meetingDescription, meetingHost, meetingLink, numParticipants, time, started){
        this.meetingID = meetingID;
        this.meetingName = meetingName;
        this.meetingDescription = meetingDescription;
        this.meetingHost = meetingHost;
        this.meetingLink = meetingLink;
        this.numParticipants = numParticipants;
        this.time = time;        
        this.started = started;
    }

    static getMeetings(){
        return db.execute('SELECT * FROM Meeting');
    }

    static scheduleMeeting(meeting){
        console.log(meeting);
        return db.execute('INSERT INTO Meeting (meetingName, meetingDescription, meetingHost, meetingLink, time, numParticipants) VALUES (?, ?, ?, ?, ?, ?)',
        [meeting.meetingName,meeting.meetingDescription,meeting.meetingHost,meeting.meetingLink, meeting.time,meeting.numParticipants]);
    }

    static deleteMeeting(id){
        return db.execute('DELETE FROM Meeting WHERE meetingID = ?',
        [id]);
    }
    static getSingleMeeting(id){
        return db.execute('SELECT * FROM Meeting WHERE meetingID = ?',
        [id]);
    }
    static getMeetingFromUUID(uuid){
        return db.execute('SELECT * FROM Meeting WHERE meetingLink = ?',
        [uuid]);
    }
    static startMeeting(id){
        db.execute('UPDATE Meeting SET currParticipants=currParticipants+1 WHERE meetingID=?',[id]);
        return db.execute('UPDATE Meeting SET started = 1 WHERE meetingID = ?',
        [id]);
    }
    static joinMeeting(id){
        return db.execute('UPDATE Meeting SET currParticipants=currParticipants+1 WHERE meetingID=?',[id]);        
    }
    static changeName(name,id){
        return db.execute('UPDATE Meeting SET meetingName = ? WHERE meetingID = ?',
        [name,id]);
    }
    static changeDescription(desc,id){
        return db.execute('UPDATE Meeting SET meetingDescription = ? WHERE meetingID = ?',
        [desc,id]);
    }
    static changeTime(time,id){
        return db.execute('UPDATE Meeting SET time = ? WHERE meetingID = ?',
        [time,id]);
    }
    static changeParticipation(num,id){
        console.log(num);
        console.log(id);
        return db.execute('UPDATE Meeting SET numParticipants = ? WHERE meetingID = ?',
        [num,id]);
    }
    static getParticipants(id){
        return db.execute('Select currParticipants FROM Meeting WHERE meetingID = ?',
        [id]);
    }
    
    
};