import GlobalHero from '@modules/common/components/globalhero';
import React from 'react';

const policies = [
  {
    title: 'Terms and Conditions',
    content: `All orders are deemed offers for you to purchase our products. We may accept your offer by issuing a confirmatory e-mail and/or mobile confirmation of the products specified in your order. Our acceptance of each such offer is expressly subject to and conditioned on your assent to these terms and conditions of sale. No other terms and conditions will apply.`
  },
  {
    title: 'Prices',
    content: `All prices posted on this website are subject to change without notice. Prices prevailing at commencement of placing the order will apply. Posted prices do include all taxes and charges. In case there are any additional charges or taxes, the same will be mentioned on the website.`
  },
  {
    title: 'Shipping Policy',
    content: `Sultan Chand & Sons has a transparent and clear shipping policy for all orders placed on our website, without any special exceptions. We are committed to delivering your order accurately, in good condition, and always on time promised by us on our website. \n\n* We offer FREE Shipping (specified on the Product detail page) on selected products.\n* Orders ship within 1-2 working days, subject to product availability.\n* We ship Monday to Saturday, excluding public holidays.\n* Orders are shipped via reputed Indian Postal Services and courier services.`
  },
  {
    title: 'Return Policy',
    content: `The Customer will receive a free refund if the return is a result of our error. Such cases must be brought to our notice immediately after receipt of book(s) by emailing sultanchand74@yahoo.com. Returned books must be properly packed and received within 10 days of online ordering. Damaged returns will not be refunded.`
  },
  {
    title: 'Refund',
    content: `Orders canceled after procurement but before shipping will not incur charges within India. For international orders, actual postage applies. Refunds are processed within 7-10 working days after approval. Books purchased from our New Delhi showroom cannot be returned online.`
  },
  {
    title: 'Grievance Policy',
    content: `For grievances, email us at sultanchand74@yahoo.com or write to our New Delhi office within 15 days of the order/invoice/payment date.`
  },
  {
    title: 'Disclaimer',
    content: `Jurisdiction for any claims arising under these terms and conditions shall lie exclusively with the state courts in New Delhi.`
  }
];

function PolicyPage() {
  return (
    <>
      <GlobalHero backgroundImage='/banner.jpg' title='Policy' subtitle='The goal of a company is to have customer experience that is not just the best, but legendary  ' />
      <div className='max-w-4xl mx-auto p-4 space-y-8'>
        {policies.map((policy, index) => (
          <section key={index} className='border-b pb-4'>
            <h2 className='text-lg sm:text-2xl text-orange-500 font-semibold mb-2'>{policy.title}</h2>
            <p className='text-gray-700 text-sm sm:text-lg whitespace-pre-line'>{policy.content}</p>
          </section>
        ))}
      </div>
    </>
  );
}

export default PolicyPage;
