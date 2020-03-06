const express = require('express');
const bodyParser = require('body-parser');
const showTimeRouter = express.Router();
const authenticate = require('../authentication/authenticate');
const cors = require('./cors');
const ShowTimes = require('../models/showTimes');

showTimeRouter.use(bodyParser.json());


// Configure '/'
showTimeRouter.route('/')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    .get(cors.cors, (req,res,next) => {
        ShowTimes.find({}).then((showTimes) => {
            res.statusCode = 200;
            res.setHeader('Content-Type','application/json');
            res.json(showTimes);
;        }, (err) => next(err))
        .catch((err) => next(err));
    })
    .post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        ShowTimes.create(req.body).then((showTime) => {
            res.statusCode = 200;
            res.setHeader('Content-Type','application/json');
            res.json(showTime);
        }, (err) => next(err))
        .catch((err) => next(err));
    })
    .put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /showTimes');
    })
    .delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        ShowTimes.remove({}).then((resp) =>{
            res.statusCode = 200;
            res.setHeader('Content-Type','application/json');
            res.json(resp);
        }, (err) => next(err))
        .catch((err) => next(err));
    });


// Configure '/showTimeId'
showTimeRouter.route('/:showTimeId')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    .get(cors.cors, (req,res,next) =>{
        ShowTimes.findById(req.params.showTimeId)
        .then((showTime) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(showTime);
        }, (err) => next(err))
        .catch((err) => next(err));
    })
    .post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req,res,next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /showTimes/:' + req.params.showTimeId);
    })
    .put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        ShowTimes.findByIdAndUpdate(req.params.showTimeId, 
            { $set: req.body }, { new: true}).then((showTime) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(showTime);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        ShowTimes.findByIdAndDelete(req.params.showTimeId)
            .then((resp) =>{
                res.statusCode = 200;
                res.setHeader('Content-Type','application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    });
    
module.exports = showTimeRouter;