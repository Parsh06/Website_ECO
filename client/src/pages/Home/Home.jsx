import React, { useState, useEffect } from 'react';
import styles from './Home.module.css';
import Navbar from '../../components/Navbar/Navbar';
import Card from '../../components/Card/Card';
import Footer from '../../components/Footer/Footer';


function Home() {
  const [slideText, setSlideText] = useState("Classic Clothes");
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [insideText, setInsideText] = useState("Mens Clothes");
  const [visibleCards, setVisibleCards] = useState([0, 1, 2]);
  const [currentStartIndex, setCurrentStartIndex] = useState(0);

  const imageUrls = [
    "https://via.placeholder.com/300?text=Image+1",
    "https://via.placeholder.com/300?text=Image+2",
    "https://via.placeholder.com/300?text=Image+3",
    "https://via.placeholder.com/300?text=Image+4",
    "https://via.placeholder.com/300?text=Image+5",
    "https://via.placeholder.com/300?text=Image+6",
    "https://via.placeholder.com/300?text=Image+7",
    "https://via.placeholder.com/300?text=Image+8",
    "https://via.placeholder.com/300?text=Image+9"
  ];

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
    const newStartIndex = (currentStartIndex + 3) % imageUrls.length;
    setCurrentStartIndex(newStartIndex);
    setVisibleCards([newStartIndex, (newStartIndex + 1) % imageUrls.length, (newStartIndex + 2) % imageUrls.length]);
  };

  const handlePreviousClick = () => {
    const newStartIndex = (currentStartIndex - 3 + imageUrls.length) % imageUrls.length;
    setCurrentStartIndex(newStartIndex);
    setVisibleCards([newStartIndex, (newStartIndex + 1) % imageUrls.length, (newStartIndex + 2) % imageUrls.length]);
  };

  const handleClick = () => {
    window.location.href = '/Product'; 
  };

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
                <button className={styles.cardButton}
                  onClick={handleClick}>Shop Now
                </button>
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
          {visibleCards.map((cardIndex) => (
            <Card
              key={cardIndex}
              imageUrl={imageUrls[cardIndex % imageUrls.length]}
             
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
          <div   className={styles.cardGrid}>
          <Card
            imageUrl="https://via.placeholder.com/300?text=Featured+Product+1"
            
          />
          <Card
            imageUrl="https://via.placeholder.com/300?text=Featured+Product+2"
            
          />
          <Card
            imageUrl="https://via.placeholder.com/300?text=Featured+Product+3"
            
          />
     </div>
     </main>
     
      
      {/* <div className="container text-center py-5">
        <h2>Sign Up for Exclusive Offers</h2>
        <form className="d-flex justify-content-center">
          <input type="email" className="form-control w-50" placeholder="Enter your email" />
          <button className={`btn btn-primary ${styles.ctaButton}`} type="submit">Sign Up</button>
        </form>
      </div> */}
 
     
    </>
  );
}

export default Home;
