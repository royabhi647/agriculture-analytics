// calculate maximum and minimum yearly production data
export const processYearlyProductionData = (dataset) => {
  const yearlyData = {};

  dataset.forEach((data) => {
    // Extract year, crop name and crop production
    const year = data["Year"].match(/\d{4}/)[0];
    const crop = data["Crop Name"];
    const production = Number(data["Crop Production (UOM:t(Tonnes))"]);

    if (!yearlyData[year]) {
      yearlyData[year] = { max: { crop, production }, min: { crop, production } };
    } else {
      if (production > yearlyData[year].max.production) {
        yearlyData[year].max = { crop, production };
      }
      if (production < yearlyData[year].min.production) {
        yearlyData[year].min = { crop, production };
      }
    }
  });

  return Object.keys(yearlyData).map((year) => [
    year,
    yearlyData[year].max.crop,
    yearlyData[year].min.crop,
  ]);
};


// calculate Average yield and cultivation area of the crop
export const processAverageYieldData = (dataset) => {
  const cropData = {};

  dataset.forEach((data) => {
    const crop = data["Crop Name"];
    const cropYield = Number(data["Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))"]);
    const area = Number(data["Area Under Cultivation (UOM:Ha(Hectares))"]);

    if (!cropData[crop]) {
      cropData[crop] = { totalYield: 0, totalArea: 0, count: 0 };
    }
    cropData[crop].totalYield += cropYield;
    cropData[crop].totalArea += area;
    cropData[crop].count += 1;
  });

  return Object.keys(cropData).map((crop) => [
    crop,
    (cropData[crop].totalYield / cropData[crop].count).toFixed(3),
    (cropData[crop].totalArea / cropData[crop].count).toFixed(3),
  ]);
};