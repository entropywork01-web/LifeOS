import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
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
  const [date, setDate] = useState("");

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
      <div className="dashboard">
        <h1>Expenses 💰</h1>

        <div className="total-expenses-card">
          <h2>💰 Total Spent</h2>
          <h1>₹{totalExpenses}</h1>
          <p>
            {expenses.length} expense
            {expenses.length !== 1 ? "s" : ""} recorded
          </p>
        </div>

         <Card> 

          <input
            type="number"
            placeholder="Amount (₹)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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
<Button onClick={addExpense}>
  Add Expense
</Button>

</Card>

        <div className="card">
          <h2>Your Expenses</h2>

          {expenses.length === 0 ? (
            <p>No expenses added yet.</p>
          ) : (
            expenses.map((item) => (
              <div key={item.id} className="dashboard-box">

                <h3>₹{item.amount}</h3>

                <p>
                  <strong>Description:</strong> {item.description}
                </p>

                <p>
                  <strong>Category:</strong> {item.category}
                </p>

                <p>
                  <strong>Date:</strong> {item.date}
                </p>

                <button onClick={() => deleteExpense(item.id)}>
                  Delete
                </button>

              </div>
            ))
          )}

        </div>

      </div>
    </Layout>
  );
}

export default Expenses;