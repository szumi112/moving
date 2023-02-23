import React, { useState } from "react";
import Modal from "react-modal";
import { MdChevronLeft, MdChevronRight, MdClose } from "react-icons/md";

import img1 from "./assets/image1.jpg";
import img2 from "./assets/image2.jpg";
import img3 from "./assets/image3.jpg";
import img4 from "./assets/image4.jpg";
import img5 from "./assets/image5.jpg";
import img6 from "./assets/image6.jpg";
import img7 from "./assets/image7.jpg";

// Define an array of image URLs
const images = [img1, img2, img3, img4, img5, img6, img7];

const ImageGallery = () => {
  // Initialize state for tracking which image is selected and whether the modal is open
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  // Define a function for opening the modal with a specific image
  const openModal = (index) => {
    setSelectedImageIndex(index);
    setModalIsOpen(true);
  };

  // Define a function for closing the modal
  const closeModal = () => {
    setSelectedImageIndex(null);
    setModalIsOpen(false);
  };

  // Define a function for navigating to the next image
  const nextImage = () => {
    setSelectedImageIndex((selectedImageIndex + 1) % images.length);
  };

  // Define a function for navigating to the previous image
  const prevImage = () => {
    setSelectedImageIndex(
      (selectedImageIndex - 1 + images.length) % images.length
    );
  };

  return (
    <>
      <div className="imgContainer">
        {/* Render the images */}
        {images.map((imageUrl, index) => (
          <img
            key={index}
            src={imageUrl}
            onClick={() => openModal(index)}
            className="image"
          />
        ))}
      </div>
      <div className="mdlContainer">
        {/* Render the modal */}
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          className="Modal"
        >
          <div className="modal-content">
            <button
              className="modal-button left"
              onClick={prevImage}
              style={{ left: "10px" }}
            >
              <MdChevronLeft style={{ fontSize: "64px" }} />
            </button>
            <img src={images[selectedImageIndex]} className="modal-image" />
            <button
              className="modal-button right"
              onClick={nextImage}
              style={{ right: "10px" }}
            >
              <MdChevronRight style={{ fontSize: "64px" }} />
            </button>
            <button className="close-button" onClick={closeModal}>
              <MdClose style={{ fontSize: "48px" }} />
            </button>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default ImageGallery;
