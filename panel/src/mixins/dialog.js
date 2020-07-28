export default {
  props: {
    cancelButton: {
      type: [String, Boolean],
      default: true,
    },
    icon: String,
    submitButton: {
      type: [String, Boolean],
      default: true
    },
    size: String,
    theme: String
  },
  methods: {
    close() {
      this.$refs.dialog.close();
      this.$emit("close");
    },
    error(message) {
      this.$refs.dialog.error(message);
    },
    open() {
      this.$refs.dialog.open();
      this.$emit("open");
    },
    success(payload) {
      this.$refs.dialog.close();

      if (payload.route) {
        this.$go(payload.route);
      }

      if (payload.message) {
        this.$store.dispatch("notification/success", payload.message);
      }

      if (payload.event) {
        if (typeof payload.event === "string") {
          payload.event = [payload.event];
        }

        payload.event.forEach(event => {
          this.$events.$emit(event, payload);
        })
      }

      if (
        payload.hasOwnProperty("emit") === false ||
        payload.emit !== false
      ) {
        this.$emit("success");
      }
    }
  }
};
