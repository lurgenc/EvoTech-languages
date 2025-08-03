import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Box,
  Avatar,
  Chip,
  LinearProgress,
  Alert,
  Badge,
  Tooltip,
  Paper,
} from '@mui/material';
import {
  Psychology as PsychologyIcon,
  Work as WorkIcon,
  School as SchoolIcon,
  Chat as ChatIcon,
  Star as StarIcon,
  NewReleases as NewIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import axios from 'axios';

const MotionCard = motion(Card);

function Avatars() {
  const { languageCode } = useParams();
  const navigate = useNavigate();
  const { selectedLanguage } = useLanguage();
  const [avatars, setAvatars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAvatars();
  }, [languageCode]);

  const fetchAvatars = async () => {
    try {
      const response = await axios.get(`/api/avatars/${languageCode}`);
      setAvatars(response.data);
    } catch (error) {
      setError('Avatarlar yüklenirken hata oluştu');
      console.error('Error fetching avatars:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarSelect = (avatar) => {
    navigate(`/conversation/${avatar.id}`);
  };

  const getSpecializationIcon = (specialization) => {
    switch (specialization) {
      case 'business': return <WorkIcon />;
      case 'academic': return <SchoolIcon />;
      case 'culture': return <StarIcon />;
      case 'casual': return <ChatIcon />;
      default: return <PsychologyIcon />;
    }
  };

  const getSpecializationText = (specialization) => {
    switch (specialization) {
      case 'business': return 'İş Dünyası';
      case 'academic': return 'Akademik';
      case 'culture': return 'Kültür';
      case 'casual': return 'Günlük Hayat';
      case 'travel': return 'Seyahat';
      default: return specialization;
    }
  };

  const getPersonalityColor = (personality) => {
    switch (personality) {
      case 'friendly': return 'success';
      case 'professional': return 'primary';
      case 'enthusiastic': return 'warning';
      case 'warm': return 'error';
      case 'sophisticated': return 'secondary';
      case 'patient': return 'info';
      case 'encouraging': return 'success';
      case 'energetic': return 'warning';
      default: return 'default';
    }
  };

  const getPersonalityText = (personality) => {
    switch (personality) {
      case 'friendly': return 'Arkadaş Canlısı';
      case 'professional': return 'Profesyonel';
      case 'enthusiastic': return 'Hevesli';
      case 'warm': return 'Sıcakkanlı';
      case 'sophisticated': return 'Sofistike';
      case 'patient': return 'Sabırlı';
      case 'encouraging': return 'Cesaretlendirici';
      case 'energetic': return 'Enerjik';
      case 'precise': return 'Kesin';
      case 'charming': return 'Büyüleyici';
      default: return personality;
    }
  };

  const isBulgarianAvatar = (avatar) => avatar.language_code === 'bg';

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Box sx={{ width: '100%' }}>
          <LinearProgress />
        </Box>
        <Typography variant="h6" sx={{ mt: 2, textAlign: 'center' }}>
          Avatarlar yükleniyor...
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
          AI Öğretmeninizi Seçin
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
          {selectedLanguage?.native_name || languageCode.toUpperCase()} öğrenmek için size uygun avatarı seçin
        </Typography>

        {/* Bulgarian special note */}
        {languageCode === 'bg' && (
          <Paper 
            elevation={2}
            sx={{ 
              p: 3, 
              mb: 3, 
              maxWidth: 700, 
              mx: 'auto',
              background: 'linear-gradient(135deg, #e3f2fd 0%, #f3e5f5 100%)',
              border: '1px solid #2196f3'
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
              <NewIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="h6" color="primary" sx={{ fontWeight: 600 }}>
                Bulgarca Özel Avatarlar
              </Typography>
            </Box>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Bulgarca öğrenmek için özel olarak tasarlanmış avatarlarımız:
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 1 }}>
              <Chip size="small" label="Kiril alfabesi uzmanı" color="primary" variant="outlined" />
              <Chip size="small" label="Kültürel geçmiş" color="primary" variant="outlined" />
              <Chip size="small" label="Bölgesel aksanlar" color="primary" variant="outlined" />
              <Chip size="small" label="Geleneksel bilgi" color="primary" variant="outlined" />
            </Box>
          </Paper>
        )}
      </Box>

      {/* Avatars Grid */}
      <Grid container spacing={3}>
        {avatars.map((avatar, index) => (
          <Grid item xs={12} sm={6} md={4} key={avatar.id}>
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
                border: isBulgarianAvatar(avatar) ? '2px solid #4caf50' : 'none',
                boxShadow: isBulgarianAvatar(avatar) 
                  ? '0 4px 20px rgba(76, 175, 80, 0.3)' 
                  : undefined,
              }}
            >
              {/* New badge for Bulgarian avatars */}
              {isBulgarianAvatar(avatar) && (
                <Badge
                  badgeContent="YENİ"
                  color="success"
                  sx={{
                    '& .MuiBadge-badge': {
                      top: 12,
                      right: 12,
                      fontSize: '0.6rem',
                      fontWeight: 'bold',
                    },
                  }}
                >
                  <Box sx={{ width: '100%', height: 8 }} />
                </Badge>
              )}

              <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                {/* Avatar Image */}
                <Avatar
                  src={avatar.image_url}
                  alt={avatar.name}
                  sx={{
                    width: 120,
                    height: 120,
                    mx: 'auto',
                    mb: 2,
                    border: '4px solid',
                    borderColor: isBulgarianAvatar(avatar) ? 'success.main' : 'primary.main',
                  }}
                >
                  {avatar.name.charAt(0)}
                </Avatar>

                {/* Avatar Name */}
                <Typography variant="h5" component="h2" gutterBottom>
                  {avatar.name}
                </Typography>

                {/* Accent/Region */}
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {avatar.accent && (
                    <Chip
                      label={`${avatar.accent.charAt(0).toUpperCase() + avatar.accent.slice(1)} Aksanı`}
                      size="small"
                      color={isBulgarianAvatar(avatar) ? 'success' : 'primary'}
                      sx={{ mb: 1 }}
                    />
                  )}
                </Typography>

                {/* Personality & Specialization */}
                <Box sx={{ mt: 2, mb: 2 }}>
                  <Chip
                    label={getPersonalityText(avatar.personality)}
                    color={getPersonalityColor(avatar.personality)}
                    size="small"
                    sx={{ mr: 1, mb: 1 }}
                  />
                  
                  <Chip
                    icon={getSpecializationIcon(avatar.specialization)}
                    label={getSpecializationText(avatar.specialization)}
                    variant="outlined"
                    size="small"
                    sx={{ mb: 1 }}
                  />
                </Box>

                {/* Backstory */}
                <Typography 
                  variant="body2" 
                  color="text.secondary" 
                  sx={{ 
                    mt: 2,
                    fontStyle: 'italic',
                    lineHeight: 1.5,
                    fontSize: '0.875rem'
                  }}
                >
                  {avatar.backstory}
                </Typography>

                {/* Age Group & Gender */}
                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center', gap: 1 }}>
                  <Chip
                    label={avatar.gender === 'male' ? 'Erkek' : 'Kadın'}
                    size="small"
                    variant="outlined"
                  />
                  <Chip
                    label={avatar.age_group === 'young' ? 'Genç' : avatar.age_group === 'adult' ? 'Yetişkin' : 'Yaşlı'}
                    size="small"
                    variant="outlined"
                  />
                </Box>

                {/* Special Bulgarian features */}
                {isBulgarianAvatar(avatar) && (
                  <Box sx={{ mt: 2, p: 1, bgcolor: 'success.50', borderRadius: 1 }}>
                    <Typography variant="caption" color="success.dark" sx={{ fontWeight: 500 }}>
                      🇧🇬 Bulgarca Özel Özellikleri
                    </Typography>
                  </Box>
                )}
              </CardContent>

              <CardActions sx={{ justifyContent: 'center', pb: 2 }}>
                <Tooltip title={`${avatar.name} ile konuşmaya başla`}>
                  <Button
                    variant={isBulgarianAvatar(avatar) ? 'contained' : 'outlined'}
                    size="large"
                    startIcon={<ChatIcon />}
                    onClick={() => handleAvatarSelect(avatar)}
                    color={isBulgarianAvatar(avatar) ? 'success' : 'primary'}
                    sx={{
                      minWidth: 150,
                      ...(isBulgarianAvatar(avatar) && {
                        background: 'linear-gradient(45deg, #4caf50 30%, #81c784 90%)',
                        boxShadow: '0 3px 5px 2px rgba(76, 175, 80, .3)',
                      }),
                    }}
                  >
                    {isBulgarianAvatar(avatar) ? 'Deneyimle!' : 'Konuş'}
                  </Button>
                </Tooltip>
              </CardActions>
            </MotionCard>
          </Grid>
        ))}
      </Grid>

      {/* Bottom Tips */}
      <Box sx={{ textAlign: 'center', mt: 6 }}>
        <Typography variant="h6" gutterBottom>
          💡 İpucu
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
          Her avatar farklı bir kişilik ve uzmanlık alanına sahiptir. 
          Öğrenme hedefinize en uygun olanı seçin ve istediğiniz zaman değiştirebilirsiniz.
        </Typography>

        {languageCode === 'bg' && (
          <Alert severity="info" sx={{ mt: 3, maxWidth: 600, mx: 'auto' }}>
            <strong>Bulgarca İpucu:</strong> Dimitar kültürel geçmiş, Elena akademik yaklaşım, 
            Georgi ise modern teknoloji odaklı öğretim sunar.
          </Alert>
        )}
      </Box>
    </Container>
  );
}

export default Avatars;