'use client';
import BackButton from "@/components/BackButton/BackButton";
import ImageCanvas from "@/components/BackgroundPhotoId/ImageCanvas";
import { Card, CardTitle, CardContent } from "@/components/ui/card";
import Image from "next/image";
import React from "react";
import { cn } from "@/lib/utils";
import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa6";
import ServiceCard from "@/components/ServiceCard/ServiceCard";

const services = [
    [
        {
            title: "Paying Tuition Fees",
            description: "Students can pay tuition fees directly through the application with a seamless journey.",
        },
        {
            title: "Student ID Card",
            description: "Virtual Student ID card features on CU NEX Application to replace your physical student ID card. No more forgetting your ID.",
        },
    ],
    [
        {
            title: "Privileges",
            description: "Receive special promotions, deals and privileges from collecting coupons from our partners, and local shops around Chula.",
        },
        {
            title: "Common Room Reservation",
            description: "Easily reserve a meeting room to work, study, do projects, or chill with your friends at the main library or PLEARN SPACE.",
        },
    ],
    [
        {
            title: "Chula Library",
            description: "Offers a collection of books that you can search by title or author’s name. You can also easily book a book, check your loan history, and access many other services right at your fingertips.",
        },
        {
            title: "Requesting for Scholarship",
            description: "Simple click the “Scholarship” feature and follow the procedures, your application will be sent to grant reviewers in no time.",
        },
    ],
    [
        {
            title: "Calendar",
            description: "A feature that compiles all of the important dates necessary for Chula students. From up-to-date class timetable to exam timetable throughout the academic year."
        },
        {
            title: "Reporting Emergencies",
            description: "From incidents to emergencies, you can contact the security center and other response centers on and off-campus.",
        },
    ],
    [
        {
            title: "News and Stories",
            description: "Chula students can follow and share news and content on the CU NEX app. You can also submit short videos to share your stories.",
        },
        {
            title: "CU POP BUS",
            description: "The feature makes it easier for Chulalongkorn residents to plan their travel. Just open the app and click on the\n🚎CU POP BUS icon to use it",
        },
    ]
];

const contacts = [
    {
        icon: <FaFacebook />,
        text: "CUNEX",
        href: "https://www.facebook.com/CUNEX.Official",
    },
    {
        icon: <FaInstagram />,
        text: "@cunex",
        href: "https://www.instagram.com/cunex.review/",
    },
    {
        icon: <FaTiktok />,
        text: "@cunex",
        href: "https://www.tiktok.com/@cunex.life",
    },
];

const sectionStyle = "flex flex-col w-full px-4 gap-4";
const titleStyle = "font-cooper text-xl tracking-wider text-custom-yellow";

export default function Cunex() {
    return (
        <div>
            <BackButton />
            {/* Background */}
            <div className="gradient-background absolute top-0 -z-30 h-full w-full" />
            <ImageCanvas />

            <main className="mt-8 flex flex-col items-center gap-1 text-base text-white text-shadow">
                {/* Logo */}
                <h1 className="font-cooper text-4xl tracking-wider">Our Supporter</h1>
                <Image
                    src={"/images/sponsors/CUNEX_white_flat.png"}
                    alt="Cunex"
                    width={307}
                    height={307}
                    className="py-6"
                />

                {/* Content */}
                <div className="flex flex-col gap-9">
                    {/* About Section */}
                    <div className={sectionStyle}>
                        <div className={titleStyle}>
                            About CUNEX
                        </div>
                        <div className="text-center">
                            CU NEX is a collaboration between Chulalongkorn University and KASIKORNBANK in order to enhance services via digital platform to cater to students’ needs. The CU NEX Club was created with the intention to encourage students to learn something new outside of the classroom while bringing CU NEX to the next level.
                        </div>
                    </div>

                    {/* Service Section */}
                    <div className={sectionStyle}>
                        <div className={titleStyle}>
                            Company Service
                        </div>
                        <div className="text-center">
                            In CU NEX, we provide several opportunities and services for students.
                        </div>
                        <div className="flex flex-col gap-2">
                            {services.map((service, index) => (
                                <div key={index} className="flex gap-2">
                                    {service.map((item, idx) => (
                                        <ServiceCard key={idx} title={item.title}>
                                            {item.description}
                                        </ServiceCard>
                                    ))}
                                </div>
                            ))}

                            {/* Survival Guide */}
                            <Card className="w-full text-custom-purple">
                                <div className="flex w-full gap-4 p-4 text-shadow-none">
                                    <CardTitle className="text-left text-base">
                                        Survival Guide
                                    </CardTitle>
                                    <CardContent className="text-left text-sm p-0 whitespace-pre-line">
                                        You can discover content, stories, and tips to make your life easier at Chulalongkorn University. You can also press ‘Like’ if you enjoy a story or save it to read later in the ‘My guide’ tab.
                                    </CardContent>
                                </div>
                            </Card>
                        </div>
                    </div>

                    {/* Collaboration Section */}
                    <div className={cn(sectionStyle, "items-center")}>
                        {/* Header */}
                        <Image
                            src={"/images/handshake.png"}
                            alt="Hand shake"
                            width={46}
                            height={46}
                        />
                        <div className="text-custom-yellow font-cooper text-3xl tracking-wider">
                            Our Collaboration
                        </div>
                        {/* Collab pic */}
                        <Image
                            src={"/images/cunex_collab.png"}
                            alt="CUNEX Collab"
                            width={300}
                            height={200}
                        />

                        {/* Description */}
                        <div className="font-cooper text-lg tracking-wider">
                            DIY Cookie Workshop
                        </div>
                        <div className="text-center px-2">
                            “We’re proud to have CU NEX as one of our key sponsors. With a shared vision and mission, our partnership is a perfect match. While CU NEX supports Odds & Ends to create a sandbox environment for students to develop their skills in arts, entrepreneurship, and music. Together, we aim to cultivate spaces that inspire creativity, personal growth, and rejuvenation, benefiting the student community”
                            <br />
                            During April 11, Odds & Ends partnered with CU NEX to host a DIY Cookie Workshop, offering a unique opportunity to Chula students with special coupons for participating in the DIY Cookie Workshop.
                        </div>
                    </div>

                    {/* Contact Section */}
                    <div className={cn(sectionStyle, "items-center")}>
                        <div
                            className="flex flex-col gap-2 h-auto w-[379px] items-center rounded-xl bg-custom-pink p-4 text-white"
                        >
                            <div className="text-center font-cooper text-xl tracking-wider text-custom-yellow">
                                Contact
                            </div>
                            <div className="flex flex-wrap items-center justify-between px-4 w-full">
                                {contacts.map((contact, index) => (
                                    <a
                                        key={index}
                                        className="flex items-center gap-1"
                                        href={contact.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <div className="text-2xl">
                                            {contact.icon}
                                        </div>
                                        <span>{contact.text}</span>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Shops */}
                    <div className={cn(sectionStyle, "items-center")}>
                        <div className="text-xl font-medium text-custom-purple">
                            ที่ตั้งร้านค้า
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
};

