import multer from "multer";

const upload = multer({
  storage: multer.memoryStorage(),
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export const POST = async (req) => {
  try {
    await new Promise((resolve, reject) => {
      upload.any()(req, {}, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });

    const formData = await req.formData();
    const files = req.files || [];

    console.log("Form data:", Object.fromEntries(formData));

    if (files.length > 0) {
      console.log(
        "Files:",
        files.map((file) => ({
          fieldname: file.fieldname,
          originalname: file.originalname,
          encoding: file.encoding,
          mimetype: file.mimetype,
          size: file.size,
        }))
      );
    } else {
      console.log("Files: No files uploaded");
    }

    return new Response(
      JSON.stringify({ message: "Form data received successfully" }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ message: "An error occurred" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};
