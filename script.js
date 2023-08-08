Vue.createApp({
  data() {
    return {
      lottoNumbers: [],
      selectedNumbers: [],
      numberInput: "",
      result: "",
    };
  },
  methods: {
    pickNumber() {
      let number;
      do {
        number = this.randomNumberGenerator();
      } while (this.lottoNumbers.includes(number));

      this.lottoNumbers.push(number);

      if (this.lottoNumbers.length === 6) {
        this.checkNumbers();
      }
    },
    changeCursor(event) {
      document.body.classList.add("cursor-animation");
      document.body.style.cursor = "none";
      const circle = document.createElement("div");
      circle.classList.add("cursor-circle");
      circle.style.top = event.clientY + "px";
      circle.style.left = event.clientX + "px";
      document.body.appendChild(circle);
      setTimeout(() => {
        document.body.classList.remove("cursor-animation");
        document.body.style.cursor = "default";
        circle.remove();
      }, 1000);
      this.pickNumber();
    },

    reset() {
      this.lottoNumbers = [];
      this.result = "";
      this.selectedNumbers = [];
      for (let i = 0; i < 6; i++) {
        let number;
        do {
          number = this.randomNumberGenerator();
        } while (this.selectedNumbers.includes(number));
        this.selectedNumbers.push(number);
      }
    },
    checkNumbers() {
      let matchedNumbers = this.selectedNumbers.filter((number) =>
        this.lottoNumbers.includes(number)
      );

      if (matchedNumbers.length === 0) {
        this.result =
          "I'm sorry, you didn't win. Please try again and dive deeper!";
      } else {
        this.result =
          "Congratulations! You matched " +
          matchedNumbers.length +
          " numbers: " +
          matchedNumbers.join(", ");

        if (matchedNumbers.length === 6) {
          this.result += " You won the jackpot!";
        }
      }
    },
    randomNumberGenerator() {
      return Math.floor(Math.random() * 100) + 1;
    },
  },
  computed: {
    pickButtonDisabled() {
      return this.lottoNumbers.length >= 6;
    },
    resetButtonDisabled() {
      return this.lottoNumbers.length === 0;
    },
  },
  mounted() {
    this.reset();
  },
}).mount("#app");
