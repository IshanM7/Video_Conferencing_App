const Meeting = require('../models/meeting');
const {v4 : uuidv4} = require('uuid');

const { validationResult } = require('express-validator');

exports.getAllMeetings = async (req, res, next) => {
    try{
        const [allMeetings] = await Meeting.getMeetings();
        res.status(200).json(allMeetings);
    } catch(err) {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.getSingleMeeting = async (req, res, next) => {
    try{
        console.log(req.params.id);
        const meeting = await Meeting.getSingleMeeting(req.params.id);
        res.status(200).json(meeting);
    } catch(err) {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    }
};
exports.getMeetingFromUUID = async (req, res, next) => {
    try{
        console.log(req.params.uuid);
        const meeting = await Meeting.getMeetingFromUUID(req.params.uuid);
        res.status(200).json(meeting);
    } catch(err) {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    }
};


exports.scheduleMeeting = async (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        console.log('error');
        return;
    }
    
    const meetingName = req.body.meetingName;
    const meetingDescription = req.body.meetingDescription;
    const meetingHost = req.body.meetingHost;
    const meetingLink = uuidv4();
    const time = req.body.time;
    const numParticipants = req.body.numParticipants;
    console.log(meetingName);
    console.log(meetingDescription);
    console.log(meetingHost);
    console.log(meetingLink);
    console.log(time);
    try{
        const meeting = {
            meetingName: meetingName,
            meetingDescription: meetingDescription,
            meetingHost: meetingHost,
            meetingLink: meetingLink,
            time: time,
            numParticipants: numParticipants
        }
        const result = await Meeting.scheduleMeeting(meeting);

        res.status(201).json(result);
        
    } catch(err) {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    }
};
exports.deleteMeeting = async (req, res, next) => {
    try{
        const deleteResponse = await Meeting.deleteMeeting(req.params.id);
        res.status(200).json(deleteResponse);
    } catch(err) {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    }
};
exports.startMeeting = async (req, res, next) => {
    try{
        const startResponse = await Meeting.startMeeting(req.body.meetingID);
        res.status(200).json(startResponse);
    } catch(err) {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    }
};
exports.joinMeeting = async (req, res, next) => {
    try{
        const joinResponse = await Meeting.joinMeeting(req.body.meetingID);
        res.status(200).json(joinResponse);
    } catch(err) {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    }
};
exports.changeName = async (req, res, next) => {
    try{
        const changeResponse = await Meeting.changeName(req.body.meetingName,req.body.meetingID);
        res.status(200).json(changeResponse);
    } catch(err) {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    }
};
exports.changeDescription = async (req, res, next) => {
    try{
        const changeResponse = await Meeting.changeDescription(req.body.meetingDescription,req.body.meetingID);
        res.status(200).json(changeResponse);
    } catch(err) {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    }
};
exports.changeParticipation = async (req, res, next) => {
    try{
        const changeResponse = await Meeting.changeParticipation(req.body.numParticipants,req.body.meetingID);
        res.status(200).json(changeResponse);
    } catch(err) {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    }
};
exports.changeTime = async (req, res, next) => {
    try{
        const changeResponse = await Meeting.changeTime(req.body.time,req.body.meetingID);
        res.status(200).json(changeResponse);
    } catch(err) {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    }
};
exports.getParticipants = async (req, res, next) => {
    try{
        const numPart = await Meeting.getParticipants(req.params.id);
        res.status(200).json(numPart);
    } catch(err) {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    }
};