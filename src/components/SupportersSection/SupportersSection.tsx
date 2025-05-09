const SupportersSection = () => {
    const sponsors = [
      { logo: "/images/sponsors/SlowCombo_white.png", website: "https://www.instagram.com/slowcombo/?hl=en" },
      { logo: "/images/sponsors/Binance_white.png", website: "https://www.binance.th/en" },
      { logo: "/images/sponsors/CUNEX_white.png", website: "https://www.instagram.com/cunex.review/" },
      { logo: "/images/sponsors/MajorCineplex_white.png", website: "https://www.instagram.com/majorgroup/" },
    ];
  
    return (
      <div className="p-4 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Our Supporters</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {sponsors.map((sponsor, index) => (
            <a
              key={index}
              href={sponsor.website}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-[#2E1F53] rounded-full flex items-center justify-center overflow-hidden transition-transform transform hover:scale-110"
            >
              <img src={sponsor.logo} alt="Sponsor" className="w-full h-full object-cover" />
            </a>
          ))}
        </div>
      </div>
    );
  };
  
  export default SupportersSection;
  