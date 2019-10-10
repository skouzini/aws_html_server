function getJoke() {
    document.getElementById("setup").textContent = "";
    document.getElementById("punchline").textContent = "";

    event.preventDefault();
    const jokeType = document.querySelector('input[name="jokeType"]:checked').value;
    console.log("value " + jokeType);

    const URL = "https://official-joke-api.appspot.com/jokes" + (jokeType === "any" ? "" : ("/" + jokeType)) + "/random";
    // const URL = "https://official-joke-api.appspot.com/jokes/random";
    fetch(URL).then(response => {
        return response.json();
    }).then(json => {
        json = jokeType === "any" ? json : json[0];
        console.log(json);
        document.getElementById("setup").textContent = json.setup;
        sleep(3000).then(() => {
            document.getElementById("punchline").textContent = json.punchline;
        })
    })


}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
