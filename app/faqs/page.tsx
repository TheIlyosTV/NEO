"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

// FAQ data organized by categories
const faqData = {
  orders: [
    {
      question: "How can I track my order?",
      answer:
        "You can track your order by logging into your account and visiting the 'Orders' section. Alternatively, you can use the tracking number provided in your shipping confirmation email.",
    },
    {
      question: "How long will it take to receive my order?",
      answer:
        "Standard delivery typically takes 3-5 business days within the country. International shipping may take 7-14 business days depending on the destination. Express shipping options are available at checkout.",
    },
    {
      question: "Can I change or cancel my order?",
      answer:
        "Orders can be modified or canceled within 1 hour of placing them. After this time, please contact our customer service team who will try to accommodate your request if the order hasn't been processed yet.",
    },
    {
      question: "Do you ship internationally?",
      answer:
        "Yes, we ship to most countries worldwide. Shipping costs and delivery times vary by location. You can see the shipping options available to your country during checkout.",
    },
  ],
  returns: [
    {
      question: "What is your return policy?",
      answer:
        "We offer a 30-day return policy for most items. Products must be in their original condition with tags attached. Some items like underwear, swimwear, and personalized products cannot be returned for hygiene and customization reasons.",
    },
    {
      question: "How do I return an item?",
      answer:
        "To return an item, log into your account, go to 'Orders', select the order containing the item you wish to return, and follow the return instructions. You'll receive a return label to print and attach to your package.",
    },
    {
      question: "How long does it take to process a refund?",
      answer:
        "Once we receive your return, it takes 2-3 business days to inspect and process. After approval, refunds typically take 5-10 business days to appear in your account, depending on your payment method and financial institution.",
    },
    {
      question: "Can I exchange an item instead of returning it?",
      answer:
        "Yes, you can request an exchange for a different size or color of the same item. Follow the return process and select 'Exchange' instead of 'Return' when prompted.",
    },
  ],
  products: [
    {
      question: "How do I know if a product is in stock?",
      answer:
        "If a product is available for purchase on our website, it's in stock. If an item is out of stock, it will be marked as 'Out of Stock' or 'Coming Soon' and you may have the option to join a waitlist for notification when it's back in stock.",
    },
    {
      question: "What materials are used in your products?",
      answer:
        "We use a variety of materials depending on the product. Detailed information about materials can be found in the product description of each item. We prioritize quality and sustainability in our material selection.",
    },
    {
      question: "How should I care for my purchases?",
      answer:
        "Care instructions are specific to each product and can be found on the product tags and in the product description on our website. Generally, we recommend following the washing instructions on the care label to maintain the quality of your items.",
    },
    {
      question: "Are your products sustainable?",
      answer:
        "We are committed to increasing sustainability across our product lines. Look for our 'Eco-Friendly' tag on products that meet our sustainability criteria. We're transparent about our materials and manufacturing processes.",
    },
  ],
  account: [
    {
      question: "How do I create an account?",
      answer:
        "You can create an account by clicking on 'Sign In' at the top of our website and selecting 'Create Account'. You'll need to provide your email address and create a password. You can also sign up using your Google account.",
    },
    {
      question: "I forgot my password. How do I reset it?",
      answer:
        "Click on 'Sign In', then select 'Forgot Password'. Enter the email address associated with your account, and we'll send you instructions to reset your password.",
    },
    {
      question: "How can I update my personal information?",
      answer:
        "Log into your account, go to 'My Account', and select 'Account Settings' or 'Profile'. From there, you can update your name, email, password, and other personal information.",
    },
    {
      question: "Is my personal information secure?",
      answer:
        "Yes, we take data security very seriously. We use industry-standard encryption and security measures to protect your personal information. You can review our Privacy Policy for more details on how we handle your data.",
    },
  ],
  payment: [
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept major credit cards (Visa, Mastercard, American Express), PayPal, Apple Pay, Google Pay, and bank transfers. Payment options may vary depending on your location.",
    },
    {
      question: "Is it safe to use my credit card on your website?",
      answer:
        "Yes, our payment processing is secure and compliant with PCI DSS standards. We use encryption to protect your payment information during transmission and we don't store your full credit card details on our servers.",
    },
    {
      question: "Can I pay in installments?",
      answer:
        "Yes, we offer installment payment options through services like Klarna and Afterpay on eligible purchases. These options will be displayed at checkout if available for your order and location.",
    },
    {
      question: "When will my credit card be charged?",
      answer:
        "Your credit card will be authorized when you place your order and charged when your order ships. For pre-orders or backordered items, your card will be charged when the item is ready to ship.",
    },
  ],
  sizing: [
    {
      question: "How do I find my correct size?",
      answer:
        "We provide detailed size guides for all our product categories. Visit our Size Guide page to find measurement instructions and size charts. If you're between sizes, we generally recommend sizing up.",
    },
    {
      question: "Do your sizes run true to standard sizing?",
      answer:
        "Our sizing is generally consistent with standard sizing, but there may be slight variations depending on the style and cut of specific items. We recommend checking the size guide for each product.",
    },
    {
      question: "What if an item doesn't fit?",
      answer:
        "If an item doesn't fit, you can return it within our 30-day return period and either receive a refund or exchange it for a different size. Please ensure the item is unworn with tags still attached.",
    },
    {
      question: "Do you offer petite or plus sizes?",
      answer:
        "Yes, we offer an inclusive range of sizes including petite and plus sizes in many of our product lines. Look for size filters when shopping to find products available in your preferred size range.",
    },
  ],
  other: [
    {
      question: "Do you have physical stores?",
      answer:
        "Yes, we have physical stores in major cities. Visit our Store Locator page to find the nearest location, along with store hours and contact information.",
    },
    {
      question: "How can I contact customer service?",
      answer:
        "You can contact our customer service team through the 'Contact Us' page on our website, by email at support@example.com, or by phone at +1-800-123-4567. Our service hours are Monday to Friday, 9 AM to 6 PM EST.",
    },
    {
      question: "Do you offer gift wrapping?",
      answer:
        "Yes, we offer gift wrapping services for a small additional fee. You can select this option during checkout and add a personalized message to be included with your gift.",
    },
    {
      question: "Do you have a loyalty program?",
      answer:
        "Yes, we have a rewards program where you earn points on purchases that can be redeemed for discounts on future orders. You can sign up for the program in your account settings.",
    },
  ],
}

export default function FAQsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("all")

  // Filter FAQs based on search query
  const filteredFAQs = Object.entries(faqData).flatMap(([category, questions]) => {
    return questions
      .filter(
        (faq) =>
          faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      .map((faq) => ({ ...faq, category }))
  })

  // Get all FAQs for the active category or all if 'all' is selected
  const displayFAQs =
    activeCategory === "all" ? filteredFAQs : filteredFAQs.filter((faq) => faq.category === activeCategory)

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  }

  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Find answers to common questions about our products, orders, shipping, returns, and more.
        </p>
      </motion.div>

      {/* Search bar */}
      <div className="max-w-md mx-auto mb-10">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <Input
            type="text"
            placeholder="Search for answers..."
            className="pl-10 pr-4 py-2 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Category tabs */}
      <Tabs defaultValue="all" className="mb-8">
        <TabsList className="flex flex-wrap justify-center gap-2 mb-6">
          <TabsTrigger
            value="all"
            onClick={() => setActiveCategory("all")}
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            All
          </TabsTrigger>
          <TabsTrigger
            value="orders"
            onClick={() => setActiveCategory("orders")}
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Orders & Shipping
          </TabsTrigger>
          <TabsTrigger
            value="returns"
            onClick={() => setActiveCategory("returns")}
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Returns & Refunds
          </TabsTrigger>
          <TabsTrigger
            value="products"
            onClick={() => setActiveCategory("products")}
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Products
          </TabsTrigger>
          <TabsTrigger
            value="account"
            onClick={() => setActiveCategory("account")}
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Account
          </TabsTrigger>
          <TabsTrigger
            value="payment"
            onClick={() => setActiveCategory("payment")}
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Payment
          </TabsTrigger>
          <TabsTrigger
            value="sizing"
            onClick={() => setActiveCategory("sizing")}
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Sizing & Fit
          </TabsTrigger>
          <TabsTrigger
            value="other"
            onClick={() => setActiveCategory("other")}
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Other
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-0">
          {displayFAQs.length > 0 ? (
            <motion.div variants={containerVariants} initial="hidden" animate="visible" className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="w-full">
                {displayFAQs.map((faq, index) => (
                  <motion.div key={index} variants={itemVariants}>
                    <AccordionItem value={`item-${index}`} className="border-b border-gray-200">
                      <AccordionTrigger className="text-left py-4 hover:no-underline">
                        <span className="font-medium text-lg">{faq.question}</span>
                      </AccordionTrigger>
                      <AccordionContent className="py-4 text-gray-600">{faq.answer}</AccordionContent>
                    </AccordionItem>
                  </motion.div>
                ))}
              </Accordion>
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-10">
              <p className="text-lg text-gray-500">No results found for &quot;{searchQuery}&quot;</p>
              <p className="mt-2 text-gray-400">Try a different search term or browse by category</p>
            </motion.div>
          )}
        </TabsContent>

        {/* Other tab contents will be handled by the filtering logic */}
        {Object.keys(faqData).map((category) => (
          <TabsContent key={category} value={category} className="mt-0">
            {/* Content is dynamically filtered based on activeCategory */}
          </TabsContent>
        ))}
      </Tabs>

      {/* Contact support section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="mt-16 bg-gray-50 p-8 rounded-lg text-center max-w-3xl mx-auto"
      >
        <h2 className="text-2xl font-semibold mb-4">Still have questions?</h2>
        <p className="text-gray-600 mb-6">
          If you couldn&apos;t find the answer to your question, our customer support team is here to help.
        </p>
        <Button className="bg-primary hover:bg-primary/90">Contact Support</Button>
      </motion.div>
    </div>
  )
}
