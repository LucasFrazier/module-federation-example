const API_SERVER = "http://localhost:8080";

// User
export const getServerJwt = async (username, password) => {
  const res = await fetch(`${API_SERVER}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });
  const data = await res.json();

  return data.access_token;
};

// Cart
export const getServerCart = async (jwt) => {
  const res = await fetch(`${API_SERVER}/cart`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  });
  const data = await res.json();

  return data;
};

export const fireRefreshCart = (loggedIn, refreshCart, jwt) => {
  const localStorageCart = JSON.parse(localStorage.getItem("cart"));

  if (localStorageCart) {
    if (loggedIn & (Date.now() - localStorageCart.lastUpdated > 5000 == true)) {
      refreshCart(jwt);
    }
  }
};

// Misc
export const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});
