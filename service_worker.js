let gameResult = null;

surflyExtension.runtime.onMessage.addListener((message) => {
    console.log("Message received", message);
    if (message.event_type === "start_game") {
        let countDown = 45;

        surflyExtension.surflySession.apiRequest({
            cmd: "send_chat_message",
            message: "Game started! Go to the map and find the location: https://www.google.com/maps/d/u/0/edit?mid=1Hq5-GIRP6KNGHXQFBpXyzfmlDYydzms",
        });

        let interval = setInterval(() => {
            countDown--;

            surflyExtension.tabs.sendMessage(null, {
                event_type: "countdown",
                countdown: countDown,
            });

            surflyExtension.tabs.sendMessage(null, {
                event_type: "countdown",
                countdown: countDown,
            });

            if (countDown === 0) {
                clearInterval(interval);
                surflyExtension.surflySession.apiRequest({
                    cmd: "send_chat_message",
                    message: `Game finished! Result: `,
                });

                surflyExtension.surflySession.apiRequest({
                    cmd: "send_chat_message",
                    message: gameResult,
                });

                surflyExtension.tabs.sendMessage(null, {
                    event_type: "game_result",
                    result: gameResult,
                });

                surflyExtension.surflySession.apiRequest({
                    cmd: "relocate",
                    url: "https://www.google.com/maps/d/u/0/edit?mid=1Hq5-GIRP6KNGHXQFBpXyzfmlDYydzms",
                    newTab: true,
                });
            } else if (countDown % 5 === 0) {
                surflyExtension.surflySession.apiRequest({
                    cmd: "send_chat_message",
                    message: `Countdown: ${countDown}`,
                });
            }

            
        }, 1000);
    } else if (message.event_type === "game_result") {
        gameResult = message.result;
    }
});
