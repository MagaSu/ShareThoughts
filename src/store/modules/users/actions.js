export default {
  async users(context) {
    const response = await fetch(
      "https://twitter-clone-e8a3c-default-rtdb.firebaseio.com/users.json"
    );

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(responseData.message || "Failed to fetch.");
      throw error;
    }

    const users = [];

    for (const key in responseData) {
      const user = {
        id: key,
        firstName: responseData[key].firstName,
        lastName: responseData[key].lastName,
      };
      users.push(user);
    }

    context.commit("loadUsers", users);
  },
};
