import { useEffect, useState } from "react";
import "./styles.css";

export default function ScrollIndicator({ url }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [scrollPercentage, setScrollPercentage] = useState(0);

  async function fetchData(getUrl) {
    try {
      setLoading(true);
      const response = await fetch(getUrl);
      const data = await response.json();
      setData(data.products);
    } catch (error) {
      console.log();
      setErrorMessage(error);
    }
  }

  function handleScrollPercentage() {
    const howMuchScrolled =
      document.body.scrollTop || document.documentElement.scrollTop;
    const totalHeight = document.documentElement.scrollHeight;
    const windowHeight = document.documentElement.clientHeight;
    const totalScroll = totalHeight - windowHeight;
    const scrollPercentage = (howMuchScrolled / totalScroll) * 100;

    console.log("Percentage: ", scrollPercentage);
    setScrollPercentage(scrollPercentage);
  }

  useEffect(() => {
    fetchData(url);
  }, [url]);

  useEffect(() => {
    window.addEventListener("scroll", handleScrollPercentage);

    return () => {
      window.removeEventListener("scroll", () => {});
    };
  });
  return (
    <div>
      <div className="top-container">
        <h1>Product List</h1>
        <div className="scroll-progress-tracking-container">
          <div
            className="current-progress-bar"
            style={{ width: `${scrollPercentage}%` }}
          ></div>
        </div>
      </div>

      <div>
        {data && data.length > 0
          ? data.map((dataItem, index) => (
              <div key={index}>{dataItem.title}</div>
            ))
          : null}
      </div>
    </div>
  );
}
