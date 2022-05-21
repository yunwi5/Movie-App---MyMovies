import React from 'react';
import { Link } from 'react-router-dom';
import MiniEvaluationChart from '../Chart/MiniEvaluationChart';
import Movie from '../../../models/Movie';

import { CriteriaList } from '../../../models/Evaluation';
import { createEvaluationList } from '../../../utilities/evaluation-util/evaluation-util';

const EvaluationCard: React.FC<{ movie: Movie }> = ({ movie }) => {
    let evaluation = movie.evaluation;
    if (!evaluation) return <div />;
    const evaluationList = createEvaluationList(evaluation, CriteriaList);

    return (
        <div className="card-evaluation">
            <MiniEvaluationChart evaluationList={evaluationList} />
            <Link to={`/movie-evaluate/${movie.id}`} className="message">
                Evaluate
            </Link>
        </div>
    );
};

export default EvaluationCard;
