// ─────────────────────────────────────────────
//  AlFazalLive.jsx  —  LIVE / CUSTOMER DISPLAY
//  Reads rates from localStorage, set by Setup Panel
// ─────────────────────────────────────────────
import { useState, useEffect } from "react";
import { Box, Typography, Divider } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import PhoneIcon from "@mui/icons-material/Phone";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import DiamondIcon from "@mui/icons-material/Diamond";
import logo from "./assets/logo.png";

// ── STORAGE KEY (must match AlFazalSetup.jsx) ──
const STORAGE_KEY = "alfazal_gold_data";

// ── Default rates (shown if nothing saved yet) ──
const DEFAULTS = {
  rate22k: 6845,
  pavan: 54760,
  change22k: 15,
  changePavan: 100,
  bgImage: null,
  jewelImage: null,
};

// ── Load data from localStorage ──
const loadData = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return { ...DEFAULTS, ...JSON.parse(raw) };
  } catch (_) {}
  return DEFAULTS;
};

const goldTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#C9A84C" },
    secondary: { main: "#E8C97A" },
    background: { default: "#0D0D0B", paper: "#161610" },
    success: { main: "#4CAF50" },
    text: { primary: "#E8D5A3", secondary: "#8A7A5A" },
  },
  typography: {
    fontFamily: '"Cormorant Garamond", "Georgia", serif',
    button: { fontFamily: '"Cinzel", serif', letterSpacing: "0.1em" },
  },
  components: {
    MuiDivider: { styleOverrides: { root: { borderColor: "#2A2418" } } },
  },
});

// ─── Jewelry Image ───
const JewelryImage = ({ src }) => (
  <Box
    sx={{
      width: { xs: 150, sm: 180 },
      height: { xs: 150, sm: 180 },
      borderRadius: 2,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
      background: "transparent",
      boxShadow: "none",
    }}
  >
    {src ? (
      <img
        src={src}
        alt="Jewelry"
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    ) : (
      <DiamondIcon sx={{ fontSize: 64, color: "#3A3020", opacity: 0.6 }} />
    )}
  </Box>
);

// ─── Rate Card ───
const RateCard = ({ label, price, change, sx }) => (
  <Box sx={{ textAlign: "center", minWidth: { xs: 110, sm: 140 }, ...sx }}>
    <Typography
      sx={{
        display: "block",
        color: "#8A7A5A",
        letterSpacing: "0.15em",
        fontSize: { xs: "0.58rem", sm: "0.65rem" },
        mb: 1,
        fontFamily: '"Cinzel", serif',
      }}
    >
      {label}
    </Typography>
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        gap: 0.3,
      }}
    >
      <Typography
        sx={{
          color: "#C9A84C",
          fontSize: { xs: "1.8rem", sm: "2.4rem" },
          fontWeight: 700,
          lineHeight: 1,
          fontFamily: '"Cinzel", serif',
          letterSpacing: "-0.02em",
        }}
      >
        {price.toLocaleString("en-IN")}
      </Typography>
    </Box>
  </Box>
);

// ─── Main Live Display ───
export default function AlFazalLive() {
  const [data, setData] = useState(DEFAULTS);

  // ── Poll localStorage every 30 seconds for updates ──
  useEffect(() => {
    setData(loadData());

    const interval = setInterval(() => {
      setData(loadData());
    }, 30_000);

    // ── Also listen for storage events (cross-tab updates) ──
    const onStorage = (e) => {
      if (e.key === STORAGE_KEY) setData(loadData());
    };
    window.addEventListener("storage", onStorage);

    return () => {
      clearInterval(interval);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  const dateStr = new Date()
    .toLocaleDateString("en-IN", {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric",
    })
    .toUpperCase();

  const hasLogo = true; // Set to false to show diamond icon instead

  return (
    <ThemeProvider theme={goldTheme}>
      <link
        href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Cormorant+Garamond:wght@400;500&display=swap"
        rel="stylesheet"
      />

      <Box
        sx={{
          minHeight: "100vh",
          background: data.bgImage
            ? `linear-gradient(rgba(0,0,0,0.75), rgba(0,0,0,0.88)), url(${data.bgImage}) center/cover no-repeat`
            : "radial-gradient(ellipse at 50% 0%, #1A1608 0%, #0D0D0B 60%)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center", // ✅ center content
            py: { xs: 0.5, sm: 1.5 }, // ✅ reduce spacing       // ✅ smaller top space
            px: 1.5, // ✅ compact
            textShadow: "0 0 10px rgba(201,168,76,0.5)",
          }}
        >
          <Box
            sx={{
              height: 110,
              objectFit: "contain",
              filter: "drop-shadow(0 0 10px rgba(201,168,76,0.6))",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              py: { xs: 1, sm: 2 },
              mt: { xs: 1, sm: 3 },
            }}
          >
            {hasLogo ? (
              <img
                src={logo}
                alt="Al Fazal"
                style={{
                  height: 110,
                  objectFit: "contain",
                }}
              />
            ) : (
              <DiamondIcon sx={{ color: "#C9A84C", fontSize: 40 }} />
            )}
          </Box>
        </Box>

        {/* ── Hero ── */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            px: 2,
            minHeight: 0,
          }}
        >
          <Typography
            sx={{
              fontFamily: '"Cinzel", serif',
              letterSpacing: "0.3em",
              color: "#C9A84C",
              fontSize: { xs: "1rem", sm: "1rem" },
              mb: 0.5,
            }}
          >
            TODAY'S GOLD RATE
          </Typography>

          <Typography
            sx={{
              color: "#8A7A5A",
              fontSize: { xs: "0.68rem", sm: "0.78rem" },
              letterSpacing: "0.08em",
              fontFamily: '"Cinzel", serif',
              mb: { xs: 2, sm: 3 },
              textAlign: "center",
            }}
          >
            {dateStr}
          </Typography>

          {/* Rate cards + jewelry image */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: { xs: 2, sm: 5, md: 8 },
              mb: 3,
            }}
          >
            <RateCard
              label="1 GRAM 22K"
              price={data.rate22k}
              change={data.change22k}
              sx={{ order: { xs: 1, md: 1 } }}
            />

            <Box
              sx={{
                order: { xs: 2, md: 2 },
                p: { xs: 1.5, sm: 2 },
                borderRadius: 2,
              }}
            >
              <JewelryImage src={data.jewelImage} />
            </Box>

            <RateCard
              label="8 GRAM (PAVAN)"
              price={data.pavan}
              change={data.changePavan}
              sx={{ order: { xs: 3, md: 3 } }}
            />
          </Box>
        </Box>

        {/* ── Footer ── */}
        <Box
          sx={{
            borderTop: "1px solid #1A1608",
            py: { xs: 1, sm: 2 },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 1,
            px: 2,
            mb: { xs: 5, sm: 5 },
          }}
        >
          {/* Phone numbers */}
          <Box
            sx={{
              display: "flex",
              gap: { xs: 1.5, sm: 3 },
              flexWrap: "wrap",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.7 }}>
              <PhoneIcon sx={{ fontSize: 13, color: "#C9A84C" }} />
              <Typography
                sx={{
                  color: "#c0a616",
                  fontSize: "0.9rem",
                  letterSpacing: "0.06em",
                }}
              >
                +91 98959 32355
              </Typography>
            </Box>
            <Divider
              orientation="vertical"
              flexItem
              sx={{ borderColor: "#2A2418", mx: 0.5 }}
            />
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.7 }}>
              <PhoneIcon sx={{ fontSize: 13, color: "#C9A84C" }} />
              <Typography
                sx={{
                  color: "#c0a616",
                  fontSize: "0.9rem",
                  letterSpacing: "0.06em",
                }}
              >
                +91 79078 02431
              </Typography>
            </Box>
          </Box>

          <Typography
            sx={{
              fontFamily: '"Cinzel", serif',
              color: "#C9A84C",
              fontSize: { xs: "0.68rem", sm: "0.75rem" },
              letterSpacing: "0.20em",
              mt: { xs: 1, sm: 1 },
            }}
          >
            AL FAZAL GOLD SOUK <br />
            Badiadka Road,
            <br /> Kumbla.
          </Typography>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
