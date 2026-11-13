import React from 'react';

export default function ShopConfidence() {

  // Three short points on how the site works.
  // Longstreet Press showcases books and links to Amazon; it does not sell, ship or refund orders itself.
  const features = [
    {
      id: 1,
      title: "A Curated Collection",
      description: "Browse titles organized into literary, historical, artistic and collectible categories, each with its cover, author and a direct link to its Amazon listing."
    },
    {
      id: 2,
      title: "Orders Handled by Amazon",
      description: "Every View Book link opens the title on Amazon. Pricing, availability, payment, shipping and returns are handled by Amazon under its own policies."
    },
    {
      id: 3,
      title: "Support for Authors",
      description: "Longstreet Press also offers publishing and book marketing services. Authors and presses can request a proposal through our Book Marketing inquiry form."
    }
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 py-12 font-serif">

      {/* Section Header */}
      <div className="max-w-2xl mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#1f1f1f]">
          How Longstreet Press Works
        </h2>
        <p className="text-[15px] text-[#595959] mt-3 leading-relaxed">
          Longstreet Press helps readers discover remarkable books and connects them directly to each title on Amazon.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((item) => (
          <div key={item.id} className="border-t border-[#e5e5e5] pt-5">
            <h3 className="font-bold text-[17px] text-[#1f1f1f] mb-2">
              {item.title}
            </h3>
            <p className="text-[14px] text-[#525252] leading-relaxed">
              {item.description}
            </p>
          </div>
        ))}
      </div>

    </section>
  );
}
