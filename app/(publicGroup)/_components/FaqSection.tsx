"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FaqItem {
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    question: "পেমেন্ট কি কাজ শুরুর আগে নাকি কাজ শেষে দিতে হয়?",
    answer: "টেকনিশিয়ান আপনার বুকিং রিকুয়েস্ট Accept করার পর আপনি অনলাইন গেটওয়েতে (Stripe/SSLCommerz) পেমেন্ট সম্পন্ন করবেন। পেমেন্ট সম্পন্ন হলে টেকনিশিয়ান কাজ শুরু (In-Progress) করবে।",
  },
  {
    question: "বুকিং ক্যানসেল করার নিয়ম কি?",
    answer: "কাজ ইন-প্রোগ্রেস (IN_PROGRESS) হওয়ার পূর্ব পর্যন্ত যেকোনো সময় আপনি আপনার কাস্টমার ড্যাশবোর্ড থেকে সহজেই বুকিং ক্যানসেল করতে পারবেন।",
  },
  {
    question: "টেকনিশিয়ানদের ব্যাকগ্রাউন্ড কিভাবে ভেরিফাই করা হয়?",
    answer: "FixItNow-এর প্রতিটি টেকনিশিয়ানের জাতীয় পরিচয়পত্র (NID), কাজের পূর্ব অভিজ্ঞতার সার্টিফিকেট এবং শারীরিক ভেরিফিকেশন সম্পন্ন করার পর প্ল্যাটফর্মে অনুমোদন দেওয়া হয়।",
  },
  {
    question: "কোনো কারণে কাজ পছন্দ না হলে সমাধান কি?",
    answer: "আমাদের ২৪/৭ সাপোর্ট টিম সব সময় সক্রিয় রয়েছে। আপনার যেকোনো অভিযোগ বা কাজের অসন্তোষ ড্যাশবোর্ড বা সাপোর্টে জানালে পুনরায় সার্ভিস বা রিফান্ড প্রসেস করা হয়।",
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center space-y-3 mb-12"
        >
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-primary tracking-wider uppercase bg-primary/10 px-3.5 py-1 rounded-full border border-primary/20">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
            Frequently Asked Questions
          </h2>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="rounded-2xl bg-card border border-border overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-semibold text-foreground hover:text-primary transition-colors focus:outline-none"
                >
                  <span className="text-base sm:text-lg">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-muted-foreground shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-primary" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed border-t border-border/50 pt-3">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}