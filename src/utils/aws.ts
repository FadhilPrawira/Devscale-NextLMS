import { HeadObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  region: "apac",
  endpoint: process.env.R2_S3API_URL,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_ID,
    secretAccessKey: process.env.R2_SECRET_KEY,
  },
});

interface uploadFilesArgs {
  key: string;
  folder: string;
  body: File | Uint8Array;
}

export async function uploadFile(args: uploadFilesArgs) {
  try {
    const buffer = args.body instanceof File ? Buffer.from(await args.body.arrayBuffer()) : args.body;
    const contentType = args.body instanceof File ? "image/png" : "application/pdf";

    const data = await s3Client.send(
      new PutObjectCommand({
        Bucket: "devscale-nextlms",
        Key: `${args.folder}/${args.key}`,
        ContentType: contentType,
        Body: buffer,
      }),
    );

    return {
      success: true,
      data,
    };
  } catch (error) {
    return {
      success: false,
      error,
    };
  }
}

// Check if file exists in S3
// Docs: https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/client/s3/command/HeadObjectCommand/
export async function checkIfFileExists(key: string): Promise<boolean> {
  try {
    const headObjectResponse = await s3Client.send(
      new HeadObjectCommand({
        Bucket: "devscale-nextlms",
        Key: key,
      }),
    );

    // File exists
    if (headObjectResponse.$metadata.httpStatusCode === 200) {
      console.log("File exists:", headObjectResponse.Metadata);
      return true;
    } else if (headObjectResponse.$metadata.httpStatusCode === 404) {
      console.log("File does not exist", headObjectResponse.$metadata);
      return false;
    }
  } catch (error) {
    console.log("Error checking file:", error);
    return false;
  }
  // If undefined, return false
  return false;
}
