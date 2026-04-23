/**
 *  The cover image is resized to specific values on Platform side:
 *
 *  version :cover, if: :image? do
 *    process resize_to_fit: [580, 380]
 *  end
 *
 *  We take half of those sizes to look sharp on retina screen.
 */
export const ORIGINAL_IMAGE_WIDTH = 285
export const ORIGINAL_IMAGE_HEIGHT = 190
