const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
const cavnasStatus = {
  STOP: 1,
  START: 2,
  MOVING: 3,
}
const canvasInfo = {
  status: cavnasStatus.STOP,
  imgPos: {
    x: -10,
    y: 0
  },
  dragEvtPos: { // 拖拽时鼠标坐标
    x: null
  },
  offsetPos: {
    x: null
  }
}
// const img = new Image()
// img.src = 'http://b.hiphotos.baidu.com/image/pic/item/bf096b63f6246b606d4f6368e8f81a4c510fa26d.jpg'

// img.onload = () => {
//   ctx?.drawImage(img, canvasInfo.imgPos.x, canvasInfo.imgPos.y)
// }

const drawHourImg = (x, number) => {
  // ctx?.strokeStyle = '#000'
  // ctx?.lineWidth = 2;
  ctx?.beginPath()
  ctx?.moveTo(x + 0, 0)
  ctx?.lineTo(x + 0, 50)
  ctx?.moveTo(x + 10, 50)
  ctx?.lineTo(x + 10, 0)
  ctx?.moveTo(x + 20, 0)
  ctx?.lineTo(x + 20, 50)
  ctx?.moveTo(x + 30, 50)
  ctx?.lineTo(x + 30, 0)
  ctx?.moveTo(x + 40, 0)
  ctx?.lineTo(x + 40, 50)
  ctx?.moveTo(x + 50, 50)
  ctx?.lineTo(x + 50, 0)
  ctx?.moveTo(x + 60, 0)
  ctx?.lineTo(x + 60, 50)
  ctx.fillText(number, x, 60)
  // ctx?.closePath()
  ctx.stroke()
}
const info = {
  queue: '0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23'.split(','),
  operateOnce: false,
}
let moveOffsetX = 0
const drawDayImg = () => {
  for(let i = 0; i < info.queue.length; i++) {
    const x = canvasInfo.imgPos.x + info.queue[i] * 60
    drawHourImg(x + moveOffsetX, info.queue[i])
  }
  if (canvasInfo.imgPos.x >= 0) { // 左边出现空白
    if (!info.operateOnce) {
      info.operateOnce = true
      moveOffsetX -= 60
      const item = info.queue.pop()
      info.queue.unshift(item)
    }
    console.log('维护queue', info.queue, moveOffsetX)
  }
  if (canvasInfo.imgPos.x <= -24 * 60 + canvas.width) {
    console.log('维护queue')
  }
}
drawDayImg()


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
    // ctx?.drawImage(img, canvasInfo.imgPos.x, canvasInfo.imgPos.y)
    drawDayImg()
    console.log(canvasInfo.imgPos.x, '图片位置')
    // 计算中间指向几点钟
  }
})

canvas.addEventListener('mouseup', () => {
  canvasInfo.status = cavnasStatus.STOP
})
canvas.addEventListener('mouseleave', () => {
  if (canvasInfo.status === cavnasStatus.MOVING) {
    canvasInfo.status = cavnasStatus.STOP
  }
})