import React, { useState } from "react";
import Image from "next/image";
import styles from "../styles/Featured.module.css";

const Featured = () => {
	const [heroIndex, setHeroIndex] = useState(0)
	const previewImageList = [  
		'/images/preview-hero1.jpg',
		'/images/preview-hero2.jpg',
		'/images/preview-hero3.jpg',
]

const imageUrls = [
    "https://res.cloudinary.com/dyv2ytol5/image/upload/v1668423745/storage/alfonso-hero1_y6z782.webp",
    "https://res.cloudinary.com/dyv2ytol5/image/upload/v1668423772/storage/alfonso-hero2_d5zdex.webp",
    "https://res.cloudinary.com/dyv2ytol5/image/upload/v1668423791/storage/alfonso-hero3_cwbkt8.webp",
  ];

	const nextSlide = () => {
	  if(heroIndex !== imageUrls.length - 1){
	      setHeroIndex(heroIndex => heroIndex + 1)
	  } else {
	      setHeroIndex(0)
	  }
	}

	const prevSlide = () => {
	    if(heroIndex !== 0){
	        setHeroIndex(heroIndex => heroIndex - 1)
	    } else{
	        setHeroIndex(imageUrls.length - 1)
	    }
	}

	return (
		<div className={styles.container}>
			<div
				className={styles.arrow_container}
				style={{ left: 0 }}
        name="back"
				onClick={prevSlide}
			>
				<Image
					className={styles.arrow}
					src="/icons/arrow-ios-back.svg"
					layout="fill"
					alt="back"
				/>
			</div>
			<div className={styles.wrapper}>
				<h2 className={styles.title}>Think. Feel. Pizza.</h2>
				<p>Beautiful, Italian Sourced & Freshly Made Pizzas</p>
				{<Image
					className={styles.hero}
					src={imageUrls[heroIndex]}
					key={heroIndex}
					placeholder="blur"
					blurDataURL={previewImageList[heroIndex]}
					layout="fill"
					alt="hero"
      	/>}
				<div className={styles.mobiles}>
					<Image
						className={styles.mobile}
						src="/icons/app-store.svg"
						width="185"
						height="60"
						layout="fixed"
						alt="app store"
					/>
					<Image
						className={styles.mobile}
						src="/icons/gplay.svg"
						layout="fixed"
						width="205"
						height="60"
						style={{ marginLeft: 10 }}
						alt="google play"
					/>
				</div>
			</div>
			<div
				className={styles.arrow_container}
				style={{ right: 0 }}
        name="next"
				onClick={nextSlide}
			>
				<Image
					className={styles.arrow}
					src="/icons/arrow-ios-forward.svg"
					layout="fill"
					alt="forward"
				/>
			</div>
		</div>
	);
};

export default Featured;