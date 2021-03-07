<template>
  <base-dialog :show="!!error" title="An occured error" @close="handleError">
    {{ error }}
  </base-dialog>
  <base-card>
    <form @submit.prevent="authorization">
      <div class="form-control">
        <label for="email">E-Mail</label>
        <input type="email" id="email" v-model.trim="email" />
      </div>
      <div class="form-control" v-if="mode === 'signup'">
        <label for="nickname">Nickname</label>
        <input type="text" id="nickname" v-model.trim="nickname" />
      </div>
      <div class="form-control">
        <label for="password">Password</label>
        <input type="password" id="password" v-model.trim="password" />
      </div>
      <p v-if="!inputIsValid">
        Please enter a valid email and password (must be at least 6 characters
        long).
      </p>
      <div class="form-control">
        <base-button>{{ submitButtonCaption }}</base-button>
        <base-button type="button" mode="outline" @click="switchAuthMode">{{
          switchModeButtonCaption
        }}</base-button>
      </div>
    </form>
  </base-card>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      nickname: "",
      password: "",
      mode: "login",
      inputIsValid: true,
      error: null,
    };
  },
  computed: {
    submitButtonCaption() {
      return this.mode === "login" ? "Login" : "Signup";
    },
    switchModeButtonCaption() {
      return this.mode === "login" ? "Signup instead" : "Login instead";
    },
  },
  methods: {
    async authorization() {
      this.inputIsValid = true;
      if (
        this.email === "" ||
        !this.email.includes("@") ||
        this.password.length < 6
      ) {
        this.inputIsValid = false;
        return;
      }
      if (
        !this.mode === "login" &&
        (this.nickname === "" || this.nickname.length < 3)
      ) {
        this.inputIsValid = false;
        return;
      }

      const actionPayload = {
        email: this.email,
        password: this.password,
        nickname: this.mode === "signup" ? this.nickname : null,
      };

      try {
        if (this.mode === "login") {
          await this.$store.dispatch("login", actionPayload);
        } else {
          await this.$store.dispatch("signup", actionPayload);
        }
        this.$router.replace("/user");
      } catch (err) {
        this.error = err.message || "Failed to authenticate, try later.";
      }
    },
    switchAuthMode() {
      this.mode = this.mode === "login" ? "signup" : "login";
    },
    handleError() {
      this.error = null;
    },
  },
};
</script>

<style scoped>
form {
  padding: 1rem;
  margin: 1rem;
}
label {
  font-weight: 300;
  margin-bottom: 0.5rem;
  display: block;
}
.form-control {
  padding: 0.5rem 0;
}
input {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #660708;
  border-radius: 9999px;
  padding: 0.15rem;
  padding-left: 0.5rem;
  background-color: #d3d3d3 /*#fdfffc*/;
  color: #660708;
}
input:focus {
  border-color: #660708;
  box-shadow: 0 0.5px 10px #e5383b;
  outline: none;
}
</style>
