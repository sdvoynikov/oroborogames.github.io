$(document).ready(function() {

    var $window = $(window);

    function updateSnake() {
        var $snake = $(".rotating-snake"),
            width = $window.width();
        $snake.css({
            transform: "rotate(" + (-.33 * $(window).scrollTop()) + "deg)",
            left: Math.max(width - $snake.width() * 0.5, (width - 980) * 0.5 + 980)
        });
    }

    updateSnake();

    $window.on('scroll resize', function() {
        updateSnake();
    });

    $(".about .level").each(function() {
        $(this).text(80 + parseInt(Math.random() * 10));
    });

    $(".about .parameter").each(function() {
        var $parameter = $(this),
            values = $parameter.data('values').split('|'),
            value = values[parseInt(Math.random() * values.length)],
            args = value.split(':'),
            id = args[0],
            title = args[1],
            min = Number(args[2]),
            max = Number(args[3]),
            v = parseInt(min + Math.random() * (max - min));

        $parameter.append([
            '<img src="/images/skill-', id, '.png" />',
            '<div class="description">',
            '    <div class="label">', title, '</div>',
            '    <div class="value">', v, '</div>',
            '</di>'
        ].join(''));
    });

    function scroll(targetScroll, up) {
        var $window = $(window),
            delta = up ? -1 : 1,
            stopping = false,
            interval = setInterval(function() {
                var current = $window.scrollTop(),
                    next = current + delta;
                if (Math.abs(targetScroll - next) < delta * 2) {
                    delta = up ? -1 : 1;
                    stopping = true;
                }
                else if (!stopping) {
                    delta += up ? -1 : 1;
                }

                $window.scrollTop(next);

                if ($window.scrollTop() == current) {
                    clearInterval(interval);
                }

                if (up) {
                    if (next <= targetScroll) {
                        clearInterval(interval);
                    }
                }
                else {
                    if (next >= targetScroll) {
                        clearInterval(interval);
                    }
                }
            }, 10);
    }

    $("#title .content a").click(function(event) {
        var targetName = $(this).data('target'),
            $target = $('a[name="' + targetName + '"]');

        scroll($target.offset().top);


        event.preventDefault();
    });

    $(".to-top").click(function() {
       scroll(0, true);
    });
});
