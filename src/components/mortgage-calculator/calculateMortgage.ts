type PaymentDetail = {
	month: number;
	interestPayment: number;
	principalPayment: number;
	remainingBalance: number;
};

export function calculateMonthlyPayment(
	loanAmount: number,
	annualRate: number,
	years: number,
): number {
	const monthlyRate = annualRate / 12;
	const n = years * 12;

	if (monthlyRate === 0) {
		return loanAmount / n;
	}

	return loanAmount * monthlyRate / (1 - Math.pow(1 + monthlyRate, -n));
}

function cumsum(arr: number[]) {
	const result = [];
	let sum = 0;
	for (let i = 0; i < arr.length; i++) {
		sum += arr[i];
		result.push(parseInt(sum));
	}
	return result;
}

export function generateAmortizationSchedule(
	loanAmount: number,
	annualRate: number,
	years: number,
): PaymentDetail[] {
	const monthlyPayment = calculateMonthlyPayment(
		loanAmount,
		annualRate,
		years,
	);
	const monthlyRate = annualRate / 12;
	const n = years * 12;

	let balance = loanAmount;
	const schedule: PaymentDetail[] = [];

	for (let month = 1; month <= n; month++) {
		const interestPayment = balance * monthlyRate;
		const principalPayment = monthlyPayment - interestPayment;
		balance -= principalPayment;

		schedule.push({
			month,
			interestPayment: parseFloat(interestPayment.toFixed(2)),
			principalPayment: parseFloat(principalPayment.toFixed(2)),
			remainingBalance: parseFloat(Math.max(balance, 0).toFixed(2)),
		});
	}

	return schedule;
}

export function cumulativeDataSeries(
	loanAmount: number,
	annualRate: number,
	years: number,
	interestOnlyYears: number,
) {
	const amortizationSchedule = generateAmortizationSchedule(
		loanAmount,
		annualRate,
		years,
	);

	const dataSeries: Record<string, number[]> = {};

	const interestOnlyMonths = interestOnlyYears * 12;

	dataSeries.interestPayment = new Array(interestOnlyMonths).fill(
		loanAmount * annualRate / 12,
	);
	dataSeries.principalPayment = new Array(interestOnlyMonths).fill(0);
	dataSeries.remainingBalance = new Array(interestOnlyMonths).fill(
		loanAmount,
	);

	dataSeries.month = [];

	amortizationSchedule.forEach((row) => {
		Object.keys(row).forEach((key) => {
			dataSeries[key].push(row[key]);
		});
	});

	// replace month with new one that includes interest only as well
	dataSeries.month = [...Array(years * 12 + interestOnlyMonths).keys()];

	const months = dataSeries["month"].map((month) =>
		`${Math.floor(month / 12) + 1}-${month % 12 + 1}`
	);

	const totalPrincipalsPaid = cumsum(dataSeries["principalPayment"]);
	const totalInterestsPaid = cumsum(dataSeries["interestPayment"]);

	return {
		months,
		totalPrincipalsPaid,
		totalInterestsPaid,
		remainingBalance: dataSeries["remainingBalance"].map((n) =>
			parseInt(n)
		),
	};
}

if (import.meta.main) {
	const loanAmount = 200000; // $300,000
	const annualRate = 0.045; // 5% annual interest
	const years = 30; // 30-year mortgage

	const monthly = calculateMonthlyPayment(loanAmount, annualRate, years);
	console.log(`Monthly Payment: $${monthly.toFixed(2)}`);

	const schedule = generateAmortizationSchedule(
		loanAmount,
		annualRate,
		years,
	);
	console.log(schedule.slice(0, 3)); // First 3 months for example
}
