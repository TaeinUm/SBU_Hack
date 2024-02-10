// Import necessary AWS SDK v3 modules
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import Receipt from "../models/Receipt.js"; // Adjust the path as necessary

// Initialize the S3 Client with your region
const s3Client = new S3Client({ region: process.env.AWS_REGION });

export const uploadReceipt = async (req, res) => {
  console.log(req);
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded!" });
  }

  try {
    // Generate a unique filename for the S3 bucket
    const fileName = `productImg/${Date.now()}_${req.file.originalname}`;
    const bucketName = process.env.AWS_S3_BUCKET;

    // Create an instance of Upload class to manage multipart upload
    const parallelUploads3 = new Upload({
      client: s3Client,
      params: {
        Bucket: bucketName,
        Key: fileName,
        Body: req.file.buffer, // Assuming you're using memory storage in multer
      },
    });

    // Upload the file to S3
    const result = await parallelUploads3.done();

    // Create a new Receipt document with the S3 file URL
    const newReceipt = new Receipt({
      img: result.Location, // URL of the uploaded file
    });

    // Save the Receipt document in MongoDB
    await newReceipt.save();

    // Send the response
    res
      .status(201)
      .json({ message: "File uploaded successfully", receipt: newReceipt });
  } catch (error) {
    console.error("Error uploading file: ", error);
    res
      .status(500)
      .json({ message: "Error uploading file to S3", error: error.message });
  }
};
