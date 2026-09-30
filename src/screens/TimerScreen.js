import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

export default function TimerScreen() {
  const [secondsLeft, setSecondsLeft] = useState(30 * 60); // Padrão: 30 minutos
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isActive && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft(seconds => seconds - 1);
      }, 1000);
    } else if (secondsLeft === 0) {
      setIsActive(false);
      clearInterval(interval);
      // Aqui poderíamos futuramente adicionar um som de alarme ou dar +XP
    }
    return () => clearInterval(interval);
  }, [isActive, secondsLeft]);

  const toggleTimer = () => setIsActive(!isActive);
  
  const resetTimer = (minutes) => {
    setIsActive(false);
    setSecondsLeft(minutes * 60);
  };

  // Formatação do tempo (MM:SS)
  const formatTime = () => {
    const mins = Math.floor(secondsLeft / 60);
    const secs = secondsLeft % 60;
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>⏱️ Foco Profundo</Text>
      <Text style={styles.subtitle}>Desligue as notificações e foque no TCC.</Text>

      <View style={styles.timerCircle}>
        <Text style={styles.timerText}>{formatTime()}</Text>
      </View>

      <View style={styles.controls}>
        <TouchableOpacity style={[styles.button, isActive ? styles.buttonPause : styles.buttonStart]} onPress={toggleTimer}>
          <Text style={styles.buttonText}>{isActive ? 'Pausar' : 'Iniciar'}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.presets}>
        <TouchableOpacity style={styles.presetButton} onPress={() => resetTimer(30)}>
          <Text style={styles.presetText}>30 Min</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.presetButton} onPress={() => resetTimer(50)}>
          <Text style={styles.presetText}>50 Min</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.presetButton} onPress={() => resetTimer(5)}>
          <Text style={styles.presetText}>Pausa (5m)</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, alignItems: 'center', justifyContent: 'center', padding: 20 },
  header: { fontSize: 24, fontWeight: 'bold', color: colors.textTitle, marginBottom: 5 },
  subtitle: { fontSize: 16, color: colors.textBody, marginBottom: 40 },
  timerCircle: { width: 250, height: 250, borderRadius: 125, borderWidth: 8, borderColor: colors.primary, alignItems: 'center', justifyContent: 'center', marginBottom: 40, backgroundColor: colors.surface, elevation: 5 },
  timerText: { fontSize: 60, fontWeight: 'bold', color: colors.textTitle },
  controls: { flexDirection: 'row', marginBottom: 30 },
  button: { paddingVertical: 15, paddingHorizontal: 40, borderRadius: 30, elevation: 3 },
  buttonStart: { backgroundColor: colors.success },
  buttonPause: { backgroundColor: colors.gamification },
  buttonText: { color: colors.surface, fontSize: 18, fontWeight: 'bold' },
  presets: { flexDirection: 'row', gap: 15 },
  presetButton: { backgroundColor: colors.surface, paddingVertical: 10, paddingHorizontal: 20, borderRadius: 10, borderWidth: 1, borderColor: colors.primary },
  presetText: { color: colors.primary, fontWeight: 'bold' }
});