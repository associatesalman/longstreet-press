export default function OurStory() {
  return (
    <section
      aria-labelledby="our-story-heading"
      className="bg-white max-w-7xl mx-auto px-6 py-7 md:py-11 font-serif"
    >
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,55fr)_minmax(0,45fr)] gap-6 lg:gap-9 lg:items-stretch">
        <div className="min-w-0 text-left">
          <h2
            id="our-story-heading"
            className="text-[32px] sm:text-4xl lg:text-5xl font-bold leading-[1.1] tracking-tight text-[#1f1f1f]"
          >
            Our Story
          </h2>
          <p className="mt-2 text-[17px] font-semibold leading-snug text-[#8c2d19]">
            Full-Service Book Publishing, Editorial, and Print Production
          </p>

          <div className="mt-4 space-y-4 text-[16px] leading-[1.7] text-[#404040]">
            <p>
              Founded in 1988 in Atlanta, Georgia, our company was built on a passion for creativity, innovation, and
              helping businesses bring their ideas to life. What began as a vision to deliver quality services and
              meaningful solutions has grown into a commitment to excellence, reliability, and long-term client
              relationships.
            </p>
            <p>
              Over the years, we have continued to evolve alongside changing industries and customer needs, combining
              experience, creativity, and professional expertise to deliver solutions that make a difference. Our
              approach has always been centered on understanding our clients, maintaining high standards, and
              delivering results they can trust.
            </p>
            <p>
              Today, we remain dedicated to the values on which we were founded: integrity, quality, innovation, and
              customer satisfaction. Our journey continues as we work with individuals and businesses to turn their
              visions into reality.
            </p>
          </div>
        </div>

        <div className="relative min-w-0 aspect-[4/3] sm:aspect-[16/9] lg:aspect-auto overflow-hidden">
          <img
            src="/our-story/image.png"
            alt="Longstreet Press lettering on the concrete facade of the company's building"
            loading="lazy"
            decoding="async"
            width="1254"
            height="1254"
            className="absolute inset-0 h-full w-full object-cover object-[50%_70%]"
          />
        </div>
      </div>
    </section>
  );
}
