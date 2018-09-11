import fetch from "cross-fetch";

const IP_INFO_ENDPOINT = "https://ipapi.co/json/";

const getIPInfo = async () => {
  const response = await fetch(IP_INFO_ENDPOINT);
  return response.json();
};

const handleCountryCode = (countryCode, continentCode) => {
  // country and continent codes can be extracted to separate arrays.
  if (countryCode === "GB") {
    return "UK";
  } else if (continentCode === "EU" && countryCode !== "GB") {
    return "EU";
  } else {
    return "NA";
  }
};

export { handleCountryCode, getIPInfo };
