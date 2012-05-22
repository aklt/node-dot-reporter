# Describe event state with colorful dots

Start and completion of a task will show a dot on the console.  The color of
the dot can be customized according to the state of the event when the task
ends.

This can useful for brief reporting on async requests:

```javascript
    var DotReporter = require('dot-reporter').DotReporter,
        dot = new DotReporter(/* optional state to color mappings */);

        ...

        // Start a task
        dot.taskStart('taskID');
        makeARequest(function (err, data) {

            // ... Time passes before we get to here ...

            dot.endTask('taskID', data.endState);
        });
```

Run `npm test` to see an example.

