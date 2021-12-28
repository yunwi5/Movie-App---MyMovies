
interface IconProps {
    isEditing: boolean;
    onStartEdit: () => void;
    onConfirm: () => void;
    onCancel: () => void;
}

const MovieEditIcon: React.FC<IconProps> = (props) => {
    const { isEditing, onStartEdit, onConfirm, onCancel } = props;

	return (
		<div className="icons-wrapper">
			{!isEditing && (
				<div className="icon" onClick={onStartEdit}>
					{" "}
					<i className="fa fa-pencil" />
				</div>
			)}
            {isEditing && (
                <>
                    <div className="icon" onClick={onConfirm}>
                        <i className="fa fa-check" />
                    </div>
                    <div className="icon" onClick={onCancel}>
                        <i className="fa fa-times" />
                    </div>
                </>
            )}
		</div>
	);
};

export default MovieEditIcon;
