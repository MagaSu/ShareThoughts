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
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAxKNRPyX75qMiqEOcTNUB4lpAb3clH4-U";

    if (mode === "signup") {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAxKNRPyX75qMiqEOcTNUB4lpAb3clH4-U";
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
        nickname: payload.nickname,
      });
    }

    localStorage.setItem("token", responseData.idToken);
    localStorage.setItem("userId", responseData.localId);
    localStorage.setItem("nickname", context.state.nickname);
  },
  async setUserName(context, payload) {
    const userId = context.getters.userId;

    const response = await fetch(
      `https://share-thoughts-10a74-default-rtdb.firebaseio.com/users/${userId}.json`,
      {
        method: "PUT",
        body: JSON.stringify({
          nickname: payload.nickname,
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
      `https://share-thoughts-10a74-default-rtdb.firebaseio.com/users/${userId}.json`
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
      nickname: responseData.nickname,
    });
  },
  tryLogin(context) {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    const nickname = localStorage.getItem("nickname");

    if (userId && token) {
      context.commit("setUser", {
        userId,
        token,
        nickname,
      });
    }
  },
  logout(context) {
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    localStorage.removeItem("nickname");

    context.commit("setUser", {
      userId: null,
      token: null,
      nickname: null,
    });
  },
};
