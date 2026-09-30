import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { colors } from '../theme/colors';

// Configurando o calendário para Português
LocaleConfig.locales['pt-br'] = {
  monthNames: ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
  monthNamesShort: ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'],
  dayNames: ['Domingo','Segunda-feira','Terça-feira','Quarta-feira','Quinta-feira','Sexta-feira','Sábado'],
  dayNamesShort: ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'],
  today: 'Hoje'
};
LocaleConfig.defaultLocale = 'pt-br';

export default function CalendarScreen() {
  const [selectedDate, setSelectedDate] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.header}>📅 Prazos e Entregas</Text>
      <Text style={styles.subtitle}>Visualize as datas das suas Sprints e a entrega final do TCC.</Text>

      <View style={styles.calendarContainer}>
        <Calendar
          onDayPress={(day) => setSelectedDate(day.dateString)}
          markedDates={{
            [selectedDate]: { selected: true, selectedColor: colors.primary },
            '2026-11-15': { marked: true, dotColor: colors.gamification }, // Exemplo de data de entrega
            '2026-11-22': { marked: true, dotColor: colors.success } // Outro exemplo
          }}
          theme={{
            backgroundColor: colors.surface,
            calendarBackground: colors.surface,
            textSectionTitleColor: colors.textBody,
            selectedDayBackgroundColor: colors.primary,
            selectedDayTextColor: '#ffffff',
            todayTextColor: colors.gamification,
            dayTextColor: colors.textTitle,
            textDisabledColor: '#d9e1e8',
            dotColor: colors.primary,
            monthTextColor: colors.primary,
            textMonthFontWeight: 'bold',
          }}
        />
      </View>
      
      {selectedDate !== '' && (
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Data selecionada: {selectedDate}</Text>
          <Text style={styles.infoText}>Você pode adicionar entregas específicas para este dia no futuro.</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 20 },
  header: { fontSize: 24, fontWeight: 'bold', color: colors.textTitle, marginBottom: 5 },
  subtitle: { fontSize: 16, color: colors.textBody, marginBottom: 20 },
  calendarContainer: { borderRadius: 12, overflow: 'hidden', elevation: 3, marginBottom: 20 },
  infoCard: { backgroundColor: colors.surface, padding: 15, borderRadius: 8, elevation: 2 },
  infoTitle: { fontSize: 16, fontWeight: 'bold', color: colors.primary, marginBottom: 5 },
  infoText: { fontSize: 14, color: colors.textBody }
});