let transactions = [];
let total = 0;

document.addEventListener("DOMContentLoaded", function () {
  renderTransactions();
});

function addTransaction() {
  const date = document.getElementById("date").value;
  const description = document.getElementById("description").value;
  const amount = parseFloat(document.getElementById("amount").value);
  const type = document.querySelector('input[name="type"]:checked').value;
  const alertDiv = document.getElementById("alert");

  alertDiv.classList.add("d-none");
  alertDiv.innerText = "";

  // Validation
  if (!date || !description || isNaN(amount)) {
    alertDiv.innerText += "Please fill in all fields correctly.";
    alertDiv.classList.remove("d-none");
    setTimeout(() => {
      alertDiv.classList.add("d-none");
    }, 1800);
    return;
  }

  const user_id = 1; // Replace with dynamic user ID

  // Prepare data to send
  const data = new FormData();
  data.append("date", date);
  data.append("description", description);
  data.append("amount", type === "income" ? amount : -amount);
  data.append("type", type);
  data.append("user_id", user_id);

  fetch("http://localhost/expense-tracker/backend/add_transactions.php", {
    method: "POST",
    body: data,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.status === "success") {
        renderTransactions(); // Re-render transactions to reflect the new one
        document.getElementById("expenseForm").reset(); // Reset the form after successful transaction
      } else {
        alert(data.message); // Show any error message from the backend
      }
    })
    .catch((error) => {
      alert("An error occurred while adding the transaction."); // Display a general error message
    });
}

function renderTransactions() {
  fetch("http://localhost/expense-tracker/backend/get_transactions.php")
    .then((response) => response.json())
    .then((fetchedTransactions) => {
      transactions = fetchedTransactions; // Ensure transactions is updated

      const expenseTable = document.getElementById("expenseTable");
      expenseTable.innerHTML = ""; // Clear the table

      let total = 0; // Overall balance
      let totalIncome = 0;
      let totalExpenses = 0;

      if (transactions.length === 0) {
        expenseTable.innerHTML = `<tr><td colspan="4" class="text-center">No transactions available.</td></tr>`;
        document.getElementById("totalAmountCard").innerText = `₹0`;
        document.getElementById("totalIncome").innerText = `0`;
        document.getElementById("totalExpenses").innerText = `0`;
        return;
      }

      transactions.forEach((transaction, index) => {
        const amount = Number(transaction.amount);
        if (isNaN(amount)) return;

        const displayAmount =
          amount >= 0
            ? `+₹${Math.abs(Math.round(amount))}`
            : `-₹${Math.abs(Math.round(amount))}`;

        const amountClass =
          amount < 0 ? "text-danger fw-bold" : "text-success fw-bold";

        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${transaction.date}</td>
          <td class="fw-bold">${transaction.description}</td>
          <td class="${amountClass}">${displayAmount}</td>
          <td class="p-0">
              <button class="btn btn-outline" onclick="editTransaction(${index})">
                    <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="#e8eaed"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>
                </button>
                <button class="btn btn-outline" onclick="deleteTransaction(${index})">
                    <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="#FF0000"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
                </button>
          </td>
        `;
        expenseTable.appendChild(row);

        total += amount;
        if (amount > 0) {
          totalIncome += amount;
        } else {
          totalExpenses += amount;
        }
      });

      document.getElementById("totalAmountCard").innerText = `₹${Math.round(total)}`;
      document.getElementById("totalIncome").innerText = `${Math.round(totalIncome)}`;
      document.getElementById("totalExpenses").innerText = `${Math.abs(Math.round(totalExpenses))}`;
    })
    .catch((error) => console.error("Error fetching transactions:", error));
}

function editTransaction(index) {
  if (transactions[index]) {
    const transaction = transactions[index];
    // Set the form fields
    document.getElementById("date").value = transaction.date;
    document.getElementById("description").value = transaction.description;
    document.getElementById("amount").value = Math.abs(transaction.amount);

    // Set the type based on the transaction amount
    if (transaction.amount < 0) {
      document.getElementById("expense").checked = true;
    } else {
      document.getElementById("income").checked = true;
    }

    // Hide the Add Transaction button and show Save Changes button
    document.getElementById("addButton").classList.add("d-none");
    document.getElementById("saveButton").classList.remove("d-none");

    // Store the index of the transaction to be edited
    window.editingIndex = index; // Store the transaction index globally
  }
}

function saveEditedTransaction() {
  const index = window.editingIndex; // Get the index of the transaction being edited
  const date = document.getElementById("date").value;
  const description = document.getElementById("description").value;
  const amount = parseFloat(document.getElementById("amount").value);
  const type = document.querySelector('input[name="type"]:checked').value;

  const alertDiv = document.getElementById("alert");
  alertDiv.classList.add("d-none");
  alertDiv.innerText = "";

  // Validate form fields
  if (!date || !description || isNaN(amount) || !type) {
    alertDiv.innerText += "Please fill in all fields correctly.";
    alertDiv.classList.remove("d-none");
    setTimeout(() => {
      alertDiv.classList.add("d-none");
    }, 1800);
    return;
  }

  const user_id = 1; // Replace with dynamic user ID

  // Prepare data to send
  const data = {
    id: transactions[index].id, // Use the id of the transaction to update
    date: date,
    description: description,
    amount: type === "income" ? amount : -amount,
    type: type,
    user_id: user_id,
  };

  fetch("http://localhost/expense-tracker/backend/edit_transactions.php", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.status === "success") {
        renderTransactions(); // Re-render transactions to reflect the updated one
        document.getElementById("expenseForm").reset(); // Reset the form after successful update
        document.getElementById("saveButton").classList.add("d-none"); // Hide the save button again
        document.getElementById("addButton").classList.remove("d-none"); // Show the Add Transaction button again
      } else {
        alert(data.message); // Show any error message from the backend
      }
    });
}

function deleteTransaction(index) {
  const transactionId = transactions[index].id; // Ensure the transaction has an id
  fetch(
    `http://localhost/expense-tracker/backend/delete_transactions.php?id=${transactionId}`,
    {
      method: "GET",
    }
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.status === "success") {
        transactions.splice(index, 1); // Remove the transaction locally
        renderTransactions(); // Re-render the table
      } else {
        alert(data.message); // Show error message
      }
    })
    .catch((error) => console.error("Error:", error));
}
