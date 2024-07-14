document.addEventListener("DOMContentLoaded", (event) => {
  loadBudget();
  loadExpenses();
});

function setBudget() {
  const budgetInput = document.getElementById("budgetInput").value;
  if (budgetInput === "" || budgetInput <= 0) return;

  localStorage.setItem("budget", budgetInput);
  updateBudgetAnalysis();
  document.getElementById("budgetInput").value = "";
}

function addExpense() {
  const amountInput = document.getElementById("amountInput").value;
  const categoryInput = document.getElementById("categoryInput").value;
  const dateInput = document.getElementById("dateInput").value;

  if (amountInput === "" || categoryInput === "" || dateInput === "") return;

  const expense = {
    amount: parseFloat(amountInput),
    category: categoryInput,
    date: dateInput,
  };

  let expenses = getExpensesFromLocalStorage();
  expenses.push(expense);
  localStorage.setItem("expenses", JSON.stringify(expenses));

  displayExpense(expense);
  updateBudgetAnalysis();

  document.getElementById("amountInput").value = "";
  document.getElementById("categoryInput").value = "";
  document.getElementById("dateInput").value = "";
}

function loadBudget() {
  const budget = localStorage.getItem("budget");
  if (budget) {
    document.getElementById("totalBudget").innerText = budget;
    updateBudgetAnalysis();
  }
}

function loadExpenses() {
  const expenses = getExpensesFromLocalStorage();
  expenses.forEach((expense) => {
    displayExpense(expense);
  });
  updateBudgetAnalysis();
}

function getExpensesFromLocalStorage() {
  const expenses = localStorage.getItem("expenses");
  return expenses ? JSON.parse(expenses) : [];
}

function displayExpense(expense) {
  const expenseList = document.getElementById("expenseList");
  const listItem = document.createElement("li");
  listItem.innerText = `${expense.date} - ${
    expense.category
  }: $${expense.amount.toFixed(2)}`;
  expenseList.appendChild(listItem);
}

function updateBudgetAnalysis() {
  const budget = parseFloat(localStorage.getItem("budget")) || 0;
  const expenses = getExpensesFromLocalStorage();

  const totalExpenses = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );
  const remainingBudget = budget - totalExpenses;
  const percentageSpent =
    budget > 0 ? ((totalExpenses / budget) * 100).toFixed(2) : 0;

  document.getElementById("totalBudget").innerText = budget.toFixed(2);
  document.getElementById("totalExpenses").innerText = totalExpenses.toFixed(2);
  document.getElementById("remainingBudget").innerText =
    remainingBudget.toFixed(2);
  document.getElementById("percentageSpent").innerText = percentageSpent;
}
