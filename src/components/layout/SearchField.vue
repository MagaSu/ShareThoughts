<template>
  <div class="search">
    <input type="search" placeholder="Search Twitter" v-model="search" />
    <div class="hover-result" v-if="search.length > 0">
      <ul v-for="user in filteredUsers" :key="user.id">
        <li @click="userPageLink(user.id)">
          {{ user.nickname }}
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
          user.nickname.toLowerCase().indexOf(this.search.toLowerCase()) !== -1
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
  width: 50%;
  margin: 0 auto;
  text-align: center;
}
input {
  color: #660708;
  background-color: #d3d3d3;
  border-radius: 50px;
  border: solid 1px #660708;
  outline: none;
  text-align: center;

  width: 50%;
  padding: 0.5rem;
  margin-bottom: 1rem;
}
input:focus {
  border: solid 1px #660708;
  box-shadow: 0 0.5px 10px #e5383b;
}

ul {
  list-style: none;
}
li {
  padding: 0.5rem;
  border-radius: 90px;
}
li:hover {
  box-shadow: 0 0.5px 10px #e5383b;
  cursor: pointer;
}
</style>
