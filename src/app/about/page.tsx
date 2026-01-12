import Link from 'next/link';

export default function AboutPage() {
  return (
    <main className="pt-24 pb-16 px-4 sm:px-8">
      <div className="max-w-3xl mx-auto">
        {/* What is the Perec Test Section */}
        <h1 className="text-4xl sm:text-5xl font-bold mb-8 leading-tight">
          What is the Perec Test?
        </h1>

        <p className="text-lg text-[#a0a0a0] leading-relaxed mb-8">
          The Perec Test is a framework for identifying films that embody the principle of
          creative constraint. Named in the spirit of Georges Perec — the French writer who
          wrote an entire novel without the letter 'e' — it celebrates what can be achieved
          when artists embrace limitation.
        </p>

        {/* Test Criteria */}
        <div className="bg-[#1a1a1a] rounded-2xl p-6 sm:p-8 mb-12">
          <h2 className="text-xl font-semibold mb-6">A film passes the Perec Test if:</h2>

          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-[#e50914] rounded-full flex items-center justify-center font-bold shrink-0">
                1
              </div>
              <div>
                <h3 className="font-semibold mb-2">Runtime Constraint</h3>
                <p className="text-[#a0a0a0]">
                  The film's runtime is no more than 1 hour and 45 minutes (105 minutes).
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 bg-[#e50914] rounded-full flex items-center justify-center font-bold shrink-0">
                2
              </div>
              <div>
                <h3 className="font-semibold mb-2">Standalone Work</h3>
                <p className="text-[#a0a0a0]">
                  The film is conceived as a standalone work, not designed as part of a series,
                  franchise, cinematic universe, or planned continuation.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 bg-[#e50914] rounded-full flex items-center justify-center font-bold shrink-0">
                3
              </div>
              <div>
                <h3 className="font-semibold mb-2">Closed Ending</h3>
                <p className="text-[#a0a0a0]">
                  The film presents a closed ending, resolving its central narrative, thematic,
                  or formal question without leaving the work structurally open to continuation.
                </p>
              </div>
            </div>
          </div>
        </div>

        <p className="text-lg text-[#a0a0a0] leading-relaxed mb-8">
          <strong className="text-white">Important note:</strong> A closed ending does not
          require narrative certainty or moral resolution; ambiguity is permitted. What
          matters is that the story feels complete on its own terms.
        </p>

        <blockquote className="border-l-4 border-[#e50914] pl-6 my-10 text-xl sm:text-2xl italic text-white">
          "If a story cannot be told in 105 minutes, it may not yet know what it is."
        </blockquote>

        {/* Purpose Section */}
        <div className="border-t border-[#252525] pt-12 mt-12">
          <h2 className="text-3xl font-bold mb-8">Purpose</h2>

          <p className="text-lg text-[#a0a0a0] leading-relaxed mb-6">
            In an era of endless sequels, expanding universes, and stories that never quite
            end, <strong className="text-white">Perec Test</strong> celebrates films that
            embrace limitation as a creative force.
          </p>

          <blockquote className="border-l-4 border-[#e50914] pl-6 my-10 text-xl sm:text-2xl italic text-white">
            "The function of a story is to end."
          </blockquote>

          <p className="text-lg text-[#a0a0a0] leading-relaxed mb-6">
            We believe that the most powerful stories are often those that know their
            boundaries. A film that can tell its complete story in 105 minutes or less
            demonstrates a clarity of vision — it knows what it wants to say and says it
            without excess.
          </p>

          <p className="text-lg text-[#a0a0a0] leading-relaxed mb-6">This site exists to:</p>

          <ul className="space-y-4 mb-10">
            {[
              'Celebrate standalone cinema in an age of franchises',
              'Highlight films with closed, satisfying endings',
              'Champion the art of cinematic constraint',
              'Provide a curated space for viewers seeking complete experiences',
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-[#a0a0a0]">
                <span className="w-2 h-2 bg-[#e50914] rounded-full mt-2 shrink-0" />
                <span className="text-lg">{item}</span>
              </li>
            ))}
          </ul>

          <p className="text-lg text-[#a0a0a0] leading-relaxed mb-10">
            Every film featured here passes the Perec Test — not as a judgment of quality,
            but as an affirmation of a particular kind of storytelling: one that values
            completion over continuation.
          </p>

          <p className="text-lg text-[#a0a0a0] leading-relaxed">
            The Perec Test exists to affirm storytelling and the effect of constraint on
            creativity. It asserts that meaning in cinema can arise not from accumulation,
            but from knowing when to stop.
          </p>
        </div>

        <div className="mt-12">
          <Link
            href="/"
            className="inline-flex items-center gap-3 bg-[#e50914] hover:bg-[#f40612] px-8 py-4 rounded-full font-semibold transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
            Browse Films
          </Link>
        </div>
      </div>
    </main>
  );
}
