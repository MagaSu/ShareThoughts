<template>
  <base-dialog :show="!!error" title="An occured error!" @close="handleError">{{
    error
  }}</base-dialog>
  <form @submit.prevent="submitThought">
    <div class="form-control">
      <textarea
        id="thoughtInput"
        cols="30"
        placeholder="What are you thinking about?"
        v-model.trim="thought"
      ></textarea>
      <p v-if="!inputIsValid">The field is empty, enter a couple of words!</p>
    </div>
    <base-button>Thought</base-button>
    <base-button type="button" @click="load">Refresh</base-button>
  </form>
</template>

<script>
export default {
  emits: ["load"],
  data() {
    return {
      thought: "",
      error: null,
      inputIsValid: true,
    };
  },
  computed: {
    name() {
      return this.$store.getters["name"];
    },
  },
  methods: {
    load() {
      this.$emit("load");
    },
    async submitThought() {
      this.inputIsValid = true;
      if (this.thought === "") {
        this.inputIsValid = false;
        return;
      }
      const time =
        `${new Date().getHours()}`.padStart(2, 0) +
        ":" +
        `${new Date().getMinutes()}`.padStart(2, 0);

      try {
        await this.$store.dispatch("thoughts/addThought", {
          thought: this.thought,
          time: time,
        });
      } catch (err) {
        this.error = err.message || "Failed to share thought...";
      }
      this.thought = "";
      this.load();
    },
    handleError() {
      this.error = null;
    },
  },
};
</script>

<style scoped>
.form-control {
  width: 100%;
  max-width: 600px;
}
textarea {
  width: 100%;
  height: 100px;
  color: #fff;
  font-size: 18px;
  background-color: #a4161a;
  border: 1px solid #660708;
  border-radius: 9px;
  outline: none;
  padding: 0.5rem;
  margin-bottom: 10px;
}
textarea::placeholder {
  color: #fff;
}
</style>
