export default function PrivacyPolicy() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <article className="prose prose-neutral dark:prose-invert">
        <h1>Privacy Policy – GUXI</h1>

        <p className="text-sm text-muted-foreground">
          Last updated: 27/12/2025
        </p>

        <p>
          Your privacy is important to us. This Privacy Policy explains how GUXI
          collects, uses, and protects your information.
        </p>

        <h2>1. Information We Collect</h2>

        <h3>a. Account Information</h3>
        <ul>
          <li>Email address</li>
          <li>OAuth profile data from GitHub and X (Twitter)</li>
        </ul>

        <h3>b. Usage Data</h3>
        <ul>
          <li>Repository metadata (public repositories only)</li>
          <li>Generated content and posting status</li>
          <li>Basic, non-intrusive analytics</li>
        </ul>

        <h3>c. Tokens & Credentials</h3>
        <p>
          OAuth access tokens are stored securely and encrypted. We never store
          your passwords.
        </p>

        <h2>2. How We Use Your Information</h2>
        <ul>
          <li>Authenticate your account</li>
          <li>Connect GitHub and X integrations</li>
          <li>Generate and post content on your behalf</li>
          <li>Improve the service and fix issues</li>
        </ul>

        <h2>3. Data Sharing</h2>
        <p>We do not sell your personal data.</p>
        <p>Data is shared only with:</p>
        <ul>
          <li>GitHub (for repository events)</li>
          <li>X (for posting tweets)</li>
          <li>Infrastructure providers (hosting, database, monitoring)</li>
        </ul>

        <h2>4. Data Retention</h2>
        <p>
          We retain data only as long as necessary to provide the service. You
          may request deletion of your account and associated data at any time.
        </p>

        <h2>5. Security</h2>
        <p>
          We use industry-standard security measures to protect your data,
          including encryption and access controls. However, no system is 100%
          secure.
        </p>

        <h2>6. Your Rights</h2>
        <ul>
          <li>Access your data</li>
          <li>Disconnect integrations</li>
          <li>Delete your account</li>
        </ul>

        <h2>7. Children’s Privacy</h2>
        <p>
          GUXI is not intended for users under 13. We do not knowingly collect
          personal data from children.
        </p>

        <h2>8. Changes to Privacy Policy</h2>
        <p>
          We may update this policy from time to time. Updates will be posted on
          this page.
        </p>

        <h2>9. Contact</h2>
        <p>
          For privacy-related questions or requests, contact:
          <br />
          <a href="mailto:hi@rahul.eu.org">hi@rahul.eu.org</a>
        </p>
      </article>
    </main>
  );
}
