import React, { useState } from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function ImageCarousel({ images }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <View style={styles.carouselContainer}>
      <View style={styles.imageContainer}>
        {images.map((image, index) => (
          <Image
            key={index}
            source={{ uri: image }}
            style={[
              styles.image,
              index === currentImageIndex ? styles.selectedImage : styles.unselectedImage,
            ]}
            resizeMode="cover"
          />
        ))}
      </View>

      {/* Botón para imagen anterior */}
      <TouchableOpacity
        onPress={handlePrevImage}
        style={styles.prevButton}
      >
        <Text style={styles.buttonText}>{'<'}</Text>
      </TouchableOpacity>

      {/* Botón para imagen siguiente */}
      <TouchableOpacity
        onPress={handleNextImage}
        style={styles.nextButton}
      >
        <Text style={styles.buttonText}>{'>'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  carouselContainer: {
    position: 'relative',
    width: '100%',
    maxWidth: 400,
    aspectRatio: 1,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    overflow: 'hidden',
    alignSelf: 'center',
  },
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  image: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  selectedImage: {
    zIndex: 1,
  },
  unselectedImage: {
    width: '60%',
    height: '60%',
    opacity: 0.5,
  },
  prevButton: {
    position: 'absolute',
    top: '50%',
    left: 10,
    transform: [{ translateY: -50 }],
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: 10,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  nextButton: {
    position: 'absolute',
    top: '50%',
    right: 10,
    transform: [{ translateY: -50}],
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: 10,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});