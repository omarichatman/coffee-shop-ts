import { Link } from 'react-router-dom';
import './Thumbnail.css';

function Thumbnail({ id, image, title }: {id: string, image: string, title: string}) {
  return (
    <Link
      className="thumbnail-component"
      data-testid="thumbnail-component"
      to={`/details/${id}`}
    >
      <img src={image} alt={title} />
      <div className="title">{title}</div>
    </Link>
  );
}

export default Thumbnail;
