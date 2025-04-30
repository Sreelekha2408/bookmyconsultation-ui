const BASE_URL = "http://localhost:8080";

export const url = {
  logout: `${BASE_URL}/auth/logout`,
  login: `${BASE_URL}/auth/login`,
  register: `${BASE_URL}/users/register`,
  userAppointments: `${BASE_URL}/users`,
  rating: `${BASE_URL}/ratings`,
  doctorBySpeciality: `${BASE_URL}/doctors?speciality=`,
  specialities: `${BASE_URL}/doctors/speciality`,
  bookAppointment: `${BASE_URL}/appointments`,
  timeSlots: `${BASE_URL}/doctors`,
};
