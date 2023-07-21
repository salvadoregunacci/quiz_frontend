export function fileIsImage(file) {
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

    return allowedTypes.includes(file.mimetype);
}