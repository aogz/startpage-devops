surflyExtension.onMessage.addListener((message) => {
    if (message.event_type === "start_game") {
        let countDown = 45;
        let interval = setInterval(() => {
            countDown--;
            surflyExtension.runtime.sendMessage({
                event_type: "count_down",
                count_down: countDown,
            });
        }, 1000);
    }
});
