"use client";
import { useState, useEffect, useRef } from 'react';
import { GrFormNext } from "react-icons/gr";
import { GrFormPrevious } from "react-icons/gr";
import styles from './styles.module.scss'; 

const Carousel = ({ images }: { images: string[] }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const timerRef = useRef<any>(null);

    const changeSlide = (slide: "next" | "prev") => {
        if (slide === "next") {
            setCurrentIndex((prevIndex) => 
                prevIndex === images.length - 1 ? 0 : prevIndex + 1
            );
        }
        else {
            setCurrentIndex((prevIndex) => 
                prevIndex === 0 ? images.length - 1 : prevIndex - 1
            );
        }
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = setInterval(() => changeSlide("next"), 3000);
        }
    }

    useEffect(() => {
        if (images.length > 1) {
            timerRef.current = setInterval(() => changeSlide("next"), 3000);
        }
        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, [images.length]);

    if (!images || images.length === 0) {
        return null;
    }

    return (
        <div 
            className={ styles.carouselContainer }
        >
            {  
                images.length > 1
                    ? 
                        <>
                            <GrFormPrevious 
                                onClick={() => changeSlide("prev")} 
                                className={ `${styles.carouselIcon } ${ styles.prevBtn }` } 
                            />
                            <GrFormNext 
                                onClick={() => changeSlide("next")} 
                                className={ `${styles.carouselIcon } ${ styles.nextBtn }` } 
                            />
                        </>
                    : null
            }
            <div 
                className={ styles.carouselTrack } 
                style={{ 
                    transform: `translateX(-${currentIndex * 100}%)`,
                    transition: 'transform 0.5s ease-in-out'
                }}
            >
                {
                    images.map((image: string, index: number) => (
                        <div key={ index } className={ styles.carouselSlide }>
                            <img 
                                src={ image } 
                                alt={ `Slide ${ index }` } 
                                className={ styles.carouselImage }
                            />
                        </div>
                    ))
                }
            </div>
            {
                images.length > 1 && (
                    <>
                        <div className={ styles.carouselDots }>
                            {images.map((_: any, index: number) => (
                                <span
                                    key={index}
                                    className={ `${ styles.dot } ${ index === currentIndex ? `${ styles.active }` : '' }` }
                                />
                            ))}
                        </div>
                    </>
                )
            }
        </div>
    );
};

export default Carousel;