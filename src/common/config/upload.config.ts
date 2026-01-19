import { BadRequestException } from "@nestjs/common";
import { diskStorage } from "multer";
import { randomUUID } from "node:crypto";
import { extname } from "node:path";

export const uploadConfig = {
  storage: diskStorage({
    destination: "./uploads",
    filename: (_, file, callback) => {
      callback(null, `${randomUUID()}${extname(file.originalname)}`)
    },
  }),

  fileFilter: (
    _: unknown,
    file: Express.Multer.File,
    callback: (error: Error | null, acceptFile: boolean) => void,
  ) => {
    if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
      return callback(new BadRequestException("Tipo inválido"), false)
    }
    callback(null, true)
  },

  limits: {
    fileSize: 2 * 1024 * 1024, // 2MB
  }
}
