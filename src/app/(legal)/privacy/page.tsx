import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Serium",
  description:
    "Understanding data handling for the Serium public demo and the self-hosted application.",
  robots: "noindex, nofollow",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <h1>Notice Regarding This Web Application</h1>
      <p className="text-muted-foreground lead">
        Last Updated:{" "}
        {new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>

      <div className="my-6 p-4 border border-yellow-500/50 rounded-md bg-yellow-500/10 text-yellow-700 dark:text-yellow-300">
        <h2 className="font-semibold text-lg mb-2">
          This is a Test Application
        </h2>
        <p>
          This web application is a personal project used for development and
          testing purposes only. It is not intended for public use, commercial
          use, or production use of any kind.
        </p>
        <p className="mt-2">
          <strong>
            Do not enter any real, personal, sensitive, or confidential
            information.
          </strong>{" "}
          Data may be deleted, changed, exposed, or lost at any time.
        </p>
        <p className="mt-2">
          I do not monitor this application, and I am not responsible for any
          consequences resulting from its use. By using this app, you accept
          that it comes with absolutely no guarantees.
        </p>
      </div>
    </>
  );
}
