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

The default state map is:

```javascript
    {
        start: 'white',
        end:   'green',
        err:   'red',
        bad:   'purple'
    }
```

The initial event state must always be called `start`.

Run `npm test` to see an example.

