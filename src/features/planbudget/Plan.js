import "bootstrap/dist/css/bootstrap.min.css";
import { AppProvider } from "./context/BudgetPlannerContext";
import Budget from "./components/Budget";
import ExpenseTotal from "./components/ExpenseTotal";
import ExpenseList from "./components/ExpenseList";
import AddExpenseForm from "./components/AddExpenseForm";
import RemainingBudget from "./components/Remaining";
import PageTemplate from "../../common/components/PageTemplate";
import Breadcrumbs from "../../common/components/Breadcrumbs";

export default function Plan() {
    return (
        <PageTemplate>
            <Breadcrumbs
                path="Home/Budget Planner"
                links={["/dashboard", "/plan"]}
            />
            <AppProvider>
                <div className="container">
                    <div className="row mt-3">
                        <div className="col-sm">
                            <Budget />
                        </div>
                        <div className="col-sm">
                            <RemainingBudget />
                        </div>
                        <div className="col-sm">
                            <ExpenseTotal />
                        </div>
                    </div>
                    <h3 className="mt-3">Expenses</h3>
                    <div className="row ">
                        <div className="col-sm">
                            <ExpenseList />
                        </div>
                    </div>
                    <h3 className="mt-3">Add Expense</h3>
                    <div className="row mt-3">
                        <div className="col-sm">
                            <AddExpenseForm />
                        </div>
                    </div>
                </div>
            </AppProvider>
        </PageTemplate>
    );
}
