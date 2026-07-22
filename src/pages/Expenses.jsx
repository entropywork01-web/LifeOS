import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { useState, useContext } from "react";
import Layout from "../components/Layout";
import { LifeOSContext } from "../context/LifeOSContext";
import "../styles/Expenses.css";

function Expenses() {
  const { expenses, setExpenses } = useContext(LifeOSContext);

  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Food");
  const [date, setDate] = useState(
  new Date().toISOString().split("T")[0]
);

  const totalExpenses = expenses.reduce(
    (sum, item) => sum + item.amount,
    0
  );

  function addExpense() {
    if (
      amount.trim() === "" ||
      description.trim() === "" ||
      date === ""
    ) {
      return;
    }

    const newExpense = {
      id: Date.now(),
      amount: Number(amount),
      description,
      category,
      date,
    };

    setExpenses([...expenses, newExpense]);

    setAmount("");
    setDescription("");
    setCategory("Food");
    setDate("");
  }

  function deleteExpense(id) {
    setExpenses(
      expenses.filter((item) => item.id !== id)
    );
  }

  return (
    <Layout>
      <div className="expenses-page">
        <h1>Expenses 💰</h1>

        <div className="expense-summary">
          <h2>💳 Total Spending</h2>
         <h1 className="expense-total">₹{totalExpenses}</h1>
          <p className="expense-count">
  {expenses.length} expense
  {expenses.length !== 1 ? "s" : ""} recorded
</p>
        </div>

        <Card className="add-expense-box">

  <h2>Add New Expense</h2>

  <div className="expense-form">

    <input
      type="number"
      placeholder="Amount (₹)"
      value={amount}
      onChange={(e) => setAmount(e.target.value)}
      onKeyDown={(e) => e.key === "Enter" && addExpense()}
    />

    <input
      placeholder="Description"
      value={description}
      onChange={(e) => setDescription(e.target.value)}
      onKeyDown={(e) => e.key === "Enter" && addExpense()}
    />

    <select
      value={category}
      onChange={(e) => setCategory(e.target.value)}
    >
      <option>Food</option>
      <option>Transport</option>
      <option>Shopping</option>
      <option>Bills</option>
      <option>Health</option>
      <option>Education</option>
      <option>Other</option>
    </select>

    <input
      type="date"
      value={date}
      onChange={(e) => setDate(e.target.value)}
    />

  </div>

  <Button onClick={addExpense}>
    ➕ Add Expense
  </Button>

</Card>

       <div className="expense-list">

  <h2>💳 Recent Expenses</h2>

  {expenses.length === 0 ? (
  <div className="empty-state">
  <div className="empty-icon">💸</div>

  <h2>No expenses yet</h2>

  <p>
    Start tracking your spending by adding your first expense.
  </p>
</div>
  ) : (
    expenses.map((item) => (
      <div key={item.id} className="expense-card">

        <div>
          <h3>{item.description}</h3>

         <p>
  {item.category === "Food" && "🍔 "}
  {item.category === "Transport" && "🚌 "}
  {item.category === "Shopping" && "🛍️ "}
  {item.category === "Bills" && "📄 "}
  {item.category === "Health" && "🏥 "}
  {item.category === "Education" && "📚 "}
  {item.category === "Other" && "📌 "}

  {item.category} • {item.date}
</p>
        </div>

        <div className="expense-actions">
          <h3>₹{item.amount}</h3>

         <button
  className="delete-btn"
  onClick={() => deleteExpense(item.id)}
>
  🗑 Delete
</button>
        </div>

      </div>
    ))
  )}

</div>
      </div>
    </Layout>
  );
}

export default Expenses;