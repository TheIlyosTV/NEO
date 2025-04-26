import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-gray-700">
          Home
        </Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <span className="text-gray-900">Terms of Service</span>
      </div>

      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>

        <div className="prose prose-gray max-w-none">
          <p className="text-lg mb-6">Last Updated: April 22, 2025</p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">1. Introduction</h2>
          <p>
            Welcome to our e-commerce platform. These Terms of Service (&quot;Terms&quot;)
            govern your use of our website, mobile applications, and services
            (collectively, the &quot;Services&quot;). By accessing or using our Services,
            you agree to be bound by these Terms. If you do not agree to these
            Terms, please do not use our Services.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">2. Eligibility</h2>
          <p>
            You must be at least 18 years old to use our Services. By using our
            Services, you represent and warrant that you are at least 18 years
            old and have the legal capacity to enter into these Terms.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            3. Account Registration
          </h2>
          <p>
            To access certain features of our Services, you may need to register
            for an account. You agree to provide accurate, current, and complete
            information during the registration process and to update such
            information to keep it accurate, current, and complete. You are
            responsible for safeguarding your password and for all activities
            that occur under your account.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            4. Products and Orders
          </h2>
          <p>
            4.1. <strong>Product Information</strong>: We strive to provide
            accurate product descriptions, pricing, and availability
            information. However, we do not warrant that product descriptions,
            pricing, or other content on our Services is accurate, complete,
            reliable, current, or error-free.
          </p>
          <p>
            4.2. <strong>Orders</strong>: Your order is an offer to purchase a
            product. We reserve the right to accept or decline your order for
            any reason, including but not limited to product availability,
            errors in product or pricing information, or problems identified by
            our fraud detection systems.
          </p>
          <p>
            4.3. <strong>Pricing and Payment</strong>: All prices are shown in
            the applicable currency and do not include taxes, shipping, or
            handling unless otherwise specified. We reserve the right to change
            prices at any time. You agree to pay all charges incurred by you or
            any users of your account at the prices in effect when such charges
            are incurred.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            5. Shipping and Delivery
          </h2>
          <p>
            We will make reasonable efforts to deliver products within the
            estimated delivery time. However, we are not responsible for delays
            beyond our control, including but not limited to carrier delays,
            weather conditions, or force majeure events.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            6. Returns and Refunds
          </h2>
          <p>
            Please refer to our Return Policy for information on returns,
            exchanges, and refunds.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            7. Intellectual Property
          </h2>
          <p>
            All content on our Services, including but not limited to text,
            graphics, logos, images, audio clips, digital downloads, data
            compilations, and software, is our property or the property of our
            content suppliers and is protected by international copyright laws.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">8. User Content</h2>
          <p>
            By submitting content to our Services (including but not limited to
            product reviews, comments, and social media posts), you grant us a
            non-exclusive, royalty-free, perpetual, irrevocable, and fully
            sublicensable right to use, reproduce, modify, adapt, publish,
            translate, create derivative works from, distribute, and display
            such content throughout the world in any media.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            9. Limitation of Liability
          </h2>
          <p>
            To the fullest extent permitted by applicable law, we shall not be
            liable for any indirect, incidental, special, consequential, or
            punitive damages, or any loss of profits or revenues, whether
            incurred directly or indirectly, or any loss of data, use, goodwill,
            or other intangible losses, resulting from (a) your use or inability
            to use our Services; (b) any unauthorized access to or use of our
            servers and/or any personal information stored therein; (c) any
            interruption or cessation of transmission to or from our Services;
            or (d) any bugs, viruses, trojan horses, or the like that may be
            transmitted to or through our Services by any third party.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            10. Governing Law
          </h2>
          <p>
            These Terms shall be governed by and construed in accordance with
            the laws of [Your Jurisdiction], without regard to its conflict of
            law provisions.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            11. Changes to Terms
          </h2>
          <p>
            We reserve the right to modify these Terms at any time. If we make
            material changes to these Terms, we will notify you by email or by
            posting a notice on our Services. Your continued use of our Services
            after such modifications will constitute your acknowledgment of the
            modified Terms and agreement to abide and be bound by the modified
            Terms.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            12. Contact Information
          </h2>
          <p>
            If you have any questions about these Terms, please contact us at
            support@yourecommercestore.com.
          </p>
        </div>
      </div>
    </div>
  );
}
