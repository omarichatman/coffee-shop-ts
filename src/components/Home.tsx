import Thumbnail from './Thumbnail';
import { itemImages } from '../items';
import './Home.css';

type ItemType = {
  id: string;
  imageId: string;
  title: string;
  price: number;
};

function Home({ items }: {items: Array<ItemType>}) {
  return (
    <div className="home-component">
      {items.map((item) => (
        <Thumbnail
          key={item.id}
          id={item.id}
          image={itemImages[item.imageId as keyof typeof itemImages]}
          title={item.title}
        />
      ))}
    </div>
  );
}

export default Home;
