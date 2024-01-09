import React from "react";
import Intro from "../../components/Intro";
import {
  createBudget,
  createExpense,
  deleteItem,
  fetchData,
} from "../../helpers";
import { Link, useLoaderData } from "react-router-dom";

//style
import "./style.scss";

//library
import { toast } from "react-toastify";

//components
import AddBudgetForm from "../../components/AddBudgetForm";
import AddExpenseForm from "../../components/AddExpenseForm";
import BudgetItem from "../../components/BudgetItem";
import Table from "../../components/Table";

//loader
export function dashboardLoader() {
  const userName = fetchData("userName");
  const budgets = fetchData("budgets");
  const expenses = fetchData("expenses");
  return { userName, budgets, expenses };
}

// action
export async function dashboardAction({ request }) {
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);

  //newUser
  if (_action === "newUser") {
    try {
      localStorage.setItem("userName", JSON.stringify(values.userName));
      return toast.success(`Bienvenue ${values.userName}`);
    } catch (e) {
      console.log("error");
    }
  }

  //budget
  if (_action === "createBudget") {
    try {
      createBudget({
        name: values.newBudget,
        amount: values.newBudgetAmount,
      });
      return toast.success("yes");
    } catch (e) {
      console.log(e);
    }
  }

  //expense
  if (_action === "createExpense") {
    try {
      // create expense
      createExpense({
        name: values.newExpense,
        amount: values.newExpenseAmount,
        budgetId: values.newExpenseBudget,
      });
      return toast.success(` ${values.newExpense} !`);
    } catch (e) {
      console.log(e);
    }
  }

  //expense
  if (_action === "deleteExpense") {
    try {
      // delete an expense
      deleteItem({
        key: "expenses",
        id: values.expenseId,
      });
      return toast.success("expense deleted");
    } catch (e) {
      console.log(e);
    }
  }
}

export default function Dashboard() {
  const { userName, budgets, expenses } = useLoaderData();
  return (
    <>
      {userName ? (
        <div className="dashboard">
          <h1>Bienvenue {userName}</h1>
          {budgets && budgets.length > 0 ? (
            <div className="grid">
              <AddBudgetForm />
              <AddExpenseForm budgets={budgets} />
              <div className="yourBudgets">
                <h2 className="h2">Votre budget actuelle</h2>
                {budgets.map((budget) => (
                  <BudgetItem key={budget.id} budget={budget} />
                ))}
              </div>
              {expenses && expenses.length > 0 && (
                <div className="recentExpenses">
                  <h2 className="h2">Recent expenses</h2>
                  <Table
                    expenses={expenses
                      .sort((a, b) => b.createdAt - a.createdAt)
                      .slice(0, 8)}
                  />
                  {expenses.length > 8 && (
                    <Link to="expenses" className="btn btn--dark">
                      View all expenses
                    </Link>
                  )}
                </div>
              )}
            </div>
          ) : (
            <AddBudgetForm />
          )}
        </div>
      ) : (
        <Intro />
      )}
    </>
  );
}
