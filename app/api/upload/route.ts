import { writeFile, mkdir } from "fs/promises"
import { join } from "path"
import { withAuth } from "@/lib/auth/middleware"
import { query } from "@/lib/database/connection"
import { createApiResponse, createErrorResponse, handleApiError } from "@/lib/api/utils"

const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
const ALLOWED_TYPES = {
  image: ["image/jpeg", "image/png", "image/webp", "image/gif"],
  document: [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ],
  avatar: ["image/jpeg", "image/png", "image/webp"],
}

export const POST = withAuth(async (req) => {
  try {
    const formData = await req.formData()
    const file = formData.get("file") as File
    const fileType = formData.get("type") as string
    const entityId = formData.get("entityId") as string

    if (!file) {
      return createErrorResponse("No file provided", 400)
    }

    if (!fileType || !Object.keys(ALLOWED_TYPES).includes(fileType)) {
      return createErrorResponse("Invalid file type specified", 400)
    }

    // Validate file type
    const allowedMimeTypes = ALLOWED_TYPES[fileType as keyof typeof ALLOWED_TYPES]
    if (!allowedMimeTypes.includes(file.type)) {
      return createErrorResponse(`File type ${file.type} not allowed for ${fileType}`, 400)
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return createErrorResponse("File size too large", 400)
    }

    // Generate unique filename
    const timestamp = Date.now()
    const randomString = Math.random().toString(36).substring(2, 15)
    const extension = file.name.split(".").pop()
    const filename = `${timestamp}-${randomString}.${extension}`

    // Create upload directory
    const uploadDir = join(process.cwd(), "public", "uploads", fileType)
    await mkdir(uploadDir, { recursive: true })

    // Save file
    const filePath = join(uploadDir, filename)
    const bytes = await file.arrayBuffer()
    await writeFile(filePath, Buffer.from(bytes))

    // Save file record to database
    const fileRecord = await query(
      `INSERT INTO file_uploads (
        user_id, filename, original_filename, file_path, file_size, 
        mime_type, file_type, entity_id, is_public
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING id, file_path`,
      [
        req.user!.id,
        filename,
        file.name,
        `/uploads/${fileType}/${filename}`,
        file.size,
        file.type,
        fileType,
        entityId,
        fileType === "avatar" || fileType === "image",
      ],
    )

    return createApiResponse(
      {
        id: fileRecord.rows[0].id,
        filename,
        originalFilename: file.name,
        filePath: fileRecord.rows[0].file_path,
        fileSize: file.size,
        mimeType: file.type,
        fileType,
        url: `${process.env.NEXT_PUBLIC_APP_URL}${fileRecord.rows[0].file_path}`,
      },
      201,
    )
  } catch (error) {
    return handleApiError(error)
  }
})
