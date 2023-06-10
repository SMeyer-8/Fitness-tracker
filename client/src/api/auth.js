export async function registerUser(username, password) {
  const response = await fetch("/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });
  const { success, message, data } = await response.json();
  if (!success) {
    throw {
      message,
    };
  }
  return { success, message, data };
  //   const result = await response.json();
  //   console.log(result);
  //   return result;
  // } catch (error) {
  //   console.log(error);
  // }
}

export async function loginUser(username, password) {
  try {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
}
export async function fetchMe() {
  try {
    const response = await fetch("/api/auth/me");
    const { success, message, user } = await response.json();
    if (!success) {
      throw {
        message,
      };
    }
    return {
      success,
      user,
      message,
    };
  } catch (error) {
    console.log(error);
  }
}

export async function logoutUser() {
  try {
    const response = await fetch("/api/auth/logout");
    const { success, message } = await response.json();
    if (!success) {
      throw {
        message,
      };
    }
    return {
      success,
      message,
    };
  } catch (error) {
    console.log(error);
  }
}
