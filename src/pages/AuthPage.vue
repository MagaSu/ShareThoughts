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
        <label for="firstName">First Name</label>
        <input type="text" id="firstName" v-model.trim="firstName" />
      </div>
      <div class="form-control" v-if="mode === 'signup'">
        <label for="lastName">Last Name</label>
        <input type="text" id="lastName" v-model.trim="lastName" />
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
      firstName: "",
      lastName: "",
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
        (this.firstName === "" ||
          this.firstName.length < 3 ||
          this.lastName === "" ||
          this.lastName.length < 2)
      ) {
        this.inputIsValid = false;
        return;
      }

      const actionPayload = {
        email: this.email,
        password: this.password,
        firstName: this.mode === "signup" ? this.firstName : null,
        lastName: this.mode === "signup" ? this.lastName : null,
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
  font-weight: bold;
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
  border: none;
  border-top: 1px solid #1696e6;
  border-bottom: 1px solid#1696e6;
  padding: 0.15rem;
  background-color: #253341;
  color: #fff;
}
input:focus {
  border-color: #1696e6;
  background-color: #253341;
  outline: none;
}
</style>
