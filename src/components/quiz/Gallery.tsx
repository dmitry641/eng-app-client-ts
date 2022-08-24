import React, { FormEvent, useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { quizAPI } from "../../service/quizApi";

interface GalleryProps {
  topicName: string;
}
export const Gallery: React.FC<GalleryProps> = ({ topicName }) => {
  const [query, setQuery] = useState(topicName);
  const {
    data: images,
    isLoading,
    isFetching,
  } = quizAPI.useGetImagesQuery(query);
  const loading = isLoading || isFetching;

  useEffect(() => {
    setQuery(topicName);
  }, [topicName]);

  if (loading || !images?.length) return <div>skeleton</div>;
  return (
    <>
      <hr />
      <SearchComponent setQuery={setQuery} />

      <Carousel
        infiniteLoop
        emulateTouch
        showStatus={false}
        showIndicators={false}
      >
        {images.map((i) => (
          <div key={i.id}>
            <img src={i.original} alt={i.description} />
          </div>
        ))}
      </Carousel>

      <hr />
    </>
  );
};

interface SearchProps {
  setQuery: (str: string) => void;
}
const SearchComponent: React.FC<SearchProps> = ({ setQuery }) => {
  const [showSearch, setShowSearch] = useState(false);
  const [value, setValue] = useState("");

  const randomHandler = () => setQuery("");
  const searchHandler = () => setShowSearch(true);
  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setQuery(value);
  };

  return (
    <>
      {!showSearch ? (
        <button onClick={searchHandler}>search</button>
      ) : (
        <form onSubmit={submitHandler}>
          <input
            type="text"
            placeholder="Search..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </form>
      )}
      <button onClick={randomHandler}>random</button>
    </>
  );
};
