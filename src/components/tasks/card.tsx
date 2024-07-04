import { useEffect } from "react";
import { useTheme } from "../../context/themeContext";
import Card from "../ui/card";

const CardComponent = () => {
  const { themes, themeIndex, setTheme } = useTheme();

  useEffect(() => {
    const selectedTheme = themes[themeIndex];
    document.documentElement.style.setProperty(
      "--primary-color",
      selectedTheme.primary
    );
    document.documentElement.style.setProperty(
      "--secondary-color",
      selectedTheme.secondary
    );
  }, [themeIndex, themes]);

  const Data = [
    {
      title: "Glorious Sunrise",
      imageUrl: "https://static.toiimg.com/img/66084423/Master.jpg",
      description: "A beautiful sunrise seen from the mountains.",
    },
    {
      title: "Beautiful Sunset",
      imageUrl:
        "https://cdn.pixabay.com/photo/2013/07/18/20/26/sea-164989_1280.jpg",
      description: "A stunning sunset captured at the beach.",
    },
  ];

  return (
    <>
      <div className="cards">
        {Data.map((cardData: any, index: number) => (
          <Card
            title={cardData.title}
            imageUrl={cardData.imageUrl}
            description={cardData.description}
          />
        ))}
      </div>
      {/* <div className="themeSwitcher">
        {themes.map((theme, index) => (
          <button
            className="button"
            style={{ backgroundColor: theme.secondary, color: theme.textColor }}
            key={index}
            onClick={() => setTheme(index)}
          >
            {theme.name}
          </button>
        ))}
      </div> */}
    </>
  );
};
export default CardComponent;
