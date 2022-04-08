import { Size } from '../../../models/styleModels';

// Overriding style is available
const LoadingSpinner: React.FC<{ size?: Size; style?: object }> = ({ size, style }) => {
	return <div className={`spinner spinner-${size}`} style={style} />;
};

export default LoadingSpinner;
