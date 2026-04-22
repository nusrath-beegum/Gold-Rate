// ─────────────────────────────────────────────
//  AlFazalSetup.jsx  —  ADMIN / SETUP PANEL
//  Used by the shop owner to update rates & images
// ─────────────────────────────────────────────
import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Divider,
  InputAdornment,
  Snackbar,
  Alert,
  CircularProgress,
  Tabs,
  Tab,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import SaveIcon from "@mui/icons-material/Save";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import DiamondIcon from "@mui/icons-material/Diamond";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

// ── STORAGE KEY (must match LiveDisplay.jsx) ──
const STORAGE_KEY = "alfazal_gold_data";

// ── Load saved data from localStorage ──
const loadSaved = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (_) {}
  return null;
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
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 2,
          textTransform: "none",
          fontFamily: '"Cinzel", serif',
          letterSpacing: "0.08em",
          fontSize: "0.75rem",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            "& fieldset": { borderColor: "#4A3F2A" },
            "&:hover fieldset": { borderColor: "#C9A84C" },
            "&.Mui-focused fieldset": { borderColor: "#C9A84C" },
          },
          "& .MuiInputLabel-root": { color: "#8A7A5A" },
          "& .MuiInputLabel-root.Mui-focused": { color: "#C9A84C" },
          "& .MuiInputBase-input": { color: "#E8D5A3" },
        },
      },
    },
    MuiDivider: { styleOverrides: { root: { borderColor: "#2A2418" } } },
  },
});

// ─── Preview Rate Card ───

export default function AlFazalSetup() {
  const saved = loadSaved();

  const [tab, setTab] = useState(0);
  const [gram22k, setGram22k] = useState(saved?.rate22k ?? 6845);
  const [bgPreview, setBgPreview] = useState(saved?.bgImage ?? null);
  const [bgBase64, setBgBase64] = useState(saved?.bgImage ?? null);
  const [jewelPreview, setJewelPreview] = useState(saved?.jewelImage ?? null);
  const [jewelBase64, setJewelBase64] = useState(saved?.jewelImage ?? null);
  const [saving, setSaving] = useState(false);
  const [snack, setSnack] = useState(false);

  const pavan = gram22k * 8;

  // ── Convert file to base64 for localStorage persistence ──
  const fileToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const handleBgUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const b64 = await fileToBase64(file);
    setBgPreview(URL.createObjectURL(file));
    setBgBase64(b64);
  };

  const handleJewelUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const b64 = await fileToBase64(file);
    setJewelPreview(URL.createObjectURL(file));
    setJewelBase64(b64);
  };

  const handleSave = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 700));

    const payload = {
      rate22k: gram22k,
      pavan,
      bgImage: bgBase64,
      jewelImage: jewelBase64,
      updatedAt: new Date().toISOString(),
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    setSaving(false);
    setSnack(true);
  };

  return (
    <ThemeProvider theme={goldTheme}>
      <link
        href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Cormorant+Garamond:wght@400;500&display=swap"
        rel="stylesheet"
      />

      <Box
        sx={{
          minHeight: "100vh",
          background:
            "radial-gradient(ellipse at 50% 0%, #1A1608 0%, #0D0D0B 60%)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* ── Header ── */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: { xs: 2, sm: 4 },
            py: 1.5,
            borderBottom: "1px solid #1A1608",
            background: "rgba(13,13,11,0.95)",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
            <DiamondIcon sx={{ color: "#C9A84C", fontSize: 20 }} />
            <Typography
              sx={{
                fontFamily: '"Cinzel", serif',
                fontSize: "0.8rem",
                letterSpacing: "0.15em",
                color: "#C9A84C",
                fontWeight: 600,
              }}
            >
              AL FAZAL · SETUP PANEL
            </Typography>
          </Box>
          <Typography
            sx={{
              color: "#3A3020",
              fontSize: "0.62rem",
              fontFamily: '"Cinzel", serif',
              letterSpacing: "0.1em",
            }}
          >
            ADMIN
          </Typography>
        </Box>

        {/* ── Body ── */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 0,
            maxWidth: 960,
            mx: "auto",
            width: "100%",
            p: { xs: 2, sm: 3 },
          }}
        >
          {/* ── Left: Form ── */}
          <Box sx={{ flex: 1, pr: { md: 4 }, mb: { xs: 4, md: 0 } }}>
            <Typography
              sx={{
                fontFamily: '"Cinzel", serif',
                letterSpacing: "0.18em",
                color: "#C9A84C",
                fontSize: "0.7rem",
                mb: 3,
              }}
            >
              CONFIGURE DISPLAY
            </Typography>
            <Tabs
              value={tab}
              onChange={(_, v) => setTab(v)}
              variant="fullWidth"
              sx={{
                mb: 3,
                "& .MuiTab-root": {
                  fontFamily: '"Cinzel", serif',
                  fontSize: "0.62rem",
                  letterSpacing: "0.08em",
                  color: "#8A7A5A",
                },
                "& .Mui-selected": { color: "#C9A84C !important" },
                "& .MuiTabs-indicator": { backgroundColor: "#C9A84C" },
              }}
            >
              <Tab label="Rates" />
              <Tab label="Background" />
              <Tab label="Photo" />
            </Tabs>
            {/* ── Rates Tab ── */}
            {tab === 0 && (
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
                <TextField
                  label="1 Gram 22K Gold (₹)"
                  type="number"
                  value={gram22k}
                  onChange={(e) => setGram22k(parseFloat(e.target.value) || 0)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CurrencyRupeeIcon
                          sx={{ fontSize: 16, color: "#8A7A5A" }}
                        />
                      </InputAdornment>
                    ),
                  }}
                  size="small"
                  fullWidth
                />

                <Box
                  sx={{
                    p: 1.5,
                    border: "1px solid #2A2418",
                    borderRadius: 1,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    sx={{
                      color: "#8A7A5A",
                      fontSize: "0.72rem",
                      fontFamily: '"Cinzel", serif',
                    }}
                  >
                    8 Gram Pavan (auto)
                  </Typography>
                  <Typography
                    sx={{
                      color: "#C9A84C",
                      fontSize: "0.95rem",
                      fontFamily: '"Cinzel", serif',
                      fontWeight: 600,
                    }}
                  >
                    ₹{pavan.toLocaleString("en-IN")}
                  </Typography>
                </Box>

                
              </Box>
            )}
            {/* ── Background Tab ── */}
            {tab === 1 && (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <Box
                  component="label"
                  sx={{
                    width: "100%",
                    height: 200,
                    border: "2px dashed #2A2418",
                    borderRadius: 2,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    overflow: "hidden",
                    transition: "border-color 0.2s",
                    "&:hover": { borderColor: "#C9A84C" },
                  }}
                >
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={handleBgUpload}
                  />
                  {bgPreview ? (
                    <img
                      src={bgPreview}
                      alt="bg"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <>
                      <UploadFileIcon
                        sx={{ fontSize: 36, color: "#4A3F2A", mb: 1 }}
                      />
                      <Typography
                        sx={{
                          color: "#8A7A5A",
                          fontSize: "0.72rem",
                          fontFamily: '"Cinzel", serif',
                          letterSpacing: "0.1em",
                        }}
                      >
                        CLICK TO UPLOAD BACKGROUND
                      </Typography>
                      <Typography
                        sx={{ color: "#4A3F2A", fontSize: "0.66rem", mt: 0.5 }}
                      >
                        PNG, JPG, WEBP
                      </Typography>
                    </>
                  )}
                </Box>
                {bgPreview && (
                  <Typography sx={{ color: "#4CAF50", fontSize: "0.7rem" }}>
                    Background ready — save to apply
                  </Typography>
                )}
              </Box>
            )}
            {/* ── Photo Tab ── */}
            {tab === 2 && (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <Box
                  component="label"
                  sx={{
                    width: 220,
                    height: 220,
                    border: "2px dashed #2A2418",
                    borderRadius: 2,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    overflow: "hidden",
                    transition: "border-color 0.2s",
                    "&:hover": { borderColor: "#C9A84C" },
                  }}
                >
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={handleJewelUpload}
                  />
                  {jewelPreview ? (
                    <img
                      src={jewelPreview}
                      alt="jewelry"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <>
                      <AddPhotoAlternateIcon
                        sx={{ fontSize: 36, color: "#4A3F2A", mb: 1 }}
                      />
                      <Typography
                        sx={{
                          color: "#8A7A5A",
                          fontSize: "0.72rem",
                          fontFamily: '"Cinzel", serif',
                          letterSpacing: "0.1em",
                        }}
                      >
                        UPLOAD JEWELRY PHOTO
                      </Typography>
                    </>
                  )}
                </Box>
                {jewelPreview && (
                  <Typography sx={{ color: "#4CAF50", fontSize: "0.7rem" }}>
                    Photo ready — save to apply
                  </Typography>
                )}
              </Box>
            )}
            {/* ── Save Button ── */}
            <Box sx={{ mt: 4 }}>
              <Button
                onClick={handleSave}
                variant="contained"
                fullWidth
                disabled={saving}
                startIcon={
                  saving ? (
                    <CircularProgress size={13} color="inherit" />
                  ) : (
                    <SaveIcon sx={{ fontSize: 15 }} />
                  )
                }
                sx={{
                  background: "linear-gradient(135deg, #C9A84C, #8A6A2A)",
                  color: "#0D0D0B",
                  fontWeight: 700,
                  py: 1.2,
                  "&:hover": {
                    background: "linear-gradient(135deg, #E8C97A, #C9A84C)",
                  },
                }}
              >
                {saving ? "Saving..." : "Save & Publish to Live Display"}
              </Button>
              <Typography
                sx={{
                  color: "#3A3020",
                  fontSize: "0.62rem",
                  textAlign: "center",
                  mt: 1,
                  fontFamily: '"Cinzel", serif',
                }}
              >
                Changes are saved to browser storage and shown on the Live
                Display
              </Typography>
            </Box>{" "}
            {/* END Left Form */}
          </Box>{" "}
          {/* END Body */}
        </Box>
      </Box>
      {/* ✅ ADD THIS (Main Container close) */}

      <Snackbar
        open={snack}
        autoHideDuration={3500}
        onClose={() => setSnack(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity="success"
          sx={{ fontFamily: '"Cinzel", serif', fontSize: "0.75rem" }}
        >
          ✓ Rates published! Live display is now updated.
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
}
