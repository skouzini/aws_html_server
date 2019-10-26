/*global fetch*/
/*global Vue*/
/*global axios*/

var app = new Vue({

    el: "#parent",

    data: {
        topic: "any",
        visible: false,
        joke: {},
    },

    methods: {
        topicAny() {
            this.topic = "any";
            console.log(this.topic);
        },
        topicProgram() {
            this.topic = "programming";
            console.log(this.topic);
        },
        topicKnock() {
            this.topic = "knock-knock";
            console.log(this.topic);
        },
        clicked() {
            this.getJoke();
            this.activate();
        },
        getJoke() {
            this.visible = false;
            this.joke.setup = "";
            this.joke.punchline = "";
            const url = 'https://official-joke-api.appspot.com/jokes' + (this.topic === 'any' ? '' : ('/' + this.topic)) + '/random';
            
            let response;
            if (this.topic === 'any')
                response = axios.get(url).then(response => this.joke = response.data);
            else 
                response = axios.get(url).then(response => this.joke = response.data[0]);
            console.log(response);
        },
        activate() {
            console.log("starting activation");
            setTimeout(() => this.visible = true, 3000);
            console.log("finished activation");
        },
    },
});