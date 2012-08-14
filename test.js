#!/usr/bin/env node

/*global setTimeout*/

var DotReporter = require('./lib/DotReporter').DotReporter,
    config = {
        start: 'white',
        end:   'green',
        err:   'red',
        foo:   'brown',
        bar:   'blue',
        hat:   'cyan'
    },
    configKeys = Object.keys(config).filter(function (key) {
        return key !== 'start';
    }),
    d = new DotReporter(config),
    ids = [],
    started = [];

for (var i = 0; i < 180; i += 1) {
    ids.push(i);
}

function report() {
    var id = ids.pop();
    if (id) {
        d.taskStart(id);
        started.push(id);
        setTimeout(function () {
            report();
            setTimeout(function () {
                do {
                    var idx = Math.floor(Math.random() * started.length),
                        num = started[idx];
                    if (num) {
                        d.taskEnd(id, configKeys[Math.floor(Math.random() * configKeys.length)]);
                        delete started[idx];
                        break;
                    }
                } while (1);
            }, 2000 * Math.random() + 1000);
        }, 100);
    }
}

process.stderr.write('\r\n');

report();

