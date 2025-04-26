import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-gray-700">
          Home
        </Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <span className="text-gray-900">Privacy Policy</span>
      </div>

      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>

        <div className="prose prose-gray max-w-none">
          <p className="text-lg mb-6">Last Updated: April 22, 2025</p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">1. Introduction</h2>
          <p>
            This Privacy Policy describes how we collect, use, and disclose your
            personal information when you use our website, mobile applications,
            and services (collectively, the &quot;Services&quot;). We are committed to
            protecting your privacy and ensuring the security of your personal
            information.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            2. Information We Collect
          </h2>
          <p>
            2.1. <strong>Information You Provide to Us</strong>: We collect
            information you provide directly to us, including:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Account information (name, email address, password)</li>
            <li>
              Profile information (shipping address, billing address, phone
              number)
            </li>
            <li>
              Transaction information (products purchased, payment information)
            </li>
            <li>
              Communications (customer service inquiries, product reviews)
            </li>
          </ul>

          <p>
            2.2. <strong>Information We Collect Automatically</strong>: When you
            use our Services, we automatically collect certain information,
            including:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>
              Device information (IP address, browser type, operating system)
            </li>
            <li>Usage information (pages visited, time spent on pages)</li>
            <li>Location information (general location based on IP address)</li>
            <li>Cookies and similar technologies</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            3. How We Use Your Information
          </h2>
          <p>We use the information we collect to:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Process and fulfill your orders</li>
            <li>Provide, maintain, and improve our Services</li>
            <li>
              Communicate with you about products, services, and promotions
            </li>
            <li>Personalize your experience and provide tailored content</li>
            <li>
              Detect, investigate, and prevent fraudulent transactions and other
              illegal activities
            </li>
            <li>Comply with legal obligations</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            4. Sharing Your Information
          </h2>
          <p>We may share your information with:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Service providers who perform services on our behalf</li>
            <li>Payment processors to process your payments</li>
            <li>Shipping carriers to deliver your orders</li>
            <li>Marketing partners to provide you with relevant promotions</li>
            <li>Law enforcement or other third parties when required by law</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">5. Your Choices</h2>
          <p>You have several choices regarding your personal information:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>
              Account Information: You can update your account information by
              logging into your account
            </li>
            <li>
              Marketing Communications: You can opt out of marketing emails by
              clicking the &quot;unsubscribe&quot; link
            </li>
            <li>
              Cookies: You can manage cookies through your browser settings
            </li>
            <li>
              Data Access and Deletion: You can request access to or deletion of
              your personal information
            </li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">6. Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to
            protect your personal information against unauthorized access,
            disclosure, alteration, and destruction. However, no method of
            transmission over the Internet or electronic storage is 100% secure,
            so we cannot guarantee absolute security.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            7. International Data Transfers
          </h2>
          <p>
            Your personal information may be transferred to and processed in
            countries other than the country in which you reside. These
            countries may have different data protection laws than your country
            of residence.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            8. Children&apos;s Privacy
          </h2>
          <p>
            Our Services are not intended for children under the age of 13. We
            do not knowingly collect personal information from children under
            13. If you are a parent or guardian and believe that your child has
            provided us with personal information, please contact us.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            9. Changes to This Privacy Policy
          </h2>
          <p>
            We may update this Privacy Policy from time to time. If we make
            material changes, we will notify you by email or by posting a notice
            on our Services prior to the change becoming effective.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">10. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact
            us at privacy@yourecommercestore.com.
          </p>
        </div>
      </div>
    </div>
  );
}
