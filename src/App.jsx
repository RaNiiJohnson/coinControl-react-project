import { RouterProvider, createBrowserRouter } from "react-router-dom";

// layout
import Main, { mainLoader } from "./layout/Main";

// routes
import Dashboard, { dashboardAction, dashboardLoader } from "./pages/Dashboard";
import "./App.scss";
import { logoutAction } from "./actions/Logout";

//library
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//page
import BudgetPage, { budgetAction, budgetLoader } from "./pages/BudgetPage";
import ExpensesPage, {
  expensesAction,
  expensesLoader,
} from "./pages/ExpensesPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    loader: mainLoader,
    children: [
      {
        index: true,
        element: <Dashboard />,
        loader: dashboardLoader,
        action: dashboardAction,
      },
      {
        path: "budget/:id",
        element: <BudgetPage />,
        loader: budgetLoader,
        action: budgetAction,
        // errorElement: <Error />,
      },
      {
        path: "expenses",
        element: <ExpensesPage />,
        loader: expensesLoader,
        action: expensesAction,
        // errorElement: <Error />,
      },
      {
        path: "logout",
        action: logoutAction,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
}

export default App;
