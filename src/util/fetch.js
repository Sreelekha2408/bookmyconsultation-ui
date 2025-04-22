export const postLoginRequest = (url, data) => {
  const credentials = btoa(`${data.email}:${data.password}`);
  return fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${credentials}`,
    },
  });
};

export const postRequest = (url, data) => {
  return fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
    },
  });
};

export const getRequest = (url) => {
  return fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
    },
  });
};

export const registerUser = (url, data) => {
  return fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const getSpecialities = async () => {
  const response = await getRequest("http://localhost:8080/doctors/speciality");
  if (response.ok) {
    return await response.json();
  }
};

export const getDoctorBySpeciality = async (val) => {
  const response = await getRequest(
    `http://localhost:8080/doctors?speciality=${val}`
  );
  if (response.ok) {
    return await response.json();
  }
};

export const bookAnAppointment = async (data) => {
  const response = await postRequest(
    "http://localhost:8080/appointments",
    data
  );
  if (response.ok) {
    return await response.text();
  }
};
