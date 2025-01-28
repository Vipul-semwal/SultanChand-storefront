import React from 'react';
import { Mail, Phone, Users, Truck, Box, Warehouse } from 'lucide-react'; // Importing specific icons
import GlobalHero from '@modules/common/components/globalhero';
import ProfileIcons from '@modules/common/components/profileicon';
function Distributor() {
    return (
        <>
            <GlobalHero backgroundImage="/banner.jpg" title="Distribution" subtitle="Sultan Chand and Sons - A Legacy of Excellence in Education." />
            {/* Hero Section */}

            {/* Distribution Section */}
            <section className="bg-gray-100 py-16 px-6">
                <div className="mx-2">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                        Our <span className="text-blue-800">Distribution</span>
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {/* Team Member 1 */}

                        <ProfileIcons email="john.doe@example.com" para='Distribution Manager' heading='Mukesh Kumar' phone='+91-9876543210' />
                        <ProfileIcons email="john.doe@example.com" para='Distribution Manager' heading='Mukesh Kumar' phone='+91-9876543210' />
                        <ProfileIcons email="john.doe@example.com" para='Distribution Manager' heading='Mukesh Kumar' phone='+91-9876543210' />
                        <ProfileIcons email="john.doe@example.com" para='Distribution Manager' heading='Mukesh Kumar' phone='+91-9876543210' />
                        <ProfileIcons email="john.doe@example.com" para='Distribution Manager' heading='Mukesh Kumar' phone='+91-9876543210' />
                        <ProfileIcons email="john.doe@example.com" para='Distribution Manager' heading='Mukesh Kumar' phone='+91-9876543210' />
                        <ProfileIcons email="john.doe@example.com" para='Distribution Manager' heading='Mukesh Kumar' phone='+91-9876543210' />
                        <ProfileIcons email="john.doe@example.com" para='Distribution Manager' heading='Mukesh Kumar' phone='+91-9876543210' />



                    </div>
                </div>
            </section>
        </>
    );
}

export default Distributor;
