import './EditCategoryPanel.scss';

function ImageCardEdit({image, onCustomClick}) {
	return (
		<div onClick={onCustomClick} className="mini-card">
			<div className="mini-card__image">
				<img src={image.previewPath} alt="" />
			</div>
			<div className="mini-card__name">{image.name}</div>
		</div>
	);
}

export default ImageCardEdit;
