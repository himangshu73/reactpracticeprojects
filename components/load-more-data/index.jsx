import { useEffect, useState } from "react";
import "./styles.css";

const LoadMore = () => {
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [count, setCount] = useState(0);
  const [disableButton, setDisableButton] = useState(false);

  async function fetchProducts() {
    try {
      setLoading(true);
      const response = await fetch(
        `https://dummyjson.com/products?limit=50&skip=${
          count === 0 ? 0 : 50 * count
        }`
      );
      const result = await response.json();
      console.log(result.products);
      if (result && result.products && result.products.length) {
        setItems((prevData) => [...prevData, ...result.products]);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, [count]);

  useEffect(() => {
    if (items && items.length === 200) {
      setDisableButton(true);
    }
  }, [items]);

  const handleClick = () => {
    setCount(count + 1);
  };

  return (
    <div className="container">
      {loading ? "Loading .... Please Wait" : ""}
      <div className="product-container">
        {items && items.length
          ? items.map((item) => (
              <div className="item" key={item.id}>
                <img src={item.thumbnail} />
                <p>{item.title}</p>
              </div>
            ))
          : null}
      </div>
      <div className="load-button">
        <button disabled={disableButton} onClick={handleClick}>
          Load More
        </button>
      </div>
      <div>{disableButton ? "You have reached the end..." : null}</div>
    </div>
  );
};

export default LoadMore;
