var app = new Vue({

  el: '#app',

  data: {
    number: '',
    current: {
      title: '',
      img: '',
      alt: ''
    },
    loadind: true;
  },

  created() {
    this.xkcd();
  },

  methods: {
    async xkcd() {
      try {
        this.loading = true;
        const response = await axios.get('https://xkcdapi.now.sh/' +
          thisre.number);
        this.current = response.data;
        this.loading = false;
      }
      catch (error) {
        console.log(error);
      }
    },
  }
});
