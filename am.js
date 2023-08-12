// Array to store reservations
let reservations = [];

// Function to display reservations in the list
function displayReservations() {
  const list = document.getElementById("reservations");
  list.innerHTML = "";
  reservations.forEach((reservation, index) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
      <strong>Name:</strong> ${reservation.name}<br>
      <strong>Grade:</strong> ${reservation.grade}<br>
      <strong>Guests:</strong> ${reservation.guests}<br>
      <strong>Date:</strong> ${reservation.date}<br>
      <button onclick="cancelReservation(${index})">Cancel</button>
      <hr>
    `;
    list.appendChild(listItem);
  });
}

// Function to add a new reservation
function addReservation(name, grade, guests, date) {
  reservations.push({ name, grade, guests, date });
  displayReservations();
}

// Function to cancel a reservation
function cancelReservation(index) {
  reservations.splice(index, 1);
  displayReservations();
}

// Function to calculate the total number of reserved spots
function calculateTotalReservations() {
  let totalStudents = 0;
  let totalGuests = 0;
  reservations.forEach((reservation) => {
    totalStudents++;
    totalGuests += reservation.guests;
  });
  return { totalStudents, totalGuests };
}

// Function to search for reservations by student's name
function searchReservationsByName(searchTerm) {
  const filteredReservations = reservations.filter((reservation) =>
    reservation.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return filteredReservations;
}

// Event listener for the reservation form submission
document.getElementById("reservation-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const name = document.getElementById("name").value;
  const grade = parseInt(document.getElementById("grade").value);
  const guests = parseInt(document.getElementById("guests").value);
  const date = document.getElementById("date").value;

  // Validate the input here (you can add your own validation rules)

  addReservation(name, grade, guests, date);

  // Clear the form fields after submission
  document.getElementById("name").value = "";
  document.getElementById("grade").value = "";
  document.getElementById("guests").value = "";
  document.getElementById("date").value = "";
});

// Event listener for the search bar
document.getElementById("search").addEventListener("input", (event) => {
  const searchTerm = event.target.value;
  const filteredReservations = searchReservationsByName(searchTerm);
  const list = document.getElementById("reservations");
  list.innerHTML = "";

  if (filteredReservations.length === 0) {
    list.innerHTML = "<li>No matching reservations found.</li>";
  } else {
    filteredReservations.forEach((reservation, index) => {
      const listItem = document.createElement("li");
      listItem.innerHTML = `
        <strong>Name:</strong> ${reservation.name}<br>
        <strong>Grade:</strong> ${reservation.grade}<br>
        <strong>Guests:</strong> ${reservation.guests}<br>
        <strong>Date:</strong> ${reservation.date}<br>
        <button onclick="cancelReservation(${reservations.indexOf(reservation)})">Cancel</button>
        <hr>
      `;
      list.appendChild(listItem);
    });
  }
});

// Initial display of reservations
displayReservations();
