import React from "react";
import {
	Evaluation,
	EvaluationFactor,
	CriteriaList,
	CriterionName
} from "../../../models/Evaluation";
import {
	Chart as ChartJS,
	PointElement,
	LineElement,
	Filler,
	RadialLinearScale,
	Tooltip,
	Legend
} from "chart.js";
import { Bar, Radar, Line } from "react-chartjs-2";

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

interface Props {
	evaluationList: EvaluationFactor[];
	title: string;
}

// Chart with 8 sections (criteria)
// Adding average?
const EvaluationChart: React.FC<Props> = (props) => {
	const { evaluationList, title } = props;

	const evaluationIntList = evaluationList.map((evaluation) => evaluation.rating);

	const data = {
		labels: CriteriaList,
		datasets: [
			{
				label: `${title} Evaluation`,
				data: evaluationIntList,
				fill: true,
				backgroundColor: "rgba(54, 162, 235, .2)",
				borderColor: "rgb(54, 162, 235)",
				pointBackgroundColor: "rgb(54, 162, 235)",
				pointBorderColor: "#fff",
				pointHoverBackgroundColor: "#fff",
				pointHoverBorderColor: "rgb(54, 162, 235)",
				borderWidth: 1.5
			},
			{
				label: "Your Average Evaluation",
				data: [ 5, 5, 5, 5, 5, 5, 5, 5 ],
				backgroundColor: "rgba(255, 99, 132, 0.2)",
				borderColor: "rgb(255, 99, 132)",
				pointBackgroundColor: "rgb(255, 99, 132)",
				pointBorderColor: "#fff",
				pointHoverBackgroundColor: "#fff",
				pointHoverBorderColor: "rgb(255, 99, 132)",
				borderWidth: 1.5
			}
		]
	};

	return (
		<section className="chart-wrapper">
			<Radar
				className="evaluation-chart"
				height={500}
				width={500}
				data={data}
				options={{
					maintainAspectRatio: false,
					scales: {
						r: {
							grid: {
								color: "rgba(180, 180, 180, .25)",
								borderColor: "rgba(180, 180, 180, .9)"
							},
							angleLines: {
								// true by default
								display: true
							},
							suggestedMin: 0,
							suggestedMax: 10
						}
					}
				}}
			/>
		</section>
	);
};

export default EvaluationChart;
