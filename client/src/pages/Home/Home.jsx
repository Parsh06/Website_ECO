import React, { useState, useEffect } from 'react';
import styles from './Home.module.css';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';

function Home() {
  const [slideText, setSlideText] = useState("This is the text for the first slide.");
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [insideText, setInsideText] = useState("Mens Clothes");

  const handleSlideChange = (index) => {
    switch (index) {
      case 0:
        setSlideText("This is the text for the first slide.");
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

  return (
    <>
      <Navbar />
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
                    <img src="https://via.placeholder.com/800x400?text=First+Slide" className={`d-block w-100 ${styles.carouselImages}`} alt="First Slide"/>
                  </div>
                  <div className={`carousel-item ${activeSlideIndex === 1 ? 'active' : ''}`} data-slide-index="1">
                    <img src="https://via.placeholder.com/800x400?text=Second+Slide" className={`d-block w-100 ${styles.carouselImages}`} alt="Second Slide"/>
                  </div>
                  <div className={`carousel-item ${activeSlideIndex === 2 ? 'active' : ''}`} data-slide-index="2">
                    <img src="https://via.placeholder.com/800x400?text=Third+Slide" className={`d-block w-100 ${styles.carouselImages}`} alt="Third Slide"/>
                  </div>
                </div>
              </div>
            </div>
            <div className={`col-md-6 d-flex ${styles.textContainer}`}>
              <div>
                <h2>{slideText}</h2>
                <p>{insideText}</p>
                <a href="/shop" className={`btn btn-primary ${styles.ctaButton}`}>Shop Now</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer / >
    </>
  );
}

export default Home;
