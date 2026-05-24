export const validateOnboardingData = (data: {
  fullName: string;
  monthlyIncome: number;
  savingsGoal: number
}) => {
  if (!data.fullName.trim()) {
    throw new Error('Name is required');
  }
  if (data.monthlyIncome <= 0) {
    throw new Error('Income must be positive');
  }
  if (data.savingsGoal < 0) {
    throw new Error('Savings goal cannot be negative');
  }
};