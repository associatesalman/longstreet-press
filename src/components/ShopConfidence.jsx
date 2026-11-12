import React from 'react';
import { BookOpen, ShieldCheck, Store, CheckCircle2 } from 'lucide-react';

export default function ShopConfidence() {
  
  // Data for the 3 confidence plaques.
  // Longstreet Press showcases books and links to Amazon; it does not sell, ship or refund orders itself.
  const features = [
    {
      id: 1,
      badge: "Curated Discovery",
      icon: <BookOpen className="w-6 h-6 text-[#241a15]" />,
      title: "A Thoughtfully Curated Collection",
      description: "Browse titles organized into literary, historical, artistic and collectible categories, each with its cover, author and a direct link to its Amazon listing."
    },
    {
      id: 2,
      badge: "Purchase With Clarity",
      icon: <ShieldCheck className="w-6 h-6 text-[#c29b38]" />,
      title: "Orders Handled by Amazon",
      description: "Every View Book link opens the title on Amazon. Pricing, availability, payment, shipping and returns are handled by Amazon under its own policies."
    },
    {
      id: 3,
      badge: "Authors & Publishers",
      icon: <Store className="w-6 h-6 text-[#241a15]" />,
      title: "Support for Authors",
      description: "Longstreet Press also offers publishing and book marketing services. Authors and presses can request a proposal through our Book Marketing inquiry form."
    }
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 py-12 font-serif">
      
      {/* Decorative Vintage Top Divider */}
      <div className="flex items-center justify-center gap-4 mb-8">
        <span className="h-[1px] w-full bg-[#d6c7b2]"></span>
        <span className="text-[#8c7355] text-xs">♦ ♦ ♦</span>
        <span className="h-[1px] w-full bg-[#d6c7b2]"></span>
      </div>

      {/* Section Header */}
      <div className="text-center max-w-xl mx-auto mb-10">
        <span className="text-[10px] tracking-[0.3em] uppercase font-sans font-bold text-[#8c7355] block">
          Patron Assurances
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold text-[#241a15] mt-1">
          The Collector's Pledge
        </h2>
        <p className="text-xs text-[#6e5d50] mt-2 font-serif italic">
          Longstreet Press helps readers discover remarkable books and connects them directly to each title on Amazon.
        </p>
      </div>

      {/* 3 Guild Plaques Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center items-stretch">
        {features.map((item) => (
          <div 
            key={item.id} 
            className={`p-7 flex flex-col justify-between items-center bg-[#fdfbf7] border-2 shadow-sm ${
              item.id === 2 
                ? 'border-[#c29b38] bg-[#fbf8f2] shadow-md relative' 
                : 'border-[#b8a68f]'
            }`}
          >
            
            {/* Top Sub-tag */}
            <div>
              <span className="text-[9px] tracking-[0.2em] uppercase font-sans font-bold text-[#8c2d19] block mb-4">
                {item.badge}
              </span>

              {/* Embossed Wax Seal Icon */}
              <div className="mb-4 w-14 h-14 rounded-full bg-[#efe8db] border-2 border-[#c29b38] flex items-center justify-center mx-auto shadow-inner">
                {item.icon}
              </div>

              {/* Feature Title */}
              <h3 className="font-bold text-base text-[#241a15] mb-2 font-serif">
                {item.title}
              </h3>

              {/* Feature Description */}
              <p className="text-xs text-[#5c4a3e] leading-relaxed font-serif">
                {item.description}
              </p>
            </div>

            {/* Bottom Seal Checkmark */}
            <div className="mt-6 pt-4 border-t border-[#e2d7c5] w-full flex items-center justify-center gap-1.5 text-[10px] text-[#7a6452] font-sans uppercase tracking-wider font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#8c2d19]" />
              <span>Longstreet Press</span>
            </div>

          </div>
        ))}
      </div>

      {/* Decorative Vintage Bottom Divider */}
      <div className="flex items-center justify-center gap-4 mt-12">
        <span className="h-[1px] w-full bg-[#d6c7b2]"></span>
        <span className="text-[#8c7355] text-xs">♦</span>
        <span className="h-[1px] w-full bg-[#d6c7b2]"></span>
      </div>

    </section>
  );
}