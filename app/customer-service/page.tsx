import Link from "next/link"
import { ChevronRight, Mail, Phone, MessageSquare, Clock, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function CustomerServicePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-gray-700">
          Home
        </Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <span className="text-gray-900">Customer Service</span>
      </div>

      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Customer Service</h1>
        <p className="text-gray-600 mb-8">We&apos;re here to help with any questions or concerns</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-sm border flex flex-col items-center text-center">
            <Phone className="h-10 w-10 text-gray-900 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Call Us</h3>
            <p className="text-gray-600 mb-4">Our team is available Monday-Friday, 9am-5pm</p>
            <p className="font-medium text-lg">+1 (800) 123-4567</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border flex flex-col items-center text-center">
            <Mail className="h-10 w-10 text-gray-900 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Email Us</h3>
            <p className="text-gray-600 mb-4">We&apos;ll respond to your inquiry within 24 hours</p>
            <p className="font-medium text-lg">support@yourecommercestore.com</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border flex flex-col items-center text-center">
            <MessageSquare className="h-10 w-10 text-gray-900 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Live Chat</h3>
            <p className="text-gray-600 mb-4">Chat with our support team in real-time</p>
            <Button className="bg-gray-900 hover:bg-gray-800">Start Chat</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-2xl font-semibold mb-6">Contact Form</h2>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <Input id="name" placeholder="Enter your name" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <Input id="email" type="email" placeholder="Enter your email" />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                  Subject
                </label>
                <Input id="subject" placeholder="What is your inquiry about?" />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <Textarea id="message" placeholder="How can we help you?" rows={5} />
              </div>

              <Button type="submit" className="bg-gray-900 hover:bg-gray-800">
                Send Message
              </Button>
            </form>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>How do I track my order?</AccordionTrigger>
                <AccordionContent>
                  You can track your order by logging into your account and navigating to the &quot;Orders&quot; section.
                  Alternatively, you can use the tracking number provided in your shipping confirmation email.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger>What is your return policy?</AccordionTrigger>
                <AccordionContent>
                  We accept returns within 30 days of delivery. Items must be in their original condition with tags
                  attached. Please visit our Returns page for more information on how to initiate a return.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger>How long does shipping take?</AccordionTrigger>
                <AccordionContent>
                  Standard shipping typically takes 3-5 business days within the continental US. Express shipping
                  options are available at checkout for faster delivery.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger>Do you ship internationally?</AccordionTrigger>
                <AccordionContent>
                  Yes, we ship to most countries worldwide. International shipping times vary depending on the
                  destination. Customs fees and import duties may apply and are the responsibility of the customer.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger>How do I change or cancel my order?</AccordionTrigger>
                <AccordionContent>
                  You can request changes or cancellations within 1 hour of placing your order by contacting our
                  customer service team. After this window, we cannot guarantee that changes can be made as orders are
                  processed quickly.
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="mt-8">
              <Link href="/faqs" className="text-gray-900 font-medium underline">
                View all FAQs
              </Link>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-8 rounded-lg border">
          <h2 className="text-2xl font-semibold mb-6">Visit Our Store</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div className="flex items-start mb-4">
                <MapPin className="h-5 w-5 text-gray-900 mr-2 mt-1" />
                <div>
                  <h3 className="font-medium">Main Store</h3>
                  <p className="text-gray-600">123 Fashion Street, New York, NY 10001</p>
                </div>
              </div>

              <div className="flex items-start mb-4">
                <Clock className="h-5 w-5 text-gray-900 mr-2 mt-1" />
                <div>
                  <h3 className="font-medium">Store Hours</h3>
                  <p className="text-gray-600">Monday-Saturday: 10am-8pm</p>
                  <p className="text-gray-600">Sunday: 11am-6pm</p>
                </div>
              </div>

              <Button className="bg-gray-900 hover:bg-gray-800 mt-2">Get Directions</Button>
            </div>

            <div className="h-64 bg-gray-200 rounded-lg">
              {/* Map placeholder - would be replaced with an actual map component */}
              <div className="h-full flex items-center justify-center">
                <p className="text-gray-500">Store Location Map</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
