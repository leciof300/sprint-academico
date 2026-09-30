import React from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { colors } from '../theme/colors';

const screenWidth = Dimensions.get("window").width;

export default function DashboardScreen() {
  // Dados de exemplo para o gráfico de evolução (XP ganho nas últimas 6 semanas)
  const data = {
    labels: ["S1", "S2", "S3", "S4", "S5", "S6"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 150],
        color: (opacity = 1) => `rgba(74, 144, 226, ${opacity})`, // Nossa cor primária
        strokeWidth: 3
      }
    ],
    legend: ["XP Acumulado (Burnup)"]
  };

  const chartConfig = {
    backgroundGradientFrom: colors.surface,
    backgroundGradientTo: colors.surface,
    color: (opacity = 1) => `rgba(45, 52, 54, ${opacity})`, // Cor do texto e linhas de grade
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
    decimalPlaces: 0,
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>🎓 Progresso do TCC</Text>
      <Text style={styles.subtitle}>Acompanhe sua evolução e evite o acúmulo de tarefas.</Text>
      
      <View style={styles.card}>
        <Text style={styles.cardTitle}>🔥 Nível: Explorador Ágil</Text>
        <Text style={styles.xpText}>150 XP Acumulados</Text>
      </View>

      <Text style={styles.chartTitle}>Evolução de Produtividade</Text>
      <View style={styles.chartContainer}>
        <LineChart
          data={data}
          width={screenWidth - 40} // Largura da tela menos as margens
          height={220}
          chartConfig={chartConfig}
          bezier
          style={styles.chartStyle}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', color: colors.textTitle, marginBottom: 5 },
  subtitle: { fontSize: 16, color: colors.textBody, marginBottom: 20 },
  card: { backgroundColor: colors.surface, padding: 20, borderRadius: 12, elevation: 3, alignItems: 'center', marginBottom: 30 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: colors.gamification, marginBottom: 5 },
  xpText: { fontSize: 16, color: colors.success, fontWeight: 'bold' },
  chartTitle: { fontSize: 18, fontWeight: 'bold', color: colors.textTitle, marginBottom: 15 },
  chartContainer: { backgroundColor: colors.surface, borderRadius: 16, elevation: 3, alignItems: 'center', paddingVertical: 10, marginBottom: 40 },
  chartStyle: { borderRadius: 16 }
});