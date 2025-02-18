import React from 'react';
import { FaFilePen } from "react-icons/fa6";
import ProductReviewForm from './review-form';
import Modal from '@modules/common/components/modal';
import useToggleState from '@lib/hooks/use-toggle-state';

interface Review {
  rating: number;
}

interface SideStarsProps {
  averageRating: number;
  reviews: Review[];
  prouduct_id:string
}

const SideStars: React.FC<SideStarsProps> = ({ averageRating, reviews,prouduct_id }) => {
    const [isModalOpen, openModal, closeModal] = useToggleState(false);

    return (
      <div className="col-span-1 md:col-span-4 p-4 w-full mx-auto bg-white rounded-lg shadow-md">
        <div className="flex flex-col space-y-4">
          {/* Average Rating */}
          <div className="flex items-center">
            <span className="text-yellow-400 text-xl">★★★★★</span>
            <p className="ml-2 text-sm font-medium text-gray-900">
              {averageRating.toFixed(1)} out of 5
            </p>
          </div>
  
          {/* Global Ratings */}
          <p className="text-sm font-medium text-gray-500">{reviews.length} global ratings</p>
  
          {/* Rating Breakdowns */}
          {[5, 4, 3, 2, 1].map((rating) => {
            const count = reviews.filter((r) => r.rating === rating).length;
            const percentage = (count / reviews.length) * 100;
  
            return (
              <div key={rating} className="flex items-center mt-2">
                <span className="text-sm font-medium text-blue-950 hover:underline shrink-0 w-12">
                  {rating} ★
                </span>
                <div className="w-3/4 h-4 mx-2 bg-gray-200 rounded">
                  <div
                    className="h-4 bg-yellow-400 rounded"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="text-sm font-medium text-gray-500">
                  {count}
                </span>
              </div>
            );
          })}
  
          <button
            onClick={openModal}  // Use the open function from useToggleState
            className="px-4 py-2 flex items-center justify-center gap-3 bg-[#2592ff] text-white rounded-lg transition-all duration-300 ease-in-out hover:bg-[#338be5] hover:shadow-md hover:scale-105 focus:ring-2 focus:ring-blue-500"

          >
            Write Review <FaFilePen />
          </button>
  
          {/* Modal for Review Form */}
          <Modal isOpen={isModalOpen} close={closeModal}  takeFull>  
            <Modal.Title>Write a Review</Modal.Title>
            <Modal.Body>
              <div className="container">
              <ProductReviewForm prouduct_id={prouduct_id} />
              </div>
            </Modal.Body>
          </Modal>
        </div>
      </div>
    );
}

export default SideStars;
