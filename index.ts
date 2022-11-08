{
  const canvas:HTMLCanvasElement = document.getElementById('cavnas') as HTMLCanvasElement

  const ctx = canvas.getContext('2d')
  const img = new Image()
  img.src = 'http://b.hiphotos.baidu.com/image/pic/item/bf096b63f6246b606d4f6368e8f81a4c510fa26d.jpg'

  img.onload = () => {
    ctx?.drawImage(img, 0, 0)
  }
}