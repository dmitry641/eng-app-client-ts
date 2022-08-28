import { Casino, Search } from "@mui/icons-material";
import { Box, IconButton, Skeleton, Stack, TextField } from "@mui/material";
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
  const loading = isLoading || isFetching || !images?.length;

  useEffect(() => {
    setQuery(topicName);
  }, [topicName]);

  return (
    <>
      <SearchComponent loading={loading} setQuery={setQuery} />

      <Box height="55vh">
        {loading ? (
          <Skeleton variant="rectangular" height="100%" />
        ) : (
          <Carousel
            dynamicHeight={true}
            infiniteLoop
            emulateTouch
            showStatus={false}
            showIndicators={false}
            showThumbs={false}
            showArrows={false}
          >
            {images.map((i) => (
              <img
                key={i.id}
                style={{ height: "55vh", width: "auto" }}
                src={i.original}
                alt={i.description}
              />
            ))}
          </Carousel>
        )}
      </Box>
    </>
  );
};

interface SearchProps {
  loading: boolean;
  setQuery: (str: string) => void;
}
const SearchComponent: React.FC<SearchProps> = ({ loading, setQuery }) => {
  const [showSearch, setShowSearch] = useState(false);
  const [value, setValue] = useState("");

  const randomHandler = () => {
    setShowSearch(false);
    setValue("");
    setQuery("");
  };
  const searchHandler = () => {
    setValue("");
    setShowSearch(true);
  };
  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setQuery(value);
    setShowSearch(false);
  };

  return (
    <Stack
      direction="row"
      spacing={1}
      justifyContent="space-between"
      alignItems="center"
    >
      {!showSearch ? (
        <IconButton
          disabled={loading}
          aria-label="search"
          onClick={searchHandler}
        >
          <Search />
        </IconButton>
      ) : (
        <Box flexGrow={1} component="form" onSubmit={submitHandler}>
          <TextField
            size="small"
            variant="outlined"
            fullWidth
            placeholder="Search..."
            type="search"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </Box>
      )}
      <IconButton
        disabled={loading}
        aria-label="random"
        onClick={randomHandler}
      >
        <Casino />
      </IconButton>
    </Stack>
  );
};
