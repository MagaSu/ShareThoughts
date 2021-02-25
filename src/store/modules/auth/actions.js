export default {
  login(context, payload) {
    return context.dispatch("auth", {
      ...payload,
      mode: "login",
    });
  },
  signup(context, payload) {
    return context.dispatch("auth", {
      ...payload,
      mode: "signup",
    });
  },
  async auth(context, payload) {
    const mode = payload.mode;

    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCCNSAOmTiMf6O_eWsGNdH5NqEimYhfiWI";

    if (mode === "signup") {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCCNSAOmTiMf6O_eWsGNdH5NqEimYhfiWI";
    }

    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: payload.email,
        password: payload.password,
        returnSecureToken: true,
      }),
    });

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(
        responseData.message || "Failed to authenticate. Check your login data."
      );
      throw error;
    }

    context.commit("setUser", {
      userId: responseData.localId,
      token: responseData.idToken,
    });

    if (mode === "login") {
      await context.dispatch("getUserName");
    } else {
      await context.dispatch("setUserName", {
        firstName: payload.firstName,
        lastName: payload.lastName,
      });
    }

    localStorage.setItem("token", responseData.idToken);
    localStorage.setItem("userId", responseData.localId);
    localStorage.setItem("firstName", context.state.firstName);
    localStorage.setItem("lastName", context.state.lastName);
  },
  async setUserName(context, payload) {
    const userId = context.getters.userId;

    const response = await fetch(
      `https://twitter-clone-e8a3c-default-rtdb.firebaseio.com/users/${userId}.json`,
      {
        method: "PUT",
        body: JSON.stringify({
          firstName: payload.firstName,
          lastName: payload.lastName,
        }),
      }
    );
    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(
        responseData.message || "Failed to set username."
      );
      throw error;
    }
    context.dispatch("getUserName");
  },
  async getUserName(context) {
    const userId = context.getters.userId;
    const token = context.getters.token;

    const response = await fetch(
      `https://twitter-clone-e8a3c-default-rtdb.firebaseio.com/users/${userId}.json`
    );

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(
        responseData.message || "Failed to get username."
      );
      throw error;
    }

    context.commit("setUser", {
      userId: userId,
      token: token,
      firstName: responseData.firstName,
      lastName: responseData.lastName,
    });
  },
  tryLogin(context) {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    const firstName = localStorage.getItem("firstName");
    const lastName = localStorage.getItem("lastName");

    if (userId && token) {
      context.commit("setUser", {
        userId,
        token,
        firstName,
        lastName,
      });
    }
  },
  logout(context) {
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    localStorage.removeItem("firstName");
    localStorage.removeItem("lastName");

    context.commit("setUser", {
      userId: null,
      token: null,
      firstName: null,
      lastName: null,
    });
  },
};
