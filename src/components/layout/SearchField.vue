<template>
  <div class="search">
    <input type="search" placeholder="Search Twitter" v-model="search" />
    <div v-if="search.length > 0">
      <ul v-for="user in filteredUsers" :key="user.id">
        <li @click="userPageLink(user.id)">
          {{ user.firstName + " " + user.lastName }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: "",
    };
  },
  computed: {
    userId() {
      return this.$store.getters.userId;
    },
    users() {
      const users = this.$store.getters["users/users"];
      return users.filter((user) => user.id !== this.userId);
    },
    filteredUsers() {
      return this.users.filter(
        (user) =>
          user.firstName.toLowerCase().indexOf(this.search.toLowerCase()) !==
            -1 ||
          user.lastName.toLowerCase().indexOf(this.search.toLowerCase()) !== -1
      );
    },
  },
  methods: {
    userPageLink(id) {
      this.$router.push({ name: "visited-user", params: { id } });
    },
  },
};
</script>

<style scoped>
* {
  font-weight: 500;
}
div {
  width: 100%;
  text-align: center;
}
input {
  color: #fff;
  background-color: #253341;
  border-radius: 50px;
  border: solid 1px #253341;
  outline: none;
  text-align: center;

  width: 50%;
  /*height: 1.5rem;*/
  padding: 0.5rem;
  margin-bottom: 1rem;
}
input:focus {
  border: solid 1px #1696e6;
}
ul {
  list-style: none;
}
li {
  padding: 0.5rem;
}
li:hover {
  background-color: #1c2732;
}
</style>
