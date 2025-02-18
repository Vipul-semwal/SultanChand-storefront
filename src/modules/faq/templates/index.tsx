"use client";

import GlobalHero from "@modules/common/components/globalhero";
import React, { useState } from "react";

const FAQs = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "About Our Company",
      answer:
        "Shri Sultan Chand ji, founder of M/s S. Chand & Company (1917) and of M/s Sultan Chand & Sons (1950), was pioneer in the field of the publication of school and college level texts by Indian teachers. He had inherited the spirit of nationalism and lofty ideals from his noble father, Master Amir Chand ji (born in 1869), a dedicated teacher, a social reformer, a great patriot and revolutionary, who was awarded death sentence in 1915 for his involvement in the Hardinge Bomb Case."
    },
    {
      question: "How do I find a specific product?",
      answer:
        "A search box is available at the top of every page throughout the site. You may also browse for a title by category. Category listings are found on the left-hand side of each page."
    },
    {
      question: "Can I Check the Status of My Order?",
      answer:
        "To check the status of your order, click the My Account link located at the top of each page. You can then view the status of all orders you placed."
    },
    {
      question: "How Do I Change My Mailing Address?",
      answer:
        "E-mail Address can be easily changed from your accounts page or by editing your profile."
    },
    {
      question: "How Do I Change My Password?",
      answer:
        "If you would like to change your Sultan Chand & Sons password, just sign in to your account with your current password and click the My Account link at the top of the page. You will be asked to re-enter your current password for verification. Then click the 'Change Password' link and follow the steps."
    },
    {
      question: "Does Sultan Chand & Sons distribute or sell my account information?",
      answer:
        "Not at all. SultanChandAndSons.com does not sell or release any personal information to any third-party source."
    },
    {
      question: "Will I start to receive Spam once I sign up with Sultan Chand & Sons?",
      answer:
        "Absolutely not."
    },
    {
      question: "What is Your Return Policy?",
      answer:
        "If any product received by the customer is found defective, then within 15 days of the receipt, please send the product along with the order no. & date back to our office. We will replace the product for you."
    },
    {
      question: "Books - Do I get any discount for bulk orders?",
      answer:
        "Discounts may be available for bulk orders. Please write to us at @SultanChandAndSons.com and we will give you an answer about whether we can offer you a bulk order discount within 2-3 business days."
    },
  ];

  return (
    <>
      <GlobalHero backgroundImage="/banner.jpg" title="Faqs" subtitle="Amet minim mollit non deserunt ullamco est sit aliqua dolor do" />
      <section className="py-10 bg-gray-50 sm:py-16 lg:py-24">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold leading-tight text-black sm:text-3xl lg:text-4xl">
              Frequently Asked <span className="text-[#EA5900]">Questions</span>
            </h2>
            <p className="max-w-xl mx-auto mt-4 text-sm leading-relaxed text-gray-600 sm:text-base lg:text-lg">
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do
            </p>
          </div>

          <div className="max-w-3xl mx-auto mt-8 space-y-4 md:mt-16">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="transition-all duration-200 bg-white border border-gray-200 shadow-lg cursor-pointer hover:bg-gray-50"
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(index)}
                  className="flex items-center justify-between w-full px-2 py-3 sm:p-6"
                >
                  <span className="text-[12px] font-semibold text-[#EA5900] sm:text-lg lg:text-xl">
                    {faq.question}
                  </span>
                  <svg
                    className={`w-6 h-6 text-gray-400 ${openIndex === index ? "rotate-180" : ""}`}
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
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <p className="text-center text-sm text-gray-600 sm:text-base lg:text-lg mt-9">
            Didn’t find the answer you are looking for?{" "}
            <span className="text-[#EA5900]">Contact our support</span>
          </p>
        </div>
      </section>
    </>
  );
};

export default FAQs;
