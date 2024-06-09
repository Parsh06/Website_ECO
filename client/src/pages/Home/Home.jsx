import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Home.module.css';
import Card from '../../components/Card/Card';

function Home() {
  const [products, setProducts] = useState([]);
  const [feature, setFeature] = useState([]);
  const [slideText, setSlideText] = useState("Classic Clothes");
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [insideText, setInsideText] = useState("Mens Clothes");
  const [currentStartIndex, setCurrentStartIndex] = useState(0);
  const [currentFeatureStartIndex, setCurrentFeatureStartIndex] = useState(0);

  useEffect(() => {
    axios.get('http://localhost:3001/api/products')
      .then(response => {
        setProducts(response.data.items);
        setFeature(response.data.items.filter(product => product.feature));
      })
      .catch(error => {
        console.error('Error fetching the products:', error);
      });
  }, []);

  const handleSlideChange = (index) => {
    switch (index) {
      case 0:
        setSlideText("Classic Clothes");
        setInsideText("Mens Clothes");
        break;
      case 1:
        setSlideText("This is the text for the second slide.");
        setInsideText("Womens Clothes");
        break;
      case 2:
        setSlideText("This is the text for the third slide.");
        setInsideText("Kids Clothes");
        break;
      default:
        setSlideText("Slide Text");
        setInsideText("Inside Text");
    }
  };

  useEffect(() => {
    const carousel = document.getElementById("carouselExampleRide");

    const handleSlideChangeEvent = (event) => {
      const newIndex = event.to;
      setActiveSlideIndex(newIndex);
      handleSlideChange(newIndex);
    };

    carousel.addEventListener("slide.bs.carousel", handleSlideChangeEvent);

    return () => {
      carousel.removeEventListener("slide.bs.carousel", handleSlideChangeEvent);
    };
  }, []);

  const handleNextClick = () => {
    const newStartIndex = (currentStartIndex + 3) % products.length;
    setCurrentStartIndex(newStartIndex);
  };

  const handlePreviousClick = () => {
    const newStartIndex = (currentStartIndex - 3 + products.length) % products.length;
    setCurrentStartIndex(newStartIndex);
  };

  const handleFeatureNextClick = () => {
    const newStartIndex = (currentFeatureStartIndex + 3) % feature.length;
    setCurrentFeatureStartIndex(newStartIndex);
  };

  const handleFeaturePreviousClick = () => {
    const newStartIndex = (currentFeatureStartIndex - 3 + feature.length) % feature.length;
    setCurrentFeatureStartIndex(newStartIndex);
  };

  const handleClick = () => {
    window.location.href = '/product';
  };

  const visibleProducts = products.slice(currentStartIndex, currentStartIndex + 3);
  const visibleFeature = feature.slice(currentFeatureStartIndex, currentFeatureStartIndex + 3);

  return (
    <>
      <div className={styles.homePage}>
        <header className={`py-5 mb-4 ${styles.header}`}>
          <div className="container text-center">
            <h1>Welcome to FashionHub</h1>
            <p className={styles.lead}><b><i>Discover the latest trends in fashion</i></b></p>
          </div>
        </header>
        <div className="container">
          <div className="row">
            <div className={`col-md-6 ${styles.carouselContainer}`}>
              <div id="carouselExampleRide" className="carousel slide" data-bs-ride="carousel" data-bs-interval="3000">
                <div className="carousel-inner">
                  <div className={`carousel-item ${activeSlideIndex === 0 ? 'active' : ''}`} data-slide-index="0">
                    <img src="https://via.placeholder.com/800x400?text=First+Slide" className={`d-block w-100 ${styles.carouselImages}`} alt="First Slide" />
                  </div>
                  <div className={`carousel-item ${activeSlideIndex === 1 ? 'active' : ''}`} data-slide-index="1">
                    <img src="https://via.placeholder.com/800x400?text=Second+Slide" className={`d-block w-100 ${styles.carouselImages}`} alt="Second Slide" />
                  </div>
                  <div className={`carousel-item ${activeSlideIndex === 2 ? 'active' : ''}`} data-slide-index="2">
                    <img src="https://via.placeholder.com/800x400?text=Third+Slide" className={`d-block w-100 ${styles.carouselImages}`} alt="Third Slide" />
                  </div>
                </div>
              </div>
            </div>
            <div className={`col-md-6 d-flex ${styles.textContainer}`}>
              <div>
                <h2>{slideText}</h2>
                <p>{insideText}</p>
                <button className={styles.cardButton} onClick={handleClick}>Shop Now</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <header className={`py-5 mb-4 ${styles.header}`}>
        <div className="container text-center">
          <h1>See Our Latest Collection</h1>
        </div>
      </header>

      <main className="container">
        <div className={styles.cardGrid}>
          {visibleProducts.map((product) => (
             <Card
             key={product.id}
             id={product.id}
             imageUrl={product.imageUrls[0]}
             title={product.title}
             description={product.description}
             price={product.price}
           />
          ))}
        </div>
        <div className="d-flex justify-content-center">
          <button onClick={handlePreviousClick} className={`btn btn-secondary ${styles.previousButton} mx-2`}>Previous</button>
          <button onClick={handleNextClick} className={`btn btn-secondary ${styles.nextButton} mx-2`}>Next</button>
        </div>
      </main>

      <header className={`py-5 mb-4 ${styles.header}`}>
        <div className="container text-center">
          <h1>Featured Products</h1>
        </div>
      </header>

      <main className="container">
        <div className={styles.cardGrid}>
          {visibleFeature.map((product) => (
             <Card
             key={product.id}
             id={product.id}
             imageUrl={product.imageUrls[0]}
             title={product.title}
             description={product.description}
             price={product.price}
           />
          ))}
        </div>
        <div className="d-flex justify-content-center">
          <button onClick={handleFeaturePreviousClick} className={`btn btn-secondary ${styles.previousButton} mx-2`}>Previous</button>
          <button onClick={handleFeatureNextClick} className={`btn btn-secondary ${styles.nextButton} mx-2`}>Next</button>
        </div>
      </main>
    </>
  );
}

export default Home;
