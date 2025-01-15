'use client';

import { Label } from "@medusajs/ui"
import React from "react"
import Input from '@modules/common/components/input';

function PublishWithUsTemplates() {
    return (
        <div className="py-20 bg-gray-100">
            <div className="max-w-7xl mx-auto text-center">
                <h2 className="text-3xl font-semibold text-gray-900">Publish <span className="text-red-500">With</span> Us</h2>
                <p className="text-lg text-gray-600 mt-4">We're excited to hear your ideas and bring them to life. Share your details below!</p>

                {/* Form Section */}
                <div className="bg-white p-8 rounded-lg shadow-xl mx-4 sm:mx-0 mt-8">
                    <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Author Name */}
                        <Input
                            type="text"
                            name="authorName"
                            label="Author Name"
                            aria-placeholder="Enter author name"
                            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        />

                        {/* About Author */}


                        {/* Institute Name */}
                        <Input
                            type="text"
                            name="instituteName"
                            label="Institute Name"
                            aria-placeholder="Enter institute name"
                            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        />

                        {/* Author Affiliation */}
                        <Input
                            type="text"
                            name="authorAffiliation"
                            label="Author Affiliation"
                            aria-placeholder="Enter author affiliation"
                            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        />

                        {/* Email */}
                        <Input
                            type="email"
                            name="email"
                            label="Email Address"
                            aria-placeholder="Enter email address"
                            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        />

                        {/* Address */}
                        <Input
                            type="text"
                            name="address"
                            label="Address"
                            aria-placeholder="Enter your address"
                            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        />

                        {/* City */}
                        <Input
                            type="text"
                            name="city"
                            label="City"
                            aria-placeholder="Enter city"
                            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        />

                        {/* State */}
                        <Input
                            type="text"
                            name="state"
                            label="State"
                            aria-placeholder="Enter state"
                            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        />

                        {/* Country */}
                        <Input
                            type="text"
                            name="country"
                            label="Country"
                            aria-placeholder="Enter country"
                            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        />

                        {/* Pin/Zip */}
                        <Input
                            type="text"
                            name="pinZip"
                            label="Pin/Zip Code"
                            aria-placeholder="Enter pin or zip code"
                            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        />

                        {/* Contact Number */}
                        <Input
                            type="text"
                            name="contactNumber"
                            label="Contact Number"
                            aria-placeholder="Enter contact number"
                            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        />

                        {/* Title of the Book */}
                        <Input
                            type="text"
                            name="bookTitle"
                            label="Title of the Book"
                            aria-placeholder="Enter book title"
                            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        />

                        {/* Discipline */}
                        <Input
                            type="text"
                            name="discipline"
                            label="Discipline"
                            aria-placeholder="Enter discipline"
                            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        />

                        {/* Subject */}
                        <Input
                            type="text"
                            name="subject"
                            label="Subject"
                            aria-placeholder="Enter subject"
                            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        />
                        <Input
                            type="text"
                            name="bookStatus"
                            label="Status of the Book"
                            aria-placeholder="Enter book status"
                            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        />

                        {/* Synopsis */}
                        <div className="md:col-span-2">
                            <textarea
                                name="synopsis"
                                rows="5"
                                placeholder="Enter book synopsis"
                                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                            ></textarea>
                        </div>

                        {/* Status of the Book */}

                        {/* Submit Button */}
                        <div className="md:col-span-2">
                            <button
                                type="submit"
                                className="w-full max-w-[200px] py-3 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default PublishWithUsTemplates;
