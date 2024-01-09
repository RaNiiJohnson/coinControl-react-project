import {
  calculateSpentByBudget,
  formatCurrency,
  formatPercentage,
} from "../helpers";

export default function BudgetItem({ budget }) {
  const { id, name, amount, color } = budget;
  const spent = calculateSpentByBudget(id);

  return (
    <div
      className="budgetItem"
      style={{
        "--accent": color,
      }}
    >
      <p>
        {formatCurrency(amount)} de <span>{name}</span>
      </p>
      <progress max={amount} value={spent}>
        {formatPercentage(spent / amount)}
      </progress>
      <small>{formatCurrency(spent)} dépenser</small>
      <small className="last">{formatCurrency(amount - spent)} de reste</small>
    </div>
  );
}
