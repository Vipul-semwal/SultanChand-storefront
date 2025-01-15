"use client";

import GlobalHero from "@modules/common/components/globalhero";
import React, { useState } from "react";

const FAQs = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
    <GlobalHero backgroundImage="/banner.jpg" title="Faqs" subtitle="Amet minim mollit non deserunt ullamco est sit aliqua dolor do" />
    <section className="py-10 bg-gray-50 sm:py-16 lg:py-24">
  <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
    <div className="max-w-2xl mx-auto text-center">
      <h2 className="text-2xl font-bold leading-tight text-black sm:text-3xl lg:text-4xl">
        Frequently Asked <span className="text-red-500">Questions</span>
      </h2>
      <p className="max-w-xl mx-auto mt-4 text-sm leading-relaxed text-gray-600 sm:text-base lg:text-lg">
        Amet minim mollit non deserunt ullamco est sit aliqua dolor do
      </p>
    </div>

    <div className="max-w-3xl mx-auto mt-8 space-y-4 md:mt-16">
      {[
        {
          question: "How to create an account?",
          answer:
            "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.",
        },
        {
          question: "How can I make payment using Paypal?",
          answer:
            "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.",
        },
        {
          question: "Can I cancel my plan?",
          answer:
            "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.",
        },
        {
          question: "How can I reach to support?",
          answer:
            "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.",
        },
      ].map((faq, index) => (
        <div
          key={index}
          className="transition-all duration-200 bg-white border border-gray-200 shadow-lg cursor-pointer hover:bg-gray-50"
        >
          <button
            type="button"
            onClick={() => toggleAccordion(index)}
            className="flex items-center justify-between w-full px-2 py-3 sm:p-6"
          >
            <span className="text-[12px] font-semibold text-black sm:text-lg lg:text-xl">
              {faq.question}
            </span>
            <svg
              className={`w-6 h-6 text-gray-400 ${
                openIndex === index ? "rotate-180" : ""
              }`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          {openIndex === index && (
            <div className="px-4 pb-5 sm:px-6 sm:pb-6">
              <p className="text-sm sm:text-base lg:text-lg">
                {faq.answer}{" "}
                
                .
              </p>
            </div>
          )}
        </div>
      ))}
    </div>

    <p className="text-center text-sm text-gray-600 sm:text-base lg:text-lg mt-9">
      Didn’t find the answer you are looking for? <span className="text-red-500">Contact our support</span>
     
    </p>
  </div>
</section>

    </>
  );
};

export default FAQs;
