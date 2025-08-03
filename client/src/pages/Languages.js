import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Box,
  Chip,
  LinearProgress,
  Alert,
  Fade,
} from '@mui/material';
import {
  Language as LanguageIcon,
  Star as StarIcon,
  TrendingUp as TrendingUpIcon,
  NewReleases as NewIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import axios from 'axios';

const MotionCard = motion(Card);

function Languages() {
  const [languages, setLanguages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { setSelectedLanguage } = useLanguage();

  useEffect(() => {
    fetchLanguages();
  }, []);

  const fetchLanguages = async () => {
    try {
      const response = await axios.get('/api/languages');
      setLanguages(response.data);
    } catch (error) {
      setError('Diller yüklenirken hata oluştu');
      console.error('Error fetching languages:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
    navigate(`/avatars/${language.code}`);
  };

  const getDifficultyColor = (level) => {
    switch (level) {
      case 1: return 'success';
      case 2: return 'info';
      case 3: return 'warning';
      case 4: return 'error';
      case 5: return 'error';
      default: return 'default';
    }
  };

  const getDifficultyText = (level) => {
    switch (level) {
      case 1: return 'Çok Kolay';
      case 2: return 'Kolay';
      case 3: return 'Orta';
      case 4: return 'Zor';
      case 5: return 'Çok Zor';
      default: return 'Bilinmiyor';
    }
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Box sx={{ width: '100%' }}>
          <LinearProgress />
        </Box>
        <Typography variant="h6" sx={{ mt: 2, textAlign: 'center' }}>
          Diller yükleniyor...
        </Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Header */}
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Dil Seçin
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
          AI avatarlarla öğrenmek istediğiniz dili seçin
        </Typography>
        
        {/* Bulgarian highlight */}
        <Fade in timeout={1000}>
          <Alert 
            severity="info" 
            icon={<NewIcon />}
            sx={{ 
              mb: 3, 
              maxWidth: 600, 
              mx: 'auto',
              borderRadius: 2,
              '& .MuiAlert-message': {
                fontWeight: 500
              }
            }}
          >
            🎉 <strong>Yeni!</strong> Artık <strong>Bulgarca</strong> da öğrenebilirsiniz! 
            Kiril alfabesi ve kültürel özelliklerle zenginleştirilmiş içerik.
          </Alert>
        </Fade>
      </Box>

      {/* Languages Grid */}
      <Grid container spacing={3}>
        {languages.map((language, index) => (
          <Grid item xs={12} sm={6} md={4} key={language.code}>
            <MotionCard
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                border: language.code === 'bg' ? '2px solid #2196f3' : 'none',
                boxShadow: language.code === 'bg' 
                  ? '0 4px 20px rgba(33, 150, 243, 0.3)' 
                  : undefined,
              }}
            >
              {/* New badge for Bulgarian */}
              {language.code === 'bg' && (
                <Chip
                  label="YENİ!"
                  color="primary"
                  size="small"
                  icon={<NewIcon />}
                  sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    zIndex: 1,
                    fontWeight: 'bold',
                    animation: 'pulse 2s infinite',
                    '@keyframes pulse': {
                      '0%': { transform: 'scale(1)' },
                      '50%': { transform: 'scale(1.05)' },
                      '100%': { transform: 'scale(1)' },
                    },
                  }}
                />
              )}

              <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                {/* Flag and Language Name */}
                <Typography variant="h1" sx={{ fontSize: '4rem', mb: 1 }}>
                  {language.flag_emoji}
                </Typography>
                
                <Typography variant="h5" component="h2" gutterBottom>
                  {language.name}
                </Typography>
                
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {language.native_name}
                </Typography>

                {/* Language Stats */}
                <Box sx={{ mt: 2, mb: 2 }}>
                  <Chip
                    label={`Zorluk: ${getDifficultyText(language.difficulty_level)}`}
                    color={getDifficultyColor(language.difficulty_level)}
                    size="small"
                    sx={{ mr: 1, mb: 1 }}
                  />
                  
                  <Chip
                    label={language.script_type === 'cyrillic' ? 'Kiril Alfabesi' : 'Latin Alfabesi'}
                    variant="outlined"
                    size="small"
                    sx={{ mb: 1 }}
                  />
                </Box>

                {/* Special features for Bulgarian */}
                {language.code === 'bg' && (
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="body2" color="primary" sx={{ fontWeight: 500 }}>
                      ✨ Özel Özellikler:
                    </Typography>
                    <Typography variant="caption" display="block" sx={{ mt: 0.5 }}>
                      • Kiril alfabesi öğretimi<br/>
                      • Kültürel bağlam ve gelenekler<br/>
                      • 3 farklı bölgesel aksan
                    </Typography>
                  </Box>
                )}

                {/* Popular languages indicator */}
                {['en', 'es', 'fr'].includes(language.code) && (
                  <Box sx={{ mt: 1 }}>
                    <Chip
                      label="Popüler"
                      icon={<StarIcon />}
                      color="warning"
                      variant="outlined"
                      size="small"
                    />
                  </Box>
                )}
              </CardContent>

              <CardActions sx={{ justifyContent: 'center', pb: 2 }}>
                <Button
                  variant={language.code === 'bg' ? 'contained' : 'outlined'}
                  size="large"
                  startIcon={<LanguageIcon />}
                  onClick={() => handleLanguageSelect(language)}
                  sx={{
                    minWidth: 150,
                    ...(language.code === 'bg' && {
                      background: 'linear-gradient(45deg, #2196f3 30%, #21cbf3 90%)',
                      boxShadow: '0 3px 5px 2px rgba(33, 150, 243, .3)',
                    }),
                  }}
                >
                  {language.code === 'bg' ? 'Hemen Başla!' : 'Başla'}
                </Button>
              </CardActions>
            </MotionCard>
          </Grid>
        ))}
      </Grid>

      {/* Bottom Info */}
      <Box sx={{ textAlign: 'center', mt: 6 }}>
        <Typography variant="body1" color="text.secondary">
          Her dil için özelleştirilmiş AI avatarlar ve kültürel içerik
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2, gap: 2 }}>
          <Chip
            icon={<TrendingUpIcon />}
            label="Kişiselleştirilmiş öğrenme"
            variant="outlined"
          />
          <Chip
            icon={<LanguageIcon />}
            label="Gerçek zamanlı konuşma"
            variant="outlined"
          />
        </Box>
      </Box>
    </Container>
  );
}

export default Languages;