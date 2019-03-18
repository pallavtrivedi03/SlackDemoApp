var express = require('express');
var router = express.Router();

const queryOptions = [{
  text: 'Open Issues',
  value: 'opneIssues'
}, {
  text: 'Closed Issues',
  value: 'closedIssues'
}, {
  text: 'Milestones',
  value: 'milestones'
}, {
  text: 'Product Note',
  value: 'note'
}, {
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

  const crashReport = `Yayyy..!! \nNo crashes till now.`

router.get('/', function(req, res, next) {
  
});

router.post('/SlackAppDemo',function(req,res) {
    try {
        const response = {
          response_type: 'in_channel',
          channel: req.body.channel_id,
          text: 'Hey there...:',
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
        console.log(err);
        return res.status(500).send('Something went wrong :(');
      }
});


router.post('/actions', async (req, res) => {
  try {
    const payload = JSON.parse(req.body.payload);
    console.log("###slack request is "+payload);
    
    var response = "";
    if (payload.callback_id === 'query_selection') {
      console.log("option selected is "+payload.actions[0].selected_options[0].value);
      switch (payload.actions[0].selected_options[0].value) {
        case "openIssues":
          response = openIssues;
          break;
        case "closedIssues":
          response = closedIssues;
          break;
        case "milestones":
          response = milestones;
          break;
        case "note":
          response = productNote;
          break;
        case "crashReport":
          response = crashReport;
          break;
        default:
          response = "None of the cases";
      }
    }
    return res.send(response);
  } catch (err) {
    console.log(err);
    return res.status(500).send('Something went wrong.');
  }
});

module.exports = router;
