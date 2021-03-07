export default {
  async users(context) {
    const response = await fetch(
      "https://share-thoughts-10a74-default-rtdb.firebaseio.com/users.json"
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
        nickname: responseData[key].nickname,
      };
      users.push(user);
    }

    context.commit("loadUsers", users);
  },
};
