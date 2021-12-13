const express = require('express');

const meetingController = require('../controllers/meeting');

const router = express.Router();

const auth = require('../middleware/auth');


router.get('/',meetingController.getAllMeetings);
router.get('/:id', meetingController.getSingleMeeting);
router.get('/chat/:uuid', meetingController.getMeetingFromUUID);
router.post('/schedule', meetingController.scheduleMeeting);
router.post('/startMeeting', meetingController.startMeeting);
router.post('/joinMeeting', meetingController.joinMeeting);
router.post('/changeName', meetingController.changeName);
router.post('/changeDescription', meetingController.changeDescription);
router.post('/changeParticipation', meetingController.changeParticipation);
router.get('/currParticipants/:id', meetingController.getParticipants);
router.post('/changeTime', meetingController.changeTime);
router.delete('/:id', meetingController.deleteMeeting);


module.exports = router;