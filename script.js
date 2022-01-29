(function ($) {
    var o = $({});

    $.each(
        {
            trigger: "publish",
            on: "subscribe",
            off: "unsubscribe",
        },
        function (key, val) {
            jQuery[val] = function () {
                o[key].apply(o, arguments);
            };
        }
    );
})(jQuery);

let billy = (function () {
    let billyToRose = "LiesOnTheSofa";

    return {
        sendMessage: function () {
            $.publish(billyToRose);
        },

        subscribe: function () {
            $.subscribe("Go-away!", function (e) {
                console.log("Billy: ", "*RUN!!!*");
            });

            $.subscribe("I-am-with-Jack", function (e) {
                console.log("Rose to Bill: ", "I am with Jack!");
            });
        },
    };
})();

let jack = (function () {
    let jackToRose = "Hi,I-like-you";

    return {
        sendMessage: function () {
            $.publish(jackToRose);
            return jackToRose;
        },

        subscribe: function () {
            $.subscribe("Smiling", function (e) {
                console.log("Rose to Jack: ", "*Smiling*");
            });
        },
    };
})();

let rose = (function () {
    let roseToBill = "Go-away!";
    let roseToJack = "Smiling";

    return {
        subscribe: function () {
            $.subscribe("Hi,I-like-you", function (e) {
                console.log("Jack to Rose: ", "Hi,I like you");
                $.publish("I-am-with-Jack");
            }),
                $.subscribe("LiesOnTheSofa", function (e) {
                    console.log("Billy to Rose: ", "*Lies on the sofa*");
                });
        },

        sendToBill: function () {
            $.publish(roseToBill);
        },

        sendToJack: function () {
            $.publish(roseToJack);
        },
    };
})();

rose.subscribe();
billy.subscribe();
jack.subscribe();
billy.sendMessage();
jack.sendMessage();
rose.sendToBill();
rose.sendToJack();