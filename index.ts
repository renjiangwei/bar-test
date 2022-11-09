{
  const canvas:HTMLCanvasElement = document.getElementById('cavnas') as HTMLCanvasElement

  const ctx = canvas.getContext('2d')
  const img = new Image()
  img.src = 'http://b.hiphotos.baidu.com/image/pic/item/bf096b63f6246b606d4f6368e8f81a4c510fa26d.jpg'

  img.onload = () => {
    ctx?.drawImage(img, 0, 0)
  }
  ctx?.strokeStyle = '#000'
  ctx?.lineWidth = 2;
  ctx?.beginPath()
  ctx?.moveTo(0, 0)
  ctx?.lineTo(0, 50)
  ctx?.moveTo(10, 50)
  ctx?.lineTo(10, 0)
  ctx?.closePath()
  ctx?.fillText
}