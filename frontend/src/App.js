import React, { useState, useEffect } from 'react';
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Container,
  Typography,
  Paper,
  TextField,
  Button,
  Box,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  LinearProgress,
  Alert,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Card,
  CardContent,
  Grid,
  Switch,
  FormControlLabel,
  Slider,
  IconButton,
  Tooltip
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  Psychology as PsychologyIcon,
  SmartToy as SmartToyIcon,
  Science as ScienceIcon,
  Settings as SettingsIcon,
  Send as SendIcon,
  Refresh as RefreshIcon
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import axios from 'axios';

// Modern dark theme
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#6366f1',
      light: '#818cf8',
      dark: '#4338ca',
    },
    secondary: {
      main: '#ec4899',
      light: '#f472b6',
      dark: '#be185d',
    },
    background: {
      default: '#0f0f23',
      paper: '#1a1a2e',
    },
    text: {
      primary: '#f8fafc',
      secondary: '#cbd5e1',
    },
  },
  typography: {
    fontFamily: 'Inter, system-ui, sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
    },
    h2: {
      fontWeight: 600,
      fontSize: '2rem',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
  },
});

const modelIcons = {
  'gpt-4': <PsychologyIcon />,
  'gpt-3.5-turbo': <PsychologyIcon />,
  'gemini-pro': <ScienceIcon />,
  'claude-3': <SmartToyIcon />,
  'ollama': <SmartToyIcon />,
};

function App() {
  const [question, setQuestion] = useState('');
  const [selectedModels, setSelectedModels] = useState(['gpt-4', 'gemini-pro', 'claude-3']);
  const [availableModels, setAvailableModels] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [maxRounds, setMaxRounds] = useState(3);
  const [consensusThreshold, setConsensusThreshold] = useState(0.8);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    fetchAvailableModels();
  }, []);

  const fetchAvailableModels = async () => {
    try {
      const response = await axios.get('/models');
      setAvailableModels(response.data.available_models);
    } catch (error) {
      console.error('Model listesi alınamadı:', error);
      setError('Model listesi alınamadı. Lütfen backend bağlantısını kontrol edin.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question.trim()) {
      setError('Lütfen bir soru girin.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await axios.post('/consult', {
        question: question.trim(),
        models: selectedModels,
        max_rounds: maxRounds,
        consensus_threshold: consensusThreshold,
      });

      setResult(response.data);
    } catch (error) {
      console.error('Konsültasyon hatası:', error);
      setError(error.response?.data?.detail || 'Konsültasyon sırasında bir hata oluştu.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleModelToggle = (modelId) => {
    setSelectedModels(prev => 
      prev.includes(modelId) 
        ? prev.filter(id => id !== modelId)
        : [...prev, modelId]
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography variant="h1" gutterBottom sx={{ 
              background: 'linear-gradient(45deg, #6366f1, #ec4899)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              🤖 AI Konsültasyon Sistemi
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
              Farklı yapay zeka modellerini aynı soru üzerinde tartışmaya sokarak en doğru cevabı bulun
            </Typography>
          </Box>

          {/* Main Form */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Sorunuzu buraya yazın..."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                sx={{ mb: 3 }}
                placeholder="Örnek: Python'da en iyi web framework'ü hangisidir ve neden?"
              />

              {/* Model Selection */}
              <Typography variant="h6" gutterBottom>
                Konsültasyon Yapacak AI Modelleri
              </Typography>
              <Box sx={{ mb: 3 }}>
                <Grid container spacing={1}>
                  {availableModels.map((model) => (
                    <Grid item key={model.id}>
                      <Chip
                        icon={modelIcons[model.id]}
                        label={model.name}
                        variant={selectedModels.includes(model.id) ? "filled" : "outlined"}
                        color={selectedModels.includes(model.id) ? "primary" : "default"}
                        onClick={() => handleModelToggle(model.id)}
                        sx={{ m: 0.5 }}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Box>

              {/* Settings */}
              <Box sx={{ mb: 3 }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={showSettings}
                      onChange={(e) => setShowSettings(e.target.checked)}
                    />
                  }
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <SettingsIcon fontSize="small" />
                      Gelişmiş Ayarlar
                    </Box>
                  }
                />

                <AnimatePresence>
                  {showSettings && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Box sx={{ mt: 2, p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
                        <Grid container spacing={3}>
                          <Grid item xs={12} sm={6}>
                            <Typography gutterBottom>
                              Maksimum Tartışma Turu: {maxRounds}
                            </Typography>
                            <Slider
                              value={maxRounds}
                              onChange={(e, newValue) => setMaxRounds(newValue)}
                              min={1}
                              max={5}
                              marks
                              valueLabelDisplay="auto"
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <Typography gutterBottom>
                              Konsensüs Eşiği: {Math.round(consensusThreshold * 100)}%
                            </Typography>
                            <Slider
                              value={consensusThreshold}
                              onChange={(e, newValue) => setConsensusThreshold(newValue)}
                              min={0.5}
                              max={1.0}
                              step={0.1}
                              valueLabelDisplay="auto"
                              valueLabelFormat={(value) => `${Math.round(value * 100)}%`}
                            />
                          </Grid>
                        </Grid>
                      </Box>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Box>

              {/* Submit Button */}
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={isLoading || selectedModels.length === 0}
                  startIcon={<SendIcon />}
                  sx={{ flexGrow: 1 }}
                >
                  {isLoading ? 'Konsültasyon Devam Ediyor...' : 'Konsültasyonu Başlat'}
                </Button>
                <Tooltip title="Modelleri Yenile">
                  <IconButton onClick={fetchAvailableModels} color="primary">
                    <RefreshIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            </form>

            {isLoading && (
              <Box sx={{ mt: 2 }}>
                <LinearProgress />
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1, textAlign: 'center' }}>
                  AI modelleri tartışıyor...
                </Typography>
              </Box>
            )}
          </Paper>

          {/* Error Display */}
          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            </motion.div>
          )}

          {/* Results */}
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Paper sx={{ p: 3 }}>
                <Typography variant="h4" gutterBottom sx={{ color: 'primary.main' }}>
                  📋 Konsültasyon Sonucu
                </Typography>

                {/* Summary */}
                <Card sx={{ mb: 3, bgcolor: result.consensus_reached ? 'success.dark' : 'warning.dark', color: 'white' }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {result.consensus_reached ? '✅ Konsensüs Sağlandı' : '⚠️ Kısmi Konsensüs'}
                    </Typography>
                    <Typography variant="body1">
                      Güven Skoru: {Math.round(result.confidence_score * 100)}%
                    </Typography>
                    <Typography variant="body2">
                      Katılan Modeller: {result.participating_models.join(', ')}
                    </Typography>
                  </CardContent>
                </Card>

                {/* Final Answer */}
                <Paper sx={{ p: 3, mb: 3, bgcolor: 'primary.dark' }}>
                  <Typography variant="h6" gutterBottom sx={{ color: 'primary.light' }}>
                    🎯 En İyi Cevap
                  </Typography>
                  <Box sx={{ 
                    bgcolor: 'background.paper', 
                    p: 2, 
                    borderRadius: 1,
                    border: '1px solid rgba(255,255,255,0.1)'
                  }}>
                    <ReactMarkdown>{result.final_answer}</ReactMarkdown>
                  </Box>
                </Paper>

                {/* Discussion Rounds */}
                <Typography variant="h6" gutterBottom>
                  💬 Tartışma Sürecı
                </Typography>
                {result.discussion_rounds.map((round, index) => (
                  <Accordion key={index} sx={{ mb: 1 }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography variant="h6">
                        Round {round.round} - {Object.keys(round.responses).length} Model Katıldı
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Grid container spacing={2}>
                        {Object.entries(round.responses).map(([model, response]) => (
                          <Grid item xs={12} md={6} key={model}>
                            <Paper sx={{ p: 2, height: '100%' }}>
                              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                {modelIcons[model]}
                                <Typography variant="subtitle1" sx={{ ml: 1, fontWeight: 600 }}>
                                  {availableModels.find(m => m.id === model)?.name || model}
                                </Typography>
                              </Box>
                              <Typography variant="body2" sx={{ 
                                maxHeight: 200, 
                                overflow: 'auto',
                                bgcolor: 'background.default',
                                p: 1,
                                borderRadius: 1
                              }}>
                                <ReactMarkdown>{response}</ReactMarkdown>
                              </Typography>
                            </Paper>
                          </Grid>
                        ))}
                      </Grid>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </Paper>
            </motion.div>
          )}
        </motion.div>
      </Container>
    </ThemeProvider>
  );
}

export default App;