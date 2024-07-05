import { useEffect } from "react";
import { useTheme } from "../../context/themeContext";
import Card from "../ui/card";
import "./tasks.css";

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
    {
      title: "Majestic Mountains",
      imageUrl:
        "https://cdn.pixabay.com/photo/2015/06/19/21/24/avenue-815297_1280.jpg",
      description: "Snow-capped mountains under a clear blue sky.",
    },
    {
      title: "Ocean Waves",
      imageUrl:
        "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg",
      description: "Waves crashing on a rocky shore.",
    },
    {
      title: "Cityscape Twilight",
      imageUrl:
        "https://cdn.pixabay.com/photo/2020/09/14/10/45/spaceship-5570682_640.jpg",
      description: "Twilight view of a city skyline.",
    },
    {
      title: "Landscape with Clouds",
      imageUrl:
        "https://cdn.pixabay.com/photo/2024/04/04/14/56/sunrise-8675236_640.jpg",
      description: "A serene landscape with fluffy clouds in the sky.",
    },
    {
      title: "Mountain Stream",
      imageUrl:
        "https://cdn.pixabay.com/photo/2024/05/31/12/16/bridge-8800485_1280.jpg",
      description: "A crystal-clear stream flowing through a mountain valley.",
    },
    {
      title: "Sunset over the Bay",
      imageUrl:
        "https://cdn.pixabay.com/photo/2024/06/21/15/18/road-8844555_1280.jpg",
      description: "A breathtaking sunset viewed from a bay.",
    },
  ];

  return (
    <>
      <div className="cards">
        {Data.map((cardData: any, index: number) => (
          <Card
            key={index}
            title={cardData.title}
            imageUrl={cardData.imageUrl}
            description={cardData.description}
          />
        ))}
      </div>
    </>
  );
};
export default CardComponent;
