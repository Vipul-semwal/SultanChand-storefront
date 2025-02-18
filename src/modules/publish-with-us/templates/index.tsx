'use client';

import { Label } from "@medusajs/ui"
import React from "react"
import Input from '@modules/common/components/input';
import PublishUsWithForm from "../components/form";

function PublishWithUsTemplates() {
    return (
        <div className="py-20 bg-gray-100">
            <div className="max-w-7xl mx-auto text-center">
                <h2 className="text-3xl font-semibold text-gray-900">Publish <span className="text-[#EA5900]">With</span> Us</h2>
                <p className="text-lg text-gray-600 mt-4">We're excited to hear your ideas and bring them to life. Share your details below!</p>

                {/* Form Section */}
              <PublishUsWithForm />
            </div>
        </div>
    );
}

export default PublishWithUsTemplates;
