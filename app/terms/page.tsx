export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Terms and Conditions</h1>
      <div className="prose prose-lg">
        <p className="mb-4">Last updated: {new Date().toLocaleDateString()}</p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          1. Acceptance of Terms
        </h2>
        <p className="mb-4">
          By accessing and using TeraBox Viewer, you accept and agree to be
          bound by the terms and provision of this agreement.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">2. Use License</h2>
        <p className="mb-4">
          Permission is granted to temporarily use TeraBox Viewer for personal,
          non-commercial transitory viewing only.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">3. Disclaimer</h2>
        <p className="mb-4">
          The materials on TeraBox Viewer are provided on an &apos;as is&apos;
          basis. TeraBox Viewer makes no warranties, expressed or implied, and
          hereby disclaims and negates all other warranties including, without
          limitation, implied warranties or conditions of merchantability,
          fitness for a particular purpose, or non-infringement of intellectual
          property or other violation of rights.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">4. Limitations</h2>
        <p className="mb-4">
          In no event shall TeraBox Viewer or its suppliers be liable for any
          damages (including, without limitation, damages for loss of data or
          profit, or due to business interruption) arising out of the use or
          inability to use the materials on TeraBox Viewer.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          5. Revisions and Errata
        </h2>
        <p className="mb-4">
          The materials appearing on TeraBox Viewer could include technical,
          typographical, or photographic errors. TeraBox Viewer does not warrant
          that any of the materials on its website are accurate, complete, or
          current.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">6. Links</h2>
        <p className="mb-4">
          TeraBox Viewer has not reviewed all of the sites linked to its website
          and is not responsible for the contents of any such linked site. The
          inclusion of any link does not imply endorsement by TeraBox Viewer of
          the site.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">7. Modifications</h2>
        <p className="mb-4">
          TeraBox Viewer may revise these terms of service for its website at
          any time without notice. By using this website you are agreeing to be
          bound by the then current version of these terms of service.
        </p>
      </div>
    </div>
  );
}
