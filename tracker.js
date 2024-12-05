// DOM elements
const expenseForm = document.getElementById('expense-form');
const expenseList = document.getElementById('expense-list');
const totalAmount = document.getElementById('total-amount');

// Expense array to hold all expenses
let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

// Initialize App
function init() {
  expenses.forEach(addExpenseToDOM);
  updateTotal();
}

// Add Expense
expenseForm.addEventListener('submit', function (e) {
  e.preventDefault();
  
  const expenseName = document.getElementById('expense-name').value;
  const expenseAmount = parseFloat(document.getElementById('expense-amount').value);
  const expenseCategory = document.getElementById('expense-category').value;
  const expenseDate = document.getElementById('expense-date').value || new Date().toISOString().split('T')[0];

  if (!expenseName || !expenseAmount || expenseAmount <= 0 || !expenseCategory) {
    alert('Please fill all the required fields correctly.');
    return;
  }

  const expense = {
    id: Date.now(),
    name: expenseName,
    amount: expenseAmount,
    category: expenseCategory,
    date: expenseDate
  };

  expenses.push(expense);
  addExpenseToDOM(expense);
  updateTotal();
  saveToLocalStorage();

  // Clear form
  expenseForm.reset();
});

// Add Expense to the DOM
function addExpenseToDOM(expense) {
  const li = document.createElement('li');
  li.innerHTML = `
    ${expense.name} - $${expense.amount} - ${expense.category} - ${expense.date}
    <button onclick="editExpense(${expense.id})">Edit</button>
    <button onclick="deleteExpense(${expense.id})">Delete</button>
  `;
  expenseList.appendChild(li);
}

// Edit Expense
function editExpense(id) {
  const expense = expenses.find(exp => exp.id === id);
  if (!expense) return;

  document.getElementById('expense-name').value = expense.name;
  document.getElementById('expense-amount').value = expense.amount;
  document.getElementById('expense-category').value = expense.category;
  document.getElementById('expense-date').value = expense.date;

  deleteExpense(id);
}

// Delete Expense
function deleteExpense(id) {
  expenses = expenses.filter(exp => exp.id !== id);
  saveToLocalStorage();
  refreshExpenses();
}

// Refresh Expense List
function refreshExpenses() {
  expenseList.innerHTML = '';
  expenses.forEach(addExpenseToDOM);
  updateTotal();
}

// Update Total
function updateTotal() {
  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  totalAmount.textContent = total.toFixed(2);
}

// Save to Local Storage
function saveToLocalStorage() {
  localStorage.setItem('expenses', JSON.stringify(expenses));
}

// Initialize App
init();
