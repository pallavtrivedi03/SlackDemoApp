var express = require('express');
var router = express.Router();

const queryOptions = [{
    text: 'Open Issues',
    value: 'opneIssues'
  },{
    text: 'Closed Issues',
    value: 'closedIssues'
  },{
    text: 'Milestones',
    value: 'milestones'
  },{
    text: 'Product Note',
    value: 'note'
  },{
    text: 'Crash Report',
    value: 'crashReport'
  }];

router.get('/', function(req, res, next) {
  
});

router.post('/SlackAppDemo',function(req,res) {
    try {
        const slackReqObj = req.body;
        const response = {
          response_type: 'in_channel',
          channel: slackReqObj.channel_id,
          text: 'Hello :slightly_smiling_face:',
          attachments: [{
            text: 'What would you like to know in this project?',
            fallback: 'What would you like to know in this project?',
            color: '#2c963f',
            attachment_type: 'default',
            callback_id: 'query_selection',
            actions: [{
              name: 'query_select_menu',
              text: 'Choose an option...',
              type: 'select',
              options: queryOptions,
            }],
          }],
        };
        return res.json(response);
      } catch (err) {
        log.error(err);
        return res.status(500).send('Something blew up. We\'re looking into it.');
      }
});


router.post('/actions', async (req, res) => {
    console.log("###slack Send response. Action taken by user");
    console.log(req.body);
    
    try {
      const slackReqObj = JSON.parse(req.body.payload);
      console.log("###slack request is "+slackReqObj);
      
      let response;
      if (slackReqObj.callback_id === 'pending_booking_reason_selection') {
        response = {"Result":"Yes, this seems working\nGood work!!!"}
        console.log("###slack call back received for pending booking reason selection");
      }
      return res.json(response);
    } catch (err) {
      console.log(err);
      return res.status(500).send('Something blew up. We\'re looking into it.');
    }
  });

module.exports = router;
