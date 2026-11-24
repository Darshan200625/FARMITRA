
const axios = require("axios");

const RESOURCE_ID = "9ef84268-d588-465a-a308-a864a43d0070";

const normalize = (value = "") =>
  value.toLowerCase().trim().replace(/[^a-z0-9]/g, "");

const commodityNames = {
  Coffee: ["Coffee", "Coffee (Raw)", "Coffee Bean"],
  Sugarcane: ["Sugarcane", "Sugar Cane"],
  "Arecanut": ["Arecanut"],
  "Black Pepper": ["Black Pepper"],
  "Red Gram": [
    "Arhar (Tur/Red Gram)(Whole)",
    "Red Gram",
    "Arhar"
  ],
  "Green Gram": [
    "Green Gram (Moong)(Whole)",
    "Green Gram",
    "Moong"
  ],
  "Black Gram": [
    "Black Gram (Urd Beans)(Whole)",
    "Black Gram",
    "Urad"
  ],
  "Bengal Gram": [
    "Bengal Gram(Gram)(Whole)",
    "Bengal Gram",
    "Gram"
  ],
  Paddy: ["Paddy(Dhan)(Common)", "Paddy"],
  Jowar: ["Jowar", "Jowar(Sorghum)"],
  Bajra: ["Bajra", "Bajra(Pearl Millet)"]
};

const districtAliases = {
  tumkur: ["tumkur", "tumakuru"],
  tumakuru: ["tumkur", "tumakuru"]
};

async function fetchCommodityRecords(apiKey, commodity) {
  let allRecords = [];
  let offset = 0;
  const pageSize = 100;
  const maxPages = 10;

  for (let page = 0; page < maxPages; page++) {
    const response = await axios.get(
      `https://api.data.gov.in/resource/${RESOURCE_ID}`,
      {
        params: {
          "api-key": apiKey,
          format: "json",
          limit: pageSize,
          offset,
          "filters[state.keyword]": "Karnataka",
          "filters[commodity]": commodity
        },
        timeout: 25000
      }
    );

    const records = response.data.records || [];

    console.log(
      `Commodity: ${commodity} | Page: ${page + 1} | Records: ${records.length} | Total: ${response.data.total}`
    );

    allRecords.push(...records);

    const total = Number(response.data.total || 0);

    if (records.length === 0 || offset + records.length >= total) {
      break;
    }

    offset += records.length;
  }

  return allRecords;
}

const getMarketPrices = async (req, res) => {
  try {
    const { crop, district } = req.query;

    if (!crop) {
      return res.status(400).json({
        success: false,
        message: "Please select a crop."
      });
    }

    const apiKey = process.env.DATA_GOV_IN_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        success: false,
        message: "Market API key is missing."
      });
    }

    const names = commodityNames[crop] || [crop];

    let allRecords = [];

    for (const commodity of names) {
      const records = await fetchCommodityRecords(
        apiKey,
        commodity
      );

      allRecords.push(...records);

      if (records.length > 0) {
        break;
      }
    }

    // Remove duplicate records.
    const uniqueRecords = Array.from(
      new Map(
        allRecords.map((item) => [
          [
            item.state,
            item.district,
            item.market,
            item.commodity,
            item.variety,
            item.arrival_date
          ].join("|"),
          item
        ])
      ).values()
    );

    let filteredRecords = uniqueRecords;

    // Filter district.
    if (district && district.trim()) {
      const requestedDistrict = normalize(district);

      const acceptedNames =
        districtAliases[requestedDistrict] || [requestedDistrict];

      filteredRecords = uniqueRecords.filter((item) =>
        acceptedNames.includes(normalize(item.district))
      );
    }

    const records = filteredRecords.map((item) => ({
      state: item.state,
      district: item.district,
      market: item.market,
      commodity: item.commodity,
      variety: item.variety,
      arrivalDate: item.arrival_date,
      minPrice: item.min_price,
      maxPrice: item.max_price,
      modalPrice: item.modal_price,
      unit: "₹/Quintal"
    }));

    console.log("Selected crop:", crop);
    console.log("District:", district || "All Karnataka");
    console.log("Total records:", records.length);

    return res.json({
      success: true,
      count: records.length,
      data: records,
      message: records.length
        ? "Market prices fetched successfully."
        : `No Karnataka mandi records found for ${crop}.`
    });

  } catch (error) {
    console.error(
      "Market Price Error:",
      error.response?.data || error.message
    );

    return res.status(500).json({
      success: false,
      message: "Unable to fetch market prices.",
      details: error.response?.data?.message || error.message
    });
  }
};

module.exports = { getMarketPrices };
