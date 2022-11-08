const canvas = document.getElementById('canvas')

const ctx = canvas.getContext('2d')
const img = new Image()
img.src = 'http://b.hiphotos.baidu.com/image/pic/item/bf096b63f6246b606d4f6368e8f81a4c510fa26d.jpg'

img.onload = () => {
  ctx?.drawImage(img, canvasInfo.imgPos.x, canvasInfo.imgPos.y)
}

const cavnasStatus = {
  STOP: 1,
  START: 2,
  MOVING: 3,
}
const canvasInfo = {
  status: cavnasStatus.STOP,
  imgPos: {
    x: 10,
    y: 0
  },
  dragEvtPos: { // 拖拽时鼠标坐标
    x: null
  },
  offsetPos: {
    x: null
  }
}

// 假设一小时渲染一张刻度图
const timeInfo = {
  start: '2022-11-08 00:00:00',
  end: '2022-11-08 20:00:00',
  range: 20, // 20小时
}
canvas.addEventListener('mousedown', (e) => {
  console.log('mousedown')
  e.offsetX
  e.offsetY
  canvasInfo.status = cavnasStatus.START
  canvasInfo.dragEvtPos.x = e.offsetX
  canvasInfo.offsetPos.x = e.offsetX - canvasInfo.imgPos.x
})
canvas.addEventListener('mousemove', (e) => {
  if (canvasInfo.status === cavnasStatus.START) {
    // 准备移动
    canvasInfo.status = cavnasStatus.MOVING
  } else if (canvasInfo.status === cavnasStatus.MOVING) {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    canvasInfo.imgPos.x = e.offsetX - canvasInfo.offsetPos.x
    ctx?.drawImage(img, canvasInfo.imgPos.x, canvasInfo.imgPos.y)
    console.log(canvasInfo.imgPos.x, '图片位置')
    // 计算中间指向几点钟
  }
})

canvas.addEventListener('mouseup', () => {
  canvasInfo.status = cavnasStatus.STOP
})