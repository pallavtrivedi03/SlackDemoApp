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

  const openIssues = 
  `Token is not being passed in slack request.\n
  Database connectivity is missing.`

  const closedIssues = 
  `Slash commands are not being invoked\n
  Webhook is not responding.`

  const milestones = 
  `Integrate bot communication in slack channel.\n
  Handle various actions on slash commands.`

  const productNote = 
  `SlackAppDemo is a PoC project to demonstrate how slack app is made, how slash commands and interactive components work. 
  Also, how we can use webhook to integrate our backend with slack.`

  const crashReport = `:smiling_face_with_sunglasses: \nNo crashes till now.`

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
      if (slackReqObj.callback_id === 'query_selection') {
        switch (slackReqObj.selected_options[0].value) {
          case "openIssues":
            response = openIssues;
          case "closedIssues":
            response = closedIssues;
          case "milestones":
            response = milestones;
          case "note":
            response = productNote;
          case "crashReport":
            response = crashReport;
        }
        response = "Yes, this seems working\nGood work!!!"
        console.log("###slack call back received for pending booking reason selection");
      }
      return res.send(response);
    } catch (err) {
      console.log(err);
      return res.status(500).send('Something blew up. We\'re looking into it.');
    }
  });

module.exports = router;
