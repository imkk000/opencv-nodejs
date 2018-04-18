import cv from 'opencv'
import path from 'path'

// Ref: https://www.pyimagesearch.com/2017/01/02/rotate-images-correctly-with-opencv-and-python/

const fileName = path.resolve(__dirname, 'files', 'input', 'original.png')
const outputFileName = path.resolve(__dirname, 'files', 'output', 'outputRotate.png')

cv.readImage(fileName, (err, im) => {
  const angle = 45
  const [h, w] = im.size()
  const [cX, cY] = [w / 2, h / 2]

  const M = cv.Matrix.getRotationMatrix2D(angle, cX, cY, 1.0)
  const cos = Math.abs(M.get(0, 0))
  const sin = Math.abs(M.get(0, 1))
  const nW = (h * sin) + (w * cos)
  const nH = (h * cos) + (w * sin)

  M.set(0, 2, M.get(0, 2) + (nW / 2) - cX)
  M.set(1, 2, M.get(1, 2) + (nH / 2) - cY)

  im.warpAffine(M, nW, nH)
  im.save(outputFileName)
})
