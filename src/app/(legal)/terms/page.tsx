import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use | Serium Test Instance",
  description:
    "Terms of use and liability disclaimer for Serium test application.",
  robots: "noindex, nofollow",
};

export default function TermsOfUsePage() {
  return (
    <>
      <h1>Terms of Use for Serium (Test Instance)</h1>
      <p className="text-muted-foreground lead">
        Last Updated:{" "}
        {new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>

      <div className="my-6 p-4 border border-yellow-500/50 rounded-md bg-yellow-500/10 text-yellow-700 dark:text-yellow-300">
        <h2 className="font-semibold text-lg mb-2">Important Notice</h2>
        <p>
          This web application is a personal test project created for
          development purposes only. It is not a service, a product, or a
          platform intended for public or production use.
        </p>
        <p className="mt-2">
          <strong>
            You are using this application entirely at your own risk.
          </strong>{" "}
          There is no guarantee of functionality, availability, uptime, data
          privacy, or security. Any data entered may be lost, modified, exposed,
          or deleted at any time without notice.
        </p>
        <p className="mt-2">
          If you do not agree to these terms, you should not use this website.
        </p>
      </div>

      <h2>1. No Warranty or Support</h2>
      <p>
        This site is provided on an <strong>&quot;AS IS&quot;</strong> and{" "}
        <strong>&quot;AS AVAILABLE&quot;</strong> basis. No guarantees are made
        regarding its operation, stability, or accuracy. No technical support or
        user assistance is offered or implied.
      </p>

      <h2>2. No Data Guarantee</h2>
      <p>
        Data you enter is not protected or stored securely. You should assume it
        will be deleted, exposed, or accessed by others. Do not enter any
        sensitive, personal, or valuable information.
      </p>

      <h2>3. No Liability</h2>
      <p>
        I, the creator of this test application, assume no responsibility or
        liability for:
      </p>
      <ul className="list-disc list-inside mt-2 space-y-1">
        <li>Loss of data</li>
        <li>Exposure of personal or sensitive information</li>
        <li>Downtime, crashes, or bugs</li>
        <li>
          Any damages, direct or indirect, resulting from your use of this app
        </li>
      </ul>

      <p className="mt-2">
        By using this site, you agree to hold me harmless from any claim, legal
        or otherwise, that may arise from your use of it.
      </p>

      <h2>4. Changes to These Terms</h2>
      <p>
        These terms may be updated or changed without notice. By continuing to
        use the site, you accept the current version of these terms.
      </p>

      <h2>5. Contact</h2>
      <p>
        If you have questions about this test application, you may reach me at:{" "}
        <a
          href="mailto:noamyu@proton.me"
          className="underline hover:text-primary"
        >
          noamyu@proton.me
        </a>
      </p>
    </>
  );
}
