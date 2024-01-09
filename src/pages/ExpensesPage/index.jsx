import React from "react";
import { fetchData } from "../../helpers";
import { useLoaderData } from "react-router-dom";
import Table from "../../components/Table";

// loader
export async function expensesLoader() {
  const expenses = fetchData("expenses");
  return { expenses };
}

export async function expensesAction({ request }) {
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);

  if (_action === "deleteExpense") {
    try {
      // delete an expense
      deleteItem({
        key: "expenses",
        id: values.expenseId,
      });
      return toast.success("Expense deleted");
    } catch (error) {
      throw new Error("There was a problem deleting  your expense.");
    }
  }
}

export default function ExpensesPage() {
  const { expenses } = useLoaderData();

  return (
    <div>
      <h1>Tous les dépenses</h1>
      {expenses && expenses.length > 0 ? (
        <div className="grid-md">
          <h2>
            Dépenses récent <small>({expenses.length} total)</small>
          </h2>
          <Table expenses={expenses} />
        </div>
      ) : (
        <p>Pas de dépenses à afficher</p>
      )}
    </div>
  );
}
