import { useEffect } from "react";
import { useState } from "react";
import "./styles.css";

export default function ImageSlider({ url, page = 1, limit = 5 }) {
  const [images, setImages] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  async function fetchImages(getUrl) {
    try {
      setLoading(true);
      const response = await fetch(`${getUrl}?page=${page}&limit=${limit}`);
      const data = await response.json();
      console.log(data);

      if (data) {
        setImages(data);
        setLoading(false);
      }
    } catch (error) {
      setErrorMsg(error.message);
      setLoading(false);
    }
  }

  useEffect(() => {
    if (url !== "") fetchImages(url);
  }, [url]);

  const handleClick = (index) => {
    setCurrentSlide(index);
    console.log(currentSlide);
  };

  if (loading) {
    return <div>Loading... Please Wait...</div>;
  }

  if (errorMsg !== null) {
    return <div>Error Occurred! {errorMsg}</div>;
  }
  return (
    <div className="container">
      {images.length > 0 ? (
        <div className="image-slider">
          {images.map((image, index) => (
            <img
              key={index}
              src={image.download_url}
              alt={image.url}
              className={
                index === currentSlide ? "active-slide" : "hidden-slide"
              }
            />
          ))}
        </div>
      ) : (
        <div>No Image Found</div>
      )}
      <div className="slide-number-container">
        {images.map((image, index) => (
          <div
            onClick={() => handleClick(index)}
            className={`slide-number ${index === currentSlide ? "active" : ""}`}
            key={index}
          >
            <span className="single-slide-number">{index + 1}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
