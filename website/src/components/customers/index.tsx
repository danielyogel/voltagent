import { BoltIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import React, { useState, useEffect, useRef } from "react";
import { ProjectCard } from "./customerCard";

interface CustomerListProps {
  customers?: any[];
}

export const CustomerList = ({ customers = [] }: CustomerListProps) => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Extract testimonials from customers data
  const testimonials = customers.map((customer) => ({
    text: customer.case_study.quote.text,
    author: customer.case_study.quote.author,
    position: customer.case_study.quote.position,
    company: customer.case_study.quote.company,
    avatar: customer.customer.logo_url,
  }));

  // Intersection Observer to pause rotation when not visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.5 },
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Optimized testimonial rotation with visibility and pause controls
  useEffect(() => {
    if (testimonials.length > 1 && isVisible && !isPaused) {
      intervalRef.current = setInterval(() => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
      }, 8000); // Increased from 5s to 8s to reduce frequency

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }

    // Clear interval when not visible or paused
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, [testimonials.length, isVisible, isPaused]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <section ref={containerRef} className="relative py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Header with Testimonials */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 landing-sm:gap-12 mb-12 sm:mb-24">
          {/* Left Side - Main Content */}
          <div className="flex flex-col justify-center">
            <div className="flex items-baseline justify-start mb-6">
              <div className="flex mr-2 items-center border-2 border-solid border-[#00d992] rounded-full p-1">
                <BoltIcon className="w-5 h-5 sm:w-6 sm:h-6 text-[#00d992]" />
              </div>
              <span className="text-3xl sm:text-4xl font-bold text-[#00d992]">
                voltagent
              </span>
              <div className="relative">
                <span className="ml-2 text-xl sm:text-2xl font-medium text-gray-400">
                  Customer Case Studies
                </span>
              </div>
            </div>

            <p className="text-base text-gray-400 mb-8 leading-relaxed">
              <span className="text-[#00d992] font-semibold">VoltAgent</span> is
              the TypeScript AI agent framework, while{" "}
              <span className="text-orange-400 font-semibold">VoltOps</span>{" "}
              provides framework-agnostic LLM observability. Companies use both
              to build powerful AI agents and gain visibility into their
              applications across any tech stack.
            </p>
          </div>

          {/* Right Side - Optimized Testimonial */}
          {testimonials.length > 0 && (
            <div className="relative flex items-center justify-center">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative max-w-md w-full"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
              >
                <div
                  className="backdrop-blur-md bg-white/5 border-solid border-[#1e293b]/40 border-2 rounded-lg p-8 shadow-2xl h-64 flex flex-col justify-between"
                  style={{
                    backdropFilter: "blur(4px)",
                    WebkitBackdropFilter: "blur(4px)",
                  }}
                >
                  {/* Testimonial Content */}
                  <div className="flex-1 flex items-center">
                    <blockquote className="text-md text-gray-200 italic leading-relaxed">
                      "{testimonials[currentTestimonial].text}"
                    </blockquote>
                  </div>

                  {/* Author Info */}
                  <div className="flex items-center mt-1">
                    <div>
                      <div className="font-semibold text-[#00d992] text-lg">
                        {testimonials[currentTestimonial].author}
                      </div>
                      <div className="text-gray-400 text-sm">
                        {testimonials[currentTestimonial].position}
                      </div>
                      <div className="text-gray-500 text-xs">
                        {testimonials[currentTestimonial].company}
                      </div>
                    </div>
                  </div>

                  {/* Progress indicators */}
                  {testimonials.length > 1 && (
                    <div className="flex justify-center space-x-2 mt-4">
                      {testimonials.map((testimonial, index) => (
                        <button
                          key={`testimonial-${testimonial.author}-${index}`}
                          type="button"
                          onClick={() => setCurrentTestimonial(index)}
                          className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                            index === currentTestimonial
                              ? "bg-[#00d992]"
                              : "bg-gray-600"
                          }`}
                          aria-label={`Go to testimonial ${index + 1}`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          )}
        </div>
        
  {/* Customer Case Studies Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {customers.map((customer) => (
            <ProjectCard key={customer.id} project={customer} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};
