import { useParams } from 'react-router-dom';
import { memo } from 'react';
import { itemImages } from '../items';
import Thumbnail from './Thumbnail';
import './Details.css';

type ItemType = {
  id: string;
  imageId: string;
  title: string;
  price: number;
};

const Details = memo(({ addToCart, id, items }:
  { addToCart: Function, id: string | undefined, items: Array<ItemType>}) => {
  const detailItem: ItemType | undefined = items.find((item: ItemType) => item.id === id);
  const otherItems = items.filter((item) => item.id !== id);

  return (
    <div className="details-component">
      <div className="details-sidebar">
        <h2>Other Items</h2>
        {otherItems.map((item) => (
          <Thumbnail
            id={item.id}
            image={itemImages[item?.imageId as keyof typeof itemImages]}
            title={item.title}
            key={item.id}
          />
        ))}
      </div>
      <div className="details-box">
        { detailItem
          ? (
            <>
              <h2>{detailItem.title}</h2>
              <img
                className="details-image"
                src={itemImages[detailItem?.imageId as keyof typeof itemImages]}
                alt={detailItem.title}
              />
              <div>
                Price: $
                {detailItem.price.toFixed(2)}
              </div>
              <div>
                <button
                  type="button"
                  onClick={() => addToCart(detailItem.id)}
                >
                  Add to Cart
                </button>
              </div>
            </>
          )
          : (<h2>Unknown Item</h2>)}
      </div>
    </div>
  );
});

function DetailsOuter({ addToCart, items }: { addToCart: Function, items: Array<ItemType>}) {
  const { id } = useParams();
  return (
    <Details
      addToCart={addToCart}
      id={id}
      items={items}
    />
  );
}

export default DetailsOuter;
