"use client";

import { useState } from "react";
import Image from "next/image";
import { GALLERY_IMAGES } from "@/constants/galleryImages";

const DEFAULT_GALLERY = GALLERY_IMAGES.map((item, index) => ({
  id: index + 1,
  ...item,
}));

export default function TreatmentGallery({ images = DEFAULT_GALLERY }) {
  const galleryImages = images?.length ? images : DEFAULT_GALLERY;
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <>
      <style jsx>{`
        .tg-wrap {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }
        .tg-card {
          position: relative;
          border-radius: 12px;
          overflow: hidden;
          aspect-ratio: 4/3;
          cursor: pointer;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .tg-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);
        }
        .tg-img {
          object-fit: cover;
          transition: transform 0.3s ease;
        }
        .tg-card:hover .tg-img {
          transform: scale(1.08);
        }
        .tg-caption {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(to top, rgba(0, 0, 0, 0.75), transparent);
          padding: 24px 12px 12px;
          color: white;
          font-family: "Rajdhani", sans-serif;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 0.5px;
        }

        /* Lightbox */
        .tg-lightbox {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.9);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 50;
          padding: 24px;
          cursor: pointer;
        }
        .tg-lightbox-img {
          max-width: 90vw;
          max-height: 85vh;
          border-radius: 8px;
          object-fit: contain;
        }
        .tg-lightbox-caption {
          position: absolute;
          bottom: 24px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(0, 0, 0, 0.7);
          padding: 12px 24px;
          border-radius: 8px;
          color: white;
          font-family: "Rajdhani", sans-serif;
          font-size: 18px;
          font-weight: 600;
        }
        .tg-close {
          position: absolute;
          top: 24px;
          right: 24px;
          width: 44px;
          height: 44px;
          background: rgba(255, 255, 255, 0.15);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.2s;
        }
        .tg-close:hover {
          background: rgba(255, 255, 255, 0.25);
        }

        @media (max-width: 768px) {
          .tg-wrap {
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
          }
        }
        @media (max-width: 480px) {
          .tg-wrap {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="tg-wrap">
        {galleryImages.map((img) => (
          <div
            key={img.id}
            className="tg-card"
            onClick={() => setSelectedImage(img)}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="tg-img"
            />
          </div>
        ))}
      </div>

      {selectedImage && (
        <div
          className="tg-lightbox"
          onClick={() => setSelectedImage(null)}
        >
          <div className="tg-close">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <Image
            src={selectedImage.src}
            alt={selectedImage.alt}
            width={1200}
            height={800}
            className="tg-lightbox-img"
          />
          <div className="tg-lightbox-caption">
            {selectedImage.caption}
          </div>
        </div>
      )}
    </>
  );
}