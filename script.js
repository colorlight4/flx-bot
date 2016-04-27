'use strict';

const Script = require('smooch-bot').Script;

module.exports = new Script({
    processing: {
        prompt: (bot) => bot.say('Beep boop...'),
        receive: () => 'start'
    },

    start: {
        receive: (bot) => {
            return bot.say('Hi! I\'m Smooch Bot!')
                .then(() => 'askName');
        }
    },

    askName: {
        prompt: (bot) => bot.say('What\'s your name?'),
        receive: (bot, message) => {
            const name = message.text;
            return bot.setProp('name', name)
                .then(() => bot.say(`Great! I'll call you ${name}`))
                .then(() => 'say');
        }
    },


    say: {
        receive: (bot, message) => {
            // const name = message.text;

            var name = message.text;
            var obj = ["hi", "hello"]

            function isInArray(value, array) {
              return array.indexOf(value) > -1;
            }

            if ( isInArray( name, obj) ) {
              for (var item of obj) {
               if ( name == item ) {
                  return bot.say(`I like you!`)
                }
              }
            } else {
              console.log("not again")
            }
        }
    }

    finish: {
        receive: (bot, message) => {
            return bot.getProp('name')
                .then((name) => bot.say(`Sorry ${name}, my creator didn't ` +
                        'teach me how to do anything else!'))
                .then(() => 'finish');
        }
    }
});
