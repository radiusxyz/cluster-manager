import axios from "axios";

/**
 * @param {string} fileName
 * @param {File} file
 * @returns {Promise<{ IpfsHash: string; PinSize: number; Timestamp: string }>}
 */
export async function uploadFile(fileName, file) {
  const formData = new FormData();

  formData.append("file", file);

  const pinataMetadata = JSON.stringify({
    name: fileName,
  });
  formData.append("pinataMetadata", pinataMetadata);

  const pinataOptions = JSON.stringify({
    cidVersion: 0,
  });
  formData.append("pinataOptions", pinataOptions);

  const res = await axios.post(
    "https://api.pinata.cloud/pinning/pinFileToIPFS",
    formData,
    {
      maxBodyLength: "Infinity",
      headers: {
        "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
        Authorization: `Bearer ${import.meta.env.VITE_PINATA_API_KEY}`,
      },
    }
  );
  return res.data;
}
