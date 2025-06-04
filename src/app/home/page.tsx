"use client";

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Tab,
  Tabs,
  Textarea,
} from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { insertAppointment, insertTryout } from "@/app/api/api";

export default function HomeLanding() {
  const router = useRouter();

  const [currentFormView, setCurrentFormView] = useState("tryout");

  // general
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [schoolIdNumber, setSchoolIdNumber] = useState("");

  // tryout form
  const [phoneNumber, setPhoneNumber] = useState("");
  const [degreeProgram, setDegreeProgram] = useState("");
  const [experience, setExperience] = useState("");
  const [event, setEvent] = useState("");
  const [course, setCourse] = useState("");
  const [remarks, setRemarks] = useState("");
  const [recommendation, setRecommendation] = useState("");

  // appointment form
  const [birthDate, setBirthDate] = useState("");
  const [message, setMessage] = useState("");
  const [reason, setReason] = useState("");

  const handleFormSubmit = async () => {
    try {
      let result = null;
      if (currentFormView === "tryout") {
        const newTryoutForm = {
          full_name: fullName,
          email: email,
          school_id_number: schoolIdNumber,
          phone_number: phoneNumber,
          degreeProgram: degreeProgram,
          experience: experience,
          event: event,
          course: course,
          remarks: remarks,
          recommendation: recommendation,
        };

        result = await insertTryout({ newTryout: newTryoutForm });
      } else {
        const newAppointmentForm = {
          full_name: fullName,
          email: email,
          school_id_number: schoolIdNumber,
          phone_number: phoneNumber,
          birth_date: birthDate,
          message: message,
          reason: reason,
        };

        result = await insertAppointment({
          newAppointment: newAppointmentForm,
        });
      }

      if (result && result.length > 0) {
        // Reset form fields
        setFullName("");
        setEmail("");
        setSchoolIdNumber("");
        setPhoneNumber("");
        setDegreeProgram("");
        setExperience("");
        setEvent("");
        setCourse("");
        setRemarks("");
        setRecommendation("");
        setBirthDate("");
        setMessage("");
        setReason("");

        alert("Form submitted successfully!");
      }
    } catch (error: any) {
      console.error("Form submission error:", error);
      alert("Error submitting form. Please try again.");
    }
  };

  return (
    <div className="min-h-[100svh] w-full overflow-x-hidden">
      {/* Navbar */}
      <nav className="fixed w-full bg-white/80 backdrop-blur-sm shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <Image
                src="/ucsr-logo.png"
                alt="UCSR Logo"
                width={85}
                height={85}
              />
            </div>
            <div className="hidden md:block select-none">
              <div className="ml-10 flex items-baseline space-x-8">
                <a href="#home" className="hover:text-blue-600 cursor-pointer">
                  Home
                </a>
                <a href="#about" className="hover:text-blue-600 cursor-pointer">
                  About
                </a>
                <a
                  href="#services"
                  className="hover:text-blue-600 cursor-pointer"
                >
                  Services
                </a>
                <a href="#forms" className="hover:text-blue-600 cursor-pointer">
                  Forms
                </a>
                <a
                  href="#feedback"
                  className="hover:text-blue-600 cursor-pointer"
                >
                  Feedback
                </a>
                {/* <div onClick={() => router.push("/ident/signin")}>
                  <a
                    href="/ident/signin"
                    className="hover:text-blue-600 cursor-pointer"
                  >
                    Signin
                  </a>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Home Section */}
      <section id="home" className="relative min-h-[100svh] w-full">
        <div className="absolute inset-0 w-full">
          <Image
            src="/csu-admin.png"
            alt="Background"
            fill
            className="object-cover w-full opacity-70 md:opacity-100"
            priority
          />
        </div>
        <div className="absolute items-center justify-center flex flex-col pt-20 pb-12 px-4 sm:px-6 lg:px-8 top-[15%]">
          <h1 className="text-4xl text-center tracking-tight font-extrabold text-black md:text-white sm:text-5xl md:text-6xl">
            CSU, University Center for Sports and Recreational
          </h1>
          <p className="mt-3 text-base text-center text-black md:text-white sm:text-lg md:mt-5 md:text-xl lg:px-56">
            Welcome to Caraga State University, a distinguished institution
            committed to fostering academic excellence and holistic development.
            Our University Center for Sports and Recreation aims to provide
            students with comprehensive opportunities to engage in various
            sports and recreational activities. We believe in the importance of
            physical fitness, teamwork, and personal growth, offering
            state-of-the-art facilities and expert guidance. Through our diverse
            programs, we strive to enhance the student experience and promote a
            balanced lifestyle. Join us as we cultivate not only skilled
            athletes but also well-rounded individuals prepared to excel in
            their endeavors.
          </p>
          <div className="mt-5 md:mt-36 max-w-md mx-auto sm:flex sm:justify-center">
            <div className="rounded-md shadow">
              <Button
                color="primary"
                size="lg"
                // onPress={() => router.push("/ident/signin")}
              >
                <a href="#about">Discover Us</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="min-h-[100svh] bg-[#5E9CD7] py-16 px-4 flex items-center justify-center"
      >
        <div className="h-full max-w-7xl mx-auto flex flex-col">
          <div className="grid md:grid-cols-2 items-center gap-8">
            <div className="space-y-4 text-white">
              <h3 className="text-2xl font-semibold">
                University Center for Sports and Recreation
              </h3>
              <p>
                The University Center for Sports and Recreation is situated at
                the heart of the campus, adjacent to the main gymnasium and near
                the student activity center.
              </p>
              <p className="pt-5 flex flex-col">
                <span className="font-semibold italic">
                  “Empowering Minds, Strengthening Bodies.”
                </span>
                <br />
                The center offers state-of-the-art facilities for students,
                faculty, and staff to engage in sports, fitness, and
                recreational activities. From modern fitness equipment to
                spacious courts for basketball, volleyball, and badminton, the
                center promotes a healthy and active lifestyle. It also hosts
                Inter-university sports events, fitness workshop, and wellness
                program to foster teamwork, discipline, and overall well-being.
              </p>
            </div>
            <div className="space-y-4">
              <Image
                alt="CSU Admin"
                src="/csu-admin-orig.png"
                width={700}
                height={700}
                className="rounded-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section
        id="services"
        className="min-h-[100svh] py-16 px-4 flex items-center justify-center"
      >
        <div className="h-full max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Our Services</h2>
          <p className="text-center mb-24">
            The sports University Center provides a range of free services to
            help students and athletes enhance their skills and enjoy their
            sports experience to the fullest
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Free Borrowing of Sports Equipment",
                description:
                  "We offer a variety of sports equipment available for students to borrow free of charge. Our inventory Includes basketballs, tennis rackets, soccer balls, volleyball nets, and more. All equipment is regularly inspected and maintained to ensure it's in great condition for use. Students can visit the equipment room and borrow what they need by presenting their student ID. This makes it easy to access the gear you need for practice, games, or recreational activities.",
              },
              {
                title: "Free Coaching Lessons",
                description:
                  "Our coaching lessons are designed to help students of all skill levels improve their abilities in various sports. Experienced coaches offer both individual and group sessions, focusing on developing techniques, strategies, and overall performance. Whether you're just starting or looking to refine advanced skills, our coaches provide personalized feedback to meet your needs. Lessons are free and scheduled regularly, making it convenient to fit them into your routine. This is a great opportunity to learn from professionals and enhance your game.",
              },
              {
                title: "Free Training Sessions",
                description:
                  "We provide free training sessions aimed at improving physical fitness, endurance, and sport-specific skills. Led by certified trainers, these sessions include strength training, agility exercises, and conditioning workouts. They are open to all students, regardless of experience, allowing everyone to benefit from structured training programs. Sessions are held regularly, and students can join based on their fitness goals or upcoming competitions. These training programs are perfect for those looking to stay active and Improve their athletic performance.",
              },
            ].map((service) => (
              <Card
                key={service.title}
                className="bg-[#5E9CD7] text-white transform transition-transform duration-200 hover:scale-105"
              >
                <CardHeader className="font-semibold text-lg flex justify-center">
                  {service.title}
                </CardHeader>
                <CardBody>{service.description}</CardBody>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Forms Section */}
      <section
        id="forms"
        className="min-h-[105svh] bg-[#5E9CD7] py-16 px-4 flex justify-center"
      >
        <div className="h-full max-w-7xl mx-auto flex flex-col items-center my-10">
          {/* <h2 className="text-3xl font-bold text-center mt-10 mb-8">Forms</h2> */}

          <Tabs
            aria-label="Options"
            selectedKey={currentFormView}
            onSelectionChange={(key) => setCurrentFormView(key.toString())}
            className="font-semibold"
            size="lg"
          >
            <Tab key="tryout" title="Try Out Form">
              <Card>
                <CardBody className="w-[30rem] flex flex-col gap-3">
                  <Input
                    type="email"
                    label="Email"
                    variant="bordered"
                    color="primary"
                    isRequired
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Input
                    type="text"
                    label="School ID Number"
                    variant="bordered"
                    color="primary"
                    isRequired
                    value={schoolIdNumber}
                    onChange={(e) => setSchoolIdNumber(e.target.value)}
                  />
                  <Input
                    type="text"
                    label="Full Name"
                    variant="bordered"
                    color="primary"
                    isRequired
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                  <Input
                    type="text"
                    label="Phone Number"
                    variant="bordered"
                    color="primary"
                    isRequired
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                  <Input
                    type="text"
                    label="Degree Program"
                    variant="bordered"
                    color="primary"
                    isRequired
                    value={degreeProgram}
                    onChange={(e) => setDegreeProgram(e.target.value)}
                  />
                  <Input
                    type="text"
                    label="Experience"
                    variant="bordered"
                    color="primary"
                    isRequired
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                  />
                  <Input
                    type="text"
                    label="Event"
                    variant="bordered"
                    color="primary"
                    isRequired
                    value={event}
                    onChange={(e) => setEvent(e.target.value)}
                  />
                  <Input
                    type="text"
                    label="Course"
                    variant="bordered"
                    color="primary"
                    isRequired
                    value={course}
                    onChange={(e) => setCourse(e.target.value)}
                  />
                  <Textarea
                    label="Remarks"
                    variant="bordered"
                    color="primary"
                    isRequired
                    value={remarks}
                    onChange={(e) => setRemarks(e.target.value)}
                  />
                  <Input
                    type="text"
                    label="Recommendation"
                    variant="bordered"
                    color="primary"
                    isRequired
                    value={recommendation}
                    onChange={(e) => setRecommendation(e.target.value)}
                  />
                  <Button
                    color="primary"
                    size="lg"
                    onPress={handleFormSubmit}
                    isDisabled={
                      !email ||
                      !schoolIdNumber ||
                      !fullName ||
                      !phoneNumber ||
                      !degreeProgram ||
                      !experience ||
                      !event ||
                      !course ||
                      !remarks ||
                      !recommendation
                    }
                    className="mt-3"
                  >
                    Submit
                  </Button>
                </CardBody>
              </Card>
            </Tab>
            <Tab key="appointment" title="Appointment Form">
              <Card>
                <CardBody className="w-[30rem] flex flex-col gap-3">
                  <Input
                    type="email"
                    label="Email"
                    variant="bordered"
                    color="primary"
                    isRequired
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Input
                    type="text"
                    label="School ID Number"
                    variant="bordered"
                    color="primary"
                    isRequired
                    value={schoolIdNumber}
                    onChange={(e) => setSchoolIdNumber(e.target.value)}
                  />
                  <Input
                    type="text"
                    label="Full Name"
                    variant="bordered"
                    color="primary"
                    isRequired
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                  <Input
                    type="text"
                    label="Phone Number"
                    variant="bordered"
                    color="primary"
                    isRequired
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                  <Input
                    type="text"
                    label="Birth Date"
                    placeholder="MM/DD/YYYY"
                    variant="bordered"
                    color="primary"
                    isRequired
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                  />
                  <Textarea
                    label="Message (Optional)"
                    variant="bordered"
                    color="primary"
                    // isRequired
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                  <Textarea
                    label="Reason"
                    variant="bordered"
                    color="primary"
                    isRequired
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                  />

                  <Button
                    color="primary"
                    size="lg"
                    onPress={handleFormSubmit}
                    isDisabled={
                      !email ||
                      !schoolIdNumber ||
                      !fullName ||
                      !phoneNumber ||
                      !birthDate ||
                      !reason
                    }
                    className="mt-3"
                  >
                    Submit
                  </Button>
                </CardBody>
              </Card>
            </Tab>
          </Tabs>
        </div>
      </section>

      {/* Feedback Section */}
      <section
        id="feedback"
        className="min-h-[80svh] py-16 px-4 flex justify-center"
      >
        <div className="h-full max-w-7xl mx-auto flex flex-col my-10">
          <div className="mb-32 text-center">
            <h2 className="text-3xl font-bold text-center">
              What our student says
            </h2>
            {/* <h3 className="text-sm">Some of our university reviews</h3> */}
            <h3 className="text-sm">Submit your reviews</h3>
          </div>
          <div className="w-[30rem]">
            <form className="space-y-6">
              <Input
                type="email"
                label="Email"
                variant="bordered"
                color="primary"
              />

              <Textarea
                rows={4}
                label="Message"
                variant="bordered"
                color="primary"
              />

              <div className="flex justify-center">
                <Button type="submit" color="primary">
                  Submit Feedback
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#5E9CD7] flex items-center justify-center py-2">
        <div className="text-white text-center text-sm">
          <p>Caraga State University</p>
          <p className="text-xs">All rights reserved</p>
        </div>
      </footer>
    </div>
  );
}
