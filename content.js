setTimeout(() => {
    const container = document.querySelector("div.musCardCont")
    if (window.location.href.includes(".bing.")) {
        surflyExtension.runtime.sendMessage({
            event_type: "game_result",
            result: container.innerText,
        });

        surflyExtension.runtime.onMessage.addListener((message) => {
            if (message.event_type === "countdown") {
                const heading = document.querySelector("h2#headline");
                heading.innerText = message.countdown;
            } else if (message.event_type === "game_result") {
                const heading = document.querySelector("h2#headline");
                heading.click();
            }
        });
    }
    
    if (window.location.href.includes("google.com/maps/")) {
        console.log("Map");
    }
}, 1000);
