import React from "react";
import {
	Chart as ChartJS,
	PointElement,
	LineElement,
	Filler,
	RadialLinearScale,
	Tooltip,
	Legend
} from "chart.js";
import { EvaluationFactor, CriteriaList } from "../../../models/Evaluation";
import { Radar } from "react-chartjs-2";

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

interface Props {
	evaluationList: EvaluationFactor[];
}

const MiniEvaluationChart: React.FC<Props> = ({ evaluationList }) => {
	const evaluationIntList = evaluationList.map((ev) => ev.rating);

	const labels = new Array(evaluationIntList.length).fill("");
	const data = {
		labels: labels,
		datasets: [
			{
				label: `Evaluation`,
				data: evaluationIntList,
				fill: true,
				backgroundColor: "rgba(54, 162, 235, .07)",
				borderColor: "rgba(54, 162, 235, .35)",
				pointBackgroundColor: "rgba(54, 162, 235, .2)",
				pointBorderColor: "#fff",
				pointHoverBackgroundColor: "#fff",
				pointHoverBorderColor: "rgba(54, 162, 235, .5)",
				borderWidth: 1.5
			}
		]
	};

	return (
		<Radar
			className="mini-chart"
			height={500}
			width={500}
			data={data}
			options={{
				maintainAspectRatio: false,
				plugins: {
					legend: {
						display: false
					}
				},
				scales: {
					r: {
						grid: {
							color: "rgba(180, 180, 180, .15)",
							borderColor: "rgba(180, 180, 180, .6)"
						},
						angleLines: {
							display: false
						},
						ticks: {
							display: false
						},
						suggestedMin: 0,
						suggestedMax: 10
					}
				}
			}}
		/>
	);
};

export default MiniEvaluationChart;
