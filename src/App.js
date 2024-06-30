import '@mantine/core/styles.css';
import React, { useEffect, useState } from 'react';
import AgricultureTable from './components/AgricultureTable';
import { processYearlyProductionData, processAverageYieldData } from './utils/dataProcessing';
import data from './data/agricultureData.json';
import { Container, Title, Space } from '@mantine/core';

const App = () => {
  const [yearlyProductionData, setYearlyProductionData] = useState([]);
  const [averageYieldData, setAverageYieldData] = useState([]);

  useEffect(() => {
    setYearlyProductionData(processYearlyProductionData(data));
    setAverageYieldData(processAverageYieldData(data));
  }, []);

  return (
    <Container>
      <Title order={3} ta="center" mt="lg" mb="lg">Maximum and Minimum Production</Title>
      <AgricultureTable
        data={yearlyProductionData}
        headers={['Year', 'Crop with Maximum Production', 'Crop with Minimum Production']}
      />

      <Space h="md" />

      <Title order={3} ta="center" mt="lg" mb="lg">Average Yield and Cultivation Area of the Crop</Title>
      <AgricultureTable
        data={averageYieldData}
        headers={['Crop', 'Average Yield (1950-2020)', 'Average Cultivation Area (1950-2020)']}
      />
    </Container>
  );
};

export default App;