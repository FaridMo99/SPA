import getUsers from "./getUsers";
import useAuth from "../stores/authStore";

export default async function login(credentials) {
  try {
    const users = await getUsers(
      `?username=${credentials.username}&password=${credentials.password}`,
    );

    if (users.length === 0) {
      throw new Error("error");
    }

    const user = users[0];
    sessionStorage.setItem("user", JSON.stringify(user));
    useAuth.getState().setUser();
    return user;
  } catch (err) {
    return { err };
  }
}

/* login should usually be a POST request which sends the credentials
     and if correct answers with a JWT-Token which then get stored in a 
     http-only cookie, but since mockapi.io dont offer this functionality
     and i dont have other ressources im using here a GET method to retrieve
     the data and if not found then there will be a error message to display.*/
