import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

const heroImages = [
  "/images/img2.png",
  "/images/img3.png",
  "/images/img4.png",
  "/images/img1.png",
];

export default function HomePage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const slideRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <Box maxWidth="xl" mx="auto" px={4} position="relative">
      <Box
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        position="relative"
        height="70vh"
        overflow="hidden"
        borderRadius="16px"
        sx={{ boxShadow: 4 }}
      >
        <Box
          ref={slideRef}
          display="flex"
          width={`${heroImages.length * 100}%`}
          height="100%"
          sx={{
            transition: "transform 1s ease-in-out",
            transform: `translateX(-${currentIndex * (100 / heroImages.length)}%)`,
          }}
        >
          {heroImages.map((src, i) => (
            <Box
              key={i}
              component="img"
              src={src}
              alt={`Hero ${i}`}
              sx={{
                zIndex: 0,
                width: `${100 / heroImages.length}%`,
                height: "100%",
                objectFit: "cover",
                transition: "transform 0.5s ease, filter 0.5s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                  filter: "brightness(0.9) blur(1px)",
                },
              }}
            />
          ))}
        </Box>
        <Box
          position="absolute"
          top={0}
          left={0}
          width="100%"
          height="100%"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          zIndex={1}
          sx={{ pointerEvents: 'none' }}
        >
          <Box p={8} textAlign="center" sx={{ pointerEvents: 'auto' }}>
            <Typography
              variant="h1"
              color="white"
              fontWeight="bold"
              sx={{ textShadow: "0 0 20px rgba(0,0,0,0.6)", mb: 4 }}
            >
              Dobrodošli na KantaShop!
            </Typography>
            <Button
              variant="contained"
              size="large"
              component={Link}
              to="/catalog"
              sx={{
                backgroundImage: "linear-gradient(to right,rgb(23, 90, 235),rgb(90, 42, 179))",
                fontWeight: "bold",
                color: "white",
                borderRadius: "16px",
                px: 8,
                py: 2,
                border: "2px solid transparent",
                boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
              }}
            >
              Idi u trgovinu
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
