
/*global console*/

var esc = String.fromCharCode(27),
    colors = {
        black:         esc + '[0;30m',
        blue:          esc + '[0;34m',
        green:         esc + '[0;32m',
        cyan:          esc + '[0;36m',
        red:           esc + '[0;31m',
        purple:        esc + '[0;35m',
        brown:         esc + '[0;33m',
        lightGray:     esc + '[0;37m',
        darkGray:      esc + '[1;30m',
        lightBlue:     esc + '[1;34m',
        lightGreen:    esc + '[1;32m',
        lightCyan:     esc + '[1;36m',
        lightRed:      esc + '[1;31m',
        lightPurple:   esc + '[1;35m',
        yellow:        esc + '[1;33m',
        white:         esc + '[1;37m'
    },
    colorEnd = esc + '[0m';

function colorize(str, color) {
    return colors[color] + str + colorEnd;
}

function DotReporter(colorMappings) {
    this._colors = colorMappings || {
        start: 'white',
        end:   'green',
        err:   'red',
        bad:   'purple'
    };

    var that = this;
    Object.keys(that._colors).forEach(function (colorKey) {
        if (!colors.hasOwnProperty(that._colors[colorKey])) {
            console.warn('No such color: "' + that._colors[colorKey] + '". Valid color names:');
            Object.keys(colors).forEach(function (color) {
                console.warn(color);
            });
            process.exit(1);
        }
    });

    if (!this._colors.start) {
        console.warn('Need "start" property');
        process.exit(2);
    }

    this._tasks = [];
}

DotReporter.prototype.taskStart = function (id) {
    this._tasks.push({
        id: id,
        state: 'start'
    });
    this._draw(-1);
};

DotReporter.prototype.taskEnd = function (id, status) {
    var tasks = this._tasks,
        i;

    status = status || 'end';

    if (!this._colors[status]) {
        console.warn('No color named "' + status + '"');
    }

    for (i = 0; i < tasks.length; i += 1) {
        if (tasks[i].id === id) {
            tasks[i].state = status;
            break;
        }
    }
    this._draw(0);
};

DotReporter.prototype._draw = function (add) {
    var tasks = this._tasks,
        colorMap = this._colors,
        str = [],
        i;

    for (i = 0; i < tasks.length + add; i += 1) {
        str.push('\b');
    }
    for (i = 0; i < tasks.length; i += 1) {
        str.push(colorize('.', colorMap[tasks[i].state]));
    }
    process.stderr.write(str.join(''));
    while (tasks[0] && tasks[0].state !== 'start') {
        tasks.shift();
    }
};

DotReporter.prototype.active = function () {
    var count = 0,
        tasks = this._tasks;

    for (var i = 0; i < tasks.length; i += 1) {
        if (tasks[i].state === 'start') {
            count += 1;
        }
    }
    return count;
};

exports.DotReporter = DotReporter;

