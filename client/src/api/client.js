const defaultHeaders = {
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  };
  
  export const getUserById = (userId) => {
    const response = fetch(`http://localhost:3001/api/user/${userId}`, {
      ...defaultHeaders,
    })
      .then(checkStatus)
      .then(parseJSON);
    return response;
  };
  
  export const getAllUsersAPIMethod = () => {
    const res = fetch(`http://localhost:3001/api/users`, {
      ...defaultHeaders,
      method: "GET",
    })
      .then(checkStatus)
      .then(parseJSON);
    return res;
  };
  
  export const updateUserAPIMethod = (userToken, form) => {
    return fetch(`http://localhost:3001/api/updateUser/${userToken}`, {
        method: 'PUT',
        body: JSON.stringify(form),
        headers: {
            'Content-Type': 'application/json',
            // Add other headers from defaultHeaders, or define them directly here
        },
    }).then(checkStatus); // Assuming checkStatus properly checks and handles the response
  };
  
  function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      const error = new Error(`${response.statusText}`);
      error.status = response.statusText;
      error.response = response;
      throw error;
    }
  }
  
  function parseJSON(response) {
    return response.json();
  }
  