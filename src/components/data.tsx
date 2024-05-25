 import React, { useState, useEffect } from 'react';
import { Table, Container } from '@mantine/core';
import jsonData from '../data/temp.json';
import './styles.css';

interface DataItem {
  Year: string;
  "Crop Name": string;
  "Crop Production (UOM:t(Tonnes))": number;
  "Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))": number;
  "Area Under Cultivation (UOM:Ha(Hectares))": number;
}

interface MaxMinDataItem {
  year: string;
  maxCrop: string;
  minCrop: string;
}

interface CropAverageItem {
  crop: string;
  averageYield: string;
  averageArea: string;
}

const AnalyticsTable: React.FC = () => {
  const [maxMinData, setMaxMinData] = useState<MaxMinDataItem[]>([]);
  const [cropAverages, setCropAverages] = useState<CropAverageItem[]>([]);

  useEffect(() => {
    const processedData: DataItem[] = processData(jsonData as DataItem[]);
    setMaxMinData(getMaxMinProductionByYear(processedData));
    setCropAverages(getCropAverages(processedData));
  }, []);

  const processData = (data: DataItem[]): DataItem[] => {
    return data.map(item => ({
      ...item,
      "Crop Production (UOM:t(Tonnes))": item["Crop Production (UOM:t(Tonnes))"] || 0,
      "Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))": item["Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))"] || 0,
      "Area Under Cultivation (UOM:Ha(Hectares))": item["Area Under Cultivation (UOM:Ha(Hectares))"] || 0,
    }));
  };

  const getMaxMinProductionByYear = (data: DataItem[]): MaxMinDataItem[] => {
    const yearMap: { [year: string]: { maxCrop: string; minCrop: string; maxProduction: number; minProduction: number } } = {};

    data.forEach(item => {
      const year = item.Year.split(',')[1].trim();
      const crop = item["Crop Name"];
      const production = parseFloat(String(item["Crop Production (UOM:t(Tonnes))"]));

      if (!yearMap[year]) {
        yearMap[year] = {
          maxCrop: crop,
          maxProduction: production,
          minCrop: crop,
          minProduction: production,
        };
      } else {
        if (production > yearMap[year].maxProduction) {
          yearMap[year].maxCrop = crop;
          yearMap[year].maxProduction = production;
        }
        if (production < yearMap[year].minProduction) {
          yearMap[year].minCrop = crop;
          yearMap[year].minProduction = production;
        }
      }
    });

    return Object.entries(yearMap).map(([year, { maxCrop, minCrop }]) => ({
      year,
      maxCrop,
      minCrop,
    }));
  };

  const getCropAverages = (data: DataItem[]): CropAverageItem[] => {
    const cropMap: { [crop: string]: { totalYield: number; totalArea: number; count: number } } = {};

    data.forEach(item => {
      const crop = item["Crop Name"];
      const yieldKgPerHa = parseFloat(String(item["Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))"]));
      const areaHa = parseFloat(String(item["Area Under Cultivation (UOM:Ha(Hectares))"]));

      if (!cropMap[crop]) {
        cropMap[crop] = {
          totalYield: yieldKgPerHa,
          totalArea: areaHa,
          count: 1,
        };
      } else {
        cropMap[crop].totalYield += yieldKgPerHa;
        cropMap[crop].totalArea += areaHa;
        cropMap[crop].count += 1;
      }
    });

    return Object.entries(cropMap).map(([crop, { totalYield, totalArea, count }]) => ({
      crop,
      averageYield: (totalYield / count).toFixed(3),
      averageArea: (totalArea / count).toFixed(3),
    }));
  };

  return (
    <Container>
      <Table withTableBorder={true} withColumnBorders >
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Year</Table.Th>
            <Table.Th>Crop with Maximum Production in that Year</Table.Th>
            <Table.Th>Crop with Minimum Production in that Year</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {maxMinData.map(({ year, maxCrop, minCrop }) => (
            <Table.Tr key={year}>
              <Table.Td>{year}</Table.Td>
              <Table.Td>{maxCrop}</Table.Td>
              <Table.Td>{minCrop}</Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
      <br />
      <Table withTableBorder={true} withColumnBorders>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Crop</Table.Th>
            <Table.Th>Average Yield of the Crop between 1950-2020</Table.Th>
            <Table.Th>Average Cultivation Area of the Crop Between 1950-2020</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {cropAverages.map(({ crop, averageYield, averageArea }) => (
            <Table.Tr key={crop}>
              <Table.Td>{crop}</Table.Td>
              <Table.Td>{averageYield}</Table.Td>
              <Table.Td>{averageArea}</Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Container>
  );
};

export default AnalyticsTable; 







