import fs from "fs";

const createUploadsFolder = () => {
  const dir = "../Frontend/uploads";
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
    console.log("Uploads folder created.");
  }
};

export { createUploadsFolder };
